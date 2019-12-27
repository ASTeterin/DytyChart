import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worker } from './worker';
import { Hour } from './hour';
import { Slot } from './slot';
import { AbsentPeriod } from './absentPeriod';

@Injectable()
export class DataService {

    public url = "/api/Workers";
    public urlHour = "/api/Hours";
    public urlSlot = "/api/Slot";
    public urlFiledSlot = "/api/Slot/get-filled-slots";
    public urlAbsentPeriods = "/api/AbsentPeriod";

    constructor(private http: HttpClient) {
    }

    getData(url: string) {
        return this.http.get(url);
    }

    getSlotsByHourId(hourId: number) {
        return this.http.get(`${this.urlSlot}?hourId=${hourId}`);
    }

    getSlots() {
        return this.http.get(this.urlSlot); 
    }

    createSlot(slot: Slot) {
        return this.http.post(this.urlSlot, slot);
    }

    updateSlot(slot: Slot) {

        return this.http.put(this.urlSlot + '/' + slot.id, slot);
    }

    deleteSlotsInHour(id: number) {
        return this.http.delete(this.urlSlot + '/' + id);
    }

    createWorker(worker: Worker) {
        return this.http.post(this.url, worker);
    }
    updateWorker(worker: Worker) {

        return this.http.put(this.url + '/' + worker.id, worker);
    }
    deleteWorker(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    getHours(date: Date) {
        return this.http.get(`${this.urlHour}?date=${date.toISOString()}`);
        //return this.http.get(`${this.urlHour}?date=${date}`);
    }

    getAllHours() {
        return this.http.get(`${this.urlHour}`);
    }

    createHour(hour: Hour) {
        return this.http.post(this.urlHour, hour);
    }

    updateHour(hour: Hour) {
        return this.http.put(this.urlHour + '/' + hour.id, hour);
    }

    getAbsentPeriod(workerId: number) {
        return this.http.get(`${this.urlAbsentPeriods}?workerId=${workerId}`);
    }

    getAbsentPeriods() {
        return this.http.get(`${this.urlAbsentPeriods}`);
    }

    createAbsentPeriod(absentPeriod: AbsentPeriod) {
        return this.http.post(this.urlAbsentPeriods, absentPeriod);
    }

    updateAbsentPeriod(absentPeriod: AbsentPeriod) {
        return this.http.put(this.urlAbsentPeriods + '/' + absentPeriod.id, absentPeriod);
    }

    getFilledSlots(date: Date)
    {
        return this.http.get(`${this.urlFiledSlot}?date=${date.toISOString()}`);
    }



}