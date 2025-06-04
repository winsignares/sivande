import { getByCedula } from "../api/cliente.js";


document.getElementById("fechaVenta").value = new Date().toISOString().split('T')[0]; // Establece la fecha actual

const form = document.getElementById("ventas-form");

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