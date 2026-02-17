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
function RenderAdicionales(tipoAdicional, adicional) {
    const divAdicionales = document.createElement("div")
    const imgAdicionales = document.createElement("img")
    const LabelAdicionales = document.createElement("label")
    LabelAdicionales.htmlFor = adicional
    LabelAdicionales.textContent = adicional
    switch (tipoAdicional) {
        case "verdura": imgAdicionales.src = ObtenerFotoVerdura(adicional)
            break
        case "topping": imgAdicionales.src = ObtenerFotoTopping(adicional)
            break
    }

    imgAdicionales.className = "img-VerTop mx-2"
    divAdicionales.appendChild(imgAdicionales)
    divAdicionales.appendChild(LabelAdicionales)
    return divAdicionales
}
function ObtenerFotoTopping(Topping) {
    let src = ""
    switch (Topping) {

        case "Cebolla caramelizada":
            src = "../assets/img/cebolla-caramelizada.webp"
            break
        case "Huevo frito":
            src = "../assets/img/huevo-frito.webp"
            break
        case "Panceta":
            src = "../assets/img/bacon.webp"
            break

        default:
    }
    return src
}

/// Uso esta function para asignar la ruta de la foto de cada Verdura
function ObtenerFotoVerdura(Verdura) {
    let src = ""
    switch (Verdura) {
        case "Lechuga":
            src = "../assets/img/lechuga.webp"
            break
        case "Tomate":
            src = "../assets/img/tomate.webp"
            break
        case "Cebolla":
            src = "../assets/img/cebolla.webp"
            break
        case "Rúcula":
            src = "../assets/img/rucula.webp"
            break
        case "Pepino":
            src = "../assets/img/pepino.webp"
            break
        case "Morron":
            src = "../assets/img/morron.webp"
            break
        default:
    }
    return src
}
/// Uso esta function para asignar la ruta de la foto de cada Combo
function ObtenerFotoCombo(NombreCombo) {
    let src = ""
    switch (NombreCombo) {
        case "CheeseBurger":
            src = "../assets/img/cheese-burger.webp"
            break
        case "BlueBurger":
            src = "../assets/img/blue-burger.webp"
            break
        case "VeganBurger":
            src = "../assets/img/vegan-burger.webp"
            break
        case "BaconBurger":
            src = "../assets/img/bacon-burger.webp"
            break
        default:
    }
    return src
}
//recupero el id del pedido
function RenderCarrito(){
    const Pedidos = JSON.parse(localStorage.getItem("pedidos"))
    const idPedido = localStorage.getItem("PedidoActual")
    console.log(Pedidos)
    let ComboPedido=[]
    if(idPedido){

        const ContenedorCarrito = document.getElementById("carrito")
        Pedidos.forEach(pedido => {
            const idComboPedido = pedido.idcombopedido
            ComboPedido = CombosArmados.find(combo => combo.id === parseInt(idComboPedido))

            console.log(ComboPedido)
            
            const filaCarrito =document.createElement("div")

            const cardCarrito = document.createElement("div")
            const imgCarrito = document.createElement("img")
            cardCarrito.className = "d-flex justify-content-between align-items-center"
            const LabelCarrito = document.createElement("label")
            LabelCarrito.htmlFor = ComboPedido.nombre
            LabelCarrito.textContent = ComboPedido.nombre
            imgCarrito.src = ObtenerFotoCombo(ComboPedido.nombre)
            imgCarrito.className = "img-combo mx-2"
            cardCarrito.appendChild(imgCarrito)
            cardCarrito.appendChild(LabelCarrito)
            filaCarrito.appendChild(cardCarrito)
        /// Agrego Verduras y toppings

            const cardAdicionales = document.createElement("div")
            cardAdicionales.className = "d-flex justify-content-between align-items-center"

            const VerdurasDelObjeto = [pedido.verdura1, pedido.verdura2, pedido.verdura3]
            const ToppingsDelObjeto = [pedido.toppings1, pedido.toppings2, pedido.toppings3]
            
            for (const verdura of VerdurasDelObjeto) {
                if (verdura) {
                    const render = RenderAdicionales("verdura", verdura)
                    cardAdicionales.appendChild(render)
                }
            }
            filaCarrito.appendChild(cardAdicionales)
            for (const topping of ToppingsDelObjeto) {
                if (topping) {
                    const render = RenderAdicionales("topping", topping)
                    cardAdicionales.appendChild(render)
                }

            }
            filaCarrito.appendChild(cardAdicionales)
            /// renderizo el precio
            const cardprecio = document.createElement("div")
            cardprecio.className = "d-flex justify-content-between align-items-center"
            cardprecio.innerHTML = `<p class="tituloPrecio"> Precio del combo </p>
                                    <p class ="precio">$ ${pedido.precio}</p>`
            filaCarrito.appendChild(cardprecio)

            ContenedorCarrito.appendChild(filaCarrito)

        } )
    }    
}
RenderCarrito()