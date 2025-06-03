import { apiPost } from "../util/serviceHttp.js"


export const apiLogin = async (cedula, contraseña) => {

    const data = {
        cedula,
        contraseña
    }

    
   return await apiPost('http://localhost:5000/api/login' ,data)

    ;
}