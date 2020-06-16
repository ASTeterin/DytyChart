import { Input, Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'multiselect',
    templateUrl: '../html/multiselect.component.html'
})
export class NgMultiselect {
    @Input() placeholder: string;
    @Input() isDisable: boolean;
    @Input() selectedHours: any[];
    @Input() dropdownList: any[];
    //dropdownList: any[];
    selectedItems: any[] = [];
    selectedIds: number[] = [];
    dropdownSettings = {};

    constructor() {

        console.log(this.dropdownList);
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

    onItemSelect(item: any): void {
        this.onChanged.emit({operation:"select", data:item.item_id });
    }

    onItemDeSelect(item: any): void {
        this.onChanged.emit({ operation: "unSelect", data: item.item_id });
    }

    onSelectAll(items: any[]): void {
        items.forEach((item: any) => { this.onItemSelect(item) })
    }

    onDeSelectAll(items: any[]): void {
        this.selectedHours.forEach((item: any) => { this.onItemDeSelect(item) })
    }
    
}