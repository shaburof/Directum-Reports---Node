import { getTimeForHuman } from './common';
import { countersType } from '../../../types/types';
import { appealHandlerTempInterface } from '../../../types/interfaces';

class FinalCalculations {

    private static temp: appealHandlerTempInterface;
    private static counters: countersType;

    public static get({ temp, counters }: { temp: appealHandlerTempInterface, counters: countersType }) {
        FinalCalculations.temp = temp;
        FinalCalculations.counters = counters;
        let result = {
            averageCompletinTimeHR: getTimeForHuman(FinalCalculations.calculateAverageCompletinTime())
        }

        return result;
    }

    public static calculateAverageCompletinTime() {
        let averageTime = FinalCalculations.counters.appealClose !== 0
            ? (FinalCalculations.temp.totalExecutionTimeOfAllAppeals / FinalCalculations.counters.appealClose)
            : 0;

        return averageTime;
    }

}

export { FinalCalculations };