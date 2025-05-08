import { getData } from "./dataGetter.js";
import { renderElements } from "./listRender.js";

const cartList = document.querySelector("#cart_list");
const cartTotal = document.querySelector("#total_price");
const cartItemsCount = document.querySelector("#count_product");

export let products = [];
export const cart = [];
export let total = 0;

export async function initializeProducts() {
    return await getData();
}

products = await initializeProducts();

renderElements(products);

// Exercise 1
export const buy = (id) => {
    try {
        let newItem = null;
        
        for (const category in products) {
            const foundProduct = products[category].find(product => product.id === id);
            if (foundProduct) {
                newItem = foundProduct;
                break;
            }
        }

        if (!newItem) return;

        const existingItemIndex = cart.findIndex((item) => item.id === id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...newItem, quantity: 1 });
        }

        calculateTotal();
        updateProductCount();
    } catch (error) {
        console.error(error);
    }
};

// Exercise 2
export const cleanCart = () => {
    cart.length = 0;
    total = 0;
    printCart();
};

// Exercise 3 & Exercise 4
export const calculateTotal = () => {
    total = 0;
    cart.forEach((product) => {
        total += calculateOfferTotal(product);
    });
};

// Exercise 5
export const printCart = () => {
    // Remove rows created previously to avoid repetition
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    // Fill the shopping cart modal manipulating the shopping cart dom
    cart.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
             <th scope="row">${product.name}</th>
             <td>$${product.price}</td>
             <td>
                ${product.quantity}
                <button class="btn btn-sm btn-outline-danger ms-2 px-2 rounded remove-from-cart" type="button" data-product-id="${
                    product.id
                }">
                    -
                </button>
            </td>
             <td>
            $${calculateOfferTotal(product).toFixed(2)}
            </td>
        `;
        cartList.appendChild(row);
    });

    cartTotal.innerHTML = `${parseFloat(total).toFixed(2)}`;
};

const calculateOfferTotal = (product) => {
    if (product.hasOwnProperty("offer")) {
        const {
            price,
            quantity,
            offer: { number, percent },
        } = product;
        if (quantity >= number) {
            const discount = 1 - percent / 100;
            const fullPrice = price * quantity;
            return fullPrice * discount;
        } else {
            return product.price * product.quantity;
        }
    } else {
        return product.price * product.quantity;
    }
};

const updateProductCount = () => {
    cartItemsCount.innerHTML = `${cart.length}`;
};

// ** Nivell II **

// Exercise 7
export const removeFromCart = (id) => {
    const cartItem = cart.find((product) => product.id === id);

    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else {
        const index = cart.findIndex((item) => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
        }
    }
    calculateTotal();
    updateProductCount();
    printCart();
};

export const open_modal = () => {
    printCart();
};
