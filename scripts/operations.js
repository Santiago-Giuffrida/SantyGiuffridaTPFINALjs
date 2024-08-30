// Muestra el formulario de operación
function showOperationForm(operationType) {
    const form = document.getElementById('operation-form');
    form.style.display = 'block';
    form.innerHTML = getOperationFormHTML(operationType);
}

// Devuelve el HTML para el formulario de operación
function getOperationFormHTML(operationType) {
    switch (operationType) {
        case 'deposit':
            return `
                <h2>Ingresar Dinero</h2>
                <form id="deposit-form">
                    <label>Monto:</label>
                    <input type="number" id="deposit-amount" required>
                    <button type="button" onclick="processDeposit()">Ingresar</button>
                </form>
            `;
        case 'withdraw':
            return `
                <h2>Retirar Dinero</h2>
                <form id="withdraw-form">
                    <label>Monto:</label>
                    <input type="number" id="withdraw-amount" required>
                    <button type="button" onclick="processWithdraw()">Retirar</button>
                </form>
            `;
        case 'transfer':
            return `
                <h2>Transferir Dinero</h2>
                <form id="transfer-form">
                    <label>Cuenta de Destino:</label>
                    <input type="text" id="transfer-account" required>
                    <label>Monto:</label>
                    <input type="number" id="transfer-amount" required>
                    <button type="button" onclick="processTransfer()">Transferir</button>
                </form>
            `;
        default:
            return '';
    }
}

// Procesa el depósito
function processDeposit() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (amount > 0) {
        const newBalance = parseFloat(localStorage.getItem('balance') || '1000.00') + amount;
        localStorage.setItem('balance', newBalance.toFixed(2));
        addTransaction('Ingreso', amount);
        updateBalanceDisplay();
        updateTransactionList();
    }
}

// Procesa el retiro
function processWithdraw() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const balance = parseFloat(localStorage.getItem('balance') || '1000.00');
    if (amount > 0 && amount <= balance) {
        const newBalance = balance - amount;
        localStorage.setItem('balance', newBalance.toFixed(2));
        addTransaction('Retiro', -amount);
        updateBalanceDisplay();
        updateTransactionList();
    }
}

// Procesa la transferencia
function processTransfer() {
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    const account = document.getElementById('transfer-account').value;
    const balance = parseFloat(localStorage.getItem('balance') || '1000.00');
    if (amount > 0 && amount <= balance) {
        const newBalance = balance - amount;
        localStorage.setItem('balance', newBalance.toFixed(2));
        addTransaction('Transferencia a ' + account, -amount);
        updateBalanceDisplay();
        updateTransactionList();
    }
}

// Añade una transacción al historial
function addTransaction(concept, amount) {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const newTransaction = {
        date: new Date().toLocaleString(),
        concept: concept,
        amount: `$ ${amount.toFixed(2)}`
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Actualiza el saldo en la UI
function updateBalanceDisplay() {
    const balance = parseFloat(localStorage.getItem('balance') || '1000.00').toFixed(2);
    document.getElementById('current-balance').textContent = `$ ${balance}`;
}

// Actualiza el historial de transacciones en la UI
function updateTransactionList() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(tx => {
        const li = document.createElement('li');
        li.textContent = `${tx.date} - ${tx.concept}: ${tx.amount}`;
        transactionList.appendChild(li);
    });
}
