import { apiGet, apiPost } from "../util/serviceHttp.js";


export const crearCliente = async (cedula, nombre, apellido, telefono, direccion, fechaExp, rol="usuario") => {

    const data = {
        nombre,
        apellido,
        cedula,
        telefono,
        direccion,
        rol,
        fechaExp
    }

    return await apiPost('http://localhost:5000/api/registrarUsuario', data);


}

export const getByCedula = async (cedula) => {


    const response = await apiGet(`http://localhost:5000/api/getuser?cedula=${cedula}`)

    if (!response.ok) {
       alert("el cliente no existe");
    }
    const data = await response.json();
    console.log(data);
    
    return data;

}