const navbar = document.querySelector("#navlist");
const productList = document.querySelector("#product-container");

const icons = {
    "T-shirts": 'fa-solid fa-shirt',
    "Mugs": 'fa-solid fa-mug-hot',
    "Wall-Art": 'fa-solid fa-palette',
    "Stickers": 'fa-solid fa-note-sticky',
};

export const renderElements = (products) => {
    renderNav(products);
    
    if(!productList) {return}
    productList.innerHTML = "";
    for (const [category, items] of Object.entries(products)) {
        const section = renderSection(category, items);
        productList.appendChild(section);
    }
};

const renderSection = (category, items) => {
    const section = document.createElement("section");
    section.className = "pt-5";
    section.id = category.toLowerCase();
    
    section.innerHTML = `
        <h2 class="text-center">
        <i class="${icons[category]} pe-3"></i>
        ${category}
        </h2>
    `;
    
    // Product Container
    const container = document.createElement("div");
    container.className = "container px-4 px-lg-5 mt-5";
    
    // Product Cards Row
    const row = document.createElement("div");
    row.className = "row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center";
    
    // Cards
    items.forEach(product => {
        const productCard = renderProductCard(product);
        row.appendChild(productCard);
    });
    
    // Build Section
    container.appendChild(row);
    section.appendChild(container);
    
    return section;
};

const renderProductCard = (product) => {
    const { id, name, price, img } = product;
    
    const productCard = document.createElement("div");
    productCard.className = "col mb-5";
    productCard.innerHTML = `
        <div class="card h-100">
            <img class="card-img-top" src="./images/${img}" alt="${name}" />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${name}</h5>
                    $${price}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <button
                        type="button"
                        data-product-id="${id}"
                        class="btn btn-outline-dark add-to-cart">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return productCard;
};

const renderNav = (products) => {
    navbar.innerHTML = "";
    
    Object.keys(products).forEach(category => {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `
            <a class="nav-link" href="#${category.toLowerCase()}">
                <i class="${icons[category]}"></i>
                ${category}
            </a>
        `;
        navbar.appendChild(li);
    });
};