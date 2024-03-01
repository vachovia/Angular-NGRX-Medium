import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleFormValuesInterface} from './types';
import {BackendErrorsInterface} from '../../types';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMessagesComponent} from '../mc-backend-error-messages/backendErrorMessages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;
  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleformValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList?.split(' '),
    };
    this.articleSubmit.emit(articleformValues);
  }
}
