function CrearPedido(){
    let combos = []
    let seleccion = parseInt(prompt("::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n\n4 => Finalizar pedido "))
    while(seleccion !== 4){
        switch(seleccion){
            case 1 :
                combos.push("CheeseBurger") 
                alert("combo agregado")
                break
            case 2 :
                combos.push("BlueBurger")
                alert("combo agregado")
                break
            case 3 :
                combos.push("VeganBurger")
                alert("combo agregado")
                break
            default : 
                alert("Selección incorrecta")    
        }
        console.log(combos)
        if(combos.length)
            {
                seleccion = parseInt(prompt("¿Desea agregar otro combo a su pedido?\n::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n\n4 => Finalizar pedido"))
            }
            else{
                seleccion = parseInt(prompt("::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n\n4 => Finalizar pedido"))
            }

    }
    console.log("return funcion crear pedido")
    console.log(combos)
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
    console.log("return funcion procesar pedido , importe : "+importe)
    return importe
}
function MostrarPedido(combos,importe,id){
    let mensaje =""
    if( importe != 0){

        let direccion = prompt("Ingrese su dirección")
        mensaje += "Numero de pedido : "+id+"\n\n"
        mensaje +="Combos seleccionados\n\n"
        for (combo of combos){
            mensaje += "* "+combo+"\n"
        }
        mensaje += "\n\n :::: IMPORTE TOTAL :::: \n$"+importe
        mensaje += "\n\nDirección : "+direccion
    }
    else
        mensaje += "No selecciono ningun combo. Carrito vacio"
    alert(mensaje)
}

let combos = []
let menu = parseInt(prompt("Ingrese 1 para hacer un nuevo pedido \nIngrese 2 para ver su pedido \nIngrese 3 para salir"))
let importe = 0
let Id = 1
while ( menu !== 3 ){
    switch (menu){
        case 1 :
            combos = CrearPedido()
            importe = ProcesarPedido(combos)
            MostrarPedido(combos,importe,Id)
            if (importe != 0)
                Id = Id + 1
            break
        case 2 :
            alert ("Esta función estara disponible proximamente")
            
            break
        default :
            alert("Opción incorrecta")
    }

    menu = parseInt(prompt("Ingrese 1 para hacer un nuevo pedido \nIngrese 2 para ver su pedido \nIngrese 3 para salir"))
}
