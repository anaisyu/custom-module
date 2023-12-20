import {afterNextRender, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DyTextEditorService} from "../../service/dy-text-editor/dy-text-editor.service";

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

  constructor(private service: DyTextEditorService) {
    afterNextRender(() => {

      service.newEditorData.subscribe( (newData) => {
        this.editorData = newData.value
        this.key = newData.key
        if(this.internalEditor){
          this.internalEditor.setData(newData.value)
        }
      })

      import('@ckeditor/ckeditor5-build-decoupled-document').then( (decoupledEditor) => {
        console.log('create')
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
            colors: [
              {
                color: 'var(--dy-text-1)',
                label: 'Text 1',
              },
              {
                color: 'var(--dy-text-2)',
                label: 'Text 2',
              },
              {
                color: 'var(--dy-color-1)',
                label: 'Color 1',
              },
              {
                color: 'var(--dy-color-1-hover)',
                label: 'Color 1',
              },
              {
                color: 'var(--dy-color-2)',
                label: 'Color 2',
              },
              {
                color: 'var(--dy-color-3)',
                label: 'Color 3',
              },
              {
                color: 'var(--dy-color-4)',
                label: 'Color 4',
              },
              {
                color: 'var(--dy-color-5)',
                label: 'Color 5',
              },
            ],
          },
        })
          .then((editor: any) => {
            const toolbarContainer = document.querySelector('.document-editor__toolbar');
            this.internalEditor = editor;
            // @ts-ignore
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
            editor.setData(this.editorData)

            editor.model.document.on( 'change:data', () => {
              console.log(editor.getData())
              this.service.newChanges(this.key, editor.getData())
            } );

          })
          .catch((err: any) => {
            console.error(err);
          });
      })
    })
  }

}
