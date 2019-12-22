export class Worker {
    constructor(
        public id?: number,
        public name?: string,
        public isDuty?: boolean,
        public isDutyOnWedn?: boolean,
        public isDutyOnLetters?: boolean,
        public idGroup?: number,
        public countAbsencePeriod?: number,
        public color?: string,
        public unwantedSlots?: number[],
        public desirableSlots?: number[],
        ) { }
}