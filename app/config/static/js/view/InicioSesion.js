import { apiLogin } from "../api/auth.js";
import { redirectToMenu } from "../app.js";




const form = document.getElementById('formulario-inicio-sesion');




const  login = async () =>{


    
    const cedula = form.cedula.value;
    const contraseña = form.contrasena.value;

    if (cedula && contrasena) {


        try{
            // Llamada a la API para iniciar sesión
            const response = await apiLogin(cedula, contraseña)
            
            console.log('Respuesta de la API:', response.status);
            
            if (response.ok) {
                redirectToMenu();
                
            }
            
            

        } catch(error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
            return;
        }
       
    } else {
        alert('Por favor, ingrese usuario y contraseña.');
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});