import {afterNextRender, Component} from '@angular/core';
import {DyTextEditorService} from "../../service/dy-text-editor/dy-text-editor.service";
import {ChangeColorsService} from "../../service/change-colors-service/change-colors.service";

@Component({
  selector: 'app-dy-text-editor',
  standalone: true,
  imports: [],
  templateUrl: './dy-text-editor.component.html',
  styleUrl: './dy-text-editor.component.css'
})
export class DyTextEditorComponent {
  title = 'angular';
  key: string = ''
  module: any;
  loaded = false;
  editorData: string = '';
  internalEditor: any;

  constructor(private service: DyTextEditorService, colorsService: ChangeColorsService) {
    afterNextRender(() => {

      service.newEditorData.subscribe((newData) => {
        this.editorData = newData.value
        this.key = newData.key
        if (this.internalEditor) {
          this.internalEditor.setData(newData.value)
        }
      })

      import('@ckeditor/ckeditor5-build-decoupled-document').then((decoupledEditor) => {
        console.log('create')
        colorsService.cssVariablesSubject.subscribe((colors) => {
          const editorColors: { color: string, label: string }[] = []
          for (const key of Object.keys(colors)) {
            if(!key.includes('original')) {
              editorColors.push({color: colors[key], label: key})
            }
          }

          // @ts-ignore
          decoupledEditor.default.create(document.querySelector('.document-editor__editable'), {
            toolbar: ['undo',
              'redo',
              '|',
              'heading',
              '|',
              'fontfamily',
              'fontsize',
              'fontColor',
              '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              '|',
              'link',
              'mediaEmbed',
              '|',
              'alignment',
              '|',
              'bulletedList',
              'numberedList',
              'outdent',
              'indent'
            ],
            fontColor: {
              colors: editorColors,
            },
          })
            .then((editor: any) => {
              const toolbarContainer = document.querySelector('.document-editor__toolbar');
              this.internalEditor = editor;
              // @ts-ignore
              toolbarContainer.appendChild(editor.ui.view.toolbar.element);
              editor.setData(this.editorData)

              editor.model.document.on('change:data', () => {
                console.log(editor.getData())
                this.service.newChanges(this.key, editor.getData())
              });

            })
            .catch((err: any) => {
              console.error(err);
            });

        })
      })
    })
  }

}
