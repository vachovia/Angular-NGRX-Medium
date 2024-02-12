import {Component} from '@angular/core';
import {BannerComponent, FeedComponent, FeedTogglerComponent} from '../../../shared/components';
import {PopularTagsComponent} from './../../../shared/components';

@Component({
  selector: 'mc-your-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
  templateUrl: './yourFeed.component.html',
  styleUrl: './yourFeed.component.scss',
})
export class YourFeedComponent {
  url = '/articles/feed';
}
