import { getByCedula } from "../api/cliente.js";
import { crearContrato } from "../api/contrato.js";

import { apiGet } from "../util/serviceHttp.js";


const getProductos = async (id_contrato) => {

    const response = await apiGet(`http://localhost:5000/productos/contrato/${id_contrato}`);


    const data = await response.json();
    return data;

}


document.addEventListener("DOMContentLoaded", () => {

document.getElementById("fechaContrato").value = new Date().toISOString().split('T')[0];
document.getElementById("venceContrato").value = new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0];

})


const form = document.getElementById("contratos-form");


document.getElementById("valorContrato").addEventListener("input", (e) => {

    // console.log("Valor del contrato:", e.target.value);
    
    const valorContrato = parseFloat(document.getElementById("valorContrato").value);
    const porcentaje = parseFloat(document.getElementById("porcentaje").value);

    if(porcentaje < 0 || isNaN(porcentaje)) {
        alert("Porcentaje de interés no puede ser negativo o inválido.");
        return;
    }

    console.log(valorContrato);
    console.log(porcentaje);
    
    const valorRestitucion = valorContrato + (valorContrato * (porcentaje / 100));
    console.log(valorRestitucion);
    document.getElementById("valorRestitucion").value = valorRestitucion;
})

form.addEventListener

form.addEventListener('submit', function (e) {
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


function resetContratoForm() {
    document.querySelector('.contratos-form').reset();
}

export const llenarTablaContratos = async (contrato ) =>{

    const responseCliente = await getByCedula(contrato.id_cliente);
    
    const cliente = await responseCliente.json();
    
    //primero llenamod los datos del cliente
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
