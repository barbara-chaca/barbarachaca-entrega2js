document.addEventListener('DOMContentLoaded', function() {
    const carrito = [];

    const productos = [
        { id: 1, nombre: 'Alfajor de chocolate', precio: 1200 },
        { id: 2, nombre: 'Alfajor de chocolate blanco', precio: 1200 },
        { id: 3, nombre: 'Alfajor de fruta', precio: 1200 },
        { id: 4, nombre: 'Alfajor de nuez', precio: 1200 },
        { id: 5, nombre: 'Alfajor de maicena', precio: 1200 },
        { id: 6, nombre: 'Alfajor de mousse', precio: 1200 },
        { id: 7, nombre: 'Conito de chocolate', precio: 1000 },
        { id: 8, nombre: 'Conito de chocolate blanco', precio: 1000 },
        { id: 9, nombre: 'Conito de cacao', precio: 1000 }
    ];

    // Cargar carrito desde el almacenamiento local si está disponible
    if (localStorage.carrito) {
        const carritoGuardado = JSON.parse(localStorage.carrito);
        carrito.push(...carritoGuardado);
        actualizarProductosCarrito();
        calcularTotal();
    }

    // Escuchar eventos de clic en botones de agregar al carrito
    const botonAgregarCarrito = document.querySelectorAll('.btn.btn-primary');
    
    botonAgregarCarrito.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(index);
            calcularTotal();
        });
    });

    // Agregar un producto al carrito
    function agregarAlCarrito(index) {
        const producto = productos[index];
        carrito.push(producto);
        console.log('Producto agregado al carrito:', producto);
        actualizarProductosCarrito();
    }

    // Actualizar la cantidad de productos en el carrito y guardar en el almacenamiento local
    function actualizarProductosCarrito() {
        const unidadesProductos = document.querySelector('.productos');
        unidadesProductos.textContent = carrito.length;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Carrito actualizado:', carrito);
    }

    // Calcular el importe total del carrito y actualizar el precio mostrado
    function calcularTotal() {
        let importeTotal = 0;
        carrito.forEach(producto => {
            importeTotal += producto.precio;
        });
        const importeElemento = document.querySelector('.importe');
        importeElemento.textContent = `$${importeTotal}`;
    }

    // Event listener para botones de "eliminar"
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const idProducto = parseInt(boton.dataset.id);
            eliminarDelCarrito(idProducto);
            calcularTotal();
        });
    });

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(idProducto) {
        const index = carrito.findIndex(producto => producto.id === idProducto);
        if (index !== -1) {
            carrito.splice(index, 1);
            actualizarProductosCarrito();
        }
    }
});
