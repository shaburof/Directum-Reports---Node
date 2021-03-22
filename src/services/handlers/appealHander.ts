import { ServiceClass } from './serviceClass';
import { Foto } from './foto';
import { appealType, resultType, countersType, additionParametersType } from '../../types/types';
import { Parser } from '../parser/parser';
import { FinalCalculations } from './calculations/finalCalculations';
import { AdditionParameters } from './calculations/additionParameters';
import { CalculationCounters } from './calculations/calculationCounters';
import { resultDataType } from '../../types/types';
import { appealHandlerTempInterface, finalCalculationInterface } from '../../types/interfaces';

class AppealHander {
    private resultData: resultType = {
        data: [],
        ...this.getCounters(),
        ...this.getFinalFields()
    };

    private temp: appealHandlerTempInterface = {
        totalExecutionTimeOfAllAppeals: 0
    }

    constructor(private appeals: appealType[]) {
    }

    public async handl() {
        let isRemoteFotoAlive = await Foto.isRemoteFotoAvaliable();
        // let isRemoteFotoAlive = false; //HOME
        let counters: countersType = this.getCounters();

        for (const item of this.appeals) {
            let parsedData = Parser.getParsed(item);
            let addParams = await AdditionParameters.get({ parsedData: { ...parsedData }, isRemoteFotoAlive, temp: this.temp });


            let data: resultDataType & additionParametersType = {
                // ...Parser.getParsed(item),
                ...parsedData,
                ...addParams
            }
            CalculationCounters.get({ parsedData, addParams, counters });
            this.resultData.data.push(data)
        };
        let finalCalculations: finalCalculationInterface = FinalCalculations.get({ temp: this.temp, counters: counters });

        this.resultData = { ...this.resultData, ...counters, ...finalCalculations };

        return this.resultData;
    }

    private getFinalFields() {
        return {
            averageCompletinTimeHR: ''
        };
    }

    private getCounters() {
        return {
            totalAppeals: 0,
            appealOpen: 0,
            appealClose: 0,
            appealsExpiriedTotal: 0,
            countAsDeclarantType: {
                'юридическое лицо': 0,
                'физическое лицо': 0,
                'не определено': 0,
                // urFace: 0,
                // fzFace: 0
            },
            countAsAppealType: {},
            countAsChannel: {},
            countByClassifiers: {},
            countAsStatus: {},
            countAsResponsible: {},
            closedDayOfAppeal: 0,
            completinTimes: {
                max: {
                    maxCompletinTime: 0,
                    maxCompletinTimeHR: '',
                    appealNo: null
                },
                min: {
                    minCompletinTime: 0,
                    minCompletinTimeHR: '',
                    appealNo: null
                }
            },
        };
    }


}

export { AppealHander }