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

    getWorkerName(workers: Worker[]) {
        let worker = workers.find(w => w.id == this.id);
        return worker ? worker.name : "";
    }

    getWorkerColor(workers: Worker[], workerId: number) {
        let worker = workers.find(w => w.id == workerId);
        return worker ? worker.color : "";
    }
}