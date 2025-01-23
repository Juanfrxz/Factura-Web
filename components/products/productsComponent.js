class ProductsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.products = [];

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
            <input type="text" class="form-control" id="product-name" name="product-name">
          </div>
        </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="product-code" class="form-label">Codigo Producto:</label>
              <input type="text" class="form-control" id="product-code" name="product-code">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="unit-price" class="form-label">Valor Unitario:</label>
              <input type="text" class="form-control" id="unit-price" name="unit-price">
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

    this.addProductButton = this.shadowRoot.getElementById('add-product');
    this.addProductButton.addEventListener('click', this.addProduct.bind(this));
  }

  addProduct() {
    const productCode = this.shadowRoot.getElementById('product-code').value;
    const productName = this.shadowRoot.getElementById('product-name').value;
    const unitPrice = this.shadowRoot.getElementById('unit-price').value;
    const quantity = this.shadowRoot.getElementById('quantity').value;

    if (productCode && productName && unitPrice && quantity) {
      this.products.push({ productCode, productName, unitPrice, quantity });
      this.dispatchEvent(new CustomEvent('product-added', { detail: { products: this.products } }));
      this.clearInputFields();
    }
  }

  clearInputFields() {
    this.shadowRoot.getElementById('product-code').value = '';
    this.shadowRoot.getElementById('product-name').value = '';
    this.shadowRoot.getElementById('unit-price').value = '';
    this.shadowRoot.getElementById('quantity').value = '';
  }
}

customElements.define('products-component', ProductsComponent);