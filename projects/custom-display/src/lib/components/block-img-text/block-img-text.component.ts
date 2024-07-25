import {Component, computed, HostListener, Inject, input, InputSignal, PLATFORM_ID, Signal} from '@angular/core';
import {isPlatformBrowser, NgTemplateOutlet} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {DyTranslateDirective} from "../../directives/dy-translate.directive";
import {DyImageEditDirective} from "../../directives/dy-image-edit.directive";
import {DyPictureComponent} from "../images/dy-picture/dy-picture.component";

@Component({
  selector: 'app-block-img-text',
  standalone: true,
  imports: [
    DyTranslateDirective,
    DyImageEditDirective,
    DyPictureComponent,
    RouterLink,
    MatButton,
    NgTemplateOutlet
  ],
  templateUrl: './block-img-text.component.html',
  styleUrl: './block-img-text.component.scss'
})
export class BlockImgTextComponent {
  uniqueId: InputSignal<string> = input.required()
  imgLeft: InputSignal<boolean> = input(true)
  replaceImage: InputSignal<boolean> = input(false)
  replaceText: InputSignal<boolean> = input(false)
  clickBtn: InputSignal<string> = input('')
  defaultTitle: InputSignal<string> = input('TITLE')
  defaultImageSrc: InputSignal<string> = input('https://picsum.photos/1000/600/?random')
  btnText: InputSignal<string> = input('En savoir plus')
  defaultDesc: InputSignal<string> = input('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.')

  mobile: boolean = false;
  bgColor: Signal<String> = computed(() => {
    return this.imgLeft() ? "color-mix(in srgb, var(--dy-primary) 20%, transparent)" : "color-mix(in srgb, var(--dy-primary) 10%, transparent)"
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.setMargins()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setMargins();
  }

  setMargins(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mobile = window.innerWidth < 768
    }
  }
}

/*
* Description
Le composant BlockImgTextComponent est un composant Angular conçu pour afficher un bloc de texte avec une image à gauche ou à droite, en fonction de la disposition souhaitée. Il permet d'afficher un titre, une description et un bouton cliquable pour rediriger vers une autre page.

Utilisation
Pour utiliser ce composant, incluez simplement la balise <app-block-img-text> dans votre template Angular. Vous pouvez fournir les propriétés suivantes :

Propriétés d'entrée
uniqueId: ID unique
imgLeft: Booléen indiquant si l'image est située à gauche ou non. (Optionnel, par défaut true)
clickBtn: URL vers laquelle rediriger lors du clic sur le bouton. (Optionnel)
defaultTitle: Requis. Titre par défaut à afficher si la clé n'est pas fournie.
defaultImageSrc: Requis. URL de l'image par défaut à afficher si aucune image n'est fournie.
btnText: Texte du bouton. (Optionnel, par défaut 'En savoir plus')
defaultDesc: Requis. Description par défaut à afficher si la clé n'est pas fournie.
*
* */
