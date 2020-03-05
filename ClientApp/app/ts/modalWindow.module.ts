import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    NgbdModalSuccess,
    NgbdModalError,
    NgbdModalStacked
} from './modalWindow.component';

@NgModule({
    imports: [BrowserModule, NgbModule],
    declarations: [NgbdModalStacked, NgbdModalSuccess, NgbdModalError],
    exports: [NgbdModalStacked],
    bootstrap: [NgbdModalStacked],
    entryComponents: [NgbdModalSuccess, NgbdModalError]
})
export class NgbdModalStackedModule { }
