let products = [];
let cart = [];
let currentPage = 1;
const itemsPerPage = 6;

// Show loader when loading content
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Fetch all products
function fetchProducts() {
    showLoader();
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            products = data;
            displayProducts();
            hideLoader();
        });
}

// Fetch category products
function fetchCategory(category) {
    showLoader();
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => {
            products = data;
            currentPage = 1;
            displayProducts();
            hideLoader();
        });
}

// Display products with pagination
function displayProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '';
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = products.slice(start, end);
    
    paginatedItems.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" onclick="enlargeImage('${product.image}')">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });
    updatePagination();
}

// Update Pagination
function updatePagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    let totalPages = Math.ceil(products.length / itemsPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.add('page-btn');
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.onclick = () => changePage(i);
        paginationContainer.appendChild(pageBtn);
    }
}

// Change Page
function changePage(page) {
    currentPage = page;
    displayProducts();
}

// Enlarge Image Function
function enlargeImage(src) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${src}" class="enlarged-image">
        </div>
    `;
    document.body.appendChild(modal);
}

// Initial fetch
fetchProducts();

