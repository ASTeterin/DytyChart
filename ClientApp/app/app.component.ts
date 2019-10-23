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

    ngOnInit() {
        this.loadWorkers(); 
        this.myOptions = [
            { id: 1, name: '09:00' },
            { id: 2, name: '10:00' },
            { id: 3, name: '11:00' },
            { id: 4, name: '12:00' },
            { id: 5, name: '13:00' },
            { id: 6, name: '14:00' },
            { id: 7, name: '15:00' },
        ];
    }
    onChange() {
        console.log(this.optionsModel);
    }

    constructor(private dataService: DataService) { }

    // получаем данные через сервис
    loadWorkers() {
        this.workers = this.dataService.getWorkers();
    }
   
}