function obtenerVerduras() {
    //fetch(".."+UrlVerduras)
    fetch(UrlVerduras)
        .then(response => response.json())
        .then(data => {
            obtenerToppings(data)
    })
        .catch(err => console.log("Error detectado: ", err))
        .finally(() => console.log("Peticion finalizada"))
}
function obtenerToppings(dataVerduras) {
    //fetch(".."+UrlToppings)
    fetch(".."+UrlToppings)
        .then(response => response.json())
        .then(data => {
            renderMenu(menu, dataVerduras, data)
        })
        .catch(err => console.log("Error detectado: ", err))
        .finally(() => console.log("Peticion finalizada"))
}
function renderMenu(menuArray, verduras, toppings) {
    const contenedor = document.getElementById("Menu-contenedor")
    for (const opcionElegida of menuArray) {
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

    }
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

    /* HASTA ACA EL ICONO DEL CARRITO */
    RenderCarrito(verduras, toppings)
    listenerCarrito()
}
function menuOpcion(opcion, combosArmados) {
    let idPedido = 1
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
                        localStorage.removeItem("carrito")
                        const mensaje = "nuevoPedido"
                        localStorage.setItem("volverCarrito", mensaje)
                        window.location.href = "../index.html"
                    } else if (result.isDenied) {
                    }
                });
            } else {
                const mensaje = "nuevoPedido"
                localStorage.setItem("volverCarrito", mensaje)
                window.location.href = "../index.html"
            }
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
function RenderCarrito(verduras, toppings) {
    const carrito = JSON.parse(localStorage.getItem("carrito"))
    let totalReduce = 0
    if ((carrito)) {
        totalReduce = carrito.reduce((contador, combo) => contador + combo.precioTotal, 0)
    } else {
        totalReduce = 0
    }
    const burgerContenedor = document.getElementById("carrito")
    if (totalReduce > 0) {
        let total = 0
        carrito.forEach(combo => {
            const adicionales = combo.adicionales
            if (adicionales == "") {
                const mensajeTitulo = "Sin adicionales"
            } else {
                const mensajeTitulo = "Adicionales"
            }
            total += combo.precioTotal
            const card = document.createElement("div")
            card.id = "cardCombo" + combo.id
            card.innerHTML = `  <div class="card-combo-carrito w-100" >
                                        <div class="card-combo-imagen-carrito">
                                            <img src="../${combo.imagen}" alt="${combo.nombre}" loading="lazy">
                                        </div>
                                        <div class="card-combo-info">
                                            <div>
                                                <h3 class="card-combo-nombre">${combo.nombre}</h3>
                                                <p class="card-combo-descripcion">${combo.descripcion}</p>
                                                <p class="card-combo-descripcion" >
                                                    <span id="adicionales${combo.id}"><strong>
                                                        ${combo.adicionales ? "Adicionales" : "Sin adicionales"}</strong>${combo.adicionales ? ": " + combo.adicionales : ""}
                                                    </span>
                                                <button class="btn-editar " id="${combo.id}" >
                                                    <img src="../assets/img/editar.webp" alt="Editar">
                                                </button>                                                
                                                </p>
                                                <p class="card-combo-descripcion">$ ${combo.precioCombo}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column gap-1 justify-content-center gap-3 me-2">
                                                <div class="contenedor-cantidad"> 
                                                            <button id="${combo.id}" class="btn-cantidad agregarRestar" value="restar">−</button> 

                                                            <span id="contador${combo.id}">${combo.cantidadCombo}</span>

                                                            <button id="${combo.id}" class="btn-cantidad agregarRestar" value="sumar">+</button>  
                                                </div>
                                                <span class="card-combo-precio" id="idPrecio${combo.id}">$ ${combo.precioTotal}</span>
                                                <button id="${combo.id}" class="btn-eliminar-combo">
                                                    <i class="fas fa-trash-alt"></i> Eliminar
                                                </button>
        
                                        </div>
                                    </div>
                                `
            card.className = "d-flex flex-row justify-content-between align-items-center m-2"
            burgerContenedor.appendChild(card)
            const boton = card.querySelector(".btn-eliminar-combo")
            boton.onclick = () => {
                eliminarCombo(combo.id, carrito)
            }
            const botones = document.querySelectorAll(".agregarRestar")
            botones.forEach((boton) => {
                boton.onclick = (e) => {
                    const value = e.currentTarget.value
                    const botonId = e.currentTarget.id
                    agregarRestar(botonId, value, verduras, toppings)
                }
            })
            const botonEditar = document.querySelectorAll(".btn-editar")
            botonEditar.forEach(e => {
                e.onclick = () => {
                    editarAdicionales(e.id, verduras, toppings, carrito)
                }
            })

        })
        const cardTotal = document.createElement("div")
        cardTotal.className = "d-flex justify-content-end w-100 mt-3 px-2"
        cardTotal.id = "contenedorTotal"
        cardTotal.innerHTML = `
                <div class="card-total">
                    <div class="card-total-linea">
                        <span class="card-total-label" id="cantidadCombos">Subtotal (${carrito.length} combo${carrito.length !== 1 ? "s" : ""})</span>
                        <span class="card-total-valor" id="subtotal-final-listener">$ ${total}</span>
                    </div>
                    <div class="card-total-divider"></div>
                    <div class="card-total-linea">
                        <span class="card-total-final">Total</span>
                        <span class="card-total-final " id="total-final-listener">$ ${total}</span>
                    </div>
                    <button class="btn-confirmar" id="btn-confirmar">Confirmar pedido</button>
                    <button class="btn-vaciar-carrito" id="btn-vaciar">
                        <i class="fas fa-trash-can"></i> Vaciar carrito
                    </button>
                </div>`
        burgerContenedor.appendChild(cardTotal)
        const botonVaciar = document.getElementById("btn-vaciar")
        botonVaciar.onclick = () => {
            vaciarCarrito()
        }
        const botonConfirmar = document.getElementById("btn-confirmar")
        botonConfirmar.onclick = () => {
            Swal.fire({
                title: "¿Confirmar pedido?",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Confirmar",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "./finalizar.html"
                } 
            });

        }
    } else {
        renderCarritoVacio()
    }
}
function eliminarCombo(id) {
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    const nuevoCarrito = carritoActual.filter(combo => combo.id !== id)
    const total = nuevoCarrito.reduce((contador, combo) => contador + combo.precioTotal, 0)
    const cantidadCombo = nuevoCarrito.reduce((contador, combo) => contador + combo.cantidadCombo, 0)
    // Actualizar localStorage
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito))
    // Verificar si el carrito quedó vacío
    if (cantidadCombo == 0) {
        const cardTotal = document.getElementById("contenedorTotal")
        const cardCarrito = document.getElementById("carrito")
        const cardTituloCarrito = document.getElementById("tituloCarrito")
        if (cardTotal) {
            cardTotal.remove()
        }
        if (cardCarrito) {
            cardCarrito.remove()
        }
        if (cardTituloCarrito) {
            cardTituloCarrito.remove()
        }
        renderCarritoVacio()
    } else {
        // Actualizo totales solo si hay combos
        const cardSubTotal = document.getElementById("subtotal-final-listener")
        const cardTotal = document.getElementById("total-final-listener")
        const cardCantidad = document.getElementById("cantidadCombos")

        if (cardSubTotal) cardSubTotal.innerHTML = "$ " + total
        if (cardTotal) cardTotal.innerHTML = "$ " + total
        if (cardCantidad) cardCantidad.innerHTML = cantidadCombo

        // Eliminar card del combo
        const cardEliminar = document.getElementById("cardCombo" + id)
        if (cardEliminar){
            cardEliminar.remove()
        }
    }
    // Actualizar el listener del carrito
    listenerCarrito()
    // noticifacion
    const msj = "Carrito actualizado"
    const color = "linear-gradient(to right, #e40014, #ff6568)"
    msjToastify(msj, color)
}
function renderCarritoVacio() {
    const cardCarrito = document.getElementById("carrito")
    const cardTituloCarrito = document.getElementById("tituloCarrito")
    if (cardCarrito) {
        cardCarrito.remove()
    }
    if (cardTituloCarrito) {
        cardTituloCarrito.remove()
    }
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))

    const contenedor = document.getElementById("contenedor-carrito-vacio")
    const card = document.createElement("div")
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
function agregarRestar(id, value) {
    /* obtengo el carrito del storage*/
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    /* busco el combo el cual quiero modificar las cantidades*/
    const nuevoCarrito = carritoActual.find(combo => combo.id == id)
    if (value == "sumar") {
        nuevoCarrito.cantidadCombo++
    } else {
        if (nuevoCarrito.cantidadCombo > 1) {
            nuevoCarrito.cantidadCombo--
        }
    }

    nuevoCarrito.precioTotal = nuevoCarrito.precioCombo * nuevoCarrito.cantidadCombo + (nuevoCarrito.precioAdicionales * nuevoCarrito.cantidadCombo)
    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    const cantidad = document.getElementById("contador" + id)
    cantidad.innerHTML = nuevoCarrito.cantidadCombo
    const precio = document.getElementById("idPrecio" + id)
    precio.innerHTML = "$ " + nuevoCarrito.precioTotal
    const msj = "Carrito actualizado"
    const color = "linear-gradient(to right, #00b09b, #96c93d)"
    msjToastify(msj, color)
    listenerCarrito()
}
function editarAdicionales(id, verduras, toppings, carrito) {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    const combo = carritoRecuperado.find(combo => combo.id == id)
    const adicionalesArray = combo.adicionales.split(" - ")
    let html = `<div style="display:flex; gap:20px;"><div style="flex:1;"><strong>Verduras</strong>`
    verduras.forEach(verdura => {
        html += `
        <label class="verdura-item">
            <img src=".${verdura.imagen}" alt="${verdura.nombre}" class="verdura-foto">
            <span class="verdura-nombre" style="font-size:0.8rem">${verdura.nombre}</span>
            <div class="verdura-derecha">
                <input type="checkbox" value="${verdura.nombre}" class="check-verdura verdura-check" ${check(verdura.nombre, adicionalesArray)}> 
            </div>
        </label>
    `
    })
    html += `</div><div style="flex:1;"><strong>Toppings</strong>`
    toppings.forEach(topping => {
        html += `
        <label class="Topping-item">
            <img src=".${topping.imagen}" alt="${topping.nombre}" class="Topping-foto">
            <span class="Topping-nombre" style="font-size:0.8rem">${topping.nombre}</span>
            <div class="Topping-derecha">
                <input type="checkbox" value="${topping.nombre}" class="check-toppings Topping-check" ${check(topping.nombre, adicionalesArray)}> 
            </div>
        </label>
    `
    })
    html += `</div></div>`
    Swal.fire({
        title: "Editar <strong>adicionales</strong>",
        html: html,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `<i class="fa fa-thumbs-up"></i> Confirmar`,
        confirmButtonAriaLabel: "Confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            actualizarAdicionales(id, verduras, toppings)
        }
    });
}
function listenerCarrito() {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    let totalCantidades = 0
    let totalPrecio = 0
    if (carritoRecuperado) {
        totalCantidades = carritoRecuperado.reduce((total, cantidad) => total + cantidad.cantidadCombo, 0)
        totalPrecio = carritoRecuperado.reduce((total, cantidad) => total + cantidad.precioTotal, 0)
        const contCarrito = document.getElementById("span-Carrito")
        const precioCarrito = document.getElementById("precio-carrito")
        contCarrito.classList.remove("d-none")
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
    listenerTotal(totalCantidades, totalPrecio)
}
function vaciarCarrito() {
    Swal.fire({
        title: "¿Desea vaciar el carrito?",
        text: "Se eliminarán todos los combos",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Vaciar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito")
            localStorage.setItem("volverCarrito", "f")
            const msj = "Carrito eliminado"
            const color = "linear-gradient(to right, #e40014, #ff6568)"
            msjToastify(msj, color)
            listenerCarrito()
            renderCarritoVacio()
        }
    });
}
function listenerTotal(cantidad, totalPrecio) {
    //* modificacion del subtotal y total *//   
    if (cantidad > 0) {
        const SubtotalPrecio = document.getElementById("subtotal-final-listener")
        const cardTotal = document.getElementById("total-final-listener")
        const cardSubTotal = document.getElementById("cantidadCombos")

        // Verifico que existan
        if (SubtotalPrecio) {
            SubtotalPrecio.innerHTML = "$ " + totalPrecio
        }
        if (cardTotal) {
            cardTotal.innerHTML = "$ " + totalPrecio
        }

        if (cardSubTotal) {
            if (cantidad > 1) {
                cardSubTotal.innerHTML = "Subtotal (" + cantidad + " combos)"
            } else {
                cardSubTotal.innerHTML = "Subtotal (" + cantidad + " combo)"
            }
        }
    } else {
        borrarContenido("contenedorTotal")
        const mensaje = "nuevoPedido"
        localStorage.setItem("volverCarrito", mensaje)
    }
}

