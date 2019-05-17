import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo = 'Registrar cliente';
  private errores: string[];

  constructor(private clientService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    const idTag = 'id';
    this.activatedRoute.params.subscribe(params => {
      const id = params[idTag];
      if (id) {
        this.clientService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        );
      }
    });
  }

  create(): void {
    this.clientService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['clientes']);
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  regresar() {
    this.router.navigate(['clientes']);
  }

  update(): void {
    this.clientService.updateCliente(this.cliente).subscribe(
      json => {
        this.router.navigate(['clientes']);
        swal.fire('Cliente actualizado', `Cliente ${json.cliente.nombre} actualizado con éxito!`, 'success');
      }
    );
  }
}
