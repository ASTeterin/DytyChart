import { Input, Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'multiselect',
    templateUrl: '../html/multiselect.html'
})
export class NgMultiselect {
    @Input() placeholder: string;
    @Input() isDisable: boolean;
    dropdownList: any[];
    selectedItems: any[] = [];
    selectedIds: number[] = [];
    dropdownSettings = {};

    constructor() {
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
    
    @Input() userName: string;
    @Output() onChanged = new EventEmitter<any>()

    onSelect(event: any) {
        console.log(event);
    }

    onItemSelect(item: any): void {
        this.selectedItems.push(item.item_id);
        this.selectedIds.push(item.item_id);
        //this.timeChange.emit(this.selectedItems);
        this.onChanged.emit(this.selectedIds);
        //console.log(this.selectedItems);

    }

    onItemDeSelect(item: any): void {
        //splice indexOf
        this.selectedItems.push(item.item_id);
        this.selectedIds.push(item.item_id);
        //this.timeChange.emit(this.selectedItems);
        this.onChanged.emit(this.selectedIds);
        //console.log(this.selectedItems);

    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onTimeChange($event: any) {

        //this.userName = model;
        //this.selectedItems.push($event.id);
        //this.timeChange.emit($event);
    }
    
}