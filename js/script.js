document.addEventListener('DOMContentLoaded', function() {
    const carrito = [];

    const productos = [
        { nombre: 'Alfajor de chocolate', precio: 1200 },
        { nombre: 'Alfajor de chocolate blanco', precio: 1200 },
        { nombre: 'Alfajor de fruta', precio: 1200 },
        { nombre: 'Alfajor de nuez', precio: 1200 },
        { nombre: 'Alfajor de maicena', precio: 1200 },
        { nombre: 'Alfajor de mousse', precio: 1200 },
        { nombre: 'Conito de chocolate', precio: 1000 },
        { nombre: 'Conito de chocolate blanco', precio: 1000 },
        { nombre: 'Conito de cacao', precio: 1000 }
    ];

    const botonAgregarCarrito = document.querySelectorAll('.btn.btn-primary');

    botonAgregarCarrito.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(index);
            calcularTotal();
        });
    });

    function agregarAlCarrito(index) {
        const producto = productos[index];
        if (producto.nombre.includes('Alfajor')) {
            carrito.push({ ...producto, tipo: 'alfajor' });
        } else if (producto.nombre.includes('Conito')) {
            carrito.push({ ...producto, tipo: 'conito' });
        }
        actualizarProductosCarrito();
    }

    function actualizarProductosCarrito() {
        const unidadesProductos = document.querySelector('.productos');
        unidadesProductos.textContent = carrito.length;
    }

    function calcularTotal() {
        const importeTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
        const importeElemento = document.querySelector('.importe');
        importeElemento.textContent = `$${importeTotal.toFixed(2)}`;
    }
});
