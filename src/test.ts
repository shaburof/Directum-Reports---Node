import { Appeals } from './model/mssql/appeals';
import { AppealHander } from './services/handlers/appealHander';

const referenceResult: any = {
    "totalAppeals": 8,
    "appealOpen": 0,
    "appealClose": 8,
    "countAsDeclarantType": {
        "юридическое лицо": 0,
        "физическое лицо": 8
    },
    "countAsAppealType": {
        "Заявление об услуге": 1,
        "Запрос консультации": 3,
        "Не указан": 3,
        "Благодарность": 1
    },
    "countAsChannel": {
        "Сайт банка": 1,
        "Интернет сервис": 5,
        "Телефон": 2
    },
    "countAsStatus": {
        "исполнено": 8
    },
    "countAsResponsible": {

    },
    "closedDayOfAppeal": 0,
    "completinTimes": {
        "max": {
            "maxCompletinTime": 872698,
            "maxCompletinTimeHR": "10д.2ч.24м.58с.",
            "appealNo": 15552
        },
        "min": {
            "minCompletinTime": 118498,
            "minCompletinTimeHR": "1д.8ч.54м.58с.",
            "appealNo": 15548
        }
    },
    "averageCompletinTimeHR": "6д.6ч.17м.51с."
};

(async () => {
    let appeals = new Appeals();
    let result = await appeals.setDataPeriod({ dateFrom: '2021-01-01 00:00:00', dateTo: '2021-01-01 23:59:59' }).go();

    let appealHandler = new AppealHander(result)

    let applicationResult = (await appealHandler.handl()) as any;
    delete applicationResult.data;

    return console.log(JSON.stringify(applicationResult) === JSON.stringify(referenceResult));

})();