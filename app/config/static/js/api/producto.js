import { apiPost } from "../util/serviceHttp.js";
import { apiGet } from "../util/serviceHttp.js";


export const crearProducto = async (descripcion,precio,peso,kilates, stock) => {

    const data = {
        
        descripcion,
        precio,
        peso,
        kilates,
        stock

    }

    
   return await apiPost('http://localhost:5000/api/registrarProducto' ,data)

    ;
}

export const findById= async(id)=>{

    const response = await apiGet(`http://localhost:5000/api/getproduct?id=${id}`)

    if (!response.ok) {
       alert("el producto no existe");
    }
    const data = await response.json();
    console.log(data);
    
    return data;


}

