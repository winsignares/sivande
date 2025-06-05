import { getByCedula } from "../api/cliente.js";
import { crearContrato, getById } from "../api/contrato.js";
import { redirectToVista } from "../app.js";

import { apiGet } from "../util/serviceHttp.js";


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


const getProductos = async (id_contrato) => {

    const response = await apiGet(`http://localhost:5000/productos/contrato/${id_contrato}`);


    const data = await response.json();
    return data;

}


document.addEventListener("DOMContentLoaded", async() => {

    const fechaContrato = document.getElementById("fechaContrato");
    const venceContrato = document.getElementById("venceContrato");
    if (fechaContrato && venceContrato) {
        fechaContrato.value = new Date().toISOString().split('T')[0];
        venceContrato.value = new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0];
      } 

      const contratos_vigentes = document.getElementById("contratos-vigentes");
      const btn_liquidar = document.getElementById("btn_liquidar");

      if (btn_liquidar) {
        
        btn_liquidar.addEventListener("click", async() => {

            const idContrato = document.getElementById("idContrato").value;
            const response = await getById(idContrato);
            const contrato = await response.json();

            window.localStorage.setItem("contrato", JSON.stringify(contrato));
            redirectToVista("liquidar_contrato");

        })
      }

      if (contratos_vigentes) {

        document.getElementById("contratos-vigentes")?.addEventListener("click", async() => {

            redirectToVista("contratos_vigentes");

        
        })
      }



const form = document.getElementById("contratos-form");

const valorContrato = document.getElementById("valorContrato");

      if (valorContrato) {
        document.getElementById("valorContrato").addEventListener("input", (e) => {

            // console.log("Valor del contrato:", e.target.value);
            
            const valorContrato = parseFloat(document.getElementById("valorContrato").value);
            const porcentaje = parseFloat(document.getElementById("porcentaje").value);
        
            if(porcentaje < 0 || isNaN(porcentaje)) {
                alert("Porcentaje de interés no puede ser negativo o inválido.");
                return;
            }
        
            
            const valorRestitucion = valorContrato + (valorContrato * (porcentaje / 100));
           
            document.getElementById("valorRestitucion").value = valorRestitucion;
        })
        
      }
form?.addEventListener('submit', function (e) {
    e.preventDefault();

    



    const cedula = document.getElementById('cedula').value;
    const idCliente = parseInt(cedula); // asumiendo que la cédula es el ID del cliente

    const data = {
        id_cliente: idCliente,
        tipo_contrato: "empeño", // valor fijo
        fecha: document.getElementById('fechaContrato').value,
        fecha_vencimiento: document.getElementById('venceContrato').value,
        // estado: document.getElementById('estadoContrato').value,
        estado: "activo", // valor fijo
        interes: parseFloat(document.getElementById('porcentaje').value),
        valor_contrato: parseFloat(document.getElementById('valorContrato').value),
        valor_retiro: parseFloat(document.getElementById('valorRestitucion').value),
        productos: []
    };

    const filas = document.querySelectorAll('.producto-row');
    filas.forEach(fila => {



        const descripcion = fila.querySelector('.desc').value;
        const kilates = parseFloat(fila.querySelector('.kilates').value);
        const peso = parseFloat(fila.querySelector('.peso').value);
            data.productos.push({
                descripcion: descripcion,
                kilates: isNaN(kilates) ? 0 : kilates,
                peso: isNaN(peso) ? 0 : peso
                
            });
    });


    try {
        crearContrato(data);
        resetContratoForm()
        document.getElementById("successModal").classList.remove("hidden");
    } catch (error) {

        console.error("Error al crear el contrato:", error);
        alert("Error al crear el contrato. Por favor, inténtelo de nuevo más tarde.");
    }
});


    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        const contrato = await findByIdContrato(id);
        llenarTablaContratos(contrato);
         // Limpiar el ID de la URL sin recargar
         window.history.replaceState({}, document.title, window.location.pathname);
    }


})


function resetContratoForm() {
    document.querySelector('.contratos-form').reset();
}

export const llenarTablaContratos = async (contrato ) =>{

    console.log("llenando tabla contratos...");
    
    const responseCliente = await getByCedula(contrato.id_cliente);
    
    const cliente = await responseCliente.json();
    
    //primero llenamos los datos del cliente
    document.getElementById("cedula").value = cliente.cedula;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("expedicion").value = cliente.fecha_expedicion 

    // luego llenamos los datos del contrato
    document.getElementById("fechaContrato").value = contrato.fecha;
    document.getElementById("venceContrato").value = contrato.fecha_vencimiento;
    document.getElementById("valorContrato").value = contrato.valor_contrato.toFixed(2);
    document.getElementById("porcentaje").value = contrato.interes.toFixed(2);
    document.getElementById("valorRestitucion").value = contrato.valor_retiro.toFixed(2);
    document.getElementById("estadoContrato").value = contrato.estado;
    document.getElementById("idContrato").value = contrato.id;
    

    const productos = await getProductos(contrato.id);
    
    //ahora llenamos los productos del contrato

    const tbody = document.getElementById("productosBody");
    tbody.innerHTML = ''; // Limpiar la tabla antes de agregar los productos
    
    productos.forEach((producto) => {
        const row = document.createElement('tr');
        row.classList.add('producto-row');
        row.innerHTML = `
            <td>${producto.id}</td>
            <td><input type="text" class="desc" value="${producto.descripcion}" required></td>
            <td><input type="number" class="kilates" value="${producto.kilates}" step="0.01" required></td>
            <td><input type="number" class="peso" value="${producto.peso}" step="0.01" required></td>
        `;
        tbody.appendChild(row);
    })
    




}


const contrato = JSON.parse(localStorage.getItem("contratoLiquidado"));

if (contrato && contrato.id) {

    console.log("Contratos:", contrato);
    
    llenarTablaContratos(contrato);
    if( contrato.estado == "Liquidado") {
        document.getElementById("btn_enviar").disabled = true;
        document.getElementById("btn_liquidar").disabled = true;
    }
}
