// Inicializa la aplicación
document.addEventListener('DOMContentLoaded', () => {
    initializeData().then(() => {
        // Configura el saldo inicial y el historial
        if (!localStorage.getItem('balance')) {
            localStorage.setItem('balance', '1000.00'); // Saldo inicial
        }
        if (!localStorage.getItem('transactions')) {
            localStorage.setItem('transactions', JSON.stringify([])); // Historial vacío
        }
        updateBalanceDisplay();
        updateTransactionList();
    });
});
