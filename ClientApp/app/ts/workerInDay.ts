import * as moment from 'moment';

export class WorkerInDay {
    constructor(
        public id?: number,
        public workerId?: number,
        public isDuty?: boolean,
        public isDutyOnWedn?: boolean,
        public isDutyOnLetters?: boolean,
        public date?: moment.Moment
    ) { }

}