// class ProductTable extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });

//     this.shadowRoot.innerHTML = /*html*/`
//       <style>
//         @import url('components/ciudad/style.css');
//         @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css');
//       </style>
//       <div class="container">
//         <div class="row">
//           <div class="col-12">
//             <table class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Codigo Producto</th>
//                   <th>Nombre Del Producto</th>
//                   <th>Valor Unitario</th>
//                   <th>Cantidad</th>
//                   <th>Subtotal</th>
//                   <th>Seleccionar</th>
//                 </tr>
//               </thead>
//               <tbody id="product-table-body"></tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     `;

//     this.addEventListener('product-added', this.updateProductTable.bind(this));
//   }

//   updateProductTable(event) {
//     const tableBody = this.shadowRoot.getElementById('product-table-body');
//     tableBody.innerHTML = '';

//     event.detail.products.forEach(product => {
//       const subtotal = parseFloat(product.unitPrice) * parseFloat(product.quantity);
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${product.productCode}</td>
//         <td>${product.productName}</td>
//         <td>${product.unitPrice}</td>
//         <td>${product.quantity}</td>
//         <td>${subtotal.toFixed(2)}</td>
//         <td><input type="checkbox" class="form-check-input"></td>
//       `;
//       tableBody.appendChild(row);
//     });
//   }
// }

// customElements.define('product-table', ProductTable);