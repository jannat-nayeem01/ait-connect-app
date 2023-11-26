// student-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { AuthService } from '../auth.service';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  groups: any[] = [];
  //selectedOption: string | null = null;
  selectedOption: string = 'groups'; // Set the default selected option
  informationList: any[] = [];

  isJoined: { [groupId: string]: boolean } = {};

  constructor(private groupService: GroupService,private authService:AuthService,private informationService: InformationService) {}

  ngOnInit(): void {
    this.getGroups();
    //this.loadInformation();

  }

  getGroups(): void {
    this.groupService.getGroups().subscribe(
      (groups: any[]) => {
        this.groups = groups;
        this.initializeIsJoined(); // Initialize the isJoined property
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  joinGroup(groupId: string): void {
    //console.log('hello Kumu');
    const userId: string | null = this.authService.getUserId();
    if(userId !== null){
      this.groupService.joinGroup(groupId,userId).subscribe(
      
        () => {
          console.log('Joined group successfully');
          this.isJoined[groupId] = true;
        },
        (error: any) => {
          console.error('Error joining group:', error);
        }
      );
    }

    
  }

  leaveGroup(groupId: string): void {
    const userId: string | null = this.authService.getUserId();
    if(userId !== null){
      this.groupService.leaveGroup(groupId,userId).subscribe(
        () => {
          console.log('Left group successfully');
          this.isJoined[groupId] = false;
        },
        (error: any) => {
          console.error('Error leaving group:', error);
        }
      );
    }


    
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  private initializeIsJoined(): void {
    this.groups.forEach((group) => {
      this.isJoined[group._id] = false; // Initially, assume the student is not joined in any group
    });
  }

  // loadInformation(): void {
  //   this.informationService.getAllInformation().subscribe(
  //     (data: any) => {
  //       // Assuming data is an object with an 'information' property
  //       this.informationList = data.information;
  //     },
  //     (error) => {
  //       console.error('Error fetching information:', error);
  //     }
  //   );
  // }
  

}
