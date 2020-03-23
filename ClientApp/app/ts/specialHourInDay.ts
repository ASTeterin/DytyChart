import * as moment from 'moment';

export class SpecialHourInDay {
    constructor(
        public id?: number,
        public type?: boolean,
        public workerId?: number,
        public hourNumber?: number,
        public date?: moment.Moment
    ) { }
}