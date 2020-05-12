var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { DefaultSlots } from './defaultSlots';
import { NgbdModalStacked } from './modalWindow.component';
var EditDefaultSlotsComponent = /** @class */ (function () {
    function EditDefaultSlotsComponent(dataService, modal) {
        this.dataService = dataService;
        this.modal = modal;
        this.defaultHourSettings = [];
        this.selectedHourSettings = new DefaultSlots();
        this.isDisableSettings = true;
    }
    EditDefaultSlotsComponent.prototype.ngOnInit = function () {
        this.loadDefaultSlots();
    };
    EditDefaultSlotsComponent.prototype.loadDefaultSlots = function () {
        var _this = this;
        this.dataService.getDefaultSlots().subscribe(function (data) {
            _this.defaultHourSettings = data;
            //this.workers.sort(this.compare);
            console.log(_this.defaultHourSettings);
        });
    };
    EditDefaultSlotsComponent.prototype.cancel = function () {
        this.selectedHourSettings = new DefaultSlots();
    };
    EditDefaultSlotsComponent.prototype.isAllInfoEntered = function () {
        return ((!this.selectedHourSettings.name) || (!this.selectedHourSettings.minCount)) ? false : true;
    };
    EditDefaultSlotsComponent.prototype.saveHoursettings = function () {
        var isErrorWhenSaving = false;
        if (this.isAllInfoEntered()) {
            this.saveChanges();
        }
        else {
            isErrorWhenSaving = true;
        }
        this.modal.open(isErrorWhenSaving);
    };
    EditDefaultSlotsComponent.prototype.saveChanges = function () {
        var _this = this;
        if (!this.selectedHourSettings.id) {
            this.dataService.createDefaultSlots(this.selectedHourSettings)
                .subscribe(function (data) {
                _this.defaultHourSettings.push(data);
            });
        }
        else {
            this.dataService.createDefaultSlots(this.selectedHourSettings)
                .subscribe(function (data) { return _this.loadDefaultSlots(); });
        }
    };
    EditDefaultSlotsComponent.prototype.changeHourSettings = function () {
        var _this = this;
        this.cancel();
        this.selectedHourSettings = this.defaultHourSettings.find(function (x) { return x.id == _this.selectedHourSettingsId; });
        this.isDisableSettings = false;
    };
    EditDefaultSlotsComponent.prototype.createNewHourSettings = function () {
        this.isDisableSettings = false;
        this.cancel();
    };
    EditDefaultSlotsComponent.prototype.deleteHourSettings = function () {
        var _this = this;
        this.dataService.deleteDefaultSlot(this.selectedHourSettings.id).subscribe(function (data) { return _this.loadDefaultSlots(); });
        this.cancel();
    };
    EditDefaultSlotsComponent = __decorate([
        Component({
            templateUrl: '../html/editDefaultSlots.component.html',
            styleUrls: ['../css/editWorker.css'],
            providers: [DataService, NgbdModalStacked]
        }),
        __metadata("design:paramtypes", [DataService, NgbdModalStacked])
    ], EditDefaultSlotsComponent);
    return EditDefaultSlotsComponent;
}());
export { EditDefaultSlotsComponent };
//# sourceMappingURL=editDefaultSlots.component.js.map