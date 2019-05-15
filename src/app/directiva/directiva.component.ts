import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCursos: string[] = ['TypeScript', 'JavaScript', 'C#', 'Java'];

  habilitar = true;
  texto = 'Ocultar';

  constructor() { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ?  false : true;
    this.habilitar === true ? this.texto = 'Ocultar' : this.texto = 'Mostrar';
  }

}
