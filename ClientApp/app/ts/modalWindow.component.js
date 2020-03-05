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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
var NgbdModalError = /** @class */ (function () {
    function NgbdModalError(modalService, activeModal) {
        this.modalService = modalService;
        this.activeModal = activeModal;
    }
    NgbdModalError.prototype.open = function () {
        this.modalService.open(NgbdModalSuccess, {
            size: 'lg'
        });
    };
    NgbdModalError = __decorate([
        Component({
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <p>\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F</p>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgbModal, NgbActiveModal])
    ], NgbdModalError);
    return NgbdModalError;
}());
export { NgbdModalError };
var NgbdModalSuccess = /** @class */ (function () {
    function NgbdModalSuccess(activeModal) {
        this.activeModal = activeModal;
    }
    NgbdModalSuccess = __decorate([
        Component({
            template: "\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n      <p>\u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B</p>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgbActiveModal])
    ], NgbdModalSuccess);
    return NgbdModalSuccess;
}());
export { NgbdModalSuccess };
var NgbdModalStacked = /** @class */ (function () {
    function NgbdModalStacked(modalService) {
        this.modalService = modalService;
    }
    NgbdModalStacked.prototype.open = function (is_error) {
        console.log(is_error);
        if (is_error) {
            this.modalService.open(NgbdModalError);
        }
        else {
            this.modalService.open(NgbdModalSuccess);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgbdModalStacked.prototype, "message", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NgbdModalStacked.prototype, "message_type", void 0);
    NgbdModalStacked = __decorate([
        Component({
            selector: 'ngbd-modal-stacked',
            template: "",
        }),
        __metadata("design:paramtypes", [NgbModal])
    ], NgbdModalStacked);
    return NgbdModalStacked;
}());
export { NgbdModalStacked };
//# sourceMappingURL=modalWindow.component.js.map