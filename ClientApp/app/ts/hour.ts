import * as moment from 'moment';

export class Hour {
    constructor(
        public id?: number,
        public name?: string,
        public minCount?: number,
        public maxCount?: number,
        public date?: moment.Moment,
        public slots?: any[]
    ) { }
}
