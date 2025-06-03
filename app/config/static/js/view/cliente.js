import { crearCliente } from "../api/cliente.js";

import { getByCedula } from "../api/cliente.js";



// Esta función recoge los valores del formulario y los envía a crearCliente
async function crear() {
    const cedula = document.getElementById('cedula').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const fechaExp = document.getElementById('exp').value.trim();

    // Validaciones básicas
    if (!cedula || !nombre || !apellido || !telefono || !direccion || !fechaExp) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    try {
        const resp = await crearCliente(cedula, nombre, apellido, telefono, direccion, fechaExp);

        const dataRes = await resp.json();
        
        console.log(dataRes);
        
        document.getElementById("successMessage").textContent = dataRes.mensaje || "Cliente creado exitosamente.";
        document.getElementById("successModal").classList.remove("hidden");

        // Limpiar campos
        document.getElementById('cedula').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('exp').value = '';
        document.getElementById('cedula').focus();

    } catch (error) {
        console.error("Error al crear el cliente:", error);
        // alert("Error al crear el cliente. Por favor, inténtalo de nuevo más tarde.");
    }
}



// // Asignar el evento al input de la cedula, para buscar el cliente al presionar Enter
document.getElementById("cedula").addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // evita que el formulario se envíe

        const cedula = e.target.value.trim();
        if (!cedula) return;

        try {
            const response = await getByCedula(cedula);

            const cliente = await response.json();

            console.log("Cliente : "+cliente);
            
            if (!cliente) {
                alert("Cliente no encontrado.");
                return;
            }

            // Rellenar campos con los datos obtenidos
            document.getElementById("expedicion").value = cliente.fecha_expedicion || "";
            document.getElementById("nombres").value = cliente.nombre || "";
            document.getElementById("apellidos").value = cliente.apellido || "";
            document.getElementById("telefono").value = cliente.telefono || "";
            document.getElementById("direccion").value = cliente.direccion || "";


        } catch (error) {
            console.error("Error al buscar el cliente:", error);
            alert("Hubo un error al consultar la cédula. Intenta de nuevo.");
        }
    }
});

document.getElementById("clientes-form")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    crear(); // Llama a la función cliente para procesar los datos
});