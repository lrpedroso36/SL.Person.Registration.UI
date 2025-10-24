import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true,
  imports: [DrawerModule, ButtonModule, AvatarModule],
})
export class MenuComponent {
  visible: boolean = false;

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback($event: any): void {
    this.drawerRef.close($event);
  }


}
