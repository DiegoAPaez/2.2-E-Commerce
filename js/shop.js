import { getData } from "./dataGetter.js";

const cartList = document.querySelector("#cart_list");
const cartTotal = document.querySelector("#total_price");

export let products = await getData();
export let cart = [];
export let total = 0;

// Exercise 1
export const buy = (id) => {
    const newItem = products.find((product) => product.id === id);
    if (cart.includes(newItem)) {
        let position = cart.indexOf(newItem);
        cart[position].quantity += 1;
    } else {
        newItem.quantity = 1;
        cart.push(newItem);
    }
    calculateTotal();
    applyPromotionsCart();
};

// Exercise 2
export const cleanCart = () => {
    cart = [];
    total = 0;
};

// Exercise 3
export const calculateTotal = () => {
    total = 0;
    cart.forEach((product) => {
        total += product.price * product.quantity;
    });
};

// Exercise 4
export const applyPromotionsCart = () => {
    cart.forEach((product) => {
        if (product.hasOwnProperty("offer")) {
            const {
                price,
                quantity,
                offer: { number, percent },
            } = product;
            if (quantity >= number) {
                const discount = percent / 100;
                const fullPrice = price * quantity;
                total -= fullPrice * discount;
            }
        }
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
             <td>${product.quantity}</td>
             <td>$${product.price * product.quantity}</td>
        `;
        cartList.appendChild(row);
    });

    cartTotal.innerHTML = `${total}`;
};

// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {};

export const open_modal = () => {
    printCart();
};
