class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = /*html*/ `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css');
        @import url('components/ciudad/style.css');
      </style>
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <div class="mb-3">
              <label for="no-factura" class="form-label">No. Factura:</label>
              <input type="text" class="form-control" id="no-factura" name="no-factura" readonly>
            </div>
          </div>
          <div class="col-md-2">
            <div class="mb-3">
              <label for="no-id" class="form-label">No. Id:</label>
              <input type="text" class="form-control" id="no-id" name="no-id">
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="nombres" class="form-label">Nombres:</label>
              <input type="text" class="form-control" id="nombres" name="nombres">
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label for="apellidos" class="form-label">Apellidos:</label>
              <input type="text" class="form-control" id="apellidos" name="apellidos">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="direccion" class="form-label">Dirección:</label>
              <input type="text" class="form-control" id="direccion" name="direccion">
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" class="form-control" id="email" name="email">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateInvoiceNumber() {
    // Genera un número aleatorio entre 10000 y 99999
    return Math.floor(100000 + Math.random() * 900000);
  }

  connectedCallback() {
    // Cuando el componente se conecta al DOM, genera y establece el número de factura
    const invoiceInput = this.shadowRoot.querySelector('#no-factura');
    invoiceInput.value = this.generateInvoiceNumber();
  }
}

customElements.define('header-component', HeaderComponent);