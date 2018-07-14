import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounce, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

import { Employee } from '../model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements AfterViewInit {
  @ViewChild(NgForm) ngForm: NgForm;

  state = '';

  model: Employee = {};

  ngAfterViewInit() {
    this.ngForm.valueChanges
      .pipe(
        tap(() => this.state = 'Editing...'),
        debounce(() => interval(500)),
      )
      .subscribe(() => this.autoUpdateForm());
  }

  autoUpdateForm() {
    // do other auto-update-specific stuff
    this.state = 'Backed Up';
  }

  addColor() {
    if (!this.model.favoriteColors) {
      this.model.favoriteColors = [];
    }

    this.model.favoriteColors.push('');
  }

  removeColor(index: number) {
    this.model.favoriteColors.splice(index, 1);
  }

  addJob() {
    if (!this.model.jobs) {
      this.model.jobs = [];
    }

    this.model.jobs.push({});
  }

  removeJob(index: number) {
    this.model.jobs.splice(index, 1);
  }

  trackByIndex<T = any>(index: number, item: T): any {
    return index;
  }

  save() {
    console.log('Save', this.model);
    this.state = 'Saved!';
  }
}
