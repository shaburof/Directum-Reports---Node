export interface requestsInterface {
    getAppealsOnPeriod: () => string,
    getAppealsWithPersonsFilter: (filterValues: string[]) => string
}

export interface appealHandlerTempInterface {
    totalExecutionTimeOfAllAppeals: number
}

export interface finalCalculationInterface {
    averageCompletinTimeHR: string
}