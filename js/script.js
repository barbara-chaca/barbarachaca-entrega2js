let productos = [];
let carrito = [];

// Obtener los productos del archivo JSON y cargarlos en la página
fetch(newFunction())
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(productos);
  });

function newFunction() {
  return "./js/productos.json";
}

function cargarProductos(listaProductos) {
  const productosSection = document.getElementById('productosSection');
  if (productosSection && listaProductos.length > 0) {
    listaProductos.forEach(producto => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="cardIndex card" style="width: 100%;">
          <img src=${producto.image} class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${producto.nombre}</h3>
            <p class="cardIndexText card-text">${producto.description}</p>
            <p>Precio por unidad: $ ${producto.precio}</p>
            <button type="button" id="${producto.id}" class="agregar-carrito btn btn-primary">Agregar al carrito</button>
            <button class="btn btn-danger eliminar-producto" data-id="1"  onclick="eliminarProducto(event, ${producto.id})">Eliminar</button>
          </div>
        </div>
      `;
      productosSection.appendChild(div);

      // Escuchar eventos de clic en botones de agregar al carrito
      const botonAgregarCarrito = div.querySelector(".agregar-carrito");
      botonAgregarCarrito.addEventListener("click", agregarAlCarrito);
    });
  }
}

// Cargar carrito desde el almacenamiento local si está disponible
if (localStorage.carrito) {
  carrito= JSON.parse(localStorage.carrito);

  //actualiza el storage
  actualizarProductosCarrito();
  actualizarNumeroCarrito()
  calcularTotal();


}


function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;

  const productoAgregado = productos.find(producto => producto.id === parseInt(idBoton));


  if (productoAgregado) {
   const productoEnCarrito= carrito.find(c => c.id === productoAgregado.id)

   if(productoEnCarrito){
    carrito.forEach(c =>{
      if( productoEnCarrito.id === c.id){
       c.cantidad++ 
      }
    })
   }else{
    productoAgregado.cantidad = 1
    carrito.push(productoAgregado)
   }


    //actualiza storage
    actualizarProductosCarrito();
    calcularTotal();
  } else {
    console.error('Producto no encontrado');
  }
  actualizarNumeroCarrito();
}

function actualizarNumeroCarrito() {

  const numeroCarrito = document.getElementById("numero-carrito");
  if (numeroCarrito) {
    let cantidad =  carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    numeroCarrito.innerText =cantidad;
    localStorage.setItem("cantidad-productos", numeroCarrito.innerText);
  }
}

function actualizarProductosCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularTotal() {
  const container = document.querySelector('.carrito-menu');
  const importeElemento = document.createElement('div');
  importeElemento.classList.add('.importe')

  let importeTotal = 0;
  carrito.forEach((producto) => {
    importeTotal += producto.precio * producto.cantidad;
  });



  if (importeElemento && container) {
    const checkIfExist = document.querySelector('.importe-total');
    console.log(checkIfExist)
    if(checkIfExist){
      const total= document.querySelector('.total')
      total.textContent=`$${importeTotal}`
    }else{

      importeElemento.innerHTML=`
      <div>
        <div class='importe-total'>
          <span>Total: </span>
          <span class="total">$${importeTotal}</span>
        </div>
        <button class='comprar-btn' onclick="finalizarComprar()">Comprar</button>
      </div>
    `
      container.appendChild(importeElemento);
    }
  }
}

const botonesEliminar = document.querySelectorAll(".eliminar-producto");
botonesEliminar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const idProducto = parseInt(boton.dataset.id);
    eliminarDelCarrito(idProducto);
  });
});

function eliminarDelCarrito(idProducto) {
  const index = carrito.findIndex((producto) => producto.id === idProducto);
  if (index !== -1) {
    carrito.splice(index, 1);
    actualizarProductosCarrito();
    calcularTotal();
  }
}

const botonCarrito= document.querySelector('.carrito-container')
botonCarrito.addEventListener('click', (event)=>{
  event.stopPropagation();

  const checkDiv=document.querySelector('.carrito-menu')
  if(carrito.length > 0 && !checkDiv){
    const div = document.createElement('div');

    div.classList.add('carrito-menu')


    carrito.forEach(producto =>{
      div.innerHTML += `

      <div class='carrito-menu-row' id='producto-${producto.id}'>
        <img src=${producto.image} class="carrito-menu-img"/>
        <span>${producto.nombre}</span>
        <span>$1200</span>
        <div class="carrito-contador-container">
          <button class="contador-restar" id=${`restar-${producto.id}`} onclick="modificarCantidadProducto(${producto.id}, 'restar')">-</button>
          <span id='cantidad-${producto.id}'>${producto.cantidad}</span>
          <button class="contador-sumar" id=${`sumar-${producto.id}`} onclick="modificarCantidadProducto(${producto.id}, 'sumar')">+</button>
        </div>
        <div class='borrar-producto-container' onclick="eliminarProducto(event, ${producto.id})">
          <img src="./imgs/deleteIcon.png" class='borrar-producto-icon'>
        </div>
      </div>
    `;
    })
    botonCarrito.appendChild(div)
    calcularTotal()
    document.addEventListener('click', cerrarCarrito);
  }else if (checkDiv){ 
    if (!checkDiv.contains(event.target)) {
      checkDiv.remove();
    }
  }
})
function cerrarCarrito(event) {
  const checkDiv = document.querySelector('.carrito-menu');

  if (checkDiv && event.target !== botonCarrito && !checkDiv.contains(event.target)) {
    checkDiv.remove(); // Remove the cart from the DOM
    document.removeEventListener('click', cerrarCarrito); // Remove the event listener
  }
}

function modificarCantidadProducto(productId, operacion) {

  const productIndex = carrito.findIndex(producto => producto.id === productId);

  if (productIndex !== -1) {
    if(operacion === 'sumar'){
      carrito[productIndex].cantidad+= 1;
    }else{
      carrito[productIndex].cantidad -= 1;
    }
    const cantidadElement = document.querySelector(`#cantidad-${productId}`);
    if (cantidadElement) {
      actualizarProductosCarrito();
      actualizarNumeroCarrito()
      calcularTotal()
      
      
      cantidadElement.textContent =  carrito[productIndex].cantidad;
    }
  }

}
function eliminarProducto(event, productId) {
  event.stopPropagation()
  // Find the index of the product with the given productId in the carrito array
  const productIndex = carrito.findIndex(producto => producto.id === productId);

  // Check if the product exists in the carrito array
  if (productIndex !== -1) {
    // Remove the product from the carrito array
    carrito.splice(productIndex, 1);
    actualizarProductosCarrito();
    actualizarNumeroCarrito()
    calcularTotal()
    // Update the display to reflect the removal of the product
    const productElement = document.querySelector(`#producto-${productId}`);
    if (productElement) {
      productElement.remove();
    }
  }
}

function finalizarComprar(){
  carrito = []
  const total= document.querySelector('.numero-carrito')
  total.textContent="0"

  const s=document.querySelector('.carrito-menu')
  s.remove()
  actualizarProductosCarrito()
  calcularTotal()
  Swal.fire({
    text: 'Compra Finalizada',
    icon: 'success',
    confirmButtonText: 'Ok'
  })
}
