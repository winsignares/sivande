

import { apiGet } from "../util/serviceHttp.js";


import { llenarTablaContratos } from "./contrato.js";



const findContratosVigentes = async () => {
    try {
        const response = await apiGet("http://localhost:5000/api/contratos");
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching contratos vigentes:", error);
        throw error;
    }
}	

const findByIdContrato = async (id_contrato) => {
    try {
        const response = await apiGet(`http://localhost:5000/api/getcontrato?id_contrato=${id_contrato}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching contrato by ID:", error);
        throw error;
    }
}


const llenarTablaContratosVigentes = async () => {


    console.log("llenando tabla contratos vigentes...");
    

    try {
        const contratos = await findContratosVigentes();

        if (!contratos || contratos.length === 0) {
            console.warn("No hay contratos vigentes para mostrar.");
            return;
        }

        contratos = contratos.filter(contrato => contrato.tipo_contrato== "empeño" ); 

        const body =document.getElementById("contratos-list")
        body.innerHTML = ""; // Limpiar el contenido previo de la tabla
        
        contratos.forEach(contrato =>{ 

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

// document.querySelectorAll(".view-details").forEach(button => {
//     button.addEventListener("click", (event) => {
        
        
//         id_contrato = event.target.closest("tr").querySelector("td:first-child").textContent;
//         console.log("ID del contrato:", id_contrato);
        
//         const contrato = findByIdContrato(id_contrato);
        
//         // llenar los campos del formulario con los datos del contrato
//         redirectToVista("contratos"); 
//         llenarTablaContratos(contrato);


//     });
// })

document.addEventListener("click", async(event) => {
    
    if (event.target.classList.contains("view-details")) {
        const id_contrato = event.target.closest("tr").querySelector("td:first-child").textContent;
        console.log("ID del contrato:", id_contrato);

        const contrato = await findByIdContrato(id_contrato);

        window.location.href = `contratos?id=${id_contrato}`;


    }
});







