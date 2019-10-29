import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from './worker';

@Injectable()
export class DataService {

    private url = "/api/Workers";

    constructor(private http: HttpClient) {
    }

    getWorkers() {
        return [
            { id: 1, name: "Ivan Ivanov", isDuty: true },
            { id: 2, name: "Vasiliy Uhov", isDuty: false },
            { id: 3, name: "Elena Petrova", isDuty: false },
            { id: 4, name: "Vlad Konev", isDuty: true },
            { id: 5, name: "Igor Maksimov", isDuty: false },
        ];
        
    }
}