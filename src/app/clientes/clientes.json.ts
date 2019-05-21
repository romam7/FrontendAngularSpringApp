import { Cliente } from './cliente';
import { Region } from './region';

export const CLIENTES: Cliente[] = [
    { id: 1, nombre: 'Adriana', apellido: 'Trejo', email: 'adri@mail.com', fechaCreacion: '07/06/2012', foto: "", region: new Region() },
    { id: 2, nombre: 'Colon', apellido: 'Terrell', email: 'colonterrell@dogtown.com', fechaCreacion: '25/06/2016',  foto: "", region: new Region() },
    { id: 3, nombre: 'Yates', apellido: 'Barrett', email: 'yatesbarrett@dogtown.com', fechaCreacion: '23/02/2014',  foto: "", region: new Region() },
    { id: 4, nombre: 'Moody', apellido: 'Dunlap', email: 'moodydunlap@dogtown.com', fechaCreacion: '03/12/2016',  foto: "", region: new Region() },
    { id: 5, nombre: 'Audra', apellido: 'Cunningham', email: 'audracunningham@dogtown.com', fechaCreacion: '07/01/2017',  foto: "", region: new Region() },
    { id: 6, nombre: 'Nielsen', apellido: 'Hartman', email: 'nielsenhartman@dogtown.com', fechaCreacion: '20/12/2014',  foto: "", region: new Region() }
];
