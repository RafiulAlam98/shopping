// API link setup
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product)
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add('col','d-flex','justify-content-center','mt-3');
    div.innerHTML = `<div class="card w-75 single-product" style=" height: 28rem;">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="h5 fs-4 fw-normal">${product.title.slice(0,35)}</h3>
      <p>Category: <span class="color">${product.category}</span> </p>
      <h2>Price:<span class="color">$ ${product.price}</span> </h2>
      <p>Rating: <span class="color">${product.rating.rate}</span> 
          Count:<span class="color"> ${product.rating.count}</span></p>
      <div class = "btn-div">
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn bg-success bg-gradient text-light text-bold rounded">Add to Cart</button>
          <button id="details-btn" class="btn bg-info bg-gradient text-dark text-bold rounded">Details</button>
    </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// ADD to the cart function
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

// get input value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
