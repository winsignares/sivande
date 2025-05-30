import { apiPost } from "../util/serviceHttp";


export const crearCliente = async (nombre, apellido, email, telefono, direccion) => {

    const data = {
        nombre,
        apellido,
        email,
        telefono,
        direccion
    }

    return await apiPost('http://localhost:3000/api/registrarUsuario', data);


}