import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IList } from 'src/app/types/interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit, OnChanges {
  @Input() listId: number;
  @Output() closeForm = new EventEmitter();

  list: IList;
  listForm: FormGroup | any;
  title: string;

  constructor(
    private formBuilder: FormBuilder,
    private toDoService: ToDoService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.listId) {
      this.title = 'Edit To Do';
      this.getToDoList(this.listId);
    } else {
      this.title = 'Add To Do';
    }
  }

  getToDoList(listId: number) {
    this.toDoService.getToDoListInformation(listId).subscribe((res: any) => {
      if (res) {
        this.list = res;
        this.setFormData();
      }
    }, (e) => {
      console.log('getToDoList Error');
    });
  }

  initializeForm() {
    this.listForm = this.formBuilder.group({
      name: new FormControl(null, { validators: [Validators.required] })
    });
  }

  setFormData() {
    if (this.list) {
      this.listForm.controls.name.setValue(this.list.name);
    }
  }

  addList() {
    const saveData = {...this.list };
    saveData.name = this.listForm.value.name;
    this.closeForm.emit(saveData);
  }

  close() {
    this.closeForm.emit(false);
  }
}
