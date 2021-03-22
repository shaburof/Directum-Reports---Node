// import request from 'request';
import { Foto } from './foto';
import { appealParsedType, countersType, additionParametersType } from '../../types/types';
import { Validate } from '../validate/validate';
import { appealHandlerTempInterface } from '../../types/interfaces';

import { AdditionParameters } from './calculations/additionParameters';
import { CalculationCounters } from './calculations/calculationCounters';

class ServiceClass {

    protected static singOfOpenAppeal = ['на исполнении', 'на рассмотрении', 'инициализация', ''];
    protected static singOfCloseAppeal = ['исполнено', 'отменено', 'справка выдана', 'справка не выдана'];
    protected static singOfCloseAppealWithoutDateExecution = ['справка готова к выдаче'];

    // public static getAdditionParameters({ parsedData, isRemoteFotoAlive, temp }: { parsedData: appealParsedType, isRemoteFotoAlive: boolean, temp: appealHandlerTempInterface }): Promise<additionParametersType>  {
    //     return AdditionParameters.get({ parsedData, isRemoteFotoAlive, temp });
    // }

    protected static getTimeForHuman(time: number) {
        let numdays = Math.floor((time % 31536000) / 86400);
        let numhours = Math.floor(((time % 31536000) % 86400) / 3600);
        let numminutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
        let numseconds = (((time % 31536000) % 86400) % 3600) % 60;
        numseconds = Math.round(numseconds);
        let resultString = '';

        if (numdays !== 0) resultString += numdays + 'д.';
        if (numhours !== 0) resultString += numhours + 'ч.';
        if (numminutes !== 0) resultString += numminutes + 'м.';
        if (numseconds !== 0) resultString += numseconds + 'с.';

        return resultString;
    }

    protected static isOpenAppeal({ executionData, status }: { executionData: Date | null, status: string }) {
        if (ServiceClass.singOfOpenAppeal.includes(status) && executionData === null) return true;
        else if (ServiceClass.singOfCloseAppeal.includes(status) && executionData !== null) return false;
        else if (ServiceClass.singOfCloseAppealWithoutDateExecution.includes(status)) return false;

        return true;
    }



    // private static singOfOpenAppeal = ['на исполнении', 'на рассмотрении', 'инициализация', ''];
    // private static singOfCloseAppeal = ['исполнено', 'отменено', 'справка выдана', 'справка не выдана'];
    // private static singOfCloseAppealWithoutDateExecution = ['справка готова к выдаче'];

    // public static getInterval({ dateFrom, dateTo }: { dateFrom: Date, dateTo: Date }) {
    //     if (!dateTo) return 0;

    //     let _dateTo = new Date(dateTo);
    //     if (!Validate.isDate(dateFrom) || !Validate.isDate(_dateTo)) return 0;

    //     if (ServiceClass.isAppealClosedOnOpeningDay({ dateFrom, dateTo: _dateTo }) && !ServiceClass.isTimeSet(_dateTo)) {
    //         _dateTo.setDate(_dateTo.getDate() + 1);
    //         _dateTo.setSeconds(_dateTo.getSeconds() - 1);
    //     }

    //     let interval = (_dateTo.getTime() - dateFrom.getTime()) / 1000;
    //     return interval;
    // }

    // private static isAppealClosedOnOpeningDay({ dateFrom, dateTo }: { dateFrom: Date, dateTo: Date }) {
    //     if (!Validate.isDate(dateFrom) || !Validate.isDate(dateTo)) return false;

    //     return dateFrom.getUTCDate() === dateTo.getUTCDate()
    //         && dateFrom.getUTCMonth() === dateTo.getUTCMonth()
    //         && dateFrom.getUTCFullYear() === dateTo.getUTCFullYear();
    // }

    // private static isTimeSet(date: Date) {
    //     if (date.getUTCHours() > 0 || date.getUTCMinutes() > 0 || date.getUTCSeconds() > 0) return true;
    //     return false;
    // }

