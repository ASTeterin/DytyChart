import * as moment from 'moment';

export class AbsentPeriod {
    constructor(
        public id?: number,
        public start?: moment.Moment,
        public end?: moment.Moment,
        public WorkerId?: number,
    ) { }
}
