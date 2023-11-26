// group-list-component.ts
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  groups: any[] = []; // Assuming you have a Group model

  constructor(private groupService: GroupService) { }

  // ngOnInit(): void {
  //   this.groupService.groups$.subscribe(groups => {
  //     this.groups = groups;
  //   });
  //   this.groupService.getGroups();
  // }

  // editGroup(group: any): void {
  //   // Implement edit logic (e.g., navigate to edit page)
  //   console.log('Edit group:', group);
  // }

  // deleteGroup(group: any): void {
  //   // Implement delete logic
  //   const confirmDelete = confirm(`Are you sure you want to delete ${group.name}?`);
  //   if (confirmDelete) {
  //     this.groupService.deleteGroup(group).subscribe(() => {
  //       // Update the list after deletion
  //       this.groupService.getGroups();
  //     });
  //   }
  // }
}
