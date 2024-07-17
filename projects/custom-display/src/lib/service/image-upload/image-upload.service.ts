import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, filter, finalize, map, Observable, of, switchMap, tap} from "rxjs";
import {UploadImageResponse} from "../../model/images/upload-image-response";
import {MatDialog} from "@angular/material/dialog";
import {UploadImageModalComponent} from "../../components/images/add-dyimage/upload-image-modal/upload-image-modal.component";
import {NotificationService} from "../notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private notificationService: NotificationService, private dialog: MatDialog, private http: HttpClient, @Inject('imageupload_url') private imageUploadUrl: string) { }

  uploadImage(file: any): Observable<UploadImageResponse> {
    const formData = new FormData()
    formData.append('file', file, file.name);
    return this.http.post<UploadImageResponse>(this.imageUploadUrl + '/uploads-v2/', formData).pipe(
      tap((response) => {
        // Code exécuté en cas de succès
        this.notificationService.newMessage("Image ajoutée avec succès");
      }),
      catchError((error) => {
        // Code exécuté en cas d'erreur
        this.notificationService.newError("Erreur lors de l'envoi de l'image");
        // Retourner un observable pour gérer l'erreur
        throw error;
      }),
      );
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
