function CrearPedido(){
    let combos = []
    let seleccion = parseInt(prompt("::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n4 => Volver al menu anterior"))
    while(seleccion !== 4){
        switch(seleccion){
            case 1 :
                combos.push("CheeseBurger") 
                break
            case 2 :
                combos.push("BlueBurger")
                break
            case 3 :
                combos.push("VeganBurger")
                break
            default : 
                alert("Selección incorrecta")    
        }
        if((seleccion > 0) && (seleccion <4))
            seleccion = parseInt(prompt("¿Desea agregar otro combo a su pedido?\n::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n4 => Volver al menu anterior"))
            else
                seleccion = parseInt(prompt("::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n4 => Volver al menu anterior"))
    }
    return combos
}
function ProcesarPedido(combos){
    let importe = 0

    for (combo of combos){
        switch(combo){
            case "CheeseBurger" :
                importe = importe + 18000
                break
            case "BlueBurger" :
                importe = importe + 19500
                break
            case "VeganBurger" :
                importe = importe + 18750
                break 
        }
    }
    return importe
}
function MostrarPedido(combos,importe){
    let mensaje =""
    for (combo of combos){
        mensaje += combo+"\n"
    }
    if( importe != 0)
        mensaje += "\n :::: IMPORTE TOTAL :::: \n$"+importe
    else
        mensaje += "No selecciono ningun combo. Carrito vacio"
    alert(mensaje)
}
let combos = []
let menu = parseInt(prompt("Ingrese 1 para hacer un nuevo pedido \nIngrese 2 para ver su pedido \nIngrese 3 para salir"))

while ( menu !== 3 ){
    switch (menu){
        case 1 :
            combos = CrearPedido()
            console.log("combos pedidos")
            console.log(combos)
            let importe = ProcesarPedido(combos)
            console.log("importe total "+importe)
            MostrarPedido(combos,importe)
            break
        case 2 :
            let buscarPedido = parseInt(prompt("Ingrese el numero de pedido que desea buscar"))
            
            console.log("ver pedido")
            break
        default :
            alert("Opción incorrecta")
    }

    menu = parseInt(prompt("Ingrese 1 para hacer un nuevo pedido \nIngrese 2 para ver su pedido \nIngrese 3 para salir"))
}