    // public static getTimeForHuman(time: number) {
    //     let numdays = Math.floor((time % 31536000) / 86400);
    //     let numhours = Math.floor(((time % 31536000) % 86400) / 3600);
    //     let numminutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
    //     let numseconds = (((time % 31536000) % 86400) % 3600) % 60;
    //     let resultString = '';

    //     if (numdays !== 0) resultString += numdays + 'д.';
    //     if (numhours !== 0) resultString += numhours + 'ч.';
    //     if (numminutes !== 0) resultString += numminutes + 'м.';
    //     if (numseconds !== 0) resultString += numseconds + 'с.';

    //     return resultString;
    // }

    // public static async getAdditionParameters({ parsedData, isRemoteFotoAlive, temp }: { parsedData: appealParsedType, isRemoteFotoAlive: boolean, temp: appealHandlerTempInterface }): Promise<additionParametersType> {
    //     return AdditionParameters.get({ parsedData, isRemoteFotoAlive, temp });

    //     // let completionTime = ServiceClass.getInterval({ dateFrom: parsedData.appealData, dateTo: parsedData.executionData });
    //     // let completionTimeFH = ServiceClass.getTimeForHuman(completionTime);
    //     // let foto = isRemoteFotoAlive ? await Foto.getFoto(parsedData.responsible) : '';
    //     // let closedDayOfAppeal = ServiceClass.isAppealClosedOnOpeningDay({ dateFrom: parsedData.appealData, dateTo: parsedData.executionData });
    //     // let isOpen = ServiceClass.isOpenAppeal({ executionData: parsedData.executionData, status: parsedData.status });

    //     // if (!ServiceClass.isOpenAppeal({ executionData: parsedData.executionData, status: parsedData.status })) {
    //     //     temp.totalExecutionTimeOfAllAppeals += completionTime;
    //     // }

    //     // return { completionTime, completionTimeFH, foto, closedDayOfAppeal, isOpen }
    // }

    // public static calculationCounters({ parsedData, addParams, counters }: { parsedData: appealParsedType, addParams: additionParametersType, counters: countersType }) {
    //     return CalculationCounters.get({ parsedData, addParams, counters });

    //     // if (parsedData.declarantType === 'Физ. лицо') counters.countAsDeclarantType.fzFace++;
    //     // else if (parsedData.declarantType === 'Юр. лицо') counters.countAsDeclarantType.urFace++;

    //     // if (!counters.countAsAppealType[parsedData.appealType]) counters.countAsAppealType[parsedData.appealType] = 1;
    //     // else counters.countAsAppealType[parsedData.appealType]++;

    //     // if (!counters.countAsChannel[parsedData.channel]) counters.countAsChannel[parsedData.channel] = 1;
    //     // else counters.countAsChannel[parsedData.channel]++;

    //     // if (!counters.countAsStatus[parsedData.status]) counters.countAsStatus[parsedData.status] = 1;
    //     // else counters.countAsStatus[parsedData.status]++;

    //     // if (addParams.closedDayOfAppeal) counters.closedDayOfAppeal++;


    //     // ServiceClass.calculateMinMaxCounter({ parsedData, addParams, counters });
    //     // ServiceClass.calculateTotalAppeals(counters);
    //     // ServiceClass.calculateAppealOpenOrClose({ executionData: parsedData.executionData, status: parsedData.status, counters });

    //     // if (addParams.completionTime > counters.completinTimes.max.maxCompletinTime) {
    //     //     ServiceClass.saveMinMaxTimeParams({ type: 'max', addParams, counters, parsedData });
    //     // }

    //     // if (addParams.completionTime < counters.completinTimes.min.minCompletinTime) {
    //     //     ServiceClass.saveMinMaxTimeParams({ type: 'min', addParams, counters, parsedData });
    //     // } else if (counters.completinTimes.min.minCompletinTime === 0) {
    //     //     ServiceClass.saveMinMaxTimeParams({ type: 'min', addParams, counters, parsedData });
    //     // }

