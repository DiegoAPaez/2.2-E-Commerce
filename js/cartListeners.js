import { buy, cleanCart, open_modal } from "./shop.js";

// Product List - Add to cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = parseInt(button.dataset.productId, 10);
        buy(productId);
    });
});

// Clean cart
document.querySelector(".clean-cart").addEventListener("click", () => {
    cleanCart();
});

// Open cart
document.querySelector("#cart-modal").addEventListener("click", () => {
    open_modal();
});
