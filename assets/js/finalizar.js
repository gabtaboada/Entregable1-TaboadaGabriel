const menu = [1, 2, 3]
let mensajeCarrito = localStorage.getItem("volverCarrito")
class Pedido {
    //static id = 0
    constructor(id, estado, nombre, apellido, telefono, mail, direccion, altura, piso, depto, codigoPostal, medioPago, precio) {
        this.id = id,//
            this.estado = estado,
            this.nombre = nombre,
            this.apellido = apellido,
            this.telefono = telefono,
            this.mail = mail,
            this.direccion = direccion,
            this.altura = altura,
            this.piso = piso,
            this.depto = depto,
            this.codigoPostal = codigoPostal,
            this.medioPago = medioPago,
            this.precio = precio
    }
}

function renderMenu(menuArray) {
    const contenedor = document.getElementById("Menu-contenedor")
    for (const opcionElegida of menuArray) {
        const card = document.createElement("div")
        switch (opcionElegida) {
            case 1:
                card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-success">Nuevo Pedido</button>`
                break
            case 2:
                card.innerHTML = `<button id="btn-agregarCombo" class="m-2 btn btn-warning" >Agregar combo</button>`
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
                            <span id="span-Carrito" class="position-absolute bottom-0 start-0 translate-middle badge rounded-pill bg-warning d-none">0
                            </span>`
    const cardPrecioCarrito = document.createElement("p")
    cardPrecioCarrito.id = "precio-carrito"
    cardPrecioCarrito.classList = "p-precio-carrito"

    contenedorCarrito.appendChild(cardCarrito)
    contenedorCarrito.appendChild(cardPrecioCarrito)

    const btnCarrito = document.getElementById("btn-Carrito")
    btnCarrito.onclick = () => {
        window.location.href = "./carrito.html"
    }


    /* HASTA ACA EL ICONO DEL CARRITO */
    ListenerCarrito()
}

function menuOpcion(opcion, combosArmados) {
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
            window.location.href = "./buscar-pedido.html"
            break
        default: Swal.fire("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3");
    }
}
function renderFormulario() {
    const carrito = JSON.parse(localStorage.getItem("carrito"))
    let totalReduce = 0
    if ((carrito)) {
        totalReduce = carrito.reduce((contador, combo) => contador + combo.precioTotal, 0)
    } else {
        totalReduce = 0
    }
    if (totalReduce > 0) {
        const contenedorFormu = document.getElementById("formularioDatosEnvio")
        // const card = document.createElement("div")
        // card.className = "formulario-seccion"
        const contenedorFormulario = document.getElementById("formulario-envio")
        contenedorFormulario.classList.remove = "d-none"
        const cardDatos = datosPersonales()
        const cardDireccion = direccionEnvio()
        const cardPago = mediosPagos()
        const cardDotones = botones()
        contenedorFormu.appendChild(cardDatos)
        contenedorFormu.appendChild(cardDireccion)
        contenedorFormu.appendChild(cardPago)
        contenedorFormu.appendChild(cardDotones)


        const inputNombre = document.getElementById("nombre")
        inputNombre.onblur = () => {
            if ((!inputNombre.value) || isNaN((inputNombre.value))) {
                console.log("nombre invalido")
            }
        }


        //const btn = contenedorFormu.querySelectorAll("button")//PROBAR, CON ESTE FUNCIONA DE 10
        /*
        const btn = document.querySelectorAll("button")// PROBAR SI FUNCIONA CON ESTE
        console.log(btn)
        btn.forEach((boton) => {
                    boton.onclick = (e) => {
                        const value = e.currentTarget.value
                        console.log(value)
                        if(value=="confirmar"){
                            confirmarPedido()
                        }else{
                            window.location.href = "./carrito.html"
                        }
                    }
        })    
        */
        const boton = document.getElementById("formularioDatosEnvio")
        boton.onsubmit = (e) => {
            e.preventDefault()
            const medioPago = document.querySelector('input[name="medioPago"]:checked')
            const medioPagoError = document.getElementById("medioPagoError")
            if (medioPago) {
                console.log(medioPago.value) // "transferencia" o "efectivo"
                console.log("existe medio pago ")
                medioPagoError.classList.add("d-none")

            } else {
                medioPagoError.classList.remove("d-none")
                console.log("No seleccionó ningún medio de pago")
            }
            if (!boton.checkValidity()) {
                boton.classList.add("was-validated")  // clase de Bootstrap que muestra los errores

                return  // frena acá, no continúa
            }
            confirmarPedido()
        }
    } else {
        console.log("no entra")
        renderCarritoVacio()
    }
}
function renderCarritoVacio() {
    const contenedor = document.getElementById("contenedor-carrito-vacio")
    const card = document.createElement("div")
    const contenedorFormulario = document.getElementById("formulario-envio")
    contenedorFormulario.classList = "d-none"
    card.id = "carrito-vacio"
    card.className = "carrito-vacio "
    card.innerHTML = `
                        <div class="carrito-vacio-icono">
                            <i class="fas fa-burger"></i>
                        </div>

                        <h3>Tu carrito está vacío</h3>
                        <p>Agrega un combo para empezar tu pedido</p>

                        <a href="../index.html" class="btn btn-warning mt-2">
                            <i class="fas fa-arrow-left"></i> Ir al menú
                        </a>
                    `
    contenedor.appendChild(card)
}
function datosPersonales() {
    const card = document.createElement("div")
    card.className = "formulario-seccion"
    card.innerHTML = `
                        <div class="formulario-seccion-titulo">
                            <i class="fas fa-user"></i>
                            <span>Datos Personales</span>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="nombre" class="form-label">Nombre
                                    <span class="required">*</span>
                                </label>
                                <input type="text" class="form-control" id="nombre" required
                                                placeholder="Ej: Juan">
                                <div class="invalid-feedback" id="msj-nombre">Por favor ingresá tu nombre</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="apellido" class="form-label">Apellido
                                    <span class="required">*</span>
                                </label>
                                <input type="text" class="form-control" id="apellido" required
                                                placeholder="Ej: Pérez">
                                <div class="invalid-feedback">Por favor ingresá tu apellido</div>
                            </div>
                        </div><!-- fin d la 1ra linea -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="telefono" class="form-label">Teléfono
                                    <span class="required">*</span>
                                </label>
                                <input type="tel" class="form-control" id="telefono" required pattern="[0-9]{7,15}" placeholder="Ej: 11 2345-6789">
                                <div class="invalid-feedback">Por favor ingresá tu teléfono</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="mail" class="form-label">Email
                                    <span class="required">*</span>
                                </label>
                                <input type="email" class="form-control" id="mail" required
                                                    placeholder="Ej: tumail@ejemplo.com">
                                <div class="invalid-feedback">Por favor ingresá un email válido</div>
                            </div>
                        </div>
    `

    return card
}
function direccionEnvio() {
    const card = document.createElement("div")
    card.className = "formulario-seccion"
    card.innerHTML = `
                <div class="formulario-seccion">
                        <div class="formulario-seccion-titulo">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Dirección de Envío</span>
                        </div>

                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label for="direccion" class="form-label">Calle
                                <span class="required">*</span>
                            </label>
                            <input type="text" class="form-control" id="direccion" required
                                                placeholder="Ej: Av. Santa Fe">
                            <div class="invalid-feedback">Por favor ingresá la calle</div>
                        </div>
                        <div class="col-md-4 mb-3">
                                <label for="altura" class="form-label">Altura
                                    <span class="required">*</span>
                                </label>
                                <input type="number" class="form-control" id="altura" required
                                                    placeholder="Ej: 1234">
                                <div class="invalid-feedback">Ingresá la altura</div>
                        </div>
                    </div><!-- fin d la 1ra fila -->

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="piso" class="form-label">Piso</label>
                            <input type="text" class="form-control" id="piso" placeholder="Ej: 5">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="depto" class="form-label">Depto</label>
                            <input type="text" class="form-control" id="depto" placeholder="Ej: B">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="codigoPostal" class="form-label">Código Postal
                                <span class="required">*</span>
                            </label>
                            <input type="text" class="form-control" id="codigoPostal" required
                                                    placeholder="Ej: 1425">
                            <div class="invalid-feedback">Ingresá el CP</div>
                        </div>
                    </div>
                </div>
                    `
    return card
}
function mediosPagos() {
    const card = document.createElement("div")
    card.className = "formulario-seccion"
    card.innerHTML = `
                    <div class="formulario-seccion">
                        <div class="formulario-seccion-titulo">
                            <i class="fa-solid fa-credit-card"></i>
                            <span>Medios de pago</span>
                        </div>
                        <div class="metodos-pago">
                            <label class="metodo-pago-opcion">
                                <input type="radio" name="medioPago" value="transferencia" required>
                                <div class="metodo-pago-card">
                                    <div class="metodo-pago-circulo">
                                        <i class="fas fa-university"></i>
                                    </div>
                                    <div class="metodo-pago-info">
                                        <span class="metodo-pago-nombre">Transferencia bancaria</span>
                                        <span class="metodo-pago-desc">Te enviamos los datos por
                                                            WhatsApp</span>
                                    </div>
                                    <div class="metodo-pago-check"><i class="fas fa-check"></i></div>
                                </div>
                            </label>
                            <label class="metodo-pago-opcion">
                                <input type="radio" name="medioPago" value="efectivo" required>
                                    <div class="metodo-pago-card">
                                        <div class="metodo-pago-circulo">
                                            <i class="fas fa-money-bill-wave"></i>
                                        </div>
                                        <div class="metodo-pago-info">
                                            <span class="metodo-pago-nombre">Efectivo</span>
                                            <span class="metodo-pago-desc">Pagás al momento de la entrega</span>
                                        </div>
                                        <div class="metodo-pago-check"><i class="fas fa-check"></i></div>
                                    </div>
                            </label>
                        </div>
                        <div class="invalid-feedback d-block d-none" id="medioPagoError"
                                        >Debe seleccionar un medio de pago</div>
                        </div>     
                        <div class="info-adicional">
                            <p><i class="fas fa-info-circle"></i> <strong>Tiempo estimado de entrega:</strong>
                                        30-45 minutos</p>
                        </div>                   
                    `
    return card
}
function botones() {
    const card = document.createElement("div")
    card.innerHTML = `
                    <div class="mt-4">
                        <button type="submit" class="btn btn-confirmar-pedido" id="btn-confirmar" value="confirmar">
                            <i class="fas fa-check-circle"></i> Proceder con el pago
                        </button>
                        <button type="button" class="btn btn-volver" id="btn-volver" value="volver">
                            <i class="fas fa-arrow-left"></i> Volver al carrito
                        </button>
                    </div>                
                    `
    return card
}
function confirmarPedido() {

    combosTotal = JSON.parse(localStorage.getItem("combosTotal"))
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    // console.log("Combo total traigo del storage")
    // console.log(combosTotal)
    // console.log("carrito actual")
    // console.log(carritoActual)
    const precio = carritoActual.reduce((contador, pedido) => contador + pedido.precioTotal, 0)
    //const id = carritoActual[0].idPedido////////////// PROBAR
    const pedidosExistentes = JSON.parse(localStorage.getItem("pedidos"))
    let idMax = 0
    if (pedidosExistentes) {
        for (const pedido of pedidosExistentes) {
            idMax = pedido.id
        }
    }
    const id = idMax + 1
    ///////////////////
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const telefono = document.getElementById("telefono").value
    const mail = document.getElementById("mail").value
    const direccion = document.getElementById("direccion").value
    const altura = document.getElementById("altura").value
    const piso = document.getElementById("piso").value
    const depto = document.getElementById("depto").value
    const codigoPostal = document.getElementById("codigoPostal").value
    const estado = "En preparación"

    const medioPago = document.querySelector('input[name="medioPago"]:checked')
    /*
    if (medioPago) {
        console.log(medioPago.value) // "transferencia" o "efectivo"
    } else {
        console.log("No seleccionó ningún medio de pago")
    }
    */
    // ITERO EL CARRITO , PARA GUARDAR COMBO POR COMBO
    if (!Array.isArray(combosTotal)) {
        combosTotal = []
    }
    /////////////// probar
    /*
        carritoActual.forEach(combo => {
            combosTotal.push(combo)
        })*/
    /////////////  PROBAR
    let idMaxCombo = 0
    for (const combo of combosTotal) {
        idMaxCombo = combo.id
    }

    carritoActual.forEach(combo => {
        idMaxCombo++
        combo.id = idMaxCombo
        combosTotal.push(combo)
    })

    ////////////


    const pedidoNuevo = new Pedido(id, estado, nombre, apellido, telefono, mail, direccion, altura, piso, depto, codigoPostal, medioPago.value, precio)

    Swal.fire({
        title: "Su pedido fue <strong>confirmado</strong>",
        icon: "success",
        html: `        
        <div style="text-align: left; font-size: 0.9rem;">
            
            <p><strong>N° de pedido:</strong>  ${pedidoNuevo.id}</p>
            <p><strong>Nombre:</strong> ${pedidoNuevo.nombre} ${pedidoNuevo.apellido}</p>
            <p><strong>Dirección:</strong> ${pedidoNuevo.direccion} ${pedidoNuevo.altura} 
                ${pedidoNuevo.piso ? '- Piso ' + pedidoNuevo.piso : ''} 
                ${pedidoNuevo.depto ? 'Depto ' + pedidoNuevo.depto : ''}
            </p>
            <p><strong>Medio de pago:</strong> ${pedidoNuevo.medioPago}</p>
            ${pedidoNuevo.medioPago === "transferencia" 
                ? `<div style="background:#fffbea; border-left: 3px solid #FCBF02; padding: 10px 14px; border-radius: 6px; margin-top: 8px; font-size:0.85rem;">
                    <p style="margin:0 0 4px 0;"><strong>Alias:</strong> burger.house.pagos</p>
                    <p style="margin:0;">Una vez realizada la transferencia, enviá el comprobante por WhatsApp</p>
                </div>` 
                : ""}
            <hr>
            <p><strong>Resumen del pedido:</strong></p>
            ${carritoActual.map(combo => `
                <div style="display:flex; justify-content:space-between; margin: 4px 0;">
                    <span>${combo.nombre} x${combo.cantidadCombo}</span>
                    <span>$${combo.precioTotal}</span>
                </div>
            `).join("")}
            <hr>
            <p style="text-align:right;"><strong>Total: $${precio}</strong></p>
        </div>
                            `
        ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
                        <i class="fa fa-thumbs-up"></i> Continuar!
                    `,
        confirmButtonAriaLabel: "Thumbs up, Continuar!",
        cancelButtonText: `
                        <i class="fa fa-thumbs-down"></i>
                    `,
        cancelButtonAriaLabel: "Thumbs down"
    }).then((result) => {
        if (result.isConfirmed) {
            //COMENTO HASTA QUE QUEDE LISTO ELARRAY DONDE GUARDO EL PEDIDO
            localStorage.removeItem("carrito")
            localStorage.removeItem("volverCarrito")
            const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos"))

            if (pedidosGuardados) {
                pedidosGuardados.push(pedidoNuevo)
                localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados))
                //localStorage.setItem("combosTotal", JSON.stringify(carritoActual))
                localStorage.setItem("combosTotal", JSON.stringify(combosTotal))

            } else {
                const pedido = pedidoNuevo
                localStorage.setItem("pedidos", JSON.stringify([pedidoNuevo]))
                //localStorage.setItem("combosTotal", JSON.stringify([carritoActual]))
                localStorage.setItem("combosTotal", JSON.stringify(combosTotal))
            }
            window.location.href = "../index.html"

        } else if (result.isDenied) {
        }
    });
}
function ListenerCarrito() {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    //    console.log(carritoRecuperado)
    let totalCantidades = 0
    let totalPrecio = 0
    if (carritoRecuperado) {
        totalCantidades = carritoRecuperado.reduce((total, cantidad) => total + cantidad.cantidadCombo, 0)
        totalPrecio = carritoRecuperado.reduce((total, cantidad) => total + cantidad.precioTotal, 0)
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.remove("d-none")
        const botonAgregar = document.getElementById("btn-agregarCombo")
        console.log("boton agregar")
        console.log(botonAgregar.classList)
        botonAgregar.classList.remove("disabled")
        const precioCarrito = document.getElementById("precio-carrito")
        precioCarrito.classList.remove("d-none")
        if (carritoRecuperado.length == 0) {
            contCarrito.innerText = ""
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.add("disabled")
            contCarrito.classList.add("d-none")
            const precioCarrito = document.getElementById("precio-carrito")
            precioCarrito.classList.add("d-none")
        } else {
            precioCarrito.innerText = `$ ${totalPrecio}`
            contCarrito.innerText = totalCantidades
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.remove("disabled")
        }
    } else {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.add("d-none")
        const precioCarrito = document.getElementById("precio-carrito")
        precioCarrito.classList.add("d-none")
        const botonAgregar = document.getElementById("btn-agregarCombo")
        botonAgregar.classList.add("disabled")
    }
}
renderMenu(menu)
renderFormulario()

