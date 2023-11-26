// groups.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  @Input() groups: any[] = [];
  @Input() isJoined: { [groupId: string]: boolean } = {};
  @Output() joinGroup = new EventEmitter<string>();
  @Output() leaveGroup = new EventEmitter<string>();


  // Define isJoined property

  constructor() {}

  ngOnInit(): void {
    this.getUserMemberships();

    // Initialize isJoined based on existing group data or API calls
    this.groups.forEach((group) => {
      // Set isJoined based on the group's join status
      // Example: this.isJoined[group._id] = group.isJoined;
      // For simplicity, let's assume all groups are not joined initially
      this.isJoined[group._id] = false;
    });
  }
  getUserMemberships(): void {
    // Call a service method to fetch user memberships
    // Update isJoined based on the fetched data
    // For example:
    // this.groupService.getUserMemberships().subscribe(
    //   (memberships: any[]) => {
    //     memberships.forEach((membership) => {
    //       this.isJoined[membership.groupId] = true;
    //     });
    //   },
    //   (error: any) => {
    //     console.error('Error fetching user memberships:', error);
    //   }
    // );
  }


  // Method to handle joining a group
  handleJoinGroup(groupId: string): void {
    // Perform any logic needed for joining a group
    console.log(`Joining group with ID: ${groupId}`);

    // Emit the event to the parent component
    this.joinGroup.emit(groupId);

    // Update isJoined status
    this.isJoined[groupId] = true;
  }

  // Method to handle leaving a group
  handleLeaveGroup(groupId: string): void {
    // Perform any logic needed for leaving a group
    console.log(`Leaving group with ID: ${groupId}`);

    // Emit the event to the parent component
    this.leaveGroup.emit(groupId);

    // Update isJoined status
    this.isJoined[groupId] = false;
  }
}
