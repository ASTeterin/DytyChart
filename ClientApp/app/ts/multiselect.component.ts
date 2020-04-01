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

        console.log(this.selectedHours);
        console.log(this.selectedItems);
        
        
    }
    
    @Input() userName: string;
    @Output() onChanged = new EventEmitter<any>()

    onSelect(event: any) {
        console.log(event);
    }

    onItemSelect(item: any): void {
        //this.selectedItems.push(item.item_id);
        //this.selectedIds.push(item.item_id);
        //this.timeChange.emit(this.selectedItems);
        this.onChanged.emit(item.item_id);
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