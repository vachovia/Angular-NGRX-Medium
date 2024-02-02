import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { TopBarComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
