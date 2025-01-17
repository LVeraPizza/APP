// Función para cargar el carrito desde localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    }
    return {};
}

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Objeto para almacenar la información del carrito
let cart = loadCart(); // Cargar el carrito al inicio

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = Object.values(cart).reduce((sum, product) => sum + product.quantity, 0);

    // Actualizar el contador del carrito o ocultarlo si está en 0
    if (totalItems === 0) {
        cartCountElement.textContent = '';
        cartCountElement.style.display = 'none';
    } else {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = 'flex';
    }
}

// Función para actualizar el carrito
function updateCart(productName, price, quantity) {
    if (quantity > 0) {
        cart[productName] = { price: price, quantity: quantity }; // Almacenar el precio y la cantidad
    } else {
        delete cart[productName]; // Eliminar el producto si la cantidad es 0
    }

    saveCart(); // Guardar el carrito actualizado
    updateCartCount(); // Actualizar el contador en tiempo real
}

// Ejemplo de funciones para aumentar y disminuir cantidad
function increaseQuantity(productName) {
    const quantityInput = document.getElementById(productName);
    let quantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = quantity;

    const price = getProductPrice(productName); // Función que retorna el precio
    updateCart(productName, price, quantity); // Actualiza el carrito
}

function decreaseQuantity(productName) {
    const quantityInput = document.getElementById(productName);
    let quantity = parseInt(quantityInput.value) - 1;

    if (quantity < 0) quantity = 0; // Evitar cantidades negativas
    quantityInput.value = quantity;

    const price = getProductPrice(productName); // Función que retorna el precio
    updateCart(productName, price, quantity); // Actualiza el carrito
}

// Ejemplo de función que obtiene el precio de un producto
function getProductPrice(productName) {
    const prices = {
        "Pizza Margherita": 8000,
        "Pizza Pepperoni": 9000,
        "Pizza 4Formaggi": 10000,
        "Pizza Rúcula y Jamon Crudo": 9000,
        "Pizza Caprese": 9000,
        "Pizza Mortadela con pistacho": 9000,
        "Focaccia Mortadela": 8000,
        "Focaccia Rucula y JC": 8000,
        "Panini Rucula y JC": 8000,
        "Calzone Clasico": 7000,
        "3 X 2": 20000,//promocion 1
        "1 Rucula y jC + 1 Pepperoni": 16000, //promocion 2
        "1 Margherita + 1 Focaccia": 14000, // promocion 3
        "2 Pizzas Margheritas": 14000, // promocion puntos
        "Pizza Romana Caprese": 10000,
        "Pizza Romana 4Formaggi": 11000,
        "Pizza Romana Rucula": 10000,
        "Pizza Romana Pepperoni": 10000,
        "Pizza Romana Margherita": 9000,
    };
    return prices[productName] || 0; // Retorna 0 si el producto no está definido
}

// Inicializar el carrito y contador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); // Actualiza el contador al iniciar la página
    // Asegúrate de que los campos de cantidad en la UI reflejen los valores en el carrito
    updateQuantityFields(); // Debes implementar esta función si no la tienes
});

// Función para actualizar los campos de cantidad en el HTML al cargar la página
function updateQuantityFields() {
    for (const productName in cart) {
        const quantityInput = document.getElementById(productName);
        if (quantityInput) {
            quantityInput.value = cart[productName].quantity; // Actualiza el valor en el input
        }
    }
}



