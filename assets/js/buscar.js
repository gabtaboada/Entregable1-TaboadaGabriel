const Menu = [1, 2, 3]

function renderMenu(menuArray) {
    const contenedor = document.getElementById("Menu-contenedor")
    for (const opcionElegida of menuArray) {
        /*       
           }
           menuArray.forEach(opcionElegida => {*/
        const card = document.createElement("div")
        switch (opcionElegida) {
            case 1:
                card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-success">Nuevo Pedido</button>`
                break
            case 2:

                card.innerHTML = `<button id="btn-agregarCombo" class="m-2 btn btn-warning">Agregar combo</button>`
                break
            case 3:
                card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-dark ">Ver estado del pedido</button>`
                break
            default: Swal.fire("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3");
        }
        contenedor.appendChild(card)
        const boton = card.querySelector("button")
        boton.onclick = () => {
            menuOpcion(opcionElegida)
        }

    }//)
    /* ICONO CARRITO */
    const contenedorCarrito = document.getElementById("Menu-carrito")
    const cardCarrito = document.createElement("div")
    cardCarrito.className = "position-relative d-inline-block"
    cardCarrito.innerHTML = `
                            <button id="btn-Carrito" class="btn-carrito btn p-0 border-0   bg-transparent">
                            <img id="btn-Carrito" src="../assets/img/carrito.webp" class="img-VerTop" > </button>
                            <span id="span-Carrito" class="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning d-none">0
                            </span>`
    contenedorCarrito.appendChild(cardCarrito)
    const btnCarrito = document.getElementById("btn-Carrito")
    btnCarrito.onclick = () => {
        window.location.href = "./carrito.html"
    }

    ListenerCarrito()
}
function menuOpcion(opcion) {
    //console.log(opcion)
    let idPedido = 1
    switch (opcion) {
        case 1:

            const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
            // if(carrito.length > 0)

            if ((carritoRecuperado) && (carritoRecuperado.length > 0)) {
                Swal.fire({
                    title: "Tienes combos guardados en el carrito. Al iniciar un nuevo pedido, se perderán. ¿Deseas continuar?",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Continuar",
                    denyButtonText: `Don't save`,
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        //=[]
                        localStorage.removeItem("carrito")
                        const mensaje = "nuevoPedido"
                        localStorage.setItem("volverCarrito", mensaje)
                        window.location.href = "../index.html"
                        //ListenerCarrito()
                        //renderSeleccionCombo(idPedido, combosArmados)
                    } else if (result.isDenied) {
                    }
                });
            } else {
                const mensaje = "nuevoPedido"
                /* PROBAR AGREGADOP 19:48*/
                localStorage.setItem("volverCarrito", mensaje)
                window.location.href = "../index.html"
                //console.log("else de carrito>0")
                // renderSeleccionCombo(idPedido, combosArmados)
            }
            // renderSeleccionCombo(idPedido, combosArmados)
            break
        case 2:
            const mensaje = "armadoCombo"
            localStorage.setItem("volverCarrito", mensaje)
            window.location.href = "../index.html"
            break
        case 3:
            //console.log("Salir del sistema")
            break
        default: Swal.fire("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3");
    }
}
function ListenerCarrito() {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    let totalCantidades = 0
    let totalPrecio = 0
    if (carritoRecuperado) {
        totalCantidades = carritoRecuperado.reduce((total, cantidad) => total + cantidad.cantidadCombo, 0)
        totalPrecio = carritoRecuperado.reduce((total, cantidad) => total + cantidad.precioTotal, 0)
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.remove("d-none")
        if (carritoRecuperado.length == 0) {
            contCarrito.innerText = ""
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.add("disabled")
            contCarrito.classList.add("d-none")
        } else {
            contCarrito.innerText = totalCantidades
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.remove("disabled")
        }
    } else {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.add("d-none")
        const botonAgregar = document.getElementById("btn-agregarCombo")
        botonAgregar.classList.add("disabled")
    }
}
function renderBusqueda(){
    const contenedor = document.getElementById("formularioBusqueda")
    const card = document.createElement("div")
    card.className = "formulario-seccion"
    card.innerHTML =
                                `
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <label for="nombre" class="form-label"># Número de pedido
                                                <span class="required">*</span>
                                            </label>
                                            <input type="text" class="form-control" id="idPedido" required
                                                            placeholder="Ej: 123456">
                                            <div class="invalid-feedback" id="msj-idPedido">Por favor ingresá el número de pedido</div>
                                        </div>
                                    </div>
                                    <!-- boton -->
                                    <div class="mt-4">
                                        <button type="button" class="btn btn-confirmar-pedido" id="btn-buscar" value="confirmar">
                                            <i class="fas fa-check-circle"></i>Buscar
                                        </button>
                                        
                                    </div>                                           
                                `
    contenedor.appendChild(card)

    const boton = document.getElementById("btn-buscar")
    boton.onclick = () =>{
        const idPedido = document.getElementById("idPedido").value
        console.log(idPedido)
        buscarPedido(idPedido)

    }
    const inputPedido = document.getElementById("idPedido");
    // 👇 AGREGÁ ESTE EVENTO AL FORMULARIO
    const formulario = document.getElementById("formularioBusqueda")
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que se recargue la página
        const idPedido = document.getElementById("idPedido").value
        buscarPedido(idPedido);
    });

    /*
    inputPedido.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Evita el submit
            // Ejecutar búsqueda
            buscarPedido();
        }
    });    */
    /*boton.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que se recargue la página
        buscarPedido();
    });  */  
    
}
function buscarPedido(idPedido){
    // estoy simulando que trae este dato de una base de datos. 
    const pedidos = JSON.parse(localStorage.getItem("pedidos"))
    const combos = JSON.parse(localStorage.getItem("combosTotal"))
    //console.log(pedidos)
    const busquedaPedido = pedidos.find(pedido => pedido.id == idPedido )
    const busquedaCombo = combos.filter(combo => combo.idPedido == idPedido)
    let claseEstado =""
    
    console.log("clase estado :"+claseEstado)
    console.log(busquedaCombo)
    let icono =""
    if(busquedaPedido){
        switch(busquedaPedido.estado){
                case "En preparación":
                    claseEstado = "estado-preparacion"
                    icono ="success"
                    break
                case "Entregado":
                    icono ="success"
                    claseEstado = "estado-entregado"
                    break
                case "Cancelado":
                    icono ="error"
                    claseEstado = "estado-cancelado"
                    break
                default: 
                    icono ="warning"
                    claseEstado = "estado-no-encontrado"
                    busquedaPedido.estado ="Comunicarse por telefono"
                    break
            }        
        console.log(busquedaPedido)
        Swal.fire({
            title: `<strong><u>Número de pedido </u>   ${busquedaPedido.id}</strong>`,
            icon: icono,
            html: `
                    <div style="text-align: left; font-size: 0.9rem;">
                        <p><strong>Estado:</strong>    
                        <span class="estado-pedido ${claseEstado}">${busquedaPedido.estado}
                        </span></p>
                        <hr>    
                        <p><strong>Nombre:</strong> ${busquedaPedido.nombre} ${busquedaPedido.apellido}</p>
                        <p><strong>Dirección:</strong> ${busquedaPedido.direccion} ${busquedaPedido.altura} 
                            ${busquedaPedido.piso ? '- Piso ' + busquedaPedido.piso : ''} 
                            ${busquedaPedido.depto ? 'Depto ' + busquedaPedido.depto : ''}
                        </p>
                        <p><strong>Medio de pago:</strong> ${busquedaPedido.medioPago}</p>
                        <hr>
                        <p><strong>Resumen del pedido:</strong></p>
                        ${busquedaCombo.map(combo => `
                            <div style="display:flex; justify-content:space-between; margin: 4px 0;">
                                <span>${combo.nombre} x${combo.cantidadCombo}</span>
                                <span>$ ${combo.precioTotal}</span>
                            </div>
                        `).join("")}
                        <hr>
                        <p style="text-align:right;"><strong>Total: $${busquedaPedido.precio}</strong></p>
                    </div>
            `,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: `
                <i class="fa fa-thumbs-up"></i> Continuar
            `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
                <i class="fa fa-thumbs-down"></i>
            `,
            cancelButtonAriaLabel: "Thumbs down"
            });
    }else{
        Swal.fire("No se encontro ese pedido, intente nuevamente");
    }
    

}
renderMenu(Menu)
renderBusqueda()