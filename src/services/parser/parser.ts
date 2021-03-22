import { parse } from 'dotenv/types';
import {
    appealType, appealParsedType
} from '../../types/types';


class Parser {
    // private static data: appealType[];
    private static parsedData: appealParsedType[] = [];

    // constructor(data: appealType[]) {
    //     this.data = data;
    // }

    public static getParsed(data: appealType): appealParsedType {
        let parsed: any = {};

        parsed['appealNo'] = +data['номер_обращения'];
        parsed['appealData'] = data['дата_обращения'];
        parsed['declarant'] = data['заявитель'];
        if (data['тип_заявителя'] && data['тип_заявителя'].toLocaleLowerCase() === 'ф') parsed['declarantType'] = 'Физ. лицо';
        else if (data['тип_заявителя'] && data['тип_заявителя'].toLocaleLowerCase() === 'ю') parsed['declarantType'] = 'Юр. лицо';
        else parsed['declarantType'] = 'не определено';
        parsed['appealType'] = data['тип_обращения'] !== null ? data['тип_обращения'] : 'Не указан';
        parsed['channel'] = data['канал'];
        parsed['theme'] = data['тема'];
        parsed['responsible'] = data['ответственный'];
        parsed['classifier'] = data['классификатор'];
        parsed['content'] = data['содержание'];
        parsed['executionData'] = data['дата_исполнения'];
        parsed['executorsReport'] = data['отчет_исполнения'] ? data['отчет_исполнения'] : '';
        parsed['additionalField'] = data['доп_поле'] ? data['доп_поле'] : '';
        parsed['status'] = data['статус'] ? data['статус'] : 'неизвестно';

        return parsed;
        // for (const notParsedDataType of this.data) {
        //     this.handler(notParsedDataType);
        // }

        // return this.parsedData;
    }

    // private handler(notParsedDataType: appealType) {
    //     let parsed: any = {};

    //     parsed['appealNo'] = +notParsedDataType['номер_обращения'];
    //     parsed['appealData'] = notParsedDataType['дата_обращения'];
    //     parsed['declarant'] = notParsedDataType['заявитель'];
    //     if (notParsedDataType['тип_заявителя'].toLocaleLowerCase() === 'ф') parsed['declarantType'] = 'Физ. лицо';
    //     else if (notParsedDataType['тип_заявителя'].toLocaleLowerCase() === 'ю') parsed['declarantType'] = 'Юр. лицо';
    //     parsed['appealType'] = notParsedDataType['тип_обращения'];
    //     parsed['channel'] = notParsedDataType['канал'];
    //     parsed['theme'] = notParsedDataType['тема'];
    //     parsed['responsible'] = notParsedDataType['ответственный'];
    //     parsed['content'] = notParsedDataType['содержание'];
    //     parsed['executionData'] = notParsedDataType['дата_исполнения'];
    //     parsed['executorsReport'] = notParsedDataType['отчет_исполнения'];
    //     parsed['additionalField'] = notParsedDataType['доп_поле'];
    //     parsed['status'] = notParsedDataType['статус'];

    //     this.parsedData.push(parsed);
    // }
}

export { Parser }