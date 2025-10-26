import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonList } from '../../models/person-list.model';
import { MessageService } from 'primeng/api';
import { PERSON_IMPORTS } from './person.list.references';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  standalone: true,
  imports: [...PERSON_IMPORTS],
  providers: [MessageService],
})
export class PersonListComponent implements OnInit {
  items = signal<PersonList[]>([]);
  selectedPerson!: PersonList;

  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this.getItems();
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
      { id: '1', name: 'João Silva', documentNumber: '12345678900', types: ['Tarefeiro', 'Palestrante'] },
      { id: '2', name: 'Maria Oliveira', documentNumber: '98765432100', types: ['Assistido'] },
      {
        id: '3',
        name: 'Pedro Santos',
        documentNumber: '45678912300',
        types: ['Palestrante', 'Entrevistador'],
      },
      { id: '4', name: 'Ana Souza', documentNumber: '32165498700', types: ['Entrevistador'] },
      { id: '5', name: 'Carlos Lima', documentNumber: '74185296300', types: ['Tarefeiro', 'Assistido'] },
      { id: '6', name: 'Fernanda Costa', documentNumber: '85296374100', types: ['Assistido', 'Todos'] },
      { id: '7', name: 'Rodrigo Alves', documentNumber: '96325874100', types: ['Todos', 'Palestrante'] },
      {
        id: '8',
        name: 'Juliana Melo',
        documentNumber: '15935748600',
        types: ['Palestrante', 'Tarefeiro', 'Entrevistador'],
      },
      { id: '9', name: 'Bruno Rocha', documentNumber: '35715948600', types: ['Entrevistador', 'Assistido'] },
      {
        id: '10',
        name: 'Patrícia Dias',
        documentNumber: '25836914700',
        types: ['Tarefeiro', 'Assistido', 'Palestrante'],
      },
    ]);
  }
}
