export class Worker {
    constructor(
        public id?: number,
        public name?: string,
        public isDuty?: boolean,
        public isDutyByLetters?: boolean,
        public isDutyOnWednesday?: boolean,
        public unwantedSlots?: number[]) { }
        
}