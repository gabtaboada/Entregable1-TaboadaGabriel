/* ////////////////////////////////////  */
const menu = [1, 2, 3]
/*
const CombosArmados = [
    {
        id: 1,
        nombre: "CheeseBurger",
        precio: 18000,
    },
    {
        id: 2,
        nombre: "BlueBurger",
        precio: 19500,
    },
    {
        id: 3,
        nombre: "VeganBurger",
        precio: 18750,
    },
    {
        id: 4,
        nombre: "BaconBurger",
        precio: 19000,
    },

]
*/
const UrlCombos= "./assets/db/combos.json"
const UrlVerduras= "./assets/db/verduras.json"
const UrlToppings= "./assets/db/toppings.json"
const ValorVerdura = 1000
const ValorTopping = 600
const Pedidos = []
const PedidosId = []//declaro array que almacena cada ID de los pedidos
function obtenerCombos(){
    fetch(UrlCombos)
    .then(response => response.json())
    .then(data=> {
        RenderMenu(menu, data)
        console.log(data)
    })
    .catch(err => console.log("Error detectado: ",err))
    .finally(() => console.log("Peticion finalizada"))
}
function obtenerVerduras(){
    fetch(UrlVerduras)
    .then(response => response.json())
    .then(data=> {
        //renderProductos(data)
        RenderMenu(Menu, data)
        console.log(data)
    })
    .catch(err => console.log("Error detectado: ",err))
    .finally(() => console.log("Peticion finalizada"))
}
function obtenerToppings(){
    fetch(UrlToppings)
    .then(response => response.json())
    .then(data=> {
        //renderProductos(data)
        RenderMenu(Menu, data)
        console.log(data)
    })
    .catch(err => console.log("Error detectado: ",err))
    .finally(() => console.log("Peticion finalizada"))
}


// Clase para crear el combo
class Combo {
    //static id = 0
    constructor(IdPedido, idcombopedido, verdura1, verdura2, verdura3, toppings1, toppings2, toppings3, precio) {
        this.id = IdPedido,
            this.idcombopedido = idcombopedido,//seria el id del combo seleccionado
            this.verdura1 = verdura1,
            this.verdura2 = verdura2,
            this.verdura3 = verdura3,
            this.toppings1 = toppings1,
            this.toppings2 = toppings2,
            this.toppings3 = toppings3,
            this.precio = precio
    }

}
function ListenerCarrito() {
    if (PedidosId == "") {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.add("d-none")

    } else {
        const contCarrito = document.getElementById("span-Carrito")
        contCarrito.classList.remove("d-none")
        contCarrito.innerText = PedidosId.length
    }
}
function BorrarContenido(SeccionABorrar) {
    const BorrarSeccion = document.getElementById(SeccionABorrar)
    BorrarSeccion.innerHTML = ""
}

// function RenderAdicionales(tipoAdicional, adicional) {
//     const divAdicionales = document.createElement("div")
//     const imgAdicionales = document.createElement("img")
//     const LabelAdicionales = document.createElement("label")
//     LabelAdicionales.htmlFor = adicional
//     LabelAdicionales.textContent = adicional
//     switch (tipoAdicional) {
//         case "verdura": imgAdicionales.src = ObtenerFotoVerdura(adicional)
//             break
//         case "topping": imgAdicionales.src = ObtenerFotoTopping(adicional)
//             break
//     }

//     imgAdicionales.className = "img-VerTop mx-2"
//     divAdicionales.appendChild(imgAdicionales)
//     divAdicionales.appendChild(LabelAdicionales)
//     return divAdicionales
// }
// function RenderMenuFinalizar(idPedido,ComboPedido) {

//     //renderiamos el combo agregado.
//     BorrarContenido("Menu-seleccion")
//     BorrarContenido("Verduras-seleccion")
//     BorrarContenido("Toppings-seleccion")
//     BorrarContenido("Confirmar-seleccion")


//     const Busqueda = CombosArmados.find(combo => combo.id === parseInt(ComboPedido.idcombopedido))
//     console.log(Busqueda)
//     //Agrego el combo
//     const ContenedorCombo = document.getElementById("Menu-finalizar")
//     const cardCombo = document.createElement("div")
//     const imgCombo = document.createElement("img")
//     cardCombo.className = "col d-flex flex-row class=justify-content-center align-items-center m-2"
//     const LabelCombo = document.createElement("label")
//     LabelCombo.htmlFor = Busqueda.nombre
//     LabelCombo.textContent = Busqueda.nombre
//     imgCombo.src = ObtenerFotoCombo(Busqueda.nombre)
//     imgCombo.className = "img-combo mx-2"

