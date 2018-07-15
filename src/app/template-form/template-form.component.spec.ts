import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form.component';

describe('TemplateFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        TemplateFormComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TemplateFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
