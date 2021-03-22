import { Request, Response, NextFunction } from 'express';
import { Appeals } from '../../model/mssql/appeals';
import { debug, dontShowData } from '../../server';
import { appealType, resultType } from '../../types/types';
import { AppealWorker } from '../../services/handlers/appealWorker';
import { addTime, checkBodyParams } from './commonController';
import { getDummy } from '../../dev/dummyData';

class AppealsController {

    public static async post(req: Request, res: Response, next: NextFunction) {
        let { isValid, message } = checkBodyParams(req);
        if (!isValid) return next(new Error(message));

        let body = req.body;
        const { dateFrom, dateTo } = addTime({
            dateFrom: body.dateFrom as string,
            dateTo: body.dateTo as string
        });
        let filter = { type: 'responsible', values: res.locals.user.responsibles };

        try {
            let resultData = await AppealsController.getAppeals({ dateFrom, dateTo, filter });
            let responsibles = res.locals.user.responsibles;

            let result = { resultData, responsibles };
            return res.status(200).json(result);

        } catch (error) {
            return next(error);
        }
    }

    private static async getAppeals(
        { dateFrom, dateTo, filter }: { dateFrom: string, dateTo: string, filter?: { type: string, values: string[] } }
    ): Promise<resultType> {
        if (debug) return AppealsController.isDebug();

        let appeals = new Appeals();
        let result: appealType[];

        result = await appeals.setDataPeriod({ dateFrom, dateTo }).filter(filter!).go();

        let workerData = await AppealWorker.start(result);

        return workerData;
    }

    private static async isDebug() {
        let result = await getDummy();
        let data = (await AppealWorker.start(result)) as any;
        if (dontShowData) delete data.data;

        return data;
    }

}

export { AppealsController }