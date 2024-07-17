import {Component, computed, input} from '@angular/core';
import {FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldAppearance, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatStepperNext} from "@angular/material/stepper";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";
import {DyContactService} from "../../service/dy-contact/dy-contact.service";
import {NotificationService} from "../../service/notifications/notification.service";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DyTranslateDirective,
    MatIcon,
    MatButton,
    MatStepperNext
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  long = input<boolean>(false)
  appearance = input<MatFormFieldAppearance>('fill')
  formData = computed(() => this.long() ? this.contactService.formDataLong : this.contactService.formData)

  constructor(
    readonly contactService: DyContactService,
    private readonly notificationService: NotificationService,
  ) {
  }

  onSubmit(formDirective: FormGroupDirective) {
    (this.long() ? this.contactService.sendContactFormLong() : this.contactService.sendContactForm()).subscribe({
      error: (err: any) => {
        this.notificationService.newError("Erreur lors de l'envoie du message, veuillez réessayer ou envoyer un email.", true)
      },
      next: () => {
        this.notificationService.newMessage("Message envoyé")
        this.contactService.formData.reset();
        formDirective.resetForm()
      }
    })
  }
}
