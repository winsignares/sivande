import { crearProducto } from "../api/producto";

import { findById } from "../api/producto.js";


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

      document.getElementById('desc').value = '';
      document.getElementById('precio').value = ''; 
      document.getElementById('peso').value = '';
      document.getElementById('kilates').value = '';
      document.getElementById('stock').value = '';
      document.getElementById('desc').focus();
        
    } catch (error) {
        
        console.error("Error al crear el producto:", error);
        alert("Error al crear el producto. Por favor, inténtalo de nuevo más tarde.");
    }

}

document.getElementById("id_producto").addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
      e.preventDefault(); // Evita enviar formulario

      const id = e.target.value.trim();
      if (!id) return;

      try {
          const producto = await findById(id);

          if (!producto) {
              alert("Producto no encontrado.");
              return;
          }

          // Rellenar campos con los datos del producto
          document.getElementById("desc").value = producto.descripcion || "";
          document.getElementById("kilates").value = producto.kilates || "";
          document.getElementById("peso").value = producto.peso || "";
          document.getElementById("stock").value = producto.stock || "";

      } catch (error) {
          console.error("Error al buscar el producto:", error);
          // alert("Hubo un error al consultar el producto. Intenta de nuevo.");
      }
  }
});
