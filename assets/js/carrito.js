const menu = [1, 2, 3]


function renderMenu(menuArray) {
    const contenedor = document.getElementById("Menu-contenedor")
    menuArray.forEach(opcionElegida => {
        const card = document.createElement("div")
        switch (opcionElegida) {
            case 1:
                card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-success">Nuevo Pedido</button>`
                break
            case 2:
                //card.innerHTML = `<button id="${opcionElegida}" class="m-2 btn btn-warning">Agregar combo</button>
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

    })
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

    
    /* HASTA ACA EL ICONO DEL CARRITO */
    RenderCarrito()
    ListenerCarrito()
}
function menuOpcion(opcion, combosArmados) {
    console.log(opcion)
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
            console.log("Salir del sistema")
            break
        default: Swal.fire("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3");
    }
}
//recupero el id del pedido
function RenderCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(carrito)
    const burgerContenedor = document.getElementById("carrito")
    console.log(carrito)
    let total = 0
    const totalReduce = carrito.reduce((contador, combo) => contador + combo.precioTotal, 0)
    console.log("total con reduce " + totalReduce)

    carrito.forEach(combo => {
        const adicionales = combo.adicionales
        console.log("adicionales " + adicionales)
        if (adicionales == "") {
            const mensajeTitulo = "Sin adicionales"
        } else {
            const mensajeTitulo = "Adicionales"
        }
        total += combo.precioTotal
        const card = document.createElement("div")
        card.id = "cardCombo" + combo.id
        card.innerHTML = `  <div class="card-combo w-100" >
                                <div class="card-combo-imagen-carrito">
                                    <img src="../${combo.imagen}" alt="${combo.nombre}" loading="lazy">
                                </div>
                                <div class="card-combo-info">
                                    <div>
                                        <h3 class="card-combo-nombre">${combo.nombre}</h3>
                                        <p class="card-combo-descripcion">${combo.descripcion}</p>
                                        <p class="card-combo-descripcion"><strong>${combo.adicionales ? "Adicionales" : "Sin adicionales"}</strong>${combo.adicionales ? ": " + combo.adicionales : ""}</p>
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
        console.log(botones)
        botones.forEach((boton) => {
            boton.onclick = (e) => {
                const value = e.currentTarget.value
                const botonId = e.currentTarget.id
                agregarRestar(botonId, value)
            }
        })

    })
    const cardTotal = document.createElement("div")
    cardTotal.className = "d-flex justify-content-end w-100 mt-3 px-2"
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
            <button class="btn-confirmar">Confirmar pedido</button>
        </div>`
    burgerContenedor.appendChild(cardTotal)
}
function eliminarCombo(id) {
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    const nuevoCarrito = carritoActual.filter(combo => combo.id !== id)
    const total = nuevoCarrito.reduce((contador, combo) => contador + combo.precioTotal, 0)
    const cantidadCombo = nuevoCarrito.reduce((contador, combo) => contador + combo.cantidadCombo, 0)

    const cardSubTotal = document.getElementById("subtotal-final-listener")
    cardSubTotal.innerHTML = "$ " + total
    const cardTotal = document.getElementById("total-final-listener")
    cardTotal.innerHTML = "$ " + total 
/*
    const cardSubTotal = document.getElementById("total-final-listener")
    cardSubTotal.innerHTML = "$ " + total
    const cardTotal = document.getElementById("subtotal-final-listener")
    cardTotal.innerHTML = "$ " + total 

*/    
    const cardCantidad = document.getElementById("cantidadCombos")
    cardCantidad.innerHTML = cantidadCombo

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito))
    const cardEliminar = document.getElementById("cardCombo" + id)
    ListenerCarrito()
    cardEliminar.remove()
    Toastify({
        text: "Combo eliminado",
        duration: 1500,
        destination: "#",
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #e40014, #ff6568)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
function agregarRestar(id, value) {
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
    const nuevoCarrito = carritoActual.find(combo => combo.id == id)
    //let contador = nuevoCarrito.cantidad
    if (value == "sumar") {
        nuevoCarrito.cantidadCombo++
    } else {
        if (nuevoCarrito.cantidadCombo > 1) {
            nuevoCarrito.cantidadCombo--
        }
    }
    nuevoCarrito.precioTotal = nuevoCarrito.precioCombo * nuevoCarrito.cantidadCombo
    localStorage.setItem("carrito", JSON.stringify(carritoActual))
    const cantidad = document.getElementById("contador" + id)
    cantidad.innerHTML = nuevoCarrito.cantidadCombo
    const precio = document.getElementById("idPrecio" + id)
    console.log("PRECIO")
    console.log(precio)
    precio.innerHTML = "$ " + nuevoCarrito.precioTotal
    const total = carritoActual.reduce((contador, combo) => contador + combo.cantidadCombo, 0)

    ListenerCarrito()
}
function ListenerCarrito() {


    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
    const totalCantidades = carritoRecuperado.reduce((total,cantidad) => total + cantidad.cantidadCombo, 0)
    const totalPrecio = carritoRecuperado.reduce((total,cantidad) => total + cantidad.precioTotal, 0)
    console.log("total cantidades para carrito "+totalCantidades)   
    console.log("total con carrito recuperado "+carritoRecuperado.length) 
    if (carritoRecuperado) {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.remove("d-none")
        if (carritoRecuperado.length == 0) {
            contCarrito.innerText = ""
            const botonAgregar = document.getElementById("btn-agregarCombo")
            botonAgregar.classList.add("disabled")
            contCarrito.classList.add("d-none")
        } else {
            //contCarrito.innerText = carritoRecuperado.length
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

    const SubtotalPrecio = document.getElementById("subtotal-final-listener")
    SubtotalPrecio.innerHTML = totalPrecio
    const cardTotal = document.getElementById("total-final-listener")
    cardTotal.innerHTML = totalPrecio
    const cardSubTotal = document.getElementById("cantidadCombos")
    cardSubTotal.innerHTML = "$ " + totalCantidades


    if(totalCantidades>1){
        cardSubTotal.innerHTML = "Subtotal ("+totalCantidades+" combos)"
    }else{
        cardSubTotal.innerHTML = "Subtotal ("+totalCantidades+" combo)"
    }

}
renderMenu(menu)

