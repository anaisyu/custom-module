import {Component} from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,

} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'app-upload-image-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './upload-image-modal.component.html',
  styleUrl: './upload-image-modal.component.scss'
})
export class UploadImageModalComponent {
  public imgAlt: string = '';
  public file: any = undefined;

  constructor(
    public dialogRef: MatDialogRef<UploadImageModalComponent>
  ) {
  }

  onFileChanged(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
