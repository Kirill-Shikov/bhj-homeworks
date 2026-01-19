document.addEventListener('DOMContentLoaded', () => {
  const cartProducts = document.querySelector('.cart__products');
  const cart = document.querySelector('.cart');

  let cartItems = {};
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error('Ошибка чтения корзины из localStorage:', e);
    cartItems = {};
  }

  updateCartDisplay();

  document.querySelectorAll('.product').forEach(product => {
    const productId = product.getAttribute('data-id');
    const quantityValue = product.querySelector('.product__quantity-value');
    const incBtn = product.querySelector('.product__quantity-control_inc');
    const decBtn = product.querySelector('.product__quantity-control_dec');
    const addToCartBtn = product.querySelector('.product__add');

    incBtn.addEventListener('click', () => {
      let current = parseInt(quantityValue.textContent);
      quantityValue.textContent = current + 1;
    });

    decBtn.addEventListener('click', () => {
      let current = parseInt(quantityValue.textContent);
      if (current > 1) {
        quantityValue.textContent = current - 1;
      }
    });

    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityValue.textContent);
      const imageSrc = product.querySelector('.product__image').src;

      addToCart(productId, imageSrc, quantity);
    });
  });

  function addToCart(id, image, quantity) {
    if (cartItems[id]) {
      cartItems[id].count += quantity;
    } else {
      cartItems[id] = { image, count: quantity };
    }

    saveCart();
    updateCartDisplay();
  }

  function removeFromCart(id) {
    delete cartItems[id];
    saveCart();
    updateCartDisplay();
  }

  function saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Ошибка сохранения корзины в localStorage:', e);
    }
  }

  function updateCartDisplay() {
    cartProducts.innerHTML = '';

    if (Object.keys(cartItems).length === 0) {
      cart.style.display = 'none';
      return;
    }

    cart.style.display = 'block';

    for (const [id, item] of Object.entries(cartItems)) {
      const cartProduct = document.createElement('div');
      cartProduct.className = 'cart__product';
      cartProduct.setAttribute('data-id', id);

      cartProduct.innerHTML = `<img class="cart__product-image" src="${item.image}" alt="Товар ${id}">
                              <div class="cart__product-count">${item.count}</div>
                              <span class="cart__remove">&times;</span>`;

      cartProduct.querySelector('.cart__remove').addEventListener('click', () => {
        removeFromCart(id);
      });

      cartProducts.appendChild(cartProduct);
    }
  }
});