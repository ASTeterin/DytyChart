import { Input, Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Внимание</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Заполните все обязательные поля</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalError {
    
    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

    open() {
        this.modalService.open(NgbdModalSuccess, {
            size: 'lg'
        });
    }
}

@Component({
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Внимание</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Данные успешно сохранены</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalSuccess {
    constructor(public activeModal: NgbActiveModal) { }
}

@Component({
    selector: 'ngbd-modal-stacked',
    template: ``,
    //templateUrl: './modal-stacked.html'
})
export class NgbdModalStacked {
    constructor(private modalService: NgbModal) { }
    @Input() message: string;
    @Input() message_type: boolean;

    open(is_error: boolean) {
        console.log(is_error);
        if (is_error) {
            this.modalService.open(NgbdModalError);
        } else {
            this.modalService.open(NgbdModalSuccess);
        }
        
    }
}