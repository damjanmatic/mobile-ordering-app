import { menuArray } from './data.js';

const main = document.querySelector('.menu-holder');
const orderSection = document.querySelector('.order-section');
let orderArray = [];
let order = ''

main.addEventListener('click', function(e) {
    if (e.target.dataset.item) {
        addOrderItem(e.target.dataset.item)
    } else if (e.target.dataset.remove) {
        removeOrderItem(e.target.dataset.remove)
    }
})

console.log(orderArray)

function addOrderItem(orderId) {
    orderArray.push(menuArray.filter(item => item.id == orderId)[0])
    render()
}

function removeOrderItem(removeId) {
    const Index = orderArray.findIndex((item) => item.id == removeId);
    orderArray.splice(Index, 1);
    render()
}

function orderItem() {
    order = ''
    let ordered = ''
    orderArray.forEach(function(item) {
        ordered += `<div class="item-holder">
        <div class="order-holder">
        <h2>${item.name}</h2>
        <button class="remove" data-remove="${item.id}">Remove</button>
        </div>
        <p class>${item.price}$</p>
    </div>`
    })
    if (orderArray.length > 0) {
        order += `
        <div class="controler"><h3 class='card-header'>Your order</h3>${ordered}</div>
      `
    }
    return order
}

function getMenuItems() {
    let menuItems = ''
    menuArray.forEach(function(item) {
        menuItems += `
    <div class="item" id="${item.id}">
        <p class="item__graphic">${item.emoji}</p>
        <div class="item-text-holder">
            <h2 class="item__title">${item.name}</h2>
            <p class="item__subtitle">${item.ingredients}</p>
            <p class="item__price">${item.price}$</p>
        </div>
        <button class="item-btn" data-item="${item.id}">+</button>
    </div>
    `
    })
    return menuItems
}

function render() {
    main.innerHTML = getMenuItems()
    orderSection.innerHTML = orderItem()
}
render()