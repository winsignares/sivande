import { getByCedula } from "../api/cliente.js";
import { apiPost } from "../util/serviceHttp";

const form = document.getElementById("ventas-form");

document.getElementById("fechaVenta").value = new Date().toISOString().split('T')[0]; // Establece la fecha actual


form.cedula.addEventListener("keydown", async()=>{

    if(e.key === "Enter"){

        e.preventDefault(); // Evita que el formulario se envíe
        const cedula = form.cedula.value.trim();
        if (!cedula) return;

        try {
            const response = await getByCedula(cedula);
            const cliente = await response.json();

            if (!cliente) {
                alert("Cliente no encontrado.");
                return;
            }

            // Rellenar campos con los datos obtenidos
            form.nombres.value = `${cliente.nombre} ${cliente.apellido}` || "";
            form.telefono.value = cliente.telefono || "";
            form.direccion.value = cliente.direccion || "";

        } catch (error) {
            console.error("Error al buscar el cliente:", error);
            alert("Hubo un error al consultar la cédula. Intenta de nuevo.");
        }

    }




})



const crear = async ()=>{

    const cedula = form.cedula.value.trim();
    const id_cliente = parseInt(cedula); 

    const data = {
        id_cliente: id_cliente,
        tipo_contrato: "venta", // valor fijo
        fecha: form.fechaVenta.value,
        fecha_vencimiento: null, // No se usa en ventas
        estado: "activo", // valor fijo
        interes: 0,
        valor_contrato: 0,
        valor_retiro: 0,
        productos: []
    };
    let total_calculado = 0;
    const filas = document.querySelectorAll('.producto-row');
    filas.forEach(fila => {
        const descripcion = fila.querySelector('.desc').value;
        const cantidad = parseInt(fila.querySelector('.cant').value);
        const precio = parseFloat(fila.querySelector('.precio').value);
        const kilates = parseFloat(fila.querySelector('.kilates').value);

        const peso = parseFloat(fila.querySelector('.peso').value);

        total_calculado += cantidad * precio;

        if (descripcion && cantidad > 0 && precio > 0) {
            data.productos.push({
                descripcion: descripcion,
                cantidad: cantidad,
                precio: precio,
                kilates: isNaN(kilates) ? 0 : kilates,
                peso: isNaN(peso) ? 0 : peso
            });
        }

      

      
    });

    try {

        const response = await apiPost('http://localhost:5000/api/registrarContrato', data);
        if (response.ok) {
            const result = await response.json();
            console.log("Contrato creado exitosamente:", result);

            const texto = `Contrato de venta creado exitosamente.\n\nTotal: $${total_calculado.toFixed(2)}`;
            document.getElementById("successMessage").textContent = texto;

            document.getElementById("successModal").classList.remove("hidden")
            form.reset(); // Resetea el formulario
            
        }

     } catch (error) {
         log.error("Error al crear el contrato:", error);
     }

}