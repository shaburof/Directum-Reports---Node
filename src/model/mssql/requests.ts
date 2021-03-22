import { requestsInterface } from '../../types/interfaces';

const requests: requestsInterface = {
    getAppealsOnPeriod: () => {
        let request = `select a.Dop as 'номер_обращения',
            a.DataTime as 'дата_обращения',
            a.LongString as 'заявитель',
            a.fxClaimAuthorType as 'тип_заявителя',
            t.NameAn as 'тип_обращения',
            m.namean as 'канал',
            a.fxClaimSubjectT as 'тема',
            w.NameAn as 'ответственный',
            k.NameAn as 'классификатор', 
            a.LongString2 as 'содержание', 
            a.Date6 as 'дата_исполнения',  
            a.LongString4 as 'отчет_исполнения',
            a.Prim as 'доп_поле',
            case when a.fxClaimState=1 then 'инициализация' 
            when a.fxClaimState=2 then 'на рассмотрении'
            when a.fxClaimState=3 then 'на исполнении'
            when a.fxClaimState=4 then 'исполнено'
            when a.fxClaimState=5 then 'отменено'
            when a.fxClaimState=6 then 'справка готова к выдаче' 
            when a.fxClaimState=7 then 'справка выдана'
            when a.fxClaimState=8 then 'справка не выдана'
            end as 'статус' 
            from MBAnalit a
            left join MBAnalit m on a.fxClaimGettingMethod=m.XRecID
            left join MBAnalit t on a.fxClaimType=t.XRecID
            left join MBAnalit w on a.fxClaimWorker=w.XRecID
            left join MBAnalit i on a.embIspolnitel=i.XRecID
            left join MBAnalit k on a.fxClaimKlassifikator=k.XRecID
            where a.vid=3415 
            and a.DataTime >= convert(datetime,@dateFrom)
            and a.DataTime <= convert(datetime,@dateTo)
            Order By a.DataTime DESC`;
        return request;
    },
    getAppealsWithPersonsFilter: (filterValues: string[]) => {
        let prepared = prepareValues(filterValues);

        let request = `select a.Dop as 'номер_обращения',
            a.DataTime as 'дата_обращения',
            a.LongString as 'заявитель',
            a.fxClaimAuthorType as 'тип_заявителя',
            t.NameAn as 'тип_обращения',
            m.namean as 'канал',
            a.fxClaimSubjectT as 'тема',
            w.NameAn as 'ответственный',
            k.NameAn as 'классификатор', 
            a.LongString2 as 'содержание', 
            a.Date6 as 'дата_исполнения',  
            a.LongString4 as 'отчет_исполнения',
            a.Prim as 'доп_поле',
            case when a.fxClaimState=1 then 'инициализация' 
            when a.fxClaimState=2 then 'на рассмотрении'
            when a.fxClaimState=3 then 'на исполнении'
            when a.fxClaimState=4 then 'исполнено'
            when a.fxClaimState=5 then 'отменено'
            when a.fxClaimState=6 then 'справка готова к выдаче' 
            when a.fxClaimState=7 then 'справка выдана'
            when a.fxClaimState=8 then 'справка не выдана'
            end as 'статус' 
            from MBAnalit a
            left join MBAnalit m on a.fxClaimGettingMethod=m.XRecID
            left join MBAnalit t on a.fxClaimType=t.XRecID
            left join MBAnalit w on a.fxClaimWorker=w.XRecID
            left join MBAnalit i on a.embIspolnitel=i.XRecID
            left join MBAnalit k on a.fxClaimKlassifikator=k.XRecID
            where a.vid=3415 
            and a.DataTime >= convert(datetime,@dateFrom)
            and a.DataTime <= convert(datetime,@dateTo)
            and w.NameAn in (${prepared})
            Order By a.DataTime DESC`;

        return request;
    }
};

function prepareValues(filterValues: string[]) {
    if (filterValues.length === 0) return null;
    return filterValues.map((value, index) => {
        return `@p${index}`;
    }).join(',');
}

export { requests }