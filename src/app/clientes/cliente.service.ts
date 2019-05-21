import { Injectable } from '@angular/core';
import { Cliente } from './cliente.js';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Region } from './region.js';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
    if(e.status === 401) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }


  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.url}/regiones`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.url + '/page/' + page).pipe(
      map( (response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.fechaCreacion = formatDate(cliente.fechaCreacion, 'EEEE dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente, { headers: this.httpHeader }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status === 400) {
          return throwError(e);
        }

        Swal.fire('Error al registrar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.url}/${cliente.id}`, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status === 400) {
          return throwError(e);
        }

        Swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url}/${id}`, { headers: this.httpHeader }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const request = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(request).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
