import util from 'util';

class Validate {

    public static isValidDate(date: string) {
        return date !== undefined && !Number.isNaN(new Date(date).getTime())
    }

    public static isDate(date: Date) {
        return util.types.isDate(date);
    }
}

export { Validate }