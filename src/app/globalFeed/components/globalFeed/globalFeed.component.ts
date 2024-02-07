import { Component } from '@angular/core';
import { BannerComponent, FeedComponent } from './../../../shared/components';
import { PopularTagsComponent } from './../../../shared/components';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent],
  templateUrl: './globalFeed.component.html',
  styleUrl: './globalFeed.component.scss'
})
export class GlobalFeedComponent {
  url = "/articles"
}
