import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ITask } from 'src/app/types/interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task?: ITask;
  @Output() closeForm = new EventEmitter();

  listForm: FormGroup | any;
  title: string;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.task) {
      this.title = 'Edit To Do';
      this.setFormData();
    } else {
      this.title = 'Add To Do';
    }
  }

  initializeForm() {
    this.listForm = this.formBuilder.group({
      name: new FormControl(null, { validators: [Validators.required] })
    });
  }

  setFormData() {
    if (this.task) {
      this.listForm.controls.name.setValue(this.task.name);
    }
  }

  addList() {
    const saveData = {...this.task };
    saveData.name = this.listForm.value.name;
    this.closeForm.emit(saveData);
  }

}
