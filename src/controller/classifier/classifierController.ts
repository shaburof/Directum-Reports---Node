import { Request, Response, NextFunction } from 'express';
import { ClassifierModel } from '../../model/mysqlLocal/classifierModel';

const model = new ClassifierModel();

class ClassifierController {


    public static async get(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let item = await model.get({ id });

        return res.json(ClassifierController.results(item || null));
    };

    public static async all(req: Request, res: Response, next: NextFunction) {
        let item = await model.all();
        return res.json(ClassifierController.results(item));
    };

    public static async insert(req: Request, res: Response, next: NextFunction) {
        try {
            let { typeNumber, title, considerationTime, considerationDayType } = req.body;
            let insertId = await model.insert({ typeNumber, title, considerationTime, considerationDayType });

            return res.json(ClassifierController.results(insertId));
        } catch (error) {
            next(error);
        }
    };

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            let id = req.params.id;
            let { title, considerationTime, considerationDayType } = req.body;
            await model.update({ id, title, considerationTime, considerationDayType });

            return res.json(ClassifierController.results(null));
        } catch (error) {
            next(error);
        }
    };

    public static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let id = +req.params.id;
            await model.delete(id);

            return res.json(ClassifierController.results(null));
        } catch (error) {
            next(error);
        }
    };

    private static results(data: any) {
        return { status: true, data: data };
    }
}

export { ClassifierController }