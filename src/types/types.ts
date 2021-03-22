// import { considerationDayEnum } from './enums';

export type appealType = {
    'номер_обращения': string,
    'дата_обращения': Date,
    'заявитель': string,
    'тип_заявителя': string,
    'тип_обращения': string | null,
    'канал': string,
    'тема': string | null,
    'ответственный': string,
    'содержание': string,
    "классификатор": string | null,
    'дата_исполнения': Date | null,
    'отчет_исполнения': string | null,
    'доп_поле': string | null,
    'статус': string,
};

export type appealParsedType = {
    'appealNo': number,
    'appealData': Date,
    'declarant': string,
    'declarantType': 'Физ. лицо' | 'Юр. лицо',
    'appealType': string,
    'channel': string,
    'theme': string,
    'responsible': string,
    'classifier': string,
    'content': string,
    'executionData': Date,
    'executorsReport': string,
    'additionalField': string,
    'status': string,
};

export type countersType = {
    totalAppeals: number,    // всего обращений
    appealOpen: number,     // обращение открыто
    appealClose: number,      // обращение закрыто
    appealsExpiriedTotal: number,     // обращений просрочено всего
    countAsDeclarantType: {
        'юридическое лицо': number,
        'физическое лицо': number,
        'не определено': number
    },
    countAsAppealType: {
        [prop: string]: number
    },
    countByClassifiers: {
        [prop: string]: number
    },
    countAsChannel: {
        [prop: string]: number
    },
    countAsStatus: {
        [prop: string]: number
    },
    countAsResponsible: {
        [prop: string]: number  //по ответственным, сколько на ком обращений
    },
    closedDayOfAppeal: number,
    completinTimes: {
        max: {
            maxCompletinTime: number,
            maxCompletinTimeHR: string,
            appealNo: number | null
        },
        min: {
            minCompletinTime: number,
            minCompletinTimeHR: string,
            appealNo: number | null
        }
    },
}

export type resultDataType = {
    appealNo: number,
    appealData: Date,
    declarant: string,
    declarantType: 'Физ. лицо' | 'Юр. лицо',
    appealType: string,
    channel: string,
    theme: string,
    responsible: string,    // ответственный
    classifier: string,      // классификатор, номер и название
    content: string,
    executionData: Date,
    executorsReport: string,
    additionalField: string,    //дополнительное поле
    status: string,
}

export type resultType = {
    data: (resultDataType & additionParametersType)[],
    totalAppeals: number,    // всего обращений
    appealOpen: number,     // обращение открыто
    appealClose: number,      // обращение закрыто
    appealsExpiriedTotal: number,     // обращений просрочено всего
    countAsDeclarantType: {
        ['юридическое лицо']: number, // сколько юр. лиц
        ['физическое лицо']: number,  // сколько физ лиц 
        ['не определено']: number
        // urFace: number, // сколько юр. лиц
        // fzFace: number  // сколько физюлиц
    },
    countAsAppealType: {
        [prop: string]: number  // по типу обращения
    },
    countAsChannel: {
        [prop: string]: number  // по каналу поступления
    },
    countAsStatus: {
        [prop: string]: number  //по статуту рассмотрения
    },
    countAsResponsible: {
        [prop: string]: number  //по ответственным, сколько на ком обращений
    },
    averageCompletinTimeHR: string, // среднее время закрытия обращения
    closedDayOfAppeal: number,
    completinTimes: {
        max: {  // по макчимальному времени рассмотрения обращения
            maxCompletinTime: number,   // максимальное время в секундах
            maxCompletinTimeHR: string, // максимальное время в формате для людей
            appealNo: number | null     // номер обращения
        },
        min: {  // по минимальному времени рассмотрения обращения
            minCompletinTime: number,   // минимальное время в секундах
            minCompletinTimeHR: string, // минимальное время в формате для людей
            appealNo: number | null     // номер обращения
        }
    }
}

export type additionParametersType = {
    completionTime: number; // время исполнения обращения
    completionTimeFH: string;   // время исполнения обращения в формате для человека
    foto: string;   // фото ответственного сотрудника
    closedDayOfAppeal: boolean  // обращение закрыто в день обращения
    isOpen: boolean,      // относительно статуса обращения оно открыто или закрыто
    considerationTime: { dayType: string | null, days: number },  // время рассмотрения обращения по классификатору в днях
    isExpiredResultInclude: boolean, // присутствуют ли результаты по просрочке обращения
    expired: { isExpired: boolean, expiredOnDays: number, expiredOnHR: string }   // просрочена ли текущее обращение
};

export type fotoType = { ename: string };
