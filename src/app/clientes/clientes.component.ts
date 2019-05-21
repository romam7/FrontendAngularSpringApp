import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador: any;
  clienteSeccionado: Cliente;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    // ParamMap es un observador que detecta cambios de pagina
    this.activatedRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page');
        if (!page) {
          page = 0;
        }
        this.clienteService.getClientes(page).subscribe(
          response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          }
        );
      }
    );

    this.modalService.notificarUpload.subscribe(
      cliente => {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.id === clienteOriginal.id) {
            clienteOriginal.foto = cliente.foto;
          }

          return clienteOriginal;
        });
      }
    );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Confirmar eliminación',
      text: `¿Estás seguro que desear eliminar a ${cliente.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            );
          }
        );
      }
    });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeccionado = cliente;
    this.modalService.abrirModal();
  }
}
