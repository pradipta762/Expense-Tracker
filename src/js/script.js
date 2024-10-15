const cashAmountDisplay = document.querySelectorAll('.cash')
const upiAmountDisplay = document.querySelectorAll('.upi')
const expenseAmountDisplay = document.querySelectorAll('.expense')

// Values entered from the input field for addition of amount or expense
const addAmount = document.querySelector('#add-amount')
const expenseAmount = document.querySelector('#expense-amount')

// Get the reference of the form to perform tasks
const amountForm = document.querySelector('#amount-form')
const expenseForm = document.querySelector('#expense-form')

// Get the reference of the submit butttons of the form
const addAmountButton = document.querySelector('#add-amount-btn')
const addExpenseButton = document.querySelector('#add-expense-btn')

// Add amount section and Add expense section
const addAmountSection = document.querySelector('#add-amount-section')
const addExpenseSection = document.querySelector('#add-expense-section')
const mainSection = document.querySelector('#main-section')

// Reference of the button so that we can change the view 
const buttonForAddMoney = document.querySelector('#add-money')
const buttonForAddExpense = document.querySelector('#add-expense')
const backToMainButton = document.querySelectorAll('.back-to-main')

const addAmountMode = document.getElementsByName('amount-mode')
const addExpenseMode = document.getElementsByName('expense-mode')

let cashAmount = 0;
let upiAmount = 0;
let totalExpense = 0;

// **************************************************************
// To switch between different section

buttonForAddMoney.addEventListener('click', function () {
    mainSection.classList.add('hidden')
    addExpenseSection.classList.add('hidden')
    addAmountSection.classList.remove('hidden')
}, false)

buttonForAddExpense.addEventListener('click', function () {
    mainSection.classList.add('hidden')
    addAmountSection.classList.add('hidden')
    addExpenseSection.classList.remove('hidden')
}, false)

backToMainButton.forEach(btn => {
    btn.addEventListener('click', function () {
        mainSection.classList.remove('hidden')
        addAmountSection.classList.add('hidden')
        addExpenseSection.classList.add('hidden')
    }, false)
})

// **************************************************************

addAmountButton.addEventListener('click', function () {
    let amount = parseInt(addAmount.value);
    if (amount) {
        addMoney(amount, addAmountMode)
    } else {
        alert("Enter a valid amount")
        return;
    }
}, false)

function addMoney(money, amountMode) {
    amountMode.forEach(mode => {
        if (mode.checked && mode.value === 'cash') {
            cashAmount += money;
            updateCashAmount();
        } else if (mode.checked && mode.value === 'upi') {
            upiAmount += money;
            updateUPIAmount();
        }
    })
}

addExpenseButton.addEventListener('click', function () {
    let amount = parseInt(expenseAmount.value)
    if (amount) {
        addExpense(amount, addExpenseMode)
    } else {
        alert("Enter a valid amount")
        return;
    }
}, false)

function addExpense(money, expenseMode) {
    expenseMode.forEach(mode => {
        if(mode.checked && mode.value === 'cash') {
            if(cashAmount < money) {
                alert("Insufficient Balance")
                return;
            } else {
                cashAmount -= money;
                totalExpense += money;
                updateCashAmount();
                updateExpenseAmount();
            }
        } else if(mode.checked && mode.value === 'upi') {
            if(upiAmount < money) {
                alert("Insufficient Balance")
                return;
            } else {
                upiAmount -= money;
                totalExpense += money;
                updateUPIAmount();
                updateExpenseAmount();
            }
        }
    })
}

function updateCashAmount() {
    cashAmountDisplay.forEach(cash => cash.innerHTML = `₹${cashAmount}`)
}

function updateUPIAmount() {
    upiAmountDisplay.forEach(upi => upi.innerHTML = `₹${upiAmount}`)
}

function updateExpenseAmount() {
    expenseAmountDisplay.forEach(expense => expense.innerHTML = `₹${totalExpense}`)
}