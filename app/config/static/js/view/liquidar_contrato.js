

const constratoStr = localStorage.getItem('contrato');
const contrato = JSON.parse(constratoStr);

const meses_vencidos = document.getElementById("mesesVencidos")
const valor_mese_vencido = document.getElementById("valorMesVencido")
const valor_contrato = document.getElementById("valorContrato")
const total_interes = document.getElementById("totalIntereses")
const valor_restitucion = document.getElementById("valorRestitucion")

const text = document.getElementById("content_text");


const llenarCampos = () => {

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

  text.innerHTML = `Contrato realizado el ${fecha_contrato.toLocaleDateString()} (${resultado})`;

    meses_vencidos.innerHTML = meses;
    valor_mese_vencido.innerHTML = contrato.valor_contrato * (contrato.interes / 100);

    valor_contrato.innerHTML = contrato.valor_contrato;
    total_interes.innerHTML = (contrato.valor_contrato * (contrato.interes / 100)) * meses;

    valor_restitucion.innerHTML = contrato.valor_retiro;

}

llenarCampos();


