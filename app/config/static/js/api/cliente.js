import { apiGet, apiPost } from "../util/serviceHttp.js";


export const crearCliente = async (cedula, nombre, apellido, telefono, direccion, fecha_expedicion, rol="usuario") => {

    const data = {
        nombre,
        apellido,
        cedula,
        telefono,
        direccion,
        rol,
        fecha_expedicion
    }

    return await apiPost('http://localhost:5000/api/registrarUsuario', data);


}

export const getByCedula = async (cedula) => {


    const response = await apiGet(`http://localhost:5000/api/getuser?cedula=${cedula}`)

    
    
    return response;

}