var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var MultipleSelect = /** @class */ (function () {
    function MultipleSelect() {
        this.dropdownSettings = {};
    }
    MultipleSelect.prototype.ngOnInit = function () {
        this.dropdownList = [
            { "id": 1, "itemName": "India" },
            { "id": 2, "itemName": "Singapore" },
            { "id": 3, "itemName": "Australia" },
            { "id": 4, "itemName": "Canada" },
            { "id": 5, "itemName": "South Korea" },
            { "id": 6, "itemName": "Germany" },
            { "id": 7, "itemName": "France" },
            { "id": 8, "itemName": "Russia" },
            { "id": 9, "itemName": "Italy" },
            { "id": 10, "itemName": "Sweden" }
        ];
        this.selectedItems = [
            { "id": 2, "itemName": "Singapore" },
            { "id": 3, "itemName": "Australia" },
            { "id": 4, "itemName": "Canada" },
            { "id": 5, "itemName": "South Korea" }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Countries",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass custom-class"
        };
    };
    MultipleSelect = __decorate([
        Component({
            selector: 'multuple-select',
            templateUrl: 'multiple-select.html'
        })
    ], MultipleSelect);
    return MultipleSelect;
}());
export { MultipleSelect };
//# sourceMappingURL=multiple-select.js.map