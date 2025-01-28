let products = [];
let cart = {};


function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

async function loadProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=20');
        products = await response.json();
        
        if (window.location.pathname.includes('panier.html')) {
            displayCartPage();
        } else {
            displayProducts();
        }
    } catch (error) {
        console.error('Erreur de chargement:', error);
        const container = document.querySelector('#products, #cart-items');
        if (container) {
            container.innerHTML = '<p class="error-message">Erreur de chargement. Veuillez réessayer.</p>';
        }
    }
}

function displayProducts() {
    const productsContainer = document.getElementById('products');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price.toFixed(2)}€</p>
                <div class="product-controls">
                    ${cart[product.id] ? `
                        <div class="quantity-controls">
                            <button onclick="removeFromCart(${product.id})" class="btn">-</button>
                            <span class="quantity">${cart[product.id]}</span>
                            <button onclick="addToCart(${product.id})" class="btn">+</button>
                        </div>
                    ` : `
                        <button onclick="addToCart(${product.id})" class="btn btn-primary">
                            Ajouter au panier
                        </button>
                    `}
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

function displayCartPage() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        updateCartSummary();
        return;
    }

    cartItems.innerHTML = '';
    Object.entries(cart).forEach(([productId, quantity]) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${product.title}</h3>
                    <p class="cart-item-price">${product.price.toFixed(2)}€</p>
                    <div class="quantity-controls">
                        <button onclick="removeFromCart(${product.id})" class="btn">-</button>
                        <span class="quantity">${quantity}</span>
                        <button onclick="addToCart(${product.id})" class="btn">+</button>
                    </div>
                </div>
                <p class="cart-item-total">${(product.price * quantity).toFixed(2)}€</p>
            `;
            cartItems.appendChild(item);
        }
    });
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = calculateTotal();
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)}€`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`;
    if (totalEl) totalEl.textContent = `${total.toFixed(2)}€`;
}


function addToCart(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart();
    updateCartDisplay();
    
    const currentPage = window.location.pathname;
    if (currentPage.includes('panier.html')) {
        displayCartPage();
    } else {
        displayProducts();
    }
}

function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId]--;
        if (cart[productId] === 0) {
            delete cart[productId];
        }
        saveCart();
        updateCartDisplay();
        
        const currentPage = window.location.pathname;
        if (currentPage.includes('panier.html')) {
            displayCartPage();
        } else {
            displayProducts();
        }
    }
}

function calculateTotal() {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
        const product = products.find(p => p.id === parseInt(productId));
        return total + (product ? product.price * quantity : 0);
    }, 0);
}

function updateCartDisplay() {
    const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = `(${count})`;
    });

    const total = calculateTotal();
    document.querySelectorAll('#cart-total').forEach(el => {
        el.textContent = `${total.toFixed(2)}€`;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadProducts();

   
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Redirection vers la page de paiement...');
        });
    }
});