export function redirectToMenu() {
    window.location.href = "menu";
}

function redirectToVista(vista) {
    window.location.href = vista;

    console.log("RUTA : "+window.location.href);
    
}

function resetForm(formClass) {
    document.querySelector(`.${formClass}`).reset();
}


function addArticleRow() {
    const tbody = document.querySelector('tbody');
    const rowCount = tbody.rows.length + 1;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="article-input"></td>
        <td><input type="text" class="article-input"></td>
        <td><input type="number" class="article-input" step="0.01"></td>
    `;
    tbody.appendChild(row);
}

function addProductRow() {
    const tbody = document.querySelector('table tbody');
    const rowCount = tbody.rows.length + 1;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="product-input"></td>
        <td><input type="number" class="product-input" value="1"></td>
        <td><input type="number" class="product-input"></td>
        <td><input type="number" class="product-input" readonly></td>
        <td><input type="number" class="product-input" step="0.01"></td>
        <td><input type="text" class="product-input"></td>
    `;
    tbody.appendChild(row);
    updateTotal(row);
}

function updateTotal(row) {
    const cantidadInput = row.querySelector('td:nth-child(3) input');
    const precioInput = row.querySelector('td:nth-child(4) input');
    const totalInput = row.querySelector('td:nth-child(5) input');

    function calculateTotal() {
        const cantidad = parseFloat(cantidadInput.value) || 0;
        const precio = parseFloat(precioInput.value) || 0;
        totalInput.value = (cantidad * precio).toFixed(2);
    }

    cantidadInput.addEventListener('input', calculateTotal);
    precioInput.addEventListener('input', calculateTotal);
    calculateTotal();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('table tbody tr').forEach(row => updateTotal(row));
});