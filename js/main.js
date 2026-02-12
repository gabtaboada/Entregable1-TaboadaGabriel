// correcion nombres variables camelCase. Poner mayusculas primer letra
function CrearPedido(){
    let Combos = []
    let Seleccion = parseInt(prompt("::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n\n4 => Finalizar pedido "))
    while(Seleccion !== 4){
        switch(Seleccion){
            case 1 :
                Combos.push("CheeseBurger") 
                alert("combo agregado")
                break
            case 2 :
                Combos.push("BlueBurger")
                alert("combo agregado")
                break
            case 3 :
                Combos.push("VeganBurger")
                alert("combo agregado")
                break
            default : 
                alert("Selección incorrecta")    
        }
        console.log(Combos)
        if(Combos.length)
            {
                Seleccion = parseInt(prompt("¿Desea agregar otro combo a su pedido?\n::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n\n4 => Finalizar pedido"))
            }
            else{
                Seleccion = parseInt(prompt("::: Seleccione el combo :::\n\n1 => CheeseBurger :: $18000\n2 => BlueBurger :: $19500\n3 => VeganBurger :: $18750 \n\n4 => Finalizar pedido"))
            }

    }
    console.log("return funcion crear pedido")
    console.log(Combos)
    return Combos
}
function ProcesarPedido(Combos){
    let Importe = 0

    for (const Combo of Combos){/// correcion del profe, agregar el const. for (const combo of combos) {}
        switch(Combo){
            case "CheeseBurger" :
                Importe = Importe + 18000
                break
            case "BlueBurger" :
                Importe = Importe + 19500
                break
            case "VeganBurger" :
                Importe = Importe + 18750
                break 
        }
    }
    console.log("return funcion procesar pedido , importe : "+Importe)
    return Importe
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

let Combos = []
let Menu = parseInt(prompt("Ingrese 1 para hacer un nuevo pedido \nIngrese 2 para ver su pedido \nIngrese 3 para salir"))
let Importe = 0
let Id = 1
while ( Menu !== 3 ){
    switch (Menu){
        case 1 :
            Combos = CrearPedido()
            Importe = ProcesarPedido(Combos)
            MostrarPedido(Combos,Importe,Id)
            if (Importe != 0)
                Id = Id + 1
            break
        case 2 :
            alert ("Esta función estara disponible proximamente")
            
            break
        default :
            alert("Opción incorrecta")
    }

    Menu = parseInt(prompt("Ingrese 1 para hacer un nuevo pedido \nIngrese 2 para ver su pedido \nIngrese 3 para salir"))
}
