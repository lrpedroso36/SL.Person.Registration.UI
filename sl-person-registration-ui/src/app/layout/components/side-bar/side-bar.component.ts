import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports: [Menu, ImageModule],
})
export class SideBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.getMenuItems();
  }

  private getMenuItems(): void {
    this.items = [
      {
        label: 'CADASTROS',
        items: [
          {
            label: 'Pessoas',
            icon: 'pi pi-user',
            routerLink: '/person/list'
          },
          {
            label: 'Entrevistas',
            icon: 'pi pi-heart',
          },
          {
            label: 'Escalas',
            icon: 'pi pi-calendar-clock',
          },
        ],
      },
      {
        label: 'CONTROLES',
        items: [
          {
            label: 'Presença tratamento',
            icon: 'pi pi-file-check',
          },
          {
            label: 'Presença tarefeiro',
            icon: 'pi pi-check-square',
          },
        ],
      },
    ];
  }
}