//     const msjFinalizar = document.getElementById("msj-finalizar")
//     const cardMsjFinalizar = document.createElement("div")
//     cardMsjFinalizar.innerHTML = "<p class='msjFinalizar'>Su combo fue agregado correctamente</p>"
//     //cardMsjFinalizar.className = 
//     cardCombo.appendChild(imgCombo)
//     cardCombo.appendChild(LabelCombo)
//     msjFinalizar.appendChild(cardMsjFinalizar)
//     ContenedorCombo.appendChild(cardCombo)
//     /// Agrego Verduras y toppings

//     const cardAdicionales = document.createElement("div")
//     cardAdicionales.className = "col d-flex flex-row class=justify-content-center align-items-center m-2"

//     const VerdurasDelObjeto = [ComboPedido.verdura1, ComboPedido.verdura2, ComboPedido.verdura3]
//     const ToppingsDelObjeto = [ComboPedido.toppings1, ComboPedido.toppings2, ComboPedido.toppings3]
//     for (const verdura of VerdurasDelObjeto) {
//         if (verdura) {
//             const render = RenderAdicionales("verdura", verdura)
//             cardAdicionales.appendChild(render)
//         }
//     }
//     ContenedorCombo.appendChild(cardAdicionales)
//     for (const topping of ToppingsDelObjeto) {
//         if (topping) {
//             const render = RenderAdicionales("topping", topping)
//             cardAdicionales.appendChild(render)
//         }

//     }
//     ContenedorCombo.appendChild(cardAdicionales)
//     /// renderizo el precio
//     const cardprecio = document.createElement("div")
//     cardprecio.className = "col d-flex flex-column class=justify-content-center align-items-center m-2"
//     cardprecio.innerHTML = `<p class="tituloPrecio"> Precio del combo </p>
//                             <p class ="precio">$ ${ComboPedido.precio}</p>`
//     ContenedorCombo.appendChild(cardprecio)
//     const ContenedorBtnFinalizar = document.getElementById("btn-finalizar") 
//     const cardBotones = document.createElement("div")
//     cardBotones.className = "col d-flex flex-row class=justify-content-center align-items-center m-2 w-100"
//     cardBotones.innerHTML = `<button id="btn-AgregarCombo" class="m-1 CombosClase btn btn-success  h-90">Agregar otro combo </      button>
//                             <button id="btn-FinalizarPedido" class="m-1 CombosClase btn btn-success  h-90">Finalizar pedido</      button>`
//     ContenedorBtnFinalizar.appendChild(cardBotones)
//     //envio al local el id del pedido actual, que me sirve para renderizar el carrito

//     localStorage.setItem("PedidoActual",idPedido)
//     const btnCarrito = document.getElementById("btn-FinalizarPedido")
//     btnCarrito.onclick = () => {
//             window.location.href="./pages/carrito.html"
//         }
//     const btnAgregarCombo = document.getElementById("btn-AgregarCombo")
//     btnAgregarCombo.onclick = () =>{
//         BorrarContenido("btn-finalizar")
//         BorrarContenido("msj-finalizar")
//         BorrarContenido("Menu-finalizar")
//         RenderSeleccionCombo(idPedido,CombosArmados)
//     }
// }

