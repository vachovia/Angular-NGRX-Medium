import { Component } from '@angular/core';
import { BannerComponent, FeedComponent } from './../../../shared/components';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './globalFeed.component.html',
  styleUrl: './globalFeed.component.scss'
})
export class GlobalFeedComponent {
  url = "/articles"
}
