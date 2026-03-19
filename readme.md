#  SIMULADOR DE PEDIDOS DE HAMBURGUESAS DE TABOADA GABRIEL 

-Este proyecto es un **simulador** de pedido de hamburguesas.
Para simular una base de datos uso **localStorage**. Uso las claves pedidos (son todos los pedidos,aca es donde guardo el estado de cada pedido, lo utilizo para poder relacionarlo con los combos) y combosTotal (son todos los combos, cada combo tiene un idPedido, con este idPedido puedo relacionarlo con lo que seria la tabla pedidos.). Esto lo hice para poder utilizar la "busqueda de pedidos" que me sirve para saber el estado.

-El proyecto arranca haciendo click en Nuevo pedido. Ahi selecciono la hamburguesa, una vez seleccionada me abre un menu para seleccionar la verdura, y al poner continuar me abre un menu para seleccionar los toppings. En el caso de estar en los menu de seleccion de verduras o seleccion de toppings, al hacer click en un combo o en el paso anterior, siempre me borra y vuelvo a comenzar.
Una vez confirmado, se agrega al carrito y vuelve al inicio, ahi puedo agregar combos o puedo ir al carrito (seleccionando el icono carrito). 

-En cualquier momento del proceso, al tocar "nuevo pedido" consulta si el carrito esta vacio o tiene combos, en el caso de contener combos pregunta si desea continuar y en ese caso vacia el carrito.

-En el carrito se puede modificar los adicionales ( verduras y toppings ). y tambien se puede agregar o restar el mismo combo.

-Una vez confirmado el pedido, pasa al formulario para el envio (finalizar.html)

-Simule un administrador en **./admin/index.html** 
En este administrador la idea es modificar el estado del pedido, para que el cliente, ingresando el numero de pedido pueda realizar la busqueda del mismo.




