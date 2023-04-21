//$(document).ready(function() { ... }): es una función en jQuery que se ejecuta cuando el documento HTML está completamente cargado y listo para ser manipulado por el código JavaScript. En otras palabras, esta función se utiliza para asegurarse de que el código JavaScript no se ejecute hasta que se hayan cargado todos los elementos de la página HTML, como imágenes y otros recursos.
/*
-----------------------------------------------
NOTA
Es importante utilizar $(document).ready() o $(function() { ... }) para garantizar que el código JavaScript se ejecute correctamente en todas las situaciones, especialmente si estás trabajando con elementos de la página que tardan en cargarse o si estás cargando datos de forma asíncrona.
-----------------------------------------------
$(document).ready(function() { 

 })*/
// Pero hay una forma mas abreviada de hacerlo 
$(function () {
    /*
    -----------------------------------------------
    NOTA
    El DOM: Es una representacion en memoria del documento HTML de una pagina web,que permite a los programas JavaScript interactuar con los elementos de la página y modificarlos dinámicamente.
    El DOM: Es la forma en que los programas JavaScript pueden interactuar con la página web.
    $('#formulario'): Es una función de jQuery que busca un elemento en el DOM con id="formulario". Cuando la encuentra, devuelve un objeto jQuery que representa ese elemento
    -----------------------------------------------
    */
    // Obtener los elementos del DOM que se van a utilizar
    let form = $('#form');
    let cantidadMonopolio = $('#cantidad-monopolio');
    let cantidadAjedrez = $('#cantidad-ajedrez');
    let cantidadLego = $('#cantidad-lego');
    let cantidadDama = $('#cantidad-dama');
    let cantidadLaberinto = $('#cantidad-laberinto');

    let cantidadTotal = $('#cantidad-total');
    let importeCompra = $('#importe-compra');
    let descuento = $('#descuento');
    let importeTotal = $('#importe-total');

    // Asignar una función al evento submit del formulario
    // form es un objeto jQuery que representa al formulario en la pagina web
    // el metodo submit agrega un evento de escucha al formulario que se activa cuando el form se envia
    // evento representa el evento de envio del formulario y se utiliza para agregar un comportamiento personalizado cuando se envia
    form.submit(function (evento) {
        // Evitar que se envíe el formulario y se recargue la página (METODO AJAX)
        evento.preventDefault();
        // Obtener las cantidades de juguetes ingresadas por el usuario
        // Crea un objeto cantidades con 5 propiedades
        // Cada una de estas propiedades se inicializa con un valor entero obtenido de la conversión a entero de la cadena de texto ingresada por el usuario en un campo de entrada de cantidad correspondiente, o 0 si no se ingresó nada en ese campo de entrada.
        let cantidades = {
            // Creando 5 propiedades con sus valores
            // parseInt() convierte el valor de la entrada de texto a uno entero
            // || devuelve el primer operando si es verdadero y el segundo operando si el primer operando es falso.
            // .val() es una funcion de jquery, se utiliza para obtener o establecer el valor de un elemento
            monopolio: parseInt(cantidadMonopolio.val() || 0),
            ajedrez: parseInt(cantidadAjedrez.val() || 0),
            lego: parseInt(cantidadLego.val() || 0),
            dama: parseInt(cantidadDama.val() || 0),
            laberinto: parseInt(cantidadLaberinto.val() || 0)
            // Por lo tanto si el usuario no ah ingresado ningun valor en el campo, la expresion cantidadMonopolio.val() || 0 devolverá 0.
            // Pero si el usuario ha ingresado un valor numerico, cantidadMonopolio.val() devolverá una cadena de texto que parseInt() convertirá en un número entero. 
            // En conclusion este código convierte la entrada de texto cantidadMonopolio a un número entero, o 0 si no se ingresó nada.
        };
        // Calcular la cantidad total de juguetes
        let cantidadTotalJuguetes = 0;
        // Aca veremos for in
        // for in: se utiliza para iterar a través de las propiedades de un objeto
        // Aca se esta iterando a travez de las propiedades de un objeto, que en este caso vendria ser cantidades
        // cantidades es el objeto a través del cual estamos iterando y juguete es la variable que se utiliza para representar cada propiedad del objeto en cada iteración.
        for (let juguete in cantidades) {
            // Cuerpo del bucle
            //  suma el valor de cada propiedad del objeto cantidades en cada iteración y lo asigna a la variable cantidadTotalJuguetes.
            // el operador += se utiliza para agregar un valor a una variable existente de una manera abreviada. En el código mencionado, se utiliza para agregar el costo total de cada juego al importe total de la compra sin descuento. Es una forma concisa de escribir una expresión de asignación que incluye una operación de adición.
            cantidadTotalJuguetes += cantidades[juguete];
        }
        // Esta línea de código establece el valor del elemento de formulario referenciado por cantidadTotal con el valor de cantidadTotalJuguetes
        cantidadTotal.val(cantidadTotalJuguetes);
        // Calcular el importe de compra sin descuento
        let importeCompraSinDescuento = 0;//se inicia con valor 0
        // A la variable importeCompraSinDescuento va ser la suma de todos 
        importeCompraSinDescuento += cantidades.monopolio * 70.99;
        importeCompraSinDescuento += cantidades.ajedrez * 78.99;
        importeCompraSinDescuento += cantidades.lego * 100.99;
        importeCompraSinDescuento += cantidades.dama * 58.50;
        importeCompraSinDescuento += cantidades.laberinto * 35.00;
        // El método toFixed(2) se utiliza para redondear el importe total de la compra sin descuento a dos decimales. De esta manera, se asegura que el valor asignado al elemento HTML tenga un formato de dos decimales, lo que puede ser más legible para el usuario.
        // El método .val() es una función de jQuery que se utiliza para establecer el valor de un elemento de formulario. En este caso, se establece el valor del elemento HTML con el identificador importeCompra al importe total de la compra sin descuento que ha sido redondeado a dos decimales.
        importeCompra.val(importeCompraSinDescuento.toFixed(2));

        // Calcular el descuento a aplicar
        // Se crea la variable: descuentoAplicar
        let descuentoAplicar = 0;//se inicia con valor de 0
        // El primer bloque se ejecutará si la cantidad total de juguetes comprados es menor que 10. En este caso, se establece el valor de la variable descuentoAplicar en 0.035, lo que significa que se aplicará un descuento del 3.5% a la compra.
        if (cantidadTotalJuguetes < 10) {
            descuentoAplicar = 0.035;
            // El segundo bloque se ejecutará si la cantidad total de juguetes comprados está entre 10 y 20 (inclusive). En este caso, se establece el valor de la variable descuentoAplicar en 0.07, lo que significa que se aplicará un descuento del 7% a la compra.
        } else if (cantidadTotalJuguetes >= 10 && cantidadTotalJuguetes <= 20) {
            descuentoAplicar = 0.07;
            // El tercer bloque se ejecutará si la cantidad total de juguetes comprados es mayor que 20. En este caso, se establece el valor de la variable descuentoAplicar en 0.095, lo que significa que se aplicará un descuento del 9.5% a la compra.
        } else {
            descuentoAplicar = 0.095;
        }
        // Después de determinar el descuento que se debe aplicar, se actualiza el valor del elemento HTML con el identificador descuento para mostrar el porcentaje de descuento que se aplicará a la compra. La línea de código descuento.val((descuentoAplicar * 100) + '%'); establece el valor del elemento HTML con el identificador descuento al porcentaje de descuento que se ha calculado multiplicado por 100 y concatenado con el símbolo de porcentaje (%). Por ejemplo, si el valor de descuentoAplicar es 0.07, entonces el valor del elemento HTML con el identificador descuento se establecerá en 7%.
        descuento.val((descuentoAplicar * 100) + '%');

        // Calcular el importe de descuento
        // Este código calcula el importe de descuento que se aplicará a la compra en función del importe de compra sin descuento (importeCompraSinDescuento) y el porcentaje de descuento que se debe aplicar (descuentoAplicar). La variable importeDescuento se inicializa con el resultado de multiplicar importeCompraSinDescuento por descuentoAplicar.
        let importeDescuento = importeCompraSinDescuento * descuentoAplicar;
        // utiliza el método toFixed() para redondear el resultado del cálculo a dos decimales. Este método toma un número decimal y devuelve una cadena que representa el número con una cantidad específica de decimales. En este caso, se establece que se muestren dos decimales.
        importeDescuento = importeDescuento.toFixed(2);

         // Calcular el importe total a pagar
        //  Este código calcula el importe total a pagar después de aplicar el descuento a la compra. Para ello, resta el importe de la compra sin descuento (importeCompraSinDescuento) al importe del descuento calculado previamente (importeDescuento). El resultado se almacena en la variable importeTotalPagar.
         var importeTotalPagar = importeCompraSinDescuento - importeDescuento;
        //  Al igual que antes, el método toFixed() se utiliza para redondear el resultado a dos decimales, y luego se asigna el valor redondeado a la variable importeTotalPagar. Finalmente, el valor redondeado se muestra en la pantalla del usuario a través del elemento HTML con id importeTotal utilizando el método val().
         importeTotal.val(importeTotalPagar.toFixed(2));


    })



})