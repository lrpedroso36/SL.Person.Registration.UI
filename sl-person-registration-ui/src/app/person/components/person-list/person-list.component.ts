import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonList } from '../../models/person-list.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, TagModule, ButtonModule, TooltipModule, IconFieldModule, InputIconModule ],
  providers: [MessageService],
})
export class PersonListComponent implements OnInit {
  items = signal<PersonList[]>([]);
  selectedPerson!: PersonList;

  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this.getItems();
  }

  filterGlobal($event: any){

  }

  onRowSelect(event: any) {
    this._messageService.add({
      severity: 'info',
      summary: 'Pessoa selecionada',
      detail: event.data.name,
    });
  }

  onRowUnselect(event: any) {
    this._messageService.add({
      severity: 'info',
      summary: 'Pessoa desmarcada',
      detail: event.data.name,
    });
  }

  private getItems(): void {
    this.items = signal<PersonList[]>([
      { name: 'João Silva', documentNumber: '12345678900', types: ['Tarefeiro', 'Palestrante'] },
      { name: 'Maria Oliveira', documentNumber: '98765432100', types: ['Assistido'] },
      {
        name: 'Pedro Santos',
        documentNumber: '45678912300',
        types: ['Palestrante', 'Entrevistador'],
      },
      { name: 'Ana Souza', documentNumber: '32165498700', types: ['Entrevistador'] },
      { name: 'Carlos Lima', documentNumber: '74185296300', types: ['Tarefeiro', 'Assistido'] },
      { name: 'Fernanda Costa', documentNumber: '85296374100', types: ['Assistido', 'Todos'] },
      { name: 'Rodrigo Alves', documentNumber: '96325874100', types: ['Todos', 'Palestrante'] },
      {
        name: 'Juliana Melo',
        documentNumber: '15935748600',
        types: ['Palestrante', 'Tarefeiro', 'Entrevistador'],
      },
      { name: 'Bruno Rocha', documentNumber: '35715948600', types: ['Entrevistador', 'Assistido'] },
      {
        name: 'Patrícia Dias',
        documentNumber: '25836914700',
        types: ['Tarefeiro', 'Assistido', 'Palestrante'],
      },
    ]);
  }
}
