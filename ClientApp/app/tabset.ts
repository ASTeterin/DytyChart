import { Input, Component } from '@angular/core';

@Component({
    selector: 'ngbd-tabset',
    templateUrl: './tabset.html'
})
export class NgbdTabset {
    @Input() timeArr: string;
}
