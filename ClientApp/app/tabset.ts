import { Input, Component } from '@angular/core';


@Component({
    selector: 'ngbd-tabset',
    templateUrl: './tabset.html',
    //styleUrls: ['./tabset.css']
    styles: [` 
            label.count_slot_label {font-size: 10px;}
            .nav-link {padding: .5rem .5rem;}
            .tab_time {padding: 2px;}
            
    `]
})
export class NgbdTabset {
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];
    @Input() timeArr: string;
}
