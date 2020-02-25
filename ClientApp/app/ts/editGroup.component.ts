import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Group } from './group';



@Component({
    templateUrl: '../html/editGroup.component.html',
    styleUrls: ['../css/editWorker.css'],
    providers: [DataService]
})
export class EditGroupComponent implements OnInit {

    groups: Group[] = [];
    selectedGroup: Group = new Group();
    selectedGroupId: number;
    isDisableSettings: boolean = true;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadGroups();
    }

    loadGroups() {
        this.dataService.getGroups().subscribe((data: Group[]) => {
            this.groups = data;
            //this.workers.sort(this.compare);
            console.log(this.groups)
        });
    }

    cancel() {
        this.selectedGroup = new Group();
    }

    saveGroup() {
        if (!this.selectedGroup.id) {
            this.dataService.createGroup(this.selectedGroup)
                .subscribe((data: Group) => {
                    this.groups.push(data);
                });
        } else {
            this.dataService.updateGroup(this.selectedGroup)
                .subscribe(data => this.loadGroups());
        }
    }

    changeGroup() {
        this.cancel();
        this.selectedGroup = this.groups.find(x => x.id == this.selectedGroupId);
        this.isDisableSettings = false;
    }

}