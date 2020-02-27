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
import { Group } from './group';
var EditGroupComponent = /** @class */ (function () {
    function EditGroupComponent(dataService) {
        this.dataService = dataService;
        this.groups = [];
        this.selectedGroup = new Group();
        this.isDisableSettings = true;
    }
    EditGroupComponent.prototype.ngOnInit = function () {
        this.loadGroups();
    };
    EditGroupComponent.prototype.loadGroups = function () {
        var _this = this;
        this.dataService.getGroups().subscribe(function (data) {
            _this.groups = data;
            //this.workers.sort(this.compare);
            console.log(_this.groups);
        });
    };
    EditGroupComponent.prototype.cancel = function () {
        this.selectedGroup = new Group();
    };
    EditGroupComponent.prototype.saveGroup = function () {
        var _this = this;
        if (!this.selectedGroup.id) {
            this.dataService.createGroup(this.selectedGroup)
                .subscribe(function (data) {
                _this.groups.push(data);
            });
        }
        else {
            this.dataService.updateGroup(this.selectedGroup)
                .subscribe(function (data) { return _this.loadGroups(); });
        }
    };
    EditGroupComponent.prototype.changeGroup = function () {
        var _this = this;
        this.cancel();
        this.selectedGroup = this.groups.find(function (x) { return x.id == _this.selectedGroupId; });
        this.isDisableSettings = false;
    };
    EditGroupComponent.prototype.createNewGroup = function () {
        this.isDisableSettings = false;
        this.cancel();
    };
    EditGroupComponent = __decorate([
        Component({
            templateUrl: '../html/editGroup.component.html',
            styleUrls: ['../css/editWorker.css'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], EditGroupComponent);
    return EditGroupComponent;
}());
export { EditGroupComponent };
//# sourceMappingURL=editGroup.component.js.map