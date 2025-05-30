import { apiPost } from "../util/serviceHttp";


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

    return await apiPost('http://localhost:3000/api/registrarUsuario', data);


}