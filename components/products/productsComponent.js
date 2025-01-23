class ProductsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Inicializar variables
    this.productsDisponibles = [];
    this.products = [];

    // Importar productos desde otro archivo
    import('../../data/data.js').then(module => {
      this.productsDisponibles = module.productsDisponibles;
      this.initializeComponent();
    });
  }

  initializeComponent() {
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
              <label for="product-code" class="form-label">Codigo Producto:</label>
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
              <input type="number" class="form-control" id="quantity" name="quantity">
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
    const productCode = this.shadowRoot.getElementById('product-code').value;
    const productName = this.shadowRoot.getElementById('product-name').value;
    const unitPrice = parseFloat(this.shadowRoot.getElementById('unit-price').value);
    const quantity = parseInt(this.shadowRoot.getElementById('quantity').value);

    if (productCode && productName && !isNaN(unitPrice) && !isNaN(quantity) && quantity > 0) {
      this.products.push({ productCode, productName, unitPrice, quantity });
      this.dispatchEvent(new CustomEvent('product-added', { detail: { products: this.products } }));
      this.clearInputFields();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  clearInputFields() {
    this.shadowRoot.getElementById('product-name').value = '';
    this.shadowRoot.getElementById('product-code').value = '';
    this.shadowRoot.getElementById('unit-price').value = '';
    this.shadowRoot.getElementById('quantity').value = '';
  }
}

customElements.define('products-component', ProductsComponent);
