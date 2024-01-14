import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {UploadImageModalComponent} from "./upload-image-modal/upload-image-modal.component";
import {MatIconModule} from "@angular/material/icon";
import {ImageUploadService} from "../../service/image-upload/image-upload.service";
import {UploadImageResponse} from "../../model/upload-image-response";
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-add-dyimage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule, MatDialogModule, MatIconModule,
  ],
  templateUrl: './add-dyimage.component.html',
  styleUrls: ['./add-dyimage.component.css']
})
export class AddDyimageComponent {
  @Output() image: EventEmitter<{ alt: string, urls: UploadImageResponse }> = new EventEmitter<{
    alt: string,
    urls: UploadImageResponse
  }>();

  constructor(private service: ImageUploadService) {
  }

  openDialog() {
    this.service.openDialog().subscribe(
      {
        next: output => {
          this.image.emit({alt: output.alt, urls: output.urls})
        },
        error: (err) => {
          console.log('error with uploading image')
          console.log(err)
        }
      })
  }
}
