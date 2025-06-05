import { apiPost } from "../util/serviceHttp.js";


export const crearContrato = async(data) =>{

    return await apiPost('http://localhost:5000/api/registrarContrato', data);

}
export const actualizarContrato = async(data) =>{

    return await apiPost('http://localhost:5000/api/actualizarEstado', data);

}

export const getById = async (id)=>{

    return await apiPost(`http://localhost:5000/api/getcontrato?id_contrato=${id}`);

}