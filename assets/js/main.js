const menu = [1, 2, 3]
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