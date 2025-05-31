import { crearContrato } from "../api/contrato";

document.querySelector('.guardar').addEventListener('click', function (e) {
    e.preventDefault();

    const cedula = document.getElementById('cedula').value;
    const idCliente = parseInt(cedula); // asumiendo que la cédula es el ID del cliente

    const data = {
        id_cliente: idCliente,
        tipo_contrato: "empeño", // valor fijo
        fecha: document.getElementById('fechaContrato').value,
        fecha_vencimiento: document.getElementById('venceContrato').value,
        estado: document.getElementById('estadoContrato').value,
        interes: parseFloat(document.getElementById('porcentaje').value),
        valor_contrato: parseFloat(document.getElementById('valorContrato').value),
        valor_retiro: parseFloat(document.getElementById('valorRestitucion').value),
        productos: []
    };

    const filas = document.querySelectorAll('.producto-row');
    filas.forEach(fila => {
        const idProducto = parseInt(fila.querySelector('input[name="id_producto"]').value);
        const peso = parseFloat(fila.querySelector('input[name="peso"]').value);

        if (!isNaN(idProducto) && !isNaN(peso)) {
            data.productos.push({
                id_producto: idProducto,
                cantidad: 1 // solo se registra una unidad por fila
                
            });
        }
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
