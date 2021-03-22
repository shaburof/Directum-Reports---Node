class OverdueAppeal {

    public static get({ dateFrom, dateTo, days, dayType }: { dateFrom: Date, dateTo: Date, days: number, dayType: string }) {
        let interval = Math.trunc(OverdueAppeal.getInterval({ dateFrom, dateTo, dayType }));

        let isExpired = interval > days;
        let expiredOnDays = interval - days;

        expiredOnDays = expiredOnDays > 0 ? expiredOnDays : 0;

        let expiredOnHR = expiredOnDays > 0 ? OverdueAppeal.daysForHuman(expiredOnDays) : '';

        return { isExpired, expiredOnDays, expiredOnHR };
    }

    private static getInterval({ dateFrom, dateTo, dayType }: { dateFrom: Date, dateTo: Date, dayType: string }) {
        let interval: number;
        if (dayType === 'BUSINESS') {
            interval = OverdueAppeal.getBusinessDateCount(dateFrom, dateTo);
        }
        else if (dayType === 'CALENDAR') {
            interval = OverdueAppeal.getDateCount(dateFrom, dateTo);
        }
        else throw new Error('dayType не указан');

        return interval;
    }

    private static getBusinessDateCount(startDate: Date, endDate: Date) {
        let elapsed, daysBeforeFirstSaturday, daysAfterLastSunday;
        let ifThen = function (a, b, c) {
            return a === b ? c : a;
        };

        elapsed = endDate.getTime() - startDate.getTime();
        elapsed /= 86400000;

        daysBeforeFirstSaturday = (7 - startDate.getDay()) % 7;
        daysAfterLastSunday = endDate.getDay();

        elapsed -= (daysBeforeFirstSaturday + daysAfterLastSunday);
        elapsed = (elapsed / 7) * 5;
        elapsed += ifThen(daysBeforeFirstSaturday - 1, -1, 0) + ifThen(daysAfterLastSunday, 6, 5);
        elapsed--;

        return Math.ceil(elapsed);
    }

    private static getDateCount(startDate: Date, endDate: Date) {
        let interval = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;
        interval++;
        return interval;
    }

    private static getPluralDays(days: number) {
        let plural = '*'
        let daysToString = days.toString();
        let lastDaysChar = Number.parseInt(daysToString[daysToString.length - 1]);
        if (lastDaysChar === 1) plural = 'день';
        else if (lastDaysChar >= 2 && lastDaysChar <= 4) plural = 'дня';
        else if (lastDaysChar >= 5 && lastDaysChar <= 20) plural = 'дней';
        else if (lastDaysChar === 0) plural = 'дней';

        return daysToString + plural;
    }

    private static daysForHuman(days: number) {
        let plural = OverdueAppeal.getPluralDays(days);

        return plural.trim();
    }
}

export { OverdueAppeal }
