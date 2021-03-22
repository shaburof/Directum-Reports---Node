import { Validate } from '../../validate/validate';
import { Foto } from '../foto';
import { appealParsedType, additionParametersType } from '../../../types/types';
import { appealHandlerTempInterface } from '../../../types/interfaces';
import { ServiceClass } from '../serviceClass';
import { ClassifierModel } from '../../../model/mysqlLocal/classifierModel';
import { normalizeClassifierTypeNumber, getEmptyClassified } from './common';
import { OverdueAppeal } from './overdueAppeal';

const classifierModel = new ClassifierModel();
class AdditionParameters extends ServiceClass {

    private static getInterval({ dateFrom, dateTo }: { dateFrom: Date, dateTo: Date }) {
        if (!dateTo) return 0;

        let _dateTo = new Date(dateTo);
        if (!Validate.isDate(dateFrom) || !Validate.isDate(_dateTo)) return 0;

        if (AdditionParameters.isAppealClosedOnOpeningDay({ dateFrom, dateTo: _dateTo }) && !AdditionParameters.isTimeSet(_dateTo)) {
            _dateTo.setDate(_dateTo.getDate() + 1);
            _dateTo.setSeconds(_dateTo.getSeconds() - 1);
        }

        let interval = (_dateTo.getTime() - dateFrom.getTime()) / 1000;
        return interval;
    }

    private static isAppealClosedOnOpeningDay({ dateFrom, dateTo }: { dateFrom: Date, dateTo: Date }) {
        if (!Validate.isDate(dateFrom) || !Validate.isDate(dateTo)) return false;

        return dateFrom.getUTCDate() === dateTo.getUTCDate()
            && dateFrom.getUTCMonth() === dateTo.getUTCMonth()
            && dateFrom.getUTCFullYear() === dateTo.getUTCFullYear();
    }

    private static isTimeSet(date: Date) {
        if (date.getUTCHours() > 0 || date.getUTCMinutes() > 0 || date.getUTCSeconds() > 0) return true;
        return false;
    }

    private static async getConsiderationTime(classifier: string) {
        if (!classifier || classifier === null) return getEmptyClassified();

        let typeNumber = normalizeClassifierTypeNumber(classifier);
        let result = await classifierModel.get({ typeNumber });


        if (!result) return getEmptyClassified();

        let dayType = result.considerationDayType;

        let considerationTime = { days: result.considerationTime, dayType: dayType };
        return considerationTime;
    }

    private static isExpired({ considerationTime, dateFrom, dateTo }: { considerationTime: { dayType: null, days: number } | { days: number, dayType: string; }, dateFrom: Date, dateTo: Date }) {
        if (considerationTime.dayType === null || dateFrom === null || dateTo === null)
            return { isExpiredResultInclude: false, expired: { isExpired: false, expiredOnDays: 0, expiredOnHR: '' } };

        let expired = OverdueAppeal.get({ dateFrom, dateTo, dayType: considerationTime.dayType, days: considerationTime.days })

        return { isExpiredResultInclude: true, expired };
    }

    public static async get({ parsedData, isRemoteFotoAlive, temp }: { parsedData: appealParsedType, isRemoteFotoAlive: boolean, temp: appealHandlerTempInterface }): Promise<additionParametersType> {
        let completionTime = AdditionParameters.getInterval({ dateFrom: parsedData.appealData, dateTo: parsedData.executionData });
        let completionTimeFH = AdditionParameters.getTimeForHuman(completionTime);
        let closedDayOfAppeal = AdditionParameters.isAppealClosedOnOpeningDay({ dateFrom: parsedData.appealData, dateTo: parsedData.executionData });
        let isOpen = AdditionParameters.isOpenAppeal({ executionData: parsedData.executionData, status: parsedData.status });

        if (!AdditionParameters.isOpenAppeal({ executionData: parsedData.executionData, status: parsedData.status })) {
            temp.totalExecutionTimeOfAllAppeals += completionTime;
        }

        let _foto = isRemoteFotoAlive ? await Foto.getFoto(parsedData.responsible) : '';
        // _foto = Promise.resolve(''); //HOME
        let _considerationTime = await AdditionParameters.getConsiderationTime(parsedData.classifier);
        let [foto, considerationTime] = await Promise.all([_foto, _considerationTime]);

        let { expired, isExpiredResultInclude } = AdditionParameters.isExpired({ considerationTime, dateFrom: parsedData.appealData, dateTo: parsedData.executionData });

        return { completionTime, completionTimeFH, foto, closedDayOfAppeal, isOpen, considerationTime, isExpiredResultInclude, expired }
    }
}

export { AdditionParameters };