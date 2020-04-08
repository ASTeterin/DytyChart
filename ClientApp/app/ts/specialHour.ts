import * as moment from 'moment';

export class SpecialHour {
    constructor(
        public id?: number,
        public type?: boolean,
        public workerId?: number,
        public hourNumber?: number
    ) { }
}