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
var EditWorkerComponent = /** @class */ (function () {
    function EditWorkerComponent(dataService) {
        this.dataService = dataService;
    }
    EditWorkerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getData(this.dataService.url).subscribe(function (data) { return _this.workers = data; });
    };
    EditWorkerComponent = __decorate([
        Component({
            templateUrl: './editWorker.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], EditWorkerComponent);
    return EditWorkerComponent;
}());
export { EditWorkerComponent };
//# sourceMappingURL=editWorker.component.js.map