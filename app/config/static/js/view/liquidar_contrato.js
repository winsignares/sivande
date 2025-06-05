import { actualizarContrato } from "../api/contrato.js";


const constratoStr = localStorage.getItem('contrato');
const contrato = JSON.parse(constratoStr);



const llenarCampos = () => {
    const meses_vencidos = document.getElementById("mesesVencidos")
    const valor_mese_vencido = document.getElementById("valorMesVencido")
    const valor_contrato = document.getElementById("valorContrato")
    const total_interes = document.getElementById("totalIntereses")
    const valor_restitucion = document.getElementById("valorRestitucion")
    
    const text = document.getElementById("content_text");
    
    const fecha_contrato = new Date(contrato.fecha);
    const fecha_actual = new Date();

    
  // Diferencia total en días
  const diffTiempo = fecha_actual - fecha_contrato;
  const diffDiasTotales = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));

    const meses = Math.floor(diffDiasTotales / 30);
    const dias = diffDiasTotales % 30;

    let resultado = "Realizado hace";
  if (meses > 0) resultado += ` ${meses} mes${meses > 1 ? 'es' : ''}`;
  if (dias > 0) resultado += `${meses > 0 ? ' y' : ''} ${dias} día${dias > 1 ? 's' : ''}`;
  if (meses === 0 && dias === 0) resultado = "Realizado hoy";

  text.innerHTML = `Contrato (${resultado})`;

  if (meses==0) {
    
      meses_vencidos.value = 1;

  } else{
        meses_vencidos.value = meses;
  }
    total_interes.value = (contrato.valor_contrato * (contrato.interes / 100)) * meses_vencidos.value;
    valor_mese_vencido.value = contrato.valor_contrato * (contrato.interes / 100);

    valor_contrato.value = contrato.valor_contrato;


    valor_restitucion.value = parseInt(valor_contrato.value)  + parseInt(total_interes.value);

}

llenarCampos();


const form = document.getElementById("liquidacion-form")

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        id: contrato.id,
        estado: "Liquidado",
    }

    const response = await actualizarContrato(data);
    const contratoActualizado = response.json();

    if (contratoActualizado) {
        document.getElementById("successModal").classList.remove("hidden");
        window.location.href = "contratos";
        localStorage.removeItem('contrato');
        localStorage.setItem('contratoLiquidado', JSON.stringify(contratoActualizado));
        form.reset();
        text.innerHTML = "";
        window.location.href = "contratos";
    } else {
        alert("Error al liquidar el contrato");
    }


})