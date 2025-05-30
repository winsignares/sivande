import { crearProducto } from "../api/producto";



// Esta función recoge los valores del formulario y los envía a crearProducto
function producto() {
    const descripcion = document.getElementById('desc').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const kilates = parseFloat(document.getElementById('kilates').value);
    const stock = parseInt(document.getElementById('stock').value);

    // Validaciones básicas
    if (!descripcion || isNaN(precio) || isNaN(peso) || isNaN(kilates) || isNaN(stock)) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }


    try {

      const resp =  crearProducto(descripcion, precio, peso, kilates, stock);
        console.log(resp);
      document.getElementById("successModal").classList.remove("hidden");
        
    } catch (error) {
        
        console.error("Error al crear el producto:", error);
        alert("Error al crear el producto. Por favor, inténtalo de nuevo más tarde.");
    }

}
