import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ImageUploadService} from "../../../service/image-upload/image-upload.service";
import {UploadImageResponse} from "../../../model/images/upload-image-response";

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
          this.image.emit(output)
        },
        error: (err) => {
          console.log('error with uploading image')
          console.log(err)
        }
      })
  }
}
