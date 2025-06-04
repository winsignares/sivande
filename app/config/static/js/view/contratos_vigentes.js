

import { apiGet } from "../util/serviceHttp.js";


const findContratosVigentes = async (data) => {
    try {
        const response = await apiGet("http://localhost:5000/api/contratos");
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching contratos vigentes:", error);
        throw error;
    }
}	


const llenarTablaContratosVigentes = async () => {
    try {
        const contratos = await findContratosVigentes();

        if (!contratos || contratos.length === 0) {
            console.warn("No hay contratos vigentes para mostrar.");
            return;
        }



        const body =document.getElementById("contratos-list")
        body = "";
        
        contratos.foreach(contrato =>{ 

            const row = `

                    <tr>
                        <td>${contrato.id}</td>
                        <td>${contrato.fecha}</td>
                        <td>${contrato.fecha_vencimiento}</td>
                        <td>${contrato.valor_contrato}</td>
                        <td><button class="view-details">View Details</button></td>
                    </tr>
            `
            body.innerHTML += row;
            

        })



        
    } catch (error) {
        console.error("Error llenando la tabla de contratos vigentes:", error);
    }
}

llenarTablaContratosVigentes();






