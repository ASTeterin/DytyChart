import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from './worker';
import { Hour } from './hour';

@Injectable()
export class DataService {

    public url = "/api/Workers";
    public urlHour = "/api/Hours"

    constructor(private http: HttpClient) {
    }

    getData(url: string) {
        return this.http.get(url);
    }

    createWorker(worker: Worker) {
        return this.http.post(this.url, worker);
    }
    updateWorker(worker: Worker) {

        return this.http.put(this.url + '/' + worker.id, worker);
    }
    deleteworker(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    getHours(date: Date) {
        return this.http.get(`${this.urlHour}?date=${date.toISOString()}`);
    }
}