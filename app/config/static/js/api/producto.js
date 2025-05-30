import { apiPost } from "../util/serviceHttp";


export const crearProducto = async (descripcion,precio,peso,kilates, stock) => {

    const data = {
        
        descripcion,
        precio,
        peso,
        kilates,
        stock

    }

    
   return await apiPost('http://localhost:3000/api/registrarProducto' ,data)

    ;
}