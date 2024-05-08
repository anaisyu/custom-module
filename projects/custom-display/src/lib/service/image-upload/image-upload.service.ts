import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map, Observable, switchMap} from "rxjs";
import {UploadImageResponse} from "../../model/upload-image-response";
import {MatDialog} from "@angular/material/dialog";
import {UploadImageModalComponent} from "../../components/images/add-dyimage/upload-image-modal/upload-image-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(public dialog: MatDialog, private http: HttpClient, @Inject('imageupload_url') private imageUploadUrl: string) { }

  uploadImage(file: any): Observable<UploadImageResponse> {
    const formData = new FormData()
    formData.append('file', file, file.name);
    return this.http.post<UploadImageResponse>(this.imageUploadUrl + '/uploads-v2/', formData);
  }

  openDialog(): Observable<{ urls: UploadImageResponse; alt: string }> {
    const dialogRef = this.dialog.open(UploadImageModalComponent);

    return dialogRef.afterClosed().pipe(
      filter(result => result?.alt && result?.file),
      switchMap((result) => {
        return this.uploadImage(result.file).pipe(map(uploadResponse => {return {alt: result.alt, urls: uploadResponse}}))
      }),
    );
  }
}
