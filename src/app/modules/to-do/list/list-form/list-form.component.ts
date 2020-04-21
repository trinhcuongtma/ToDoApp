import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IList } from 'src/app/types/interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit, OnChanges {
  @Input() list?: IList;
  @Output() closeForm = new EventEmitter();

  listForm: FormGroup | any;
  title: string;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.list) {
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
