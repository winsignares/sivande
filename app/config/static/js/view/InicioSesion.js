import { apiLogin } from "../api/auth";
import { redirectToMenu } from "../app";


const form = Document.getElementById('formulario-inicio-sesion');

const login = () =>{

    const cedula = form.cedula.value;
    const contraseña = form.contrasena.value;

    if (usuario && contrasena) {


        try{
            // Llamada a la API para iniciar sesión
            console.log(apiLogin(cedula, contraseña)); 
            redirectToMenu();

        } catch(error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
            return;
        }
       
    } else {
        alert('Por favor, ingrese usuario y contraseña.');
    }

}