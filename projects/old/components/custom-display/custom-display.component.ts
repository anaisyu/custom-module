import {Component, Input} from '@angular/core';
import {TestService} from "../../pages/test/test.service";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatSelectChange} from "@angular/material/select";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Col, CustomDisplayElement, Row} from "../../openapi";

@Component({
  selector: 'app-custom-display[config]',
  templateUrl: './custom-display.component.html',
  styleUrls: ['./custom-display.component.css']
})
export class CustomDisplayComponent {
  @Input() config!: CustomDisplayElement;
  @Input() edit: boolean = false;

  constructor(private service: TestService) {

  }

  save(config: CustomDisplayElement) {
    console.log(config)
    this.service.save(config).subscribe(element => {
      console.log('saved')
      console.log(element)
    });
  }

  moveCard(config: CustomDisplayElement, event: any) {
    if (event.previousContainer === event.container) {
      let col: Set<Col> = event.container.data;
      const list: Col[] = Array.from(col);
      col.clear();
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      list.forEach(x => col.add(x));
    } else {
      let col: Set<Col> = event.previousContainer.data;
      const list: Col[] = Array.from(col);
      col.clear();
      let col2: Set<Col> = event.container.data;
      const list2: Col[] = Array.from(col2);
      col2.clear();
      transferArrayItem(
        list,
        list2,
        event.previousIndex,
        event.currentIndex,
      );
      list.forEach(x => col.add(x));
      list2.forEach(x => col2.add(x));
    }
  }

  reduceCol(config: CustomDisplayElement, col: Col) {
    col.width -= 1;
    col.width = Math.max(col.width, 1)
  }

  increaseCol(config: CustomDisplayElement, col: Col) {
    col.width += 1;
    col.width = Math.min(col.width, 12)
  }

  colRight(col: Col) {
    col.colOffset = col.colOffset ? col.colOffset : 0
    col.colOffset += 1;
    col.colOffset = Math.min(col.colOffset, 12)
  }

  colLeft(col: Col) {
    col.colOffset = col.colOffset ? col.colOffset : 0
    col.colOffset -= 1;
    col.colOffset = Math.max(col.colOffset, 0)
  }

  deleteCol(row: Row, col: Col) {
    row.cols.delete(col);
  }

  increaseRow(config: CustomDisplayElement, row: Row) {
    row.height -= 1;
    row.height = Math.max(row.height, 1)
  }

  reduceRow(config: CustomDisplayElement, row: Row) {
    row.height += 1;
    row.height = Math.min(row.height, 12 * 4)
  }

  addRow(config: CustomDisplayElement) {
    config.rows.add({id: -1, displayOrder: 1, height: 12, cols: new Set<Col>()})
  }

  removeRow(config: CustomDisplayElement, row: Row) {
    config.rows.delete(row);
  }


  alertt($event: Event) {
    console.log($event)
  }

  textOnlyToggle($event: MatCheckboxChange, col: Col) {
    col.style.onlyText = $event.source.checked;
    col.style.onlyImage = false;
  }

  imageOnlyToggle($event: MatCheckboxChange, col: Col) {
    col.style.onlyText = false;
    col.style.onlyImage = $event.source.checked;
  }

  textAlignChange($event: MatSelectChange, col: Col) {
    col.style.textAlign = $event.value;
    console.log($event)
  }

  leafChange($event: MatCheckboxChange, col: Col) {
    if (!$event.checked) {
      col.layout = {
        id: -1,
        rows: new Set<Row>([{id: -1, cols: new Set<Col>(), height: 12, displayOrder: 1}]),
        colsLength: 1,
        rowsLength: 1
      }
      setTimeout(() => {
        col.leaf = false;
      })
    } else {
      col.leaf = true;
    }
  }
}
