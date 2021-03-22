import { Request } from 'express';
import { Validate } from '../../services/validate/validate';

export function checkBodyParams(req: Request) {
    let body = req.body;
    if (!Validate.isValidDate(body.dateFrom as any) || !Validate.isValidDate(body.dateTo))
        return { isValid: false, message: 'неправильный формат полей dateFrom или dateTo, используйте: "2021-05-12"' };

    // if (body.filter && (!body.filter.type || !body.filter.values))
    //     return { isValid: false, message: 'неправильный формат фильтра, {type:"responsible", values:["ФИО"]}' };

    // if (!body.query || !body.dateFrom || !body.dateTo)
    //     return { isValid: false, message: 'неправильынй тип запроса. Example {"query": "responsible","dateFrom": "2020-02-20","dateTo": "2020-02-20"}' };


    return { isValid: true, message: '' };
}

export function addTime({ dateFrom, dateTo }: { dateFrom: string, dateTo: string }) {
    return {
        dateFrom: dateFrom + ' 00:00:00', dateTo: dateTo + ' 23:59:59'
    };
}
