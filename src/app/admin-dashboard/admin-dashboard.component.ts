// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  groupForm: FormGroup= {} as FormGroup;
  updateForm: FormGroup = {} as FormGroup;
  groups: any[] = [];
  showCreateForm = true; 
  showUpdateForm = false;
  selectedGroup: any; 
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private groupService: GroupService,public router:Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getGroups();
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    });
    


  }
  


  initializeForm(): void {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  createGroup(): void {
    if (this.groupForm.valid) {
      const newGroup = this.groupForm.value;
      console.log('Hi from creategroup',newGroup)
      this.groupService.createGroup(newGroup).subscribe(
        (createdGroup:any) => {
          // Handle the created group
          console.log('Group created:', createdGroup);
          this.successMessage = 'Group was Created successfully.';

          this.groupForm.reset();
          this.getGroups(); // Fetch updated groups after creating a new one

        },
        (error:any) => {
          // Handle error if needed
          console.error('Error creating group:', error);
        }
      );
    }
  }
  getGroups(): void {
    this.groupService.getGroups().subscribe(
      (groups: any[]) => {
        this.groups = groups;
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  updateGroup(group: any): void {
    this.showCreateForm = false; // Hide create form
    this.showUpdateForm = true; 
    this.selectedGroup = group; // Set the selected group
    // Implement update logic
    console.log('Update group:', group);
    this.updateForm.setValue({
      name: group.name,
      description: group.description,
    });
  }

  onUpdateSubmit(): void {
    console.log('Hi from update');
    if (this.updateForm.valid && this.selectedGroup) {
      

      const updatedGroup = { ...this.selectedGroup, ...this.updateForm.value };
      console.log('hey',updatedGroup);

      this.groupService.updateGroup(updatedGroup).subscribe(
        (result: any) => {
          console.log('Group updated successfully:', result);

          // Set success message and reset form
          this.successMessage = 'Group was updated successfully.';
          this.updateForm.reset();

          // Reset showCreateForm and showUpdateForm
          this.showCreateForm = true;
          this.showUpdateForm = false;

          // Fetch updated groups after updating one
          this.getGroups();

        },
        (error: any) => {
          console.error('Error updating group:', error);
        }
      );
    }
  }


  deleteGroup(group: any): void {
    const confirmed = window.confirm(`Are you sure you want to delete the group "${group.name}"?`);
  
    if (confirmed) {
      this.groupService.deleteGroup(group).subscribe(
        () => {
          this.successMessage = 'Group Deleted successfully.';
          this.getGroups(); 
        },
        (error: any) => {
          console.error('Error deleting group:', error);
        }
      );
    }
  }
  




}
