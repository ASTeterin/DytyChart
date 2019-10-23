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
            { id: 1, name: "Ivan", isDuty: true },
            { id: 2, name: "Vasiliy", isDuty: false },
        ];
        
    }
}