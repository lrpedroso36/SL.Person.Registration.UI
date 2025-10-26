import { Injectable, signal } from '@angular/core';

@Injectable()
export class PersonRegistrationService {
  private _title = signal<string>('');

  title = this._title.asReadonly();

  getTitle(id: string | null): void {
    this._title.set(id ? 'Editar cadastro' : 'Novo cadastro');
  }
}
