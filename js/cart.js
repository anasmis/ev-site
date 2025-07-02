// Cart functionality for EV Chargers e-commerce site

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartIcon();
    }

    // Load cart from localStorage
    loadCart() {
        const cart = localStorage.getItem('evCart');
        return cart ? JSON.parse(cart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('evCart', JSON.stringify(this.items));
        this.updateCartIcon();
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} ajouté au panier`);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart count
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Update cart icon badge
    updateCartIcon() {
        const cartIcon = document.querySelector('.navbar-icon.bi-cart3');
        if (cartIcon) {
            const count = this.getCount();
            let badge = cartIcon.querySelector('.cart-badge');
            
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle';
                    cartIcon.appendChild(badge);
                }
                badge.textContent = count;
            } else if (badge) {
                badge.remove();
            }
        }
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification alert alert-success position-fixed';
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add CSS for cart badge and notifications
const style = document.createElement('style');
style.textContent = `
    .cart-badge {
        font-size: 0.7rem;
        min-width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
    }
    
    .cart-notification {
        min-width: 250px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .product-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .btn-add-to-cart {
        background: var(--primary-color);
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }
    
    .btn-add-to-cart:hover {
        background: var(--custom-btn-bg-hover-color);
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Initialize cart
const cart = new ShoppingCart();

// Add event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            e.preventDefault();
            
            const productCard = e.target.closest('.custom-block, .product-card');
            if (productCard) {
                const product = {
                    id: productCard.dataset.productId || Date.now().toString(),
                    name: productCard.querySelector('h5, .product-name')?.textContent || 'Produit',
                    price: parseFloat(productCard.dataset.price || '1000'),
                    image: productCard.querySelector('img')?.src || ''
                };
                
                cart.addItem(product);
            }
        }
    });
});