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

  public preview: string = ''

  constructor(
    public dialogRef: MatDialogRef<UploadImageModalComponent>
  ) {
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
    this.preview = ''
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e.target?.result);
      this.preview = e.target?.result as string
    }

    reader.readAsDataURL(this.file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
