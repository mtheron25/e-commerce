let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "Colourful Stripe Dress",
        category: "Dresses",
        price: 109.99,
        img: "https://img.ltwebstatic.com/images3_pi/2021/07/28/1627438234c1c5955f93c6f8ce1eb324a47532bbfa_thumbnail_600x.webp",
      },
      {
        title: "Buckle Thong Sandals",
        category: "Shoes",
        price: 99.99,
        img: "https://img.ltwebstatic.com/images3_pi/2022/01/05/164137271522bb9881a6feca73cc6429c8bc447003_thumbnail_600x.webp",
      },
      {
        title: "Tropical Bikini",
        category: "Swimwear",
        price: 149.99,
        img: "https://img.ltwebstatic.com/images3_pi/2020/11/24/1606186155e28fdae787988d1e27d9a2ffb568841d_thumbnail_600x.webp",
      },
      {
        title: "Floral Print Belted Dress",
        category: "Dresses",
        price: 199.99,
        img: "https://img.ltwebstatic.com/images3_pi/2021/06/26/1624696886c23c11eb154e810266e07adf11347e53_thumbnail_600x.webp",
      },
      {
        title: "Stitch Slide Sandals",
        category: "Shoes",
        price: 158.99,
        img: "https://img.ltwebstatic.com/images3_pi/2022/01/05/16413545052373b8203e2519b70f53ac3e9a48aa47_thumbnail_600x.webp",
      },
      {
        title: "Leaf Print Swimsuit",
        category: "Swimwear",
        price: 137.99,
        img: "https://img.ltwebstatic.com/images3_pi/2021/12/06/16387572139ef25f50e9437339b275cc91959ac6b1.webp",
      },
    ];
// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
            Edit
          </button>
          <button type="button" class="btn btn-danger" onclick="deleteProduct(${position})" >
            Delete
          </button>
          <button type="button" class="btn btn-secondary" onclick="addToCart(${position})" >
            Add to cart
          </button>


           
              <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Dresses">Dresses</option>
                          <option value="Shoes">Shoes</option>
                          <option value="Swimwear">Swimwear</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
  });
}

readProducts(products);

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

// ADD TO CART
function addToCart(position) {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;
  products.push({
    title,
    category,
    price,
    img,
  });
  readProducts(products);
}