function RenderConfirmarCombo(idPedido,PedidosId, idCombo, CombosArmados, Verduras, Toppings) {
    console.log(Verduras)
    console.log("confirmar combo")
    //let Idpedido = idPedido
    let Idpedido = 0
    for (const pedido of PedidosId) {
        Idpedido = parseInt(pedido)
    }
    Idpedido += 1

    /*
    IdPedidoRecuperado = JSON.parse(localStorage.getItem("PedidosId"))
    const busqueda = IdPedidoRecuperado.find(id => id ===Idpedido)
    console.log("busqueda")
    console.log(busqueda)*/
    PedidosId.push(Idpedido)// en este array guardo los numeros de pedidos para poder usarlo en los objetos creados que serian los combos pedidos
    const MenuSeleccion = document.getElementById("Menu-seleccion")
    MenuSeleccion.innerHTML = ""
    const VerdurasSeleccion = document.getElementById("Verduras-seleccion")
    VerdurasSeleccion.innerHTML = ""
    const ToppingsSeleccion = document.getElementById("Toppings-seleccion")
    ToppingsSeleccion.innerHTML = ""
    const ConfirmarSeleccion = document.getElementById("Confirmar-seleccion")
    ConfirmarSeleccion.innerHTML = ""
    const VerdurasSeleccionadas = []
    const ToppingsSeleccionadas = []
    const RecuperoCombo = CombosArmados.find(combo => combo.id === parseInt(idCombo))
    //console.log(RecuperoCombo)

    let precio = RecuperoCombo.precio
    Verduras.forEach((Verdura, index) => {
        precio += ValorVerdura
        VerdurasSeleccionadas.push(Verdura.value)
    })
    Toppings.forEach((Topping, index) => {
        precio += ValorTopping
        ToppingsSeleccionadas.push(Topping.value)
    })

    const ComboPedido = new Combo(Idpedido, idCombo, VerdurasSeleccionadas[0], VerdurasSeleccionadas[1], VerdurasSeleccionadas[2], ToppingsSeleccionadas[0], ToppingsSeleccionadas[1], ToppingsSeleccionadas[2], precio)
    Pedidos.push(ComboPedido)//En pedidos guardo cada combo que se pide, Idpedido correspende al numero de pedido, si tengo 3 combos del mismo pedido, van a repetir ese valor. De esta forma puedo identificar en el array pedidos[] todos los combos y agruparlos
    const pedidosJSON = JSON.stringify(Pedidos)
    const PedidosIdJSON =JSON.stringify(PedidosId)
    
    localStorage.setItem("pedidos",pedidosJSON)
    localStorage.setItem("PedidosId",PedidosIdJSON)
    ListenerCarrito()
    RenderMenuFinalizar(idPedido,ComboPedido)
}
function RenderAgregarCombo(idPedido,IdCombo) {
    //console.log("id combo agregado "+IdCombo)
    const borrar = document.getElementById("Btn-ContinuarAFinalizar")
    borrar.parentElement.remove()
    const MenuSeleccionTopping = document.getElementById("Toppings-seleccion")
    const ConfirmarSeleccion = document.getElementById("Confirmar-seleccion")
    const VerdurasSeleccionadas = document.querySelectorAll(".check-verduras:checked")
    const ToppingsSeleccionadas = document.querySelectorAll(".Check-Toppings:checked")

    const card = document.createElement("div")
    card.innerHTML = `<button id="BtnAgregar" class="m-2 CombosClase btn btn-secondary">Agregar combo</button>`
    ConfirmarSeleccion.appendChild(card)
    const Boton = document.getElementById("BtnAgregar")
    Boton.onclick = () => {
        RenderConfirmarCombo(idPedido,PedidosId, IdCombo, CombosArmados, VerdurasSeleccionadas, ToppingsSeleccionadas)
    }
}
function RenderSeleccionToppings(idPedido,IdCombo, OpcionesToppings) {
    //console.log("id combo agregado "+IdCombo)
    const borrar = document.getElementById("Btn-ContinuarAtoppings")
    if (borrar) {
        borrar.parentElement.remove()
    }

    const MenuSeleccionTopping = document.getElementById("Toppings-seleccion")
    MenuSeleccionTopping.innerHTML = ""//borro el contenedor por si vuelve a tocar  nuevo pedido
    MenuSeleccionTopping.className = "d-flex flex-column"
    MenuSeleccionTopping.innerHTML = "<p>Precio por cada uno : $600</p><div class='d-flex flex-column' id='ContenedorTopping'></div>"
    const ToppingsContenedor = document.getElementById("ContenedorTopping")
    for (const Topping of OpcionesToppings) {
        const card = document.createElement("div")
        const input = document.createElement("input")
        const img = document.createElement("img")
        card.className = "class=justify-content-center align-items-center m-2"
        input.type = "checkbox"
        input.value = Topping
        input.id = "Topping"
        input.className = "Check-Toppings mx-2"

        const Label = document.createElement("label")
        Label.htmlFor = input.id
        Label.textContent = Topping
        img.src = ObtenerFotoTopping(Topping)
        img.alt = Topping

        img.className = "img-VerTop mx-2"
        card.appendChild(img)
        card.appendChild(input)
        card.appendChild(Label)
        ToppingsContenedor.appendChild(card)
    }
    // boton continuar a finalizar pedido
    const card = document.createElement("div")
    card.innerHTML = `<button id="Btn-ContinuarAFinalizar" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
    card.className = "d-flex justify-content-center"
    MenuSeleccionTopping.appendChild(card)
    const boton = document.getElementById("Btn-ContinuarAFinalizar")
    boton.onclick = () => {
        RenderAgregarCombo(idPedido,IdCombo)
    }
    const Checks = document.querySelectorAll(".Check-Toppings")
    Checks.forEach((check) => {
        check.addEventListener("change", () => {
            BorrarContenido("Confirmar-seleccion")
            //este if pregunta si existe el boton continuar a finalizar, xq lo borra cuando detecta al continuar para finalizar
            if (!document.getElementById("Btn-ContinuarAFinalizar")) {
                const card = document.createElement("div")
                card.innerHTML = `<button id="Btn-ContinuarAFinalizar" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
                MenuSeleccionTopping.appendChild(card)
                const boton = document.getElementById("Btn-ContinuarAFinalizar")
                boton.onclick = () => {
                    RenderSeleccionToppings(idPedido,IdCombo, OpcionesToppings)
                }
            }
        })
    })
}
function RenderSeleccionVerdura(idPedido,IdCombo, OpcionesVerduras) {
    //console.log("id combo agregado "+IdCombo)
    const MenuSeleccionVerdura = document.getElementById("Verduras-seleccion")
    MenuSeleccionVerdura.innerHTML = ""//borro el contenedor por si vuelve a tocar  nuevo pedido
    MenuSeleccionVerdura.innerHTML = "<p>Puede agregar hasta un maximo de 3 verduras.</p><p>Precio por cada uno: $1000</p><div class='d-flex flex-column' id='ContenedorVerduras'></div>"
    const Verdurascontenedor = document.getElementById("ContenedorVerduras")
    MenuSeleccionVerdura.className = "d-flex flex-column"
    const MensajeError = document.createElement("span")
    MensajeError.textContent = "No se puede elegir mas de 3 verduras"
    MensajeError.className = "Mensaje-Error Oculto"
    MenuSeleccionVerdura.appendChild(MensajeError)

    for (const verdura of OpcionesVerduras) {
        const card = document.createElement("div")
        const input = document.createElement("input")
        const img = document.createElement("img")
        card.className = "justify-content-center align-items-center m-2"
        input.type = "checkbox"
        input.value = verdura
        input.id = "verdura"
        input.className = "check-verduras mx-2"

        const Label = document.createElement("label")
        Label.htmlFor = input.id
        Label.textContent = verdura
        img.src = ObtenerFotoVerdura(verdura)
        img.alt = verdura

        img.className = "img-VerTop mx-2"
        card.appendChild(img)
        card.appendChild(input)
        card.appendChild(Label)
        Verdurascontenedor.appendChild(card)
    }

    const Checks = document.querySelectorAll(".check-verduras")
    const VerdurasSeleccionadas = []
    Checks.forEach((check) => {
        check.addEventListener("change", () => {
            BorrarContenido("Toppings-seleccion")
            BorrarContenido("Confirmar-seleccion")
            //este if pregunta si existe el boton continuar a toppings, xq lo borra cuando detecta al continuar para toppings
            if (!document.getElementById("Btn-ContinuarAtoppings")) {
                const card = document.createElement("div")
                card.innerHTML = `<button id="Btn-ContinuarAtoppings" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
                card.className = "d-flex justify-content-center"
                MenuSeleccionVerdura.appendChild(card)
                const boton = document.getElementById("Btn-ContinuarAtoppings")
                boton.onclick = () => {
                    RenderSeleccionToppings(idPedido,IdCombo, OpcionesToppings)
                }
            }
            const Seleccionadas = document.querySelectorAll(".check-verduras:checked")
            const CantidadVerdurasSeleccionadas = Seleccionadas.length
            if (CantidadVerdurasSeleccionadas > 3) {
                check.checked = false
                const Mensaje = document.querySelector(".Mensaje-Error")
                Mensaje.classList.remove("Oculto")
                Mensaje.classList.add("Error")
            } else {
                const Mensaje = document.querySelector(".Mensaje-Error")
                if (Mensaje.classList == "Error") {
                    Mensaje.classList.remove("Error")
                }
                VerdurasSeleccionadas.push(check.value)
                Mensaje.classList.add("Oculto")
            }
        })
    })

    // Boton Continuar a toppings


    const card = document.createElement("div")
    card.innerHTML = `<button id="Btn-ContinuarAtoppings" class="m-2 CombosClase btn btn-secondary">Continuar</button>`
    card.className = "d-flex justify-content-center"
    MenuSeleccionVerdura.appendChild(card)

    const boton = document.getElementById("Btn-ContinuarAtoppings")
    boton.onclick = () => {
        RenderSeleccionToppings(idPedido,IdCombo, OpcionesToppings)
    }

}
//Render para mostrar los combos. Por este paso arranca el programa
function RenderSeleccionCombo(idPedido,CombosArmados) {
    const MenuSeleccion = document.getElementById("Menu-seleccion")
   // BorrarContenido("Menu-selccion")
    BorrarContenido("btn-finalizar")
    BorrarContenido("msj-finalizar")
    MenuSeleccion.innerHTML = ""// borro el contenedor por si vuelve a tocar  nuevo pedido
    MenuSeleccion.className = "d-flex flex-column"
    MenuSeleccion.innerHTML = "<p class='d-flex flex-column text-center'>Seleccione el combo</p><div class='d-flex flex-column' id='ContenedorBurger'></div>"
    const Burgercontenedor = document.getElementById("ContenedorBurger")
    for (const Combo of CombosArmados) {
        const card = document.createElement("div")
        card.innerHTML = `<div class="d-flex flex-column justify-content-between align-items-center m-2"><button id="${Combo.id}" class="m-1 CombosClase btn btn-success w-100">${Combo.nombre} </button><p class="mt-2  text-center">$ ${Combo.precio}</p></div>`
        card.className = "d-flex flex-row justify-content-between align-items-center m-2"

        const img = document.createElement("img")
        img.src = ObtenerFotoCombo(Combo.nombre)
        img.alt = Combo.nombre
        img.className = "img-combo"
        card.appendChild(img)
        Burgercontenedor.appendChild(card)
    }
    const Botones = document.querySelectorAll(".CombosClase")
    Botones.forEach((boton) => {
        boton.onclick = (e) => {
            BorrarContenido("Verduras-seleccion")
            BorrarContenido("Toppings-seleccion")
            BorrarContenido("Confirmar-seleccion")
            const BotonId = e.currentTarget.id
            RenderSeleccionVerdura(idPedido,BotonId, OpcionesVerduras)
        }
    })

}
function MenuOpcion(opcion, CombosArmados) {
    switch (opcion) {
        case 1:
            //busco si tengo algun pedido hecho, para sumar el contador. y reseteo el carrito.
            const ValorIdPedido = JSON.parse(localStorage.getItem("PedidosId"))
            let idPedido = 0
            if(ValorIdPedido){
                for (const valor of ValorIdPedido) {
                    idPedido = valor
                }
                idPedido +=1
            }else{
                idPedido = 1
            }
            
            RenderSeleccionCombo(idPedido,CombosArmados)
            break
        case 2:
            console.log("Mostrar pedido")
            break
        case 3:
            console.log("Salir del sistema")
            break
        default: alert("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3")
    }
}
function RenderMenu(MenuArray, CombosArmados) {
    const Contenedor = document.getElementById("Menu-contenedor")
    for (const OpcionElegida of MenuArray) {
        const card = document.createElement("div")
        switch (OpcionElegida) {
            case 1:
                //NUEVO PEDIDO
                //Si hay algo en el carrito, no muestro el boton. 
                    if (PedidosId == "") {

                       

                    } else {

    }   
                card.innerHTML = `<button id="${OpcionElegida}" class="m-2 btn btn-dark">Nuevo Pedido</button>`
                break
            case 2:
                card.innerHTML = `<button id="${OpcionElegida}" class="m-2 btn btn-dark">Ver Pedido</button>`
                break
            case 3:
                card.innerHTML = `<button id="${OpcionElegida}" class="m-2 btn btn-dark ">Salir</button>`
                break
            default: alert("Revisar codigo porque el menu esta hardcodeado, en este momento es un array con valores 1,2,3")
        }
        Contenedor.appendChild(card)
        const boton = card.querySelector("button")
        boton.onclick = () => {
            MenuOpcion(OpcionElegida, CombosArmados)
            BorrarContenido("Menu-finalizar")
        }

    }

    ContenedorCarrito = document.getElementById("Menu-carrito")
    const cardCarrito = document.createElement("div")
    cardCarrito.className = "position-relative d-inline-block"
    cardCarrito.innerHTML = `<button id="btn-Carrito" class="btn-carrito btn p-0 border-0 bg-transparent"><img id="btn-Carrito" src="./assets/img/carrito.webp" class="img-VerTop" > </button>
        <span id="span-Carrito" class="position-absolute bottom-0 start-100 translate-middle badge rounded-pill bg-warning d-none">0</span>`
    ContenedorCarrito.appendChild(cardCarrito)
    const btnCarrito = document.getElementById("btn-Carrito")
        btnCarrito.onclick = () => {
            window.location.href="./pages/carrito.html"
        }

}
// Verifico cuando arranca la pagina si hay algun elemento en el carrito
/// Renderizo verduras o toppings para mostrar en el menu post combo agregado   
//RenderMenu(Menu, CombosArmados)

ListenerCarrito()
