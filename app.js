document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.getElementById("product-grid");
    const searchInput = document.getElementById("search");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });

    // Fetch products from the API
    async function fetchProducts(query = '') {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const products = await response.json();

        // Filter products based on search query
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        displayProducts(filteredProducts);
    }

    // Display products in the card format
    function displayProducts(products) {
        productGrid.innerHTML = ""; // Clear existing products
        products.forEach(product => {
            const productCard = `
                <div class="bg-white shadow-lg rounded-md p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-4 rounded-md">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${product.title}</h3>
                    <p class="text-green-600 font-semibold text-xl mb-4">$${product.price}</p>
                    <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300" onclick="openModal(${product.id})">View Details</button>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }

    // Open modal with product details
    async function openModal(productId) {
        const modal = document.getElementById("product-modal");
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        document.getElementById("modal-title").textContent = product.title;
        document.getElementById("modal-image").src = product.image;
        document.getElementById("modal-description").textContent = product.description;
        document.getElementById("modal-quantity").textContent = `Quantity Available: ${product.rating.count}`;

        modal.classList.remove("hidden");
    }

    // Close modal
    document.getElementById("modal-close").addEventListener("click", function () {
        document.getElementById("product-modal").classList.add("hidden");
    });

    // Make openModal globally accessible
    window.openModal = openModal;

    // Handle search functionality
    searchInput.addEventListener("input", function () {
        const query = searchInput.value;
        fetchProducts(query);
    });

    // Initial fetch of products
    fetchProducts();
});
