document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", validateForm);
  });
  
  function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => displayProducts(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }
  
  function displayProducts(products) {
    const productsSection = document.querySelector(".products");
    products.forEach(product => {
      const productCard = `
        <div class="product-card">
          <h2>${product.title}</h2>
          <img src="${product.image}" alt="${product.title}" style="width:100px; height:100px;">
          <p>${product.description.substring(0, 50)}...</p>
          <p><strong>Precio:</strong> $${product.price}</p>
          <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
      `;
      productsSection.innerHTML += productCard;
    });
  }
  
  function validateForm(event) {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
  
    if (name === "" || email === "" || message === "") {
      alert("Por favor, complete todos los campos.");
    } else {
      alert("Formulario enviado con éxito.");
      document.getElementById("contact-form").reset();
    }
  }
  
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Producto añadido al carrito");
  }
  