class TotalsComponent extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css');
        .totals-container {
          margin-top: 20px;
        }
      </style>
      <div class="totals-container container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td class="text-end"><strong>Subtotal General:</strong></td>
                  <td id="subtotal-general">0.00</td>
                </tr>
                <tr>
                  <td class="text-end"><strong>IVA (19%):</strong></td>
                  <td id="iva-total">0.00</td>
                </tr>
                <tr>
                  <td class="text-end"><strong>Total:</strong></td>
                  <td id="total-general">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // Inicializa los valores en cero al cargar el componente
    this.updateTotals(0);
  }
  

  updateTotals(subtotal) {
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    console.log(subtotal)

    this.shadowRoot.getElementById('subtotal-general').textContent = subtotal.toFixed(2);
    this.shadowRoot.getElementById('iva-total').textContent = iva.toFixed(2);
    this.shadowRoot.getElementById('total-general').textContent = total.toFixed(2);

    
  }
}

// Define el nuevo componente
customElements.define('totals-component', TotalsComponent);
