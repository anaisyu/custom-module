import {Component, ElementRef, HostListener, input, InputSignal, signal, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {DyPictureComponent} from "../images/dy-picture/dy-picture.component";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";

@Component({
  selector: 'app-dy-title-zoom',
  standalone: true,
  imports: [
    DyPictureComponent,
    DyTranslateDirective,
    MatIcon
  ],
  templateUrl: './dy-title-zoom.component.html',
  styleUrl: './dy-title-zoom.component.scss'
})
export class DyTitleZoomComponent {
  uniqueId: InputSignal<string> = input.required()
  imageUrlMd = input.required()
  @ViewChild('background', {static: true}) background!: ElementRef;
  defaultTitle = input<string>('TITLE');
  defaultDescription = input<string>('TITLE');
  materialIconName = input<string | null>(null);

  @HostListener('window:scroll')
  onScroll() {
    // Calculate the new background size based on scroll position
    const scrollPosition = window.scrollY;
    const newSize = 100 + scrollPosition * 0.1; // Adjust the factor as needed

    // Update the background size
    this.background.nativeElement.style.transform = 'scale(' + newSize / 100 + ')';
  }
}


/*
*
* DyTitleZoomComponent
Description
Le composant DyTitleZoomComponent est un composant Angular conçu pour afficher un titre avec un effet de zoom lors du défilement de la page. Il permet d'ajouter une image en arrière-plan floue et de faire zoomer le titre en fonction du défilement de la page.

Utilisation
Pour utiliser ce composant, incluez simplement la balise <app-dy-title-zoom> dans votre template Angular. Vous devez fournir les propriétés suivantes :

Propriétés d'entrée
uniqueId: id unique sur le site
imageUrlMd: Requis. L'URL de l'image à afficher en arrière-plan.
defaultTitle: Titre par défaut à afficher si la clé n'est pas fournie. (Optionnel)
defaultDescription: Description par défaut à afficher si la clé n'est pas fournie. (Optionnel)

*
* */