function check(nombre, adicionalesArray) {
    return adicionalesArray.includes(nombre) ? "checked" : ""
}
function actualizarAdicionales(id, verduras, toppings) {
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    const verdura = verduras.find(verdura => verdura.adicional == "verdura")
    precioVerdura = verdura.precio
    const topping = toppings.find(topping => topping.adicional == "topping")
    precioTopping = topping.precio    
    const carritoModificado = carritoActual.find(combo => combo.id == id)

    const verdurasCheck = document.querySelectorAll(".check-verdura:checked")
    const toppingsCheck = document.querySelectorAll(".check-toppings:checked")

    let precioAdicionales = 0
    let adicionales = ""
    let cantidadAdicionales = 0
    verdurasCheck.forEach(verdura => {
        adicionales += adicionales ? " - " + verdura.value : verdura.value
        precioAdicionales += precioVerdura
    })

    toppingsCheck.forEach(topping => {
        adicionales += adicionales ? " - " + topping.value : topping.value
        precioAdicionales += precioTopping
    })

    cantidadAdicionales = verdurasCheck.length + toppingsCheck.length

    let precioTotCombos = carritoModificado.cantidadCombo * carritoModificado.precioCombo
    carritoModificado.adicionales = adicionales
    carritoModificado.precioAdicionales = precioAdicionales
    carritoModificado.cantidadAdicionales = cantidadAdicionales
    carritoModificado.precioTotal = (precioAdicionales * carritoModificado.cantidadCombo) + precioTotCombos

    localStorage.setItem("carrito", JSON.stringify(carritoActual))

    const msj = "Carrito actualizado"
    const color = "linear-gradient(to right, #00b09b, #96c93d)"
    msjToastify(msj, color)
    listenerCarrito()
    listenerAdicionales(id)
}
function listenerAdicionales(id) {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    const combo = carritoRecuperado.find(combo => combo.id == id)
    const textoAdicionales = document.getElementById("adicionales" + id)
    textoAdicionales.innerHTML = `
                                <strong>${combo.adicionales ? "Adicionales" : "Sin adicionales"}</strong>${combo.adicionales ? ": " + combo.adicionales : ""}
                                `
    const precio = document.getElementById("idPrecio" + id)
    precio.innerHTML = "$ " + combo.precioTotal
}
obtenerVerduras()


