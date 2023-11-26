// information-hub/information-hub.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-information-hub',
  templateUrl: './information-hub.component.html',
  styleUrls: ['./information-hub.component.css'],
})
export class InformationHubComponent implements OnInit {
  informationForm: FormGroup = {} as FormGroup;
  informationList: any[] = [];
  successMessage: string | null = null;


  constructor(private fb: FormBuilder, private informationService: InformationService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInformation();
  }

  initForm(): void {
    this.informationForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // Add more fields as needed
    });
  }

  loadInformation(): void {
    this.informationService.getAllInformation().subscribe(
      (data: any) => {
        // Assuming data is an object with an 'information' property
        this.informationList = data.information;
      },
      (error) => {
        console.error('Error fetching information:', error);
      }
    );
  }

  submitInformation(): void {
    if (this.informationForm.valid) {
      const formData = this.informationForm.value;
      this.informationService.addInformation(formData).subscribe(
        () => {
          this.loadInformation();
          this.successMessage = 'Information added successfully';

          this.informationForm.reset();
        },
        (error) => {
          console.error('Error adding information:', error);
        }
      );
    }
  }
}
