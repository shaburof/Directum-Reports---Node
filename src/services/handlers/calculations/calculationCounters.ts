import { getTimeForHuman } from './common';
import { appealParsedType, countersType, additionParametersType } from '../../../types/types';
import { ServiceClass } from '../serviceClass';

class CalculationCounters extends ServiceClass {

    public static get({ parsedData, addParams, counters }: { parsedData: appealParsedType, addParams: additionParametersType, counters: countersType }) {
        if (parsedData.declarantType === 'Физ. лицо') counters.countAsDeclarantType['физическое лицо']++;
        else if (parsedData.declarantType === 'Юр. лицо') counters.countAsDeclarantType['юридическое лицо']++;
        else if (parsedData.declarantType === 'не определено') counters.countAsDeclarantType['не определено']++;

        if (!counters.countAsAppealType[parsedData.appealType]) counters.countAsAppealType[parsedData.appealType] = 1;
        else counters.countAsAppealType[parsedData.appealType]++;

        if (!counters.countAsChannel[parsedData.channel]) counters.countAsChannel[parsedData.channel] = 1;
        else counters.countAsChannel[parsedData.channel]++;

        if (!counters.countAsStatus[parsedData.status]) counters.countAsStatus[parsedData.status] = 1;
        else counters.countAsStatus[parsedData.status]++;

        if (addParams.closedDayOfAppeal) counters.closedDayOfAppeal++;


        CalculationCounters.calculateMinMaxCounter({ parsedData, addParams, counters });
        CalculationCounters.calculateTotalAppeals(counters);
        CalculationCounters.calculateAppealOpenOrClose({ executionData: parsedData.executionData, status: parsedData.status, counters });
        CalculationCounters.addAppealsByResponsible({ parsedData, counters });
        CalculationCounters.calculateOverdueAppeals({ addParams, counters });
        CalculationCounters.calculateClassifiers({ parsedData, counters });
    }

    private static calculateClassifiers({ parsedData, counters }: { parsedData: appealParsedType, counters: countersType }) {
        let classifier = parsedData.classifier;
        if (classifier === null) classifier = 'не назначено';

        if (!counters.countByClassifiers[classifier]) counters.countByClassifiers[classifier] = 1;
        else counters.countByClassifiers[classifier]++;

    }

    private static calculateOverdueAppeals({ addParams, counters }: { addParams: additionParametersType, counters: countersType }) {
        if (addParams.isExpiredResultInclude && addParams.expired.isExpired) counters.appealsExpiriedTotal++;
    }

    private static addAppealsByResponsible({ parsedData, counters }: { parsedData: appealParsedType, counters: countersType }) {
        let responsible = parsedData.responsible;
        if (responsible === null) responsible = 'не назначен';

        if (!counters.countAsResponsible[responsible]) {
            counters.countAsResponsible[responsible] = 1;
        } else {
            counters.countAsResponsible[responsible]++;
        }
    }

    private static calculateAppealOpenOrClose({ executionData, status, counters }: { executionData: Date | null, status: string, counters: countersType }) {
        if (CalculationCounters.isOpenAppeal({ executionData, status })) counters.appealOpen++;
        else counters.appealClose++;
    }

    private static calculateMinMaxCounter({ parsedData, addParams, counters }: { parsedData: appealParsedType, addParams: additionParametersType, counters: countersType }) {
        if (!parsedData.executionData) return;

        if (addParams.completionTime > counters.completinTimes.max.maxCompletinTime) {
            CalculationCounters.saveMinMaxTimeParams({ type: 'max', addParams, counters, parsedData });
        }

        if (addParams.completionTime < counters.completinTimes.min.minCompletinTime) {
            CalculationCounters.saveMinMaxTimeParams({ type: 'min', addParams, counters, parsedData });
        } else if (counters.completinTimes.min.minCompletinTime === 0) {
            CalculationCounters.saveMinMaxTimeParams({ type: 'min', addParams, counters, parsedData });
        }
    }

    private static saveMinMaxTimeParams({ type, parsedData, addParams, counters }: { type: 'min' | 'max', parsedData: appealParsedType, addParams: additionParametersType, counters: any }) {
        counters.completinTimes[type][`${type}CompletinTime`] = addParams.completionTime;
        counters.completinTimes[type][`${type}CompletinTimeHR`] = getTimeForHuman(addParams.completionTime);
        counters.completinTimes[type].appealNo = parsedData.appealNo;
    }

    private static calculateTotalAppeals(counters: countersType) {
        counters.totalAppeals++;
    }
}

export { CalculationCounters };