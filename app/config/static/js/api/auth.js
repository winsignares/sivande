import { apiPost } from "../util/serviceHttp.js"


export const apiLogin = async (cedula, contraseña) => {

    const data = {
        cedula,
        contraseña,
    }

    const response = await apiPost('http://localhost:5000/api/login', data);

    return response;


    ;
}