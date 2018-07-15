import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {
  state = '';

  favoriteColorsFormArray: FormArray = this.fb.array([]);
  jobsFormArray: FormArray = this.fb.array([]);

  formGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    favoriteColors: this.favoriteColorsFormArray,
    jobs: this.jobsFormArray,
  });

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.formGroup.valueChanges
      .pipe(
        tap(() => this.setUpValidation()),
        tap(() => this.state = 'Editing...'),
        debounce(() => interval(500)),
      )
      .subscribe(() => this.autoUpdateForm());

    this.setUpValidation();
  }

  setUpValidation() {
    this.jobsFormArray.controls.forEach(control => {
      const validators = [Validators.minLength(5)];
      if (control.get('likedItThere').value) {
        validators.push(Validators.required);
      }

      control.get('name').setValidators(validators);
      control.get('name').updateValueAndValidity({
        emitEvent: false,
      });
    });
  }

  autoUpdateForm() {
    // do other auto-update-specific stuff
    console.log('Backup', this.formGroup.getRawValue());
    this.state = 'Backed Up';
  }

  addColor() {
    this.favoriteColorsFormArray.push(new FormControl('', [Validators.required]));
  }

  removeColor(index: number) {
    this.favoriteColorsFormArray.removeAt(index);
  }

  addJob() {
    this.jobsFormArray.push(this.fb.group({
      name: [''],
      position: [''],
      likedItThere: [false],
    }));
  }

  removeJob(index: number) {
    this.jobsFormArray.removeAt(index);
  }

  trackByIndex<T = any>(index: number, item: T): any {
    return index;
  }

  save() {
    console.log('Save', this.formGroup.getRawValue());
    this.state = 'Saved!';
  }
}
