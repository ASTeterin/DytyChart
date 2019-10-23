import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'multiple-material-select-example',
    templateUrl: 'multiple-material-select.html',
})
export class MultipleMaterialSelectComponent implements OnInit {
    optionsSelect: Array<any>;

    ngOnInit() {
        this.optionsSelect = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ];
    }
}