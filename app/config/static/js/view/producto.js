import { crearProducto } from "../api/producto.js";

import { findById } from "../api/producto.js";


// Esta función recoge los valores del formulario y los envía a crearProducto
export function producto() {
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

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#productosTable tbody");

    tableBody.addEventListener("keydown", async function (e) {
        if (e.target.classList.contains("id_producto") && e.key === "Enter") {
            e.preventDefault();

            const row = e.target.closest("tr");
            const idInput = row.querySelector(".id_producto");
            const descInput = row.querySelector(".desc");
            const kilatesInput = row.querySelector(".kilates");
            const pesoInput = row.querySelector(".peso");
            const stockInput = row.querySelector(".stock");

            const id = idInput.value.trim();
            if (!id) return;

            try {
                const producto = await findById(id);

                if (!producto) {
                    alert("Producto no encontrado.");
                    return;
                }

                // Rellenar la fila actual
                descInput.value = producto.descripcion || "";
                kilatesInput.value = producto.kilates || "";
                pesoInput.value = producto.peso || "";
                stockInput.value = producto.stock || "";

                // Crear nueva fila vacía
                const nuevaFila = document.createElement("tr");
                nuevaFila.classList.add("producto-row");
                nuevaFila.innerHTML = `
                    <td><input type="text" class="id_producto" size="4"></td>
                    <td><input type="text" class="desc"></td>
                    <td><input type="text" class="kilates"></td>
                    <td><input type="number" class="peso" step="0.01"></td>
                    <td><input type="number" class="stock" step="0.01"></td>
                `;
                tableBody.appendChild(nuevaFila);

                // Enfocar el ID de la nueva fila
                nuevaFila.querySelector(".id_producto").focus();

            } catch (error) {
                console.error("Error al buscar producto:", error);
                alert("Hubo un error al buscar el producto.");
            }
        }
    });
});



