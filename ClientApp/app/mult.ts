import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
    selector: 'multiple-d',

})

export class MyClass {
    optionsModel: number[];
    myOptions: IMultiSelectOption[];

    ngOnInit() {
        this.myOptions = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
        ];
    }
    onChange() {
        console.log(this.optionsModel);
    }
}