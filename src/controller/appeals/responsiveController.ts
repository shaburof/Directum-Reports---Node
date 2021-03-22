import { Request, Response, NextFunction } from 'express';
import { SelectiveResponsibleModel } from '../../model/mysqlLocal/selectiveResponsibleModel';

class ResponsiveController {

    public static async add(req: Request, res: Response, next: NextFunction) {
        try {
            let fio = req.body.fio;
            let user_id = res.locals.user.id;
            let model = new SelectiveResponsibleModel();
            model.insert({ user_id, fio });

            res.status(200).json({ status: true });
        } catch (error) {
            res.status(500).json({ status: false })
        }
    };

    public static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let fio = req.body.fio;
            let user_id = res.locals.user.id;
            let model = new SelectiveResponsibleModel();
            model.delete({ user_id, fio });

            res.status(200).json({ status: true });
        } catch (error) {
            res.status(500).json({ status: false })
        }
    }



}

export { ResponsiveController }