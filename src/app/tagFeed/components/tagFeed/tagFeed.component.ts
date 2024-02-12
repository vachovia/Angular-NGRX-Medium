import {Component, OnInit} from '@angular/core';
import {BannerComponent, FeedComponent, FeedTogglerComponent} from '../../../shared/components';
import {PopularTagsComponent} from '../../../shared/components';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'mc-tag-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
  templateUrl: './tagFeed.component.html',
  styleUrl: './tagFeed.component.scss',
})
export class TagFeedComponent implements OnInit {
  url: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.url = `/articles?tag=${this.tagName}`;
    });
  }
}
