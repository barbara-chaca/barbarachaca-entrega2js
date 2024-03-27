document.addEventListener("DOMContentLoaded", function () {
  const carrito = [];

  const productos = [
    {
      id: 1,
      nombre: "Alfajor de chocolate",
      precio: 1200,
      image: "../imgs/choconegro.png",
      description:
        "Dos galletitas rellenas con dulce de leche y cubiertas con chocolate semiamargo.",
    },
    {
      id: 2,
      nombre: "Alfajor de chocolate blanco",
      precio: 1200,
      image: "../imgs/chocoblanco.png",
      description:
        "Alfajor cubierto de chocolate blanco relleno de dulce de leche.",
    },
    {
      id: 3,
      nombre: "Alfajor de fruta",
      precio: 1200,
      image: "../imgs/fruta.png",
      description:
        "Dos galletitas rellenas con mermelada de membrillo, cubiertas con una capa de merengue.",
    },
    {
      id: 4,
      nombre: "Alfajor de nuez",
      precio: 1200,
      image: "../imgs/nuez.png",
      description:
        "Dos galletitas rellenas con mermelada de membrillo, cubiertas con una capa de merengue.",
    },
    {
      id: 5,
      nombre: "Alfajor de maicena",
      precio: 1200,
      image: "../imgs/maicena.png",
      description:
        "Las más suaves galletitas de maicena rellenas con una generosa porción de  dulce de leche y una lluvia de coco rayado para coronar.",
    },
    {
      id: 6,
      nombre: "Alfajor de mousse",
      precio: 1200,
      image: "../imgs/mousse.png",
      description:
        "Dos galletitas rellenas de un suave y delicioso mousse de chocolate, bañadas en chocolate con leche.",
    },
    {
      id: 7,
      nombre: "Conito de chocolate",
      precio: 1000,
      image: "../imgs/cononegro.png",
      description:
        "Delicado bocadito de dulce de leche, cubierto con el más suave chocolate semiamargo.",
    },
    {
      id: 8,
      nombre: "Conito de chocolate blanco",
      precio: 1000,
      image: "../imgs/conoblanco.png",
      description:
        "Delicado bocadito de dulce de leche, cubierto con el más suave chocolate blanco.",
    },
    {
      id: 9,
      nombre: "Conito de cacao",
      precio: 1000,
      image: "../imgs/conocacao.png",
      description:
        "Delicado bocadito de dulce de leche, cubiertos con doble capa de chocolate 70% cacao puro.",
    },
  ];
  const productsSection = document.getElementById("productosSection");

  productos.forEach((producto) => {
    const cardElement = document.createElement("div");
    cardElement.innerHTML = `
                <div class="cardIndex card" style="width: 100%;">
                    <img src=${producto.image} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${producto.nombre}</h3>
                        <p class="cardIndexText card-text">${producto?.description}</p>
                        <p>Precio por unidad: $ ${producto.precio}</p>
                        <button type="button" class="btn btn-primary">Agregar al carrito</button>
                        <button class="btn btn-danger eliminar-producto" data-id="1">Eliminar</button>
                    </div>
                </div>
    `;

    productsSection.appendChild(cardElement);
  });

  // Cargar carrito desde el almacenamiento local si está disponible
  if (localStorage.carrito) {
    const carritoGuardado = JSON.parse(localStorage.carrito);
    carrito.push(...carritoGuardado);
    actualizarProductosCarrito();
    calcularTotal();
  }

  // Escuchar eventos de clic en botones de agregar al carrito
  const botonAgregarCarrito = document.querySelectorAll(".btn.btn-primary");

  botonAgregarCarrito.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      agregarAlCarrito(index);
      calcularTotal();
    });
  });

  // Agregar un producto al carrito
  function agregarAlCarrito(index) {
    const producto = productos[index];
    carrito.push(producto);
    console.log("Producto agregado al carrito:", producto);
    actualizarProductosCarrito();
  }

  // Actualizar la cantidad de productos en el carrito y guardar en el almacenamiento local
  function actualizarProductosCarrito() {
    const unidadesProductos = document.querySelector(".productos");
    unidadesProductos.textContent = carrito.length;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Carrito actualizado:", carrito);
  }

  // Calcular el importe total del carrito y actualizar el precio mostrado
  function calcularTotal() {
    let importeTotal = 0;
    carrito.forEach((producto) => {
      importeTotal += producto.precio;
    });
    const importeElemento = document.querySelector(".importe");
    importeElemento.textContent = `$${importeTotal}`;
  }

  // Event listener para botones de "eliminar"
  const botonesEliminar = document.querySelectorAll(".eliminar-producto");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const idProducto = parseInt(boton.dataset.id);
      eliminarDelCarrito(idProducto);
      calcularTotal();
    });
  });

  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(idProducto) {
    const index = carrito.findIndex((producto) => producto.id === idProducto);
    if (index !== -1) {
      carrito.splice(index, 1);
      actualizarProductosCarrito();
    }
  }
});