    //     // counters.totalAppeals = ServiceClass.calculateTotalAppeals(counters.totalAppeals);
    //     // let openOrClose = ServiceClass.calculateAppealOpenOrClose({
    //     //     executionData: parsedData.executionData,status: parsedData.status,
    //     //     appealOpen: counters.appealOpen,appealClose: counters.appealClose
    //     // });
    //     // counters.appealOpen = openOrClose.appealOpen;
    //     // counters.appealClose = openOrClose.appealClose;
    // }

    // private static calculateMinMaxCounter({ parsedData, addParams, counters }: { parsedData: appealParsedType, addParams: additionParametersType, counters: countersType }) {
    //     if (addParams.completionTime > counters.completinTimes.max.maxCompletinTime) {
    //         ServiceClass.saveMinMaxTimeParams({ type: 'max', addParams, counters, parsedData });
    //     }

    //     if (addParams.completionTime < counters.completinTimes.min.minCompletinTime) {
    //         ServiceClass.saveMinMaxTimeParams({ type: 'min', addParams, counters, parsedData });
    //     } else if (counters.completinTimes.min.minCompletinTime === 0) {
    //         ServiceClass.saveMinMaxTimeParams({ type: 'min', addParams, counters, parsedData });
    //     }
    // }

    // private static saveMinMaxTimeParams({ type, parsedData, addParams, counters }: { type: 'min' | 'max', parsedData: appealParsedType, addParams: additionParametersType, counters: any }) {
    //     counters.completinTimes[type][`${type}CompletinTime`] = addParams.completionTime;
    //     counters.completinTimes[type][`${type}CompletinTimeHR`] = ServiceClass.getTimeForHuman(addParams.completionTime);
    //     counters.completinTimes[type].appealNo = parsedData.appealNo;
    // }

    // private static calculateTotalAppeals(counters: countersType) {
    //     counters.totalAppeals++;
    // }


    // private static calculateAppealOpenOrClose({ executionData, status, counters }: { executionData: Date | null, status: string, counters: countersType }) {
    //     if (ServiceClass.isOpenAppeal({ executionData, status })) counters.appealOpen++;
    //     else counters.appealClose++;
    //     // if (ServiceClass.singOfOpenAppeal.includes(status) && executionData === null) {
    //     //     counters.appealOpen++;
    //     // }
    //     // else if (ServiceClass.singOfCloseAppeal.includes(status) && executionData !== null) counters.appealClose++;
    //     // else if (ServiceClass.singOfCloseAppealWithoutDateExecution.includes(status)) counters.appealClose++;
    // }

    // private static isOpenAppeal({ executionData, status }: { executionData: Date | null, status: string }) {
    //     if (ServiceClass.singOfOpenAppeal.includes(status) && executionData === null) return true;
    //     else if (ServiceClass.singOfCloseAppeal.includes(status) && executionData !== null) return false;
    //     else if (ServiceClass.singOfCloseAppealWithoutDateExecution.includes(status)) return false;

    //     return true;
    // }


    // private static calculateTotalAppeals22(totalAppeals: number) {
    //     return ++totalAppeals;
    // }

    // private static calculateAppealOpenOrClose22({ executionData, status, appealOpen, appealClose }: { executionData: Date | null, status: string, appealOpen: number, appealClose: number }) {
    //     let result = { appealClose, appealOpen };
    //     if (ServiceClass.singOfOpenAppeal.includes(status) && executionData === null) {
    //         result.appealOpen++;
    //     }
    //     else if (ServiceClass.singOfCloseAppeal.includes(status) && executionData !== null) result.appealClose++;
    //     else if (ServiceClass.singOfCloseAppealWithoutDateExecution.includes(status)) result.appealClose++;

    //     return result;
    // }

}

export { ServiceClass }