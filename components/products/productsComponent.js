import { productsDisponibles } from '../../data/data.js';

class ProductsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Inicializar productos disponibles y productos agregados
    this.productsDisponibles = productsDisponibles;
    this.products = [];

    // Inicializar el componente
    this.initializeComponent();
  }

  initializeComponent() {
    // Renderizar el contenido HTML del componente
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        @import url('components/ciudad/style.css');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css');
      </style>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="mb-3">
              <label for="product-name" class="form-label">Nombre Del Producto:</label>
              <input type="text" list="product-list" class="form-control" id="product-name" name="product-name">
              <datalist id="product-list">
                ${this.productsDisponibles.map(p => `<option value="${p.name}">`).join('')}
              </datalist>
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="product-code" class="form-label">Código Producto:</label>
              <input type="text" class="form-control" id="product-code" name="product-code" readonly>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="unit-price" class="form-label">Valor Unitario:</label>
              <input type="text" class="form-control" id="unit-price" name="unit-price" readonly>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="quantity" class="form-label">Cantidad:</label>
              <input type="number" class="form-control" id="quantity" name="quantity" min="1">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <button class="btn btn-primary" id="add-product">Agregar Producto</button>
          </div>
        </div>
      </div>
    `;

    // Agregar eventos a los elementos
    this.shadowRoot.getElementById('product-name').addEventListener('input', this.autocompleteProduct.bind(this));
    this.addProductButton = this.shadowRoot.getElementById('add-product');
    this.addProductButton.addEventListener('click', this.addProduct.bind(this));
  }

  autocompleteProduct(event) {
    const productName = event.target.value;
    const product = this.productsDisponibles.find(p => p.name === productName);

    if (product) {
      this.shadowRoot.getElementById('product-code').value = product.code;
      this.shadowRoot.getElementById('unit-price').value = product.unitPrice;
    } else {
      this.shadowRoot.getElementById('product-code').value = '';
      this.shadowRoot.getElementById('unit-price').value = '';
    }
  }
  addProduct() {
    const productName = this.shadowRoot.getElementById('product-name').value;
    const productCode = this.shadowRoot.getElementById('product-code').value;
    const unitPrice = this.shadowRoot.getElementById('unit-price').value;
    const quantity = this.shadowRoot.getElementById('quantity').value;
  
    if (productName && productCode && unitPrice && quantity) {
      const product = {
        productName,
        productCode,
        unitPrice: parseFloat(unitPrice).toFixed(2),
        quantity: parseInt(quantity, 10)
      };
  
      // Crear y despachar un evento personalizado
      const event = new CustomEvent('product-added', {
        detail: product, // Enviar el producto directamente
        bubbles: true,
        composed: true
      });
  
      this.dispatchEvent(event);
  
      // Limpiar los campos de entrada
      this.clearInputFields();
    } else {
      alert('Por favor, llena todos los campos antes de agregar un producto.');
    }
  }
  
  
  clearInputFields() {
    this.shadowRoot.getElementById('product-name').value = '';
    this.shadowRoot.getElementById('product-code').value = '';
    this.shadowRoot.getElementById('unit-price').value = '';
    this.shadowRoot.getElementById('quantity').value = '';
  }
}

// Definir el custom element
customElements.define('products-component', ProductsComponent);
