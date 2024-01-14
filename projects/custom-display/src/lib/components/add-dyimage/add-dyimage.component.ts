import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'lib-add-dyimage',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-dyimage.component.html',
  styleUrl: './add-dyimage.component.css'
})
export class AddDyimageComponent {
  public files: any[];

  form = new FormGroup({
    desc: new FormControl(''),
  });

  constructor() {
    this.files = [];
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }

  onUpload() {

  }
}
