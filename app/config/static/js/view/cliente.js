import { crearCliente } from "../api/cliente";

// Esta función recoge los valores del formulario y los envía a crearCliente
function cliente() {
    const cedula = document.getElementById('cedula').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();

    // Validaciones básicas
    if (!cedula || !nombre || !telefono || !direccion) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    try {
        const resp = crearCliente(cedula, nombre, telefono, direccion);
        console.log(resp);
        document.getElementById("successModal").classList.remove("hidden");

        // Limpiar campos
        document.getElementById('cedula').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('cedula').focus();

    } catch (error) {
        console.error("Error al crear el cliente:", error);
        alert("Error al crear el cliente. Por favor, inténtalo de nuevo más tarde.");
    }
}
