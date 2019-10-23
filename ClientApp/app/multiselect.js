var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var MultipleMaterialSelectComponent = /** @class */ (function () {
    function MultipleMaterialSelectComponent() {
    }
    MultipleMaterialSelectComponent.prototype.ngOnInit = function () {
        this.optionsSelect = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ];
    };
    MultipleMaterialSelectComponent = __decorate([
        Component({
            selector: 'multiple-material-select',
            templateUrl: 'multiple-material-select.html',
        })
    ], MultipleMaterialSelectComponent);
    return MultipleMaterialSelectComponent;
}());
export { MultipleMaterialSelectComponent };
//# sourceMappingURL=multiselect.js.map