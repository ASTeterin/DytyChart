var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Component, Output, EventEmitter } from '@angular/core';
var NgMultiselect = /** @class */ (function () {
    function NgMultiselect() {
        this.selectedItems = [];
        this.selectedIds = [];
        this.dropdownSettings = {};
        this.onChanged = new EventEmitter();
        this.dropdownList = [
            { item_id: 0, item_text: '08:00' },
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
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: false
        };
    }
    NgMultiselect.prototype.onSelect = function (event) {
        console.log(event);
    };
    NgMultiselect.prototype.onItemSelect = function (item) {
        this.selectedItems.push(item.item_id);
        this.selectedIds.push(item.item_id);
        //this.timeChange.emit(this.selectedItems);
        this.onChanged.emit(this.selectedIds);
        //console.log(this.selectedItems);
    };
    NgMultiselect.prototype.onItemDeSelect = function (item) {
        //splice indexOf
        this.selectedItems.push(item.item_id);
        this.selectedIds.push(item.item_id);
        //this.timeChange.emit(this.selectedItems);
        this.onChanged.emit(this.selectedIds);
        //console.log(this.selectedItems);
    };
    NgMultiselect.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    NgMultiselect.prototype.onTimeChange = function ($event) {
        //this.userName = model;
        //this.selectedItems.push($event.id);
        //this.timeChange.emit($event);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgMultiselect.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NgMultiselect.prototype, "isDisable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgMultiselect.prototype, "userName", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgMultiselect.prototype, "onChanged", void 0);
    NgMultiselect = __decorate([
        Component({
            selector: 'multiselect',
            templateUrl: '../html/multiselect.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], NgMultiselect);
    return NgMultiselect;
}());
export { NgMultiselect };
//# sourceMappingURL=multiselect.component.js.map