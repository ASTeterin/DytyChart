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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
var NgbdModal1Content = /** @class */ (function () {
    function NgbdModal1Content(modalService, activeModal) {
        this.modalService = modalService;
        this.activeModal = activeModal;
    }
    NgbdModal1Content.prototype.open = function () {
        this.modalService.open(NgbdModal2Content, {
            size: 'lg'
        });
    };
    NgbdModal1Content = __decorate([
        Component({
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Hi there!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <p>Hello, World!</p>\n      <p><button class=\"btn btn-lg btn-outline-primary\" (click)=\"open()\">Launch demo modal</button></p>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgbModal, NgbActiveModal])
    ], NgbdModal1Content);
    return NgbdModal1Content;
}());
export { NgbdModal1Content };
var NgbdModal2Content = /** @class */ (function () {
    function NgbdModal2Content(activeModal) {
        this.activeModal = activeModal;
    }
    NgbdModal2Content = __decorate([
        Component({
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">Hi there!</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <p>Hello, World!</p>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgbActiveModal])
    ], NgbdModal2Content);
    return NgbdModal2Content;
}());
export { NgbdModal2Content };
var NgbdModalStacked = /** @class */ (function () {
    function NgbdModalStacked(modalService) {
        this.modalService = modalService;
    }
    NgbdModalStacked.prototype.open = function () {
        this.modalService.open(NgbdModal1Content);
    };
    NgbdModalStacked = __decorate([
        Component({
            selector: 'ngbd-modal-stacked',
            templateUrl: './modal-stacked.html'
        }),
        __metadata("design:paramtypes", [NgbModal])
    ], NgbdModalStacked);
    return NgbdModalStacked;
}());
export { NgbdModalStacked };
//# sourceMappingURL=modalWindow.component.js.map