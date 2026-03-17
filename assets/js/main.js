const Menu = [1, 2, 3]

const UrlCombos = "../assets/db/combos.json"
const UrlVerduras = "../assets/db/verduras.json"
const UrlToppings = "../assets/db/toppings.json"

let carrito = []

const precioVerdura = 1000
const precioTopping = 600

//////  Creo una clase comboPedido que voy a guardar cada combo que se hacen en un pedido.
//////  en un pedido puede haber varios combos. por este motivo hago la propiedad idPedido
//////  que hace referencia al numero de pedido.
class comboPedido {
    //static id = 0 // no hago esto, porque si vuelvo al index, me pisa el id y arranca de 0 de nuevo
    constructor(id, idPedido, idCombo, nombre, descripcion, adicionales, imagen, cantidadCombo, precioCombo, precioTotal) {
        this.id = id,//
            this.idPedido = idPedido,
            this.idCombo = idCombo,//id del combo guardado en combos.json
            this.nombre = nombre,
            this.descripcion = descripcion,
            this.adicionales = adicionales,
            this.imagen = imagen,
            this.cantidadCombo = cantidadCombo,
            this.precioCombo = precioCombo,
            this.precioTotal = precioTotal
    }
}

function obtenerCombos() {
    fetch(UrlCombos)
        .then(response => response.json())
        .then(data => {

            if (mensajeCarrito) {
                let idPedido = 1
                const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos"))
                const idPedidos = pedidosGuardados.map(pedidos => pedidos.id)
                console.log("ARRAY DE ID")
                console.log(idPedidos)
                //const maxId = Math.max(...idPedidos)
                //console.log("maxID "+maxId)
                let idMax = 0
                for (const id of idPedidos) {
                    idMax = id
                }
                idPedido += idMax
                console.log("con for of " + idMax)
                console.log("idPedido" + idPedido)
                console.log("mensaje del carrito " + mensajeCarrito)
                switch (mensajeCarrito) {
                    case "armadoCombo":
                        console.log("ARMADO COMBO")
                        renderSeleccionCombo(idPedido, data)
                        break
                    case "nuevoPedido":

                        console.log("NUEVO COMBO")
                        borrarContenido("contenedor-subtotal")
                        renderSeleccionCombo(idPedido, data)
                        break
                    default: alert("hola")

                }
            }

            renderMenu(Menu, data)
            //console.log(data)
        })
        .catch(err => console.log("Error detectado: ", err))
        .finally(() => console.log("Peticion finalizada"))
}
function obtenerVerduras(idPedido, comboId, combosArmados) {
    const combo = combosArmados.find(combo => combo.id == comboId)
    fetch(UrlVerduras)
        .then(response => response.json())
        .then(data => {
            listenerSubtotal(combo.precio)//actualizo el subtotal que voy mostrando
            renderSeleccionVerdura(idPedido, comboId, data, combosArmados)
            //console.log(data)
        })
        .catch(err => console.log("Error detectado: ", err))
        .finally(() => console.log("Peticion finalizada"))
}
function obtenerToppings(idPedido, comboId, combosArmados, subtotal) {
    console.log(subtotal)
    fetch(UrlToppings)
        .then(response => response.json())
        .then(data => {
            renderSeleccionToppings(idPedido, comboId, data, combosArmados, subtotal)
            //console.log(data)
        })
        .catch(err => console.log("Error detectado: ", err))
        .finally(() => console.log("Peticion finalizada"))
}
function renderMenu(menuArray, combosArmados) {
    const contenedor = document.getElementById("Menu-contenedor")
    for (const opcionElegida of menuArray) {

        const card = document.createElement("div")
        switch (opcionElegida) {
            case 1:
                card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-success"> <i class="fas fa-plus-circle"></i> Nuevo Pedido</button>`
                break
            case 2:
                // card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-warning btn-agregarCombo">Agregar combo</button>`
                card.innerHTML = `<button id="btn-agregarCombo" class="m-2 btn btn-warning btn-agregarCombo"><i class="fas fa-hamburger"></i>Agregar combo</button>`
                break
            case 3:
                card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-dark "><i class="fas fa-list-alt"></i>Ver estado del pedido</button>`
                break
            default: Swal.fire("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3");
        }
        contenedor.appendChild(card)
        const boton = card.querySelector("button")
        console.log(boton)
        boton.onclick = () => {

            menuOpcion(opcionElegida, combosArmados)
            ListenerCarrito()
            //borrarContenido("Menu-finalizar")
        }
    }//)
    /* ICONO CARRITO */
    const ContenedorCarrito = document.getElementById("Menu-carrito")
    const cardCarrito = document.createElement("div")
    cardCarrito.className = "position-relative d-inline-block"
    cardCarrito.innerHTML = `
                            <button id="btn-Carrito" class="btn-carrito btn p-0 border-0   bg-transparent">
                            <img id="btn-Carrito" src="./assets/img/carrito.webp" class="img-VerTop" > </button>
                            <span id="span-Carrito" class="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning d-none">0
                            </span>`
    ContenedorCarrito.appendChild(cardCarrito)
    const btnCarrito = document.getElementById("btn-Carrito")
    btnCarrito.onclick = () => {
        window.location.href = "./pages/carrito.html"
    }
    ListenerCarrito()
    /* HASTA ACA EL ICONO DEL CARRITO */
}
function menuOpcion(opcion, combosArmados) {
    // console.log(opcion)
    let idPedido = 1
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos"))
    const idPedidos = pedidosGuardados.map(pedidos => pedidos.id)
    /*console.log("ARRAY DE ID")
    console.log(idPedidos)*/
    //const maxId = Math.max(...idPedidos)
    //console.log("maxID "+maxId)
    let idMax = 0
    for (const id of idPedidos) {
        idMax = id
    }
    idPedido += idMax
    /* console.log("con for of " + idMax)
     console.log("idPedido" + idPedido)*/
    if (pedidosGuardados) {

    } else {
        //let idPedido = 1
    }
    //let idPedido = 3
    switch (opcion) {
        case 1:
            const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
            if ((carritoRecuperado) && (carritoRecuperado.length > 0)) {
                Swal.fire({
                    title: "Tenes combos guardados en el carrito. Al iniciar un nuevo pedido, se perderán. ¿Deseas continuar?",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Continuar",
                    denyButtonText: `Don't save`,
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        carrito = []
                        localStorage.removeItem("carrito")

                        ListenerCarrito()
                        borrarContenido("contenedor-subtotal")
                        renderSeleccionCombo(idPedido, combosArmados)
                    } else if (result.isDenied) {
                    }
                });
            } else {
                console.log("else de carrito>0")
                borrarContenido("contenedor-subtotal")
                renderSeleccionCombo(idPedido, combosArmados)
            }
            // renderSeleccionCombo(idPedido, combosArmados)
            break
        case 2:
            idPedido = 1
            renderSeleccionCombo(idPedido, combosArmados)
            console.log("Mostrar pedido")
            break
        case 3:
            window.location.href = "./pages/buscar-pedido.html"
            break
        default: Swal.fire("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3");
    }
}

function renderSeleccionCombo(idPedido, combosArmados) {
    const MenuSeleccion = document.getElementById("Menu-seleccion")
    borrarContenido("Verduras-seleccion")
    borrarContenido("Toppings-seleccion")
    borrarContenido("btn-finalizar")
    borrarContenido("msj-finalizar")
    MenuSeleccion.innerHTML = ""// borro el contenedor por si vuelve a tocar  nuevo pedido
    MenuSeleccion.className = "d-flex flex-column"
    MenuSeleccion.innerHTML = "<p class='d-flex flex-column text-center     titulo-seccion'>Seleccione el combo</p><div class='d-flex flex-column' id='ContenedorBurger'></div>"
    const burgerContenedor = document.getElementById("ContenedorBurger")

    combosArmados.forEach(combo => {
        const card = document.createElement("div")
        card.innerHTML = `<button id="${combo.id}" class="CombosClase">
                            <div class="card-combo">
                                <div class="card-combo-imagen">
                                    <img src="${combo.imagen}" alt="${combo.nombre}" loading="lazy">
                                </div>
                                <div class="card-combo-info">
                                    <div>
                                        <h3 class="card-combo-nombre">${combo.nombre}</h3>
                                        <p class="card-combo-descripcion">${combo.descripcion}</p>
                                    </div>
                                    <div class="card-combo-footer">
                                        <span class="card-combo-precio">$ ${combo.precio}</span>
                                        <!--<div id="contenedor-subtotal" class="d-flex justify-content-center">

                                        </div> -->                                           
                                    </div>
                                </div>
                            </div>
                        </button>    
                        `
        card.className = "d-flex flex-row justify-content-between align-items-center m-2"
        burgerContenedor.appendChild(card)
    })
    renderSubtotal()
    const Botones = document.querySelectorAll(".CombosClase")
    Botones.forEach((boton) => {
        boton.onclick = (e) => {
            borrarContenido("Verduras-seleccion")
            borrarContenido("Toppings-seleccion")
            borrarContenido("Confirmar-seleccion")
            const botonId = e.currentTarget.id
            obtenerVerduras(idPedido, botonId, combosArmados)
        }
    })

}
function renderSeleccionVerdura(idPedido, idCombo, opcionesVerduras, combosArmados) {
    /*console.log("id combo agregado "+idCombo+" de")
    console.log(combosArmados)*/
    const comboSeleccionado = combosArmados.find(combo => combo.id == idCombo)
    const verdura = opcionesVerduras.find(verdura => verdura.adicional == "verdura")
    const menuSeleccionVerdura = document.getElementById("Verduras-seleccion")
    menuSeleccionVerdura.innerHTML = ""//borro el contenedor por si vuelve a tocar  nuevo pedido
    menuSeleccionVerdura.innerHTML = `<p class="precio-info">Seleccione la verdura</p>
                                    <p class="precio-info-valor">Precio por cada uno:<strong> $${verdura.precio}</strong></p>
                                    <div class='d-flex flex-column' id='ContenedorVerduras'></div>`
    menuSeleccionVerdura.className = "d-flex flex-column"

    opcionesVerduras.forEach(verdura => {
        const card = document.createElement("div")
        card.innerHTML = `
                            <label class="verdura-item ">
                                <img src="${verdura.imagen}" alt="${verdura.nombre}" class="verdura-foto">
                                <span class="verdura-nombre">${verdura.nombre}</span>
                                <div class="verdura-derecha">
                                    <input type="checkbox" value="${verdura.nombre}"  
                                        class="check-verduras verdura-check" 
                                </div>
                            </label>`
        menuSeleccionVerdura.appendChild(card)
    })

    //let precio = 0
    let subtotal = comboSeleccionado.precio
    const checks = document.querySelectorAll(".check-verduras")
    // const VerdurasSeleccionadas = []

    checks.forEach((check) => {
        check.onchange = () => {
            //check.addEventListener("change", () => {
            if (check.checked) {
                subtotal += verdura.precio
            } else {
                if (subtotal > comboSeleccionado.precio) {
                    subtotal -= verdura.precio
                }
            }
            // const msj ="Subtotal"
            // const color = "linear-gradient(to right, #00b09b, #96c93d)"
            // msjToastify(msj,color)    
            // console.log(subtotal)
            listenerSubtotal(subtotal)

            borrarContenido("Toppings-seleccion")
            borrarContenido("Confirmar-seleccion")
            //este if pregunta si existe el boton continuar a toppings, xq lo borra cuando detecta al continuar para toppings
            if (!document.getElementById("Btn-ContinuarAtoppings")) {
                const cardContinuar = document.createElement("div")
                cardContinuar.innerHTML = `
                                            <button id="Btn-ContinuarAtoppings" class="m-2 CombosClase btn            btn-secondary">Continuar</button>
                                            `
                cardContinuar.className = "d-flex justify-content-center"
                menuSeleccionVerdura.appendChild(cardContinuar)
                const boton = document.getElementById("Btn-ContinuarAtoppings")
                boton.onclick = () => {
                    obtenerToppings(idPedido, idCombo, combosArmados, subtotal)
                }
            }
        }
    })

    // Boton Continuar a toppings

    const card = document.createElement("div")
    card.innerHTML = `
                        <button id="Btn-ContinuarAtoppings" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
    card.className = "d-flex justify-content-center"
    menuSeleccionVerdura.appendChild(card)

    const boton = document.getElementById("Btn-ContinuarAtoppings")
    boton.onclick = () => {
        obtenerToppings(idPedido, idCombo, combosArmados, subtotal)
    }

}
function renderSeleccionToppings(idPedido, idCombo, opcionesToppings, combosArmados, subtotal) {
    const topping = opcionesToppings.find(topping => topping.adicional == "topping")
    const menuSeleccionToppings = document.getElementById("Toppings-seleccion")
    menuSeleccionToppings.innerHTML = ""//borro el contenedor por si vuelve a tocar  nuevo pedido
    menuSeleccionToppings.innerHTML = `
                                        <p class="precio-info">Seleccione el topping</p>
                                        <p class="precio-info-valor">Precio por cada uno:<strong> $${topping.precio}</strong></p>
                                        <div class='d-flex flex-column id='ContenedorToppings'></div>`
    menuSeleccionToppings.className = "d-flex flex-column"

    opcionesToppings.forEach(Topping => {
        const card = document.createElement("div")
        card.innerHTML = `
                            <label class="Topping-item ">
                                <img src="${Topping.imagen}" alt="${Topping.nombre}" class="Topping-foto">
                                <span class="Topping-nombre">${Topping.nombre}</span>
                                <div class="Topping-derecha">
                                    <input type="checkbox" value="${Topping.nombre}"        class="check-Toppings Topping-check"> 
                                </div>
                            </label>`
        menuSeleccionToppings.appendChild(card)
    })
    // boton continuar a finalizar pedido
    const card = document.createElement("div")
    card.innerHTML = `<button id="Btn-ContinuarAFinalizar" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
    card.className = "d-flex justify-content-center"
    menuSeleccionToppings.appendChild(card)
    const boton = document.getElementById("Btn-ContinuarAFinalizar")
    boton.onclick = () => {
        mostrarConfirmacion(idPedido, idCombo, combosArmados)


    }

    //let precio = 0    
    const checks = document.querySelectorAll(".check-Toppings")
    console.log(subtotal)
    listenerSubtotal(subtotal)
    checks.forEach((check) => {
        check.onchange = () => {
            if (check.checked) {
                subtotal += topping.precio
            } else {
                if (subtotal > 0) {
                    subtotal -= topping.precio
                }
            }

            listenerSubtotal(subtotal)
            borrarContenido("Confirmar-seleccion")
            //este if pregunta si existe el boton continuar a finalizar, xq lo borra cuando detecta al continuar para finalizar
            if (!document.getElementById("Btn-ContinuarAFinalizar")) {
                const card = document.createElement("div")
                card.innerHTML = `<button id="Btn-ContinuarAFinalizar" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
                menuSeleccionToppings.appendChild(card)
                const boton = document.getElementById("Btn-ContinuarAFinalizar")
                boton.onclick = () => {
                    obtenerToppings(idPedido, idCombo, combosArmados, subtotal)
                }
            }
        }
    })
}
function mostrarConfirmacion(idPedido, idCombo, combosArmados) {
    const busqueda = combosArmados.find(combo => combo.id === parseInt(idCombo))
    const verdurasCheck = document.querySelectorAll(".check-verduras:checked")
    const toppingsCheck = document.querySelectorAll(".check-Toppings:checked")
    let precioTotal = parseInt(busqueda.precio)
    let adicionales = ""
    let cantidadAdicionales = 0
    verdurasCheck.forEach(verdura => {
        adicionales += adicionales ? " - " + verdura.value : verdura.value
        precioTotal += precioVerdura
    })

    toppingsCheck.forEach(topping => {
        adicionales += adicionales ? " - " + topping.value : topping.value
        precioTotal += precioTopping
    })
    cantidadAdicionales = verdurasCheck.length + toppingsCheck.length
    /* recupero el carrito - array de objetos*/
    let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    let idMax = 1
    if (carritoRecuperado) {
        console.log("ENTRA A CARRITO")

        carritoRecuperado.forEach(combopedido => {
            console.log(combopedido.id)
            idMax = combopedido.id
        })
        idMax += 1
    }

    console.log("id del pedido antes de guardarlo en el objeto" + idPedido)
    const comboNuevo = new comboPedido(idMax, idPedido, idCombo, busqueda.nombre, busqueda.descripcion, adicionales, busqueda.imagen, 1, busqueda.precio, precioTotal)
    console.log(comboNuevo)

    Swal.fire({
        title: "¿Desea agregar este combo al carrito?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Agregar combo",
        denyButtonText: `Modificar combo`
    }).then((result) => {
        if (result.isConfirmed) {
            agregarCombo(comboNuevo)
        } else if (result.isDenied) {
            //Swal.fire("Changes are not saved", "", "info");
        }
    });
}
function agregarCombo(comboNuevo) {

    console.log("/*/*/*/* funcion agregar combo */*/*/*/ ")
    console.log(comboNuevo)

    ///// A PARTIR ACA AYUDA ////
    // PRIMERO recupero lo que había en localStorage
    //const carritoRecuperado = JSON.parse(localStorage.getItem("carrito")) || []
    let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))

    if (carritoRecuperado === null) {
        carritoRecuperado = []
    }
    // DESPUÉS agrego el nuevo combo al array recuperado
    carritoRecuperado.push(comboNuevo)

    // FINALMENTE guardo el array completo
    localStorage.setItem("carrito", JSON.stringify(carritoRecuperado))

    // actualizo la variable local también
    carrito = carritoRecuperado
    ///// HASTA ACA AYUDA ////

    ListenerCarrito()
    borrarContenido("contenedor-subtotal")
    renderSubtotal()
    const msj = "Carrito actualizado"
    const color = "linear-gradient(to right, #00b09b, #96c93d)"
    msjToastify(msj, color)
    Swal.fire({
        title: "Su combo fue agregado <strong>correctamente</strong>",
        icon: "success",
        html: `<div class="card-combo swal-card">
                            <div class="card-combo-imagen-sweet ">
                                <img src="${comboNuevo.imagen}" alt="${comboNuevo.nombre}" loading="lazy">
                            </div>
                            <div class="card-combo-info">
                                <div>
                                    <h3 class="card-combo-nombre">${comboNuevo.nombre}</h3>
                                </div>
                                <div class="swal-adicionales">
                                    <p class="swal-adicionales-titulo">Adicionales:</p>
                                    <p class="swal-badges">${comboNuevo.adicionales}</p>
                                </div>
                                <div class="card-combo-footer">
                                    <span class="card-combo-precio">$ ${comboNuevo.precioTotal}</span>
                                </div>
                            </div>
                            </div>`
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
    });
    /*Borro toda la pantalla por si el usuario sale de la alerta con la cruz, al haber agregado un combo, si sale, puede agregar el mismo*/
    borrarContenido("Verduras-seleccion")
    borrarContenido("Toppings-seleccion")
    //borrarContenido("Menu-seleccion")

    ////******   YA TENGO TODO. IDCOMBO . ID DEL PEDIDO . VERDURAS Y TOPPINGS *******//////
    ////******   AHORA FALTA GUARDAR EL PEDIDO. ACTUALIZAR EL CARRITO. GUARDAR EN STORAGE *******//////


}
function ListenerCarrito() {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    if (carritoRecuperado) {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.remove("d-none")
        if (carritoRecuperado.length == 0) {
            contCarrito.classList.add("d-none")
            contCarrito.innerText = ""
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.add("disabled")
        } else {
            contCarrito.innerText = carritoRecuperado.length
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.remove("disabled")
        }
    } else {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.add("d-none")
        const botonAgregar = document.getElementById("btn-agregarCombo")
        botonAgregar.classList.add("disabled")
    }


    console.log(carritoRecuperado)
}
function borrarContenido(SeccionABorrar) {
    const borrarSeccion = document.getElementById(SeccionABorrar)
    borrarSeccion.innerHTML = ""
}
function msjToastify(msj, color) {
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
function renderSubtotal() {
    const contenedorSubtotal = document.getElementById("contenedor-subtotal")
    //contenedorSubtotal.classList.add("d-none")

    const card = document.createElement("div")
    card.innerHTML = `
                        <div class="card-subtotal-total">
                            <div class="card-subtotal-linea">
                                    <span class="card-subtotal">Sub-total</span>
                                    <span class="card-subtotal " id="subtotal-listener"><strong>$ 0</strong></span>
                            </div>
                        </div>
                    `
    contenedorSubtotal.appendChild(card)
}
function listenerSubtotal(subtotal) {
    const listenerSubtotal = document.getElementById("subtotal-listener")
    listenerSubtotal.innerHTML = `<strong>$ ${subtotal}</strong>`
    const contenedorSubtotal = document.getElementById("contenedor-subtotal")
    //contenedorSubtotal.classList.remove("d-none")

}

let mensajeCarrito = localStorage.getItem("volverCarrito")
console.log("mensaje volver carrito " + mensajeCarrito)

obtenerCombos()
