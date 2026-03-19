function renderAdmin() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos"))
    if(pedidos){
        const contenedor = document.getElementById("contenedor-pedidos")
        contenedor.innerHTML = ""
        const header = document.createElement("div")
        header.className = "card-pedido card-pedido-header d-flex flex-row"
        header.innerHTML = `
            <span class="pedido-id">N° Pedido</span>
            <span class="nombre">Cliente</span>
            <span class="precio  me-3">Importe</span>
            <span class="estado">Estado</span>
        `
        contenedor.appendChild(header)

        pedidos.forEach(pedido => {
            const card = document.createElement("div")
            card.className = "card-pedido d-flex flex-row "
            card.innerHTML = `
                <span class="pedido-nombre">${pedido.id}</span>
                <span class="pedido-nombre">${pedido.nombre} ${pedido.apellido}</span>
                <span class="pedido-precio me-3">$ ${pedido.precio}</span>
                <button class="btn-editar " id=${pedido.id} ><span class="pedido-estado estado-${pedido.estado === 'En preparación' ? 'preparacion' : pedido.estado.toLowerCase()}">${pedido.estado}</span>
                </button> 
            `
            contenedor.appendChild(card)
            const botonEditar = document.querySelectorAll(".btn-editar")
            botonEditar.forEach(e => {
                e.onclick = () => {
                        editarEstado(e.id,pedidos)
                    }
            })
        })
    }else{
        renderAdminVacio()
    }


}
function renderAdminVacio() {
    console.log("entra al admin vacio")
    const contenedor = document.getElementById("contenedor-pedidos")
    contenedor.innerHTML = ""

    const card = document.createElement("div")
    card.id = "admin-vacio"
    card.className = "carrito-vacio "
    card.innerHTML = `
                        <div class="carrito-vacio-icono">
                            <i class="fas fa-box-open"></i>
                        </div>

                        <h3>Tu base de datos está vacía</h3>
                        <p>Agrega un combo para empezar tu pedido</p>

                        <a href="../index.html" class="btn btn-warning mt-2">
                            <i class="fas fa-arrow-left"></i> Ir al menú
                        </a>
                    `
    contenedor.appendChild(card)

}
function editarEstado(id, pedidos) {
    const combo = pedidos.find(combo => combo.id == id)
    Swal.fire({
        title: `Editar estado <strong>#${combo.id}</strong>`,
        html: `
    <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
        
        <label class="metodo-pago-opcion">
            <input type="radio" name="estadoPedido" value="En preparación" ${combo.estado === 'En preparación' ? 'checked' : ''}>
            <div class="metodo-pago-card">
                <div class="metodo-pago-circulo" style="background:#FCBF02;">
                    <i class="fas fa-clock" style="color:#1e2939;"></i>
                </div>
                <div class="metodo-pago-info">
                    <span class="metodo-pago-nombre">En preparación</span>
                </div>
                <div class="metodo-pago-check"><i class="fas fa-check"></i></div>
            </div>
        </label>

        <label class="metodo-pago-opcion">
            <input type="radio" name="estadoPedido" value="Entregado" ${combo.estado === 'Entregado' ? 'checked' : ''}>
            <div class="metodo-pago-card">
                <div class="metodo-pago-circulo" style="background:#28a745;">
                    <i class="fas fa-check" style="color:white;"></i>
                </div>
                <div class="metodo-pago-info">
                    <span class="metodo-pago-nombre">Entregado</span>
                </div>
                <div class="metodo-pago-check"><i class="fas fa-check"></i></div>
            </div>
        </label>

        <label class="metodo-pago-opcion">
            <input type="radio" name="estadoPedido" value="Cancelado" ${combo.estado === 'Cancelado' ? 'checked' : ''}>
            <div class="metodo-pago-card">
                <div class="metodo-pago-circulo" style="background:#dc3545;">
                    <i class="fas fa-times" style="color:white;"></i>
                </div>
                <div class="metodo-pago-info">
                    <span class="metodo-pago-nombre">Cancelado</span>
                </div>
                <div class="metodo-pago-check"><i class="fas fa-check"></i></div>
            </div>
        </label>

    </div>
`,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const estadoSeleccionado = document.querySelector('input[name="estadoPedido"]:checked')
            if (estadoSeleccionado) {
                combo.estado = estadoSeleccionado.value
                localStorage.setItem("pedidos", JSON.stringify(pedidos))
                listenerEstado(id,pedidos)
            }
        }
    })
}
function listenerEstado(id,pedidos){
    const combo = pedidos.find(combo => combo.id == id)
    const contenedorBoton = document.getElementById(id)
    contenedorBoton.innerHTML=""
    contenedorBoton.innerHTML=`
                                <span class="pedido-estado estado-${combo.estado === 'En preparación' ? 'preparacion' : combo.estado.toLowerCase()}">${combo.estado}</span>
                                `
    const msj ="Estado actualizado"
    const color = "linear-gradient(to right, #00b09b, #96c93d)"
    msjToastify(msj,color)
}
function msjToastify(msj,color){
    Toastify({
//        text: "Combo eliminado",
        text: msj,
        duration: 1500,
        destination: "#",
        newWindow: false,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            //background: "linear-gradient(to right, #e40014, #ff6568)",
            background: color,
        },
        onClick: function () { }
    }).showToast();
}
renderAdmin()
