let transactions = [];

document.getElementById('add-btn').addEventListener('click', function() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && !isNaN(amount)) {
        const transaction = {
            id: Date.now(),
            description,
            amount,
            type
        };

        transactions.push(transaction);
        updateLocalStorage();
        updateUI();
    }
});

function updateUI() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    document.getElementById('income').textContent = `$${income.toFixed(2)}`;
    document.getElementById('expense').textContent = `$${expense.toFixed(2)}`;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.innerHTML = `
            ${transaction.description} <span>$${transaction.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${transaction.id})">X</button>
        `;
        transactionsList.appendChild(li);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    updateUI();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadFromLocalStorage() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
    }
    updateUI();
}

loadFromLocalStorage();
