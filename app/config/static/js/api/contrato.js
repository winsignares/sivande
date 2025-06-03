import { apiPost } from "../util/serviceHttp.js";


export const crearContrato = async(data) =>{

    return await apiPost('http://localhost:5000/api/registrarContrato', data);

}