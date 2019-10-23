import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { DataService } from './data.service';
import { Worker } from './Worker';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})

export class AppComponent implements OnInit {

    worker: Worker = new Worker();   
    workers: Worker[];
    minSlotsCount: String;
    maxSlotsCount: Number;
    tableMode: boolean = true;  
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    countSlots: number[] = [1, 2, 3, 4, 5, 6, 7];

    dropdownList: any[];
    selectedItems: any[];
    dropdownSettings = {};

    ngOnInit() {
        this.loadWorkers();

        this.dropdownList = [
            { item_id: 1, item_text: '09:00' },
            { item_id: 2, item_text: '10:00' },
            { item_id: 3, item_text: '11:00' },
            { item_id: 4, item_text: '12:00' },
            { item_id: 5, item_text: '13:00' },
            { item_id: 6, item_text: '14:00' },
            { item_id: 7, item_text: '15:00' },
            { item_id: 8, item_text: '16:00' },
            { item_id: 9, item_text: '17:00' },
            { item_id: 10, item_text: '18:00' },
            { item_id: 11, item_text: '19:00' }
        ];
        this.dropdownSettings= {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: false
        };
    }
    onItemSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }

    constructor(private dataService: DataService) { }

    // получаем данные через сервис
    loadWorkers() {
        this.workers = this.dataService.getWorkers();
    }
   
}