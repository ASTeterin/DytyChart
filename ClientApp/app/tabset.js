var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Component } from '@angular/core';
var NgbdTabset = /** @class */ (function () {
    function NgbdTabset() {
        this.countSlots = [1, 2, 3, 4, 5, 6, 7];
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgbdTabset.prototype, "timeArr", void 0);
    NgbdTabset = __decorate([
        Component({
            selector: 'ngbd-tabset',
            templateUrl: './tabset.html',
            //styleUrls: ['./tabset.css']
            styles: [" \n            label.count_slot_label {font-size: 10px;}\n            .nav-link {padding: .5rem .5rem;}\n            .tab_time {padding: 2px;}\n            \n    "]
        })
    ], NgbdTabset);
    return NgbdTabset;
}());
export { NgbdTabset };
//# sourceMappingURL=tabset.js.map