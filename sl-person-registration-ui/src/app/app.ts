import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./modules/menu/menu";

@Component({
  selector: 'app-root',
  imports: [MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sl-person-registration-ui');
}
