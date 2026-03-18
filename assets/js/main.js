const menu = [1, 2, 3]

const UrlCombos = "/Entregable1-TaboadaGabriel/assets/db/combos.json"
const UrlVerduras = "/Entregable1-TaboadaGabriel/assets/db/verduras.json"
const UrlToppings = "/Entregable1-TaboadaGabriel/assets/db/toppings.json"
// const UrlCombos = "/assets/db/combos.json"
// const UrlVerduras = "/assets/db/verduras.json"
// const UrlToppings = "/assets/db/toppings.json"

function borrarContenido(SeccionABorrar) {
    const borrarSeccion = document.getElementById(SeccionABorrar)
    if (borrarSeccion) {  // ← AGREGAR ESTA VERIFICACIÓN
        borrarSeccion.innerHTML = ""
    }
}
function msjToastify(msj,color){
    Toastify({
        text: msj,
        duration: 1500,
        destination: "#",
        newWindow: false,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: color,
        },
        onClick: function () { }
    }).showToast();
}