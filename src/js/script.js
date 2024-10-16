const cashAmountDisplay = document.querySelectorAll('.cash')
const upiAmountDisplay = document.querySelectorAll('.upi')
const expenseAmountDisplay = document.querySelectorAll('.expense')

// Values entered from the input field for addition of amount or expense
const addAmount = document.querySelector('#add-amount')
const expenseAmount = document.querySelector('#expense-amount')
const expenseType = document.querySelector('#payment-for')

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
const expenseHistorySection = document.querySelector('#expense-history-section')

// Reference of the button so that we can change the view 
const buttonForAddMoney = document.querySelector('#add-money')
const buttonForAddExpense = document.querySelector('#add-expense')
const backToMainButton = document.querySelectorAll('.back-to-main')
const buttonForExpenseHistory = document.querySelector('#expense-history')
const resetButton = document.querySelector('#reset')

// Reference of the amunt mode (cash / upi)
const addAmountMode = document.getElementsByName('amount-mode')
const addExpenseMode = document.getElementsByName('expense-mode')

// Reference of the date 
const expenseDate = document.querySelector('#expense-date')
const addMoneyDate = document.querySelector('#add-money-date')

let cashAmount = 0;
let upiAmount = 0;
let totalExpense = 0;

let expenseList = []

// This will prevent user from selecting future dates 
const today = new Date().toISOString().split('T')[0];
expenseDate.max = today
addMoneyDate.max = today

// **************************************************************
// To switch between different section

buttonForAddMoney.addEventListener('click', function () {
    mainSection.classList.add('hidden')
    addExpenseSection.classList.add('hidden')
    expenseHistorySection.classList.add('hidden')
    addAmountSection.classList.remove('hidden')
}, false)

buttonForAddExpense.addEventListener('click', function () {
    mainSection.classList.add('hidden')
    addAmountSection.classList.add('hidden')
    expenseHistorySection.classList.add('hidden')
    addExpenseSection.classList.remove('hidden')
}, false)

buttonForExpenseHistory.addEventListener('click', function() {
    mainSection.classList.add('hidden')
    addAmountSection.classList.add('hidden')
    addExpenseSection.classList.add('hidden')
    expenseHistorySection.classList.remove('hidden')
    displayExpenses();
}, false)

resetButton.addEventListener('click', function() {
    reset();
}, false)

backToMainButton.forEach(btn => {
    btn.addEventListener('click', function () {
        mainSection.classList.remove('hidden')
        addAmountSection.classList.add('hidden')
        addExpenseSection.classList.add('hidden')
        expenseHistorySection.classList.add('hidden')
    }, false)
})

// **************************************************************

addAmountButton.addEventListener('click', function () {
    let amount = parseInt(addAmount.value);
    if (amount) {
        addMoney(amount, addAmountMode)
        clearInput()
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
    saveToLocalStorage()
}

addExpenseButton.addEventListener('click', function () {
    let amount = parseInt(expenseAmount.value)
    if (amount) {
        addExpense(amount, addExpenseMode)
        clearInput()
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
                const newExpense = {
                    type: expenseType.value,
                    amount: money,
                    date: expenseDate.value,
                    mode: mode.value
                }
                expenseList.push(newExpense)
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
                const newExpense = {
                    type: expenseType.value,
                    amount: money,
                    date: expenseDate.value,
                    mode: mode.value
                }
                expenseList.push(newExpense)
                updateUPIAmount();
                updateExpenseAmount();
            }
        }
        
    })
    saveToLocalStorage()
}

function displayExpenses() {
    const expenseHistoryBody = document.querySelector('#expenseHistoryBody');
    expenseHistoryBody.innerHTML = ''; 

    expenseList.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2 border border-gray-300">${expense.date}</td>
            <td class="px-4 py-2 border border-gray-300">${expense.type}</td>
            <td class="px-4 py-2 border border-gray-300">${expense.amount}</td>
            <td class="px-4 py-2 border border-gray-300">${expense.mode}</td>
        `;
        expenseHistoryBody.appendChild(row);
    });
    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem('cashAmount', cashAmount)
    localStorage.setItem('upiAmount', upiAmount)
    localStorage.setItem('totalExpense', totalExpense)
    localStorage.setItem('expenseList', JSON.stringify(expenseList))
}

function loadFromLocalStorage() {
    const savedExpenses = localStorage.getItem('expenseList');
    const savedCashAmount = localStorage.getItem('cashAmount');
    const savedUPIAmount = localStorage.getItem('upiAmount');
    const savedTotalExpense = localStorage.getItem('totalExpense');

    // If data exists in localStorage, parse it and use it
    if (savedExpenses) {
        expenseList = JSON.parse(savedExpenses);
        displayExpenses(); // Update the UI with the saved expense list
    }
    if (savedTotalExpense) {
        totalExpense = parseInt(savedTotalExpense);
        updateExpenseAmount(); 
    }
    if (savedCashAmount) {
        cashAmount = parseInt(savedCashAmount);
        updateCashAmount();
    }
    if (savedUPIAmount) {
        upiAmount = parseInt(savedUPIAmount);
        updateUPIAmount();
    }
}

function updateCashAmount() {
    cashAmountDisplay.forEach(cash => cash.innerHTML = `₹${cashAmount}`)
    saveToLocalStorage()
}

function updateUPIAmount() {
    upiAmountDisplay.forEach(upi => upi.innerHTML = `₹${upiAmount}`)
    saveToLocalStorage()
}

function updateExpenseAmount() {
    expenseAmountDisplay.forEach(expense => expense.innerHTML = `₹${totalExpense}`)
    saveToLocalStorage()
}

function clearInput() {
    addAmount.value = ''
    expenseAmount.value = ''
    addMoneyDate.value = ''
    expenseDate.value = ''
    expenseType.value = ''
    addExpenseMode.forEach(mode => mode.checked = false)
    addAmountMode.forEach(mode => mode.checked = false)
}

function reset() {
    cashAmount = 0;
    upiAmount = 0;
    totalExpense = 0;
    expenseList = []
    clearInput()
    updateCashAmount()
    updateUPIAmount()
    updateExpenseAmount()
    saveToLocalStorage()
}

window.onload = function() {
    loadFromLocalStorage(); // Load data from localStorage on page load
};