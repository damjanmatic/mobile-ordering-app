import { menuArray } from './data.js';

const main = document.querySelector('.menu-holder');
const orderSection = document.querySelector('.order-section')

const orderArray = []

document.addEventListener('click', (e) => {
    if (e.target.dataset.item) {
        addOrder(e.target.dataset.item)
    } else if (e.target.dataset.remove) {
        removeOrder(e.target.dataset.remove)
    }
    if (e.target.dataset.btn) {
        const modal = document.querySelector('.modal')
        modal.classList.add('active')
    }
    // else if (confirm.classList == 'active') {
    //     confirm.classList.remove('active')
    // }
})

function render() {
    main.innerHTML = getMenuItems();
    orderSection.innerHTML = yourOrder() + totalSum();
}
render()

function addOrder(orderId) {
    orderArray.push(menuArray.filter(item => item.id == orderId)[0])
    render()
}
console.log(orderArray)

function removeOrder(removeId) {
    const index = orderArray.findIndex((item) => item.id == removeId)
    orderArray.splice(index, 1);
    render()
}

function getMenuItems() {
    let menuItem = '';
    menuArray.forEach(item => {
        menuItem += `
        <div class="item" id="${item.id}">
                <div class="item-graphic">${item.emoji}</div>
                <div class="item-text-holder">
                    <h2 class="item-title">${item.name}</h3>
                    <p class="item-subtitle">${item.ingredients}</p>
                    <p class="item-price">${item.price}$</p>
                </div>
            <button class="item-btn" data-item="${item.id}">+</button>
        </div>`
    })
    return menuItem;
}

function yourOrder() {
    let introOrder = '';
    let yourOrderItemHTML = '';
    orderArray.map(item => {
        yourOrderItemHTML += `
        <div class="content-wrapper">
            <div class="style-holder">
                <h3>${item.name}</h3>
                <button class="remove" data-remove=${item.id}>Remove</button>
            </div>
            <p class="item-subtitle">${item.price}$</p>
        </div>`
    })

    if (orderArray.length > 0) {
        introOrder += `
        <h3 class="item-title">Your Order</h3>
        <div>${yourOrderItemHTML}</div>
        `
        createModal()
    }
    return introOrder;
}



function totalSum() {
    let total = '';
    let sum = 0;
    orderArray.map(item => {
        sum += item.price
    })
    if (sum) {
        total += `
        <div class="content-wrapper style-holder total">
            <h3 class="item-title">Total Sum:</h3>
            <p class="sum">${sum}$</p>
        </div>
        <button class="content-wrapper confirm-Btn" data-btn="confirm">Confirm Your Order</button>`

    }

    return total
}

function createModal() {
    let sum = 0;
    orderArray.map(item => {
        sum += item.price
    })
    let modal = document.createElement('form')
    modal.classList.add('modal')
    modal.classList.add('inactive')
    let formModal = ''
    formModal = `    
    <div class="modalStyle">
        <h3 class=modal-title>Enter Card Details</h3>    
        <label for="name">Card Holder Name</label>
        <input placeholder="Jane Doe" type="text" id="name" required>
        <label for="card">Card Number</label>
        <input id="card" type="number" inputmode="numeric" pattern="[0-9]*" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)" required>
        <label for="ccv">CCV</label>
        <input id="ccv" type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)" maxlength="4" placeholder="xxxx" required>
        <p class="modal-sum">Your order will cost ${sum}$</p>
        <button type=submit class="submit">Place Your Order</button>
        <button class="submit cancel">Cancel</button>
    </div>
    `
    modal.innerHTML = formModal
    main.appendChild(modal)
    document.querySelector('.modal').addEventListener('submit', function(e) {
        e.preventDefault()
        modal.classList.remove('active');
        main.innerHTML = getMenuItems()
        orderSection.innerHTML = `<div class="container-wrapper"><div class="background-title"><h1>Thanks, your order is on the way</h3></div></div>`
    })
    let cancel = document.querySelector('.cancel')
    cancel.addEventListener('click', function(e) {
        e.preventDefault()
        modal.classList.remove('active')
    })
}