import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbdTabset } from './tabset.component';

@NgModule({
    imports: [BrowserModule, NgbModule, FormsModule],
    declarations: [NgbdTabset],
    exports: [NgbdTabset],
    bootstrap: [NgbdTabset]
})
export class NgbdTabsetModule { }