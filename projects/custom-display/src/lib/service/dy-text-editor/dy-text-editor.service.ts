import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DyTextEditorService {
  displayEditorSubject = new BehaviorSubject<boolean>(false)
  newEditorData = new Subject<{key: string, value: string}>();
  editorDataChange = new Subject<{ key: string, value: string }>();
  constructor() { }

  newChanges(key: string, value: string) {
    this.editorDataChange.next({key: key, value: value})
  }
  addNewEditorData(key: string, value: string) {
    this.newEditorData.next({key: key, value: value})
  }
}
