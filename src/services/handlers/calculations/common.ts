const singOfOpenAppeal = ['на исполнении', 'на рассмотрении', 'инициализация', ''];
const singOfCloseAppeal = ['исполнено', 'отменено', 'справка выдана', 'справка не выдана'];
const singOfCloseAppealWithoutDateExecution = ['справка готова к выдаче'];

export function getTimeForHuman(time: number) {
    let numdays = Math.floor((time % 31536000) / 86400);
    let numhours = Math.floor(((time % 31536000) % 86400) / 3600);
    let numminutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
    let numseconds = (((time % 31536000) % 86400) % 3600) % 60;
    numseconds = Math.round(numseconds);
    let resultString = '';

    if (numdays !== 0) resultString += numdays + 'д.';
    if (numhours !== 0) resultString += numhours + 'ч.';
    if (numminutes !== 0) resultString += numminutes + 'м.';
    if (numseconds !== 0) resultString += numseconds + 'с.';

    return resultString;
}

export function isOpenAppeal({ executionData, status }: { executionData: Date | null, status: string }) {
    if (singOfOpenAppeal.includes(status) && executionData === null) return true;
    else if (singOfCloseAppeal.includes(status) && executionData !== null) return false;
    else if (singOfCloseAppealWithoutDateExecution.includes(status)) return false;

    return true;
}

export function normalizeClassifierTypeNumber(classifier: string) {
    let typeNumber = classifier.split(' ')[0];
    if (typeNumber[typeNumber.length - 1] === '.') typeNumber = typeNumber.slice(0, typeNumber.length - 1);

    return typeNumber;
}

export function getEmptyClassified() {
    return { dayType: null, days: 0 };
}