const addCart = document.querySelector(".addCart"),
    receipt = document.querySelector(".receipt"),
    plus = document.querySelectorAll(".plus"),
    minus = document.querySelectorAll(".minus"),
    burgerPriceCount = document.querySelectorAll(".main__product-price"),
    timerLvL = document.querySelector(".header__timer-extra"),
    caloriesLabel = document.querySelectorAll('.main__product-label'),
    caloriesInput = document.querySelectorAll('.main__product-checkbox'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptWindowOut = document.querySelector('.receipt__window-out'),
    mainProductExtra = document.querySelector('.main__product-extra'),
    receiptOpen = document.querySelector('.button'),
    caloriesCounter = document.querySelectorAll('.calories__counter'),
    receiptCloseBtn = document.querySelector('.receipt__window-btn')
addCart.addEventListener('click', () => {
    receipt.classList.add('active')
    receipt.style.display = "flex";
})
const burgerObj = {
    plainBurger: {
        name: 'plainburger',
        price: 10000,
        img: 'images/product3.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        },
        calories: 150,
        get totalCalories() {
            return this.calories * this.amount;
        }
    },
    freshBurger: {
        name: 'freshBurger',
        price: 20500,
        img: 'images/product1.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        },
        calories: 200,
        get totalCalories() {
            return this.calories * this.amount;
        }
    },
    freshCombo: {
        name: 'freshBurger',
        price: 31900,
        img: 'images/product2.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        },
        calories: 400,
        get totalCalories() {
            return this.calories * this.amount;
        }
    }
}
let timerLvLSpeed = 30

function recursiveLvl(i = 0) {
    timerLvL.innerHTML = i
    i++
    if (i === 50) {
        timerLvLSpeed = 50
    } else if (i === 68) {
        timerLvLSpeed = 80
    } else if (i === 78) {
        timerLvLSpeed = 120
    } else if (i === 88) {
        timerLvLSpeed = 240
    } else if (i === 98) {
        timerLvLSpeed = 400
    }
    if (i <= 100) {
        setTimeout(() => {
            recursiveLvl(i)
        }, timerLvLSpeed)
    }
}

recursiveLvl()

function addProduct(btn) {
    //* Closest ищет ближайшего родительского элемента
    let parent = btn.closest('.main__product')
    let parentId = parent.getAttribute('id')
    burgerObj[parentId].amount++
}

function delProduct(btn) {
    let parent = btn.closest('.main__product')
    let parentId = parent.getAttribute('id')
    if (burgerObj[parentId].amount > 0) {
        burgerObj[parentId].amount--
    }
}

plus.forEach(btn => {
    btn.addEventListener('click', function () {
        addProduct(this)
        let Amount = document.querySelectorAll('.main__product-num')
        let parent = btn.closest('.main__product')
        let parentId = parent.getAttribute('id')
        Amount.forEach(btn => {
            let parent = btn.closest('.main__product')
            let parentId = parent.getAttribute('id')
            btn.innerHTML = burgerObj[parentId].amount
        })
        burgerPriceCount.forEach(element => {
            let parent = element.closest('.main__product')
            let parentId = parent.getAttribute('id')
            element.innerHTML = `${burgerObj[parentId].totalSum} сум`
        })
        caloriesCounter.forEach(element => {
            let parent = element.closest('.main__product')
            let parentId = parent.getAttribute('id')
            element.innerHTML = `${burgerObj[parentId].totalCalories}`
        })
    })
})
minus.forEach(btn => {
    btn.addEventListener('click', function () {
        let parent = btn.closest('.main__product')
        let parentId = parent.getAttribute('id')
        delProduct(this)
        let Amount = document.querySelectorAll('.main__product-num')
        Amount.forEach(btn => {
            let parent = btn.closest('.main__product')
            let parentId = parent.getAttribute('id')
            btn.innerHTML = burgerObj[parentId].amount
        })
        burgerPriceCount.forEach(element => {
            let parent = element.closest('.main__product')
            let parentId = parent.getAttribute('id')
            element.innerHTML = `${burgerObj[parentId].totalSum} сум`
        })
        if (burgerObj[parentId].amount < 0) {
            Amount.innerHTML = '0'
        }
    })
})

function totalSumProduct() {
    let total = 0
    for (let key in burgerObj) {
        total += burgerObj[key].totalSum
    }
    return total
}

function totalSumOfCalories() {
    let total = 0
    for (let key in burgerObj) {
        total += burgerObj[key].totalCalories
    }
    return total
}

const totalSumTxt = document.querySelector('.totalSumTxt')
receiptOpen.addEventListener('click', () => {
    receiptWindowOut.innerHTML = ''
    for (let key in burgerObj) {
        if (burgerObj[key].amount> 0) {
            receipt.classList.add('active');
            if(receipt.classList.contains('active')) {
                const {name, amount, totalSum, calories, totalCalories} = burgerObj[key];

                receiptWindowOut.innerHTML += `
            <div class="receipt__window-item">
                <p class="receipt__window-info">
                    <span class="receipt__window-name"> ${name} -  ${amount} шт. <br> Сумма: <span class="receipt__item-price">${totalSum} сум</span> <br> <span class="receipt__item-Calories">${calories} калорий шт</span> <br> <span class="receipt__item-Calories">Общая сумма калорий: ${totalCalories}</span></span>
                </p>
            </div>
            `
            }
        }
    }
    totalSumTxt.innerHTML = ``
    totalSumTxt.innerHTML = `Общая сумма всех покупок: ${totalSumProduct()} сум <br> Общее количество калорий со всех продуктов: ${totalSumOfCalories()} `
})
receiptCloseBtn.addEventListener('click', ()=>{
    receipt.classList.remove('active')
    receipt.style.display = 'none'
    const productAmount = document.querySelectorAll('.main__product-num');
    productAmount.forEach(element => {
        element.innerHTML = 0;
    })

    const productPrice = document.querySelectorAll('.main__product-price');
    productPrice.forEach(element => {
        element.innerHTML = 0 + ` сум`;
    })

    const productCalories = document.querySelectorAll('.calories__counter');
    productCalories.forEach(element => {
        element.innerHTML =  0;
    })
    for(let key in burgerObj){
        burgerObj[key].amount = 0
    }
})