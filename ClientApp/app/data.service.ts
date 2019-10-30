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
            { id: 1, name: "Ivan Ivanov", isDuty: true, isDutyByLetters: false, isDutyOnWednesday: false },
            { id: 2, name: "Vasiliy Uhov", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 3, name: "Elena Petrova", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 4, name: "Vlad Konev", isDuty: true, isDutyByLetters: false, isDutyOnWednesday: false },
            { id: 5, name: "Igor Maksimov", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: true },
            { id: 6, name: "Igor Nikolaev", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 7, name: "Sergey Bobkov", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
            { id: 8, name: "Yuliya Voz", isDuty: false, isDutyByLetters: true, isDutyOnWednesday: false },
        ];
        
    }
}