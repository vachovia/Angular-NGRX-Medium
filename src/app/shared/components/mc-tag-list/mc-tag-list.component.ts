import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopularTagType} from './../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-tag-list',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mc-tag-list.component.html',
  styleUrl: './mc-tag-list.component.scss',
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];
}
