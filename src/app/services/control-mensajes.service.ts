import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlMensajesService {

  constructor() { }

  getMensaje(codigo: string){
      switch (codigo)
      {
        //ERRORES DE FIREBASEAUTH: REGISTRO/LOGIN
        case 'auth/email-already-in-use':
          return 'El email especificado ya se encuentra en uso.';
          break;
        case 'auth/auth/weak-password':
          return 'La contraseña especificada es débil.';
          break;
        case 'auth/invalid-email':
          return 'El email especificado no es válido.';
          break;
        case 'auth/user-disabled':
          return 'La cuenta indicada se encuentra actualmente deshabilitada.';
          break;
        case 'auth/user-not-found':
          return 'No existe una cuenta asociada al email especificado.';
          break;
        case 'auth/wrong-password':
          return 'La contraseña indicada no es correcta.';
          break;
        
        //REGISTRO CON ÉXITO
        case 'auth/register-ok':
            return 'Registro realizado con éxito.';
            break;
        case 'auth/recover-pass':
          return 'Se ha enviado un correo para poder resetear tu contraseña.';
          break;
          
        //LISTA DE LA COMPRA
        case 'lista/delete-lista':
            return 'La lista se ha eliminado con éxito.';
            break;
        case 'lista/add-lista':
              return 'La lista se ha creado con éxito.';
              break;

        case 'lista/add-item-lista':
          return 'El item se ha agregado a la lista con éxito.';
          break;
        
          case 'lista/delete-item-lista':
            return 'El item se ha eliminado de la lista con éxito.';
            break;

        //ERROR GENÉRICO. CÓDIGO INDICADO NO EXISTENTE
        default:
          return 'Se ha producido un error. Contacte con un administrador.'
          break;
      }
  }
}
