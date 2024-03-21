document.addEventListener("DOMContentLoaded", function() {
    // Variáveis para armazenar os elementos do DOM
    const itemInput = document.getElementById("item");
    const valueInput = document.getElementById("value");
    const addExpenseBtn = document.getElementById("addExpense");
    const calculateTotalBtn = document.getElementById("calculateTotal");
    const incomeInput = document.getElementById("income");
    const calculateBudgetBtn = document.getElementById("calculateBudget");
    const budgetStatus = document.getElementById("budgetStatus");
    const lastExpense = document.getElementById("lastExpense");
    const sendToWhatsAppBtn = document.getElementById("sendToWhatsApp");
    const expenseList = document.getElementById("expenseList");

    // Lista para armazenar os itens de despesa
    const expenses = [];

    // Função para adicionar despesa
    addExpenseBtn.addEventListener("click", function() {
        const item = itemInput.value;
        const value = parseFloat(valueInput.value);

        // Verifica se os campos não estão vazios
        if (item.trim() === "" || isNaN(value) || value <= 0) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Adiciona a despesa à lista
        expenses.push({ item: item, value: value });

        // Atualiza a lista de despesas no DOM
        renderExpenseList();

        // Limpa os campos de entrada
        itemInput.value = "";
        valueInput.value = "";

        // Faz o focus voltar para o campo de item
        itemInput.focus();
    });

    // Função para remover despesa da lista
    function removeExpense(index) {
        expenses.splice(index, 1);
        renderExpenseList();
    }

    // Função para renderizar a lista de despesas no DOM
function renderExpenseList() {
    // Limpa a lista de despesas no DOM
    expenseList.innerHTML = "";

    // Percorre a lista de despesas e adiciona cada item ao DOM
    expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${expense.item}: R$ ${expense.value.toFixed(2)}`;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "&times;"; // Usando um 'x' como ícone de remoção

        removeBtn.addEventListener("click", () => {
            removeExpense(index);
        });

        // Adiciona um espaço entre o texto do item e o botão de remoção
        listItem.appendChild(document.createTextNode(" "));
        listItem.appendChild(removeBtn);
        expenseList.appendChild(listItem);
    });
}



    // Função para calcular o total das despesas
    calculateTotalBtn.addEventListener("click", function() {
        let totalExpenses = 0;
        expenses.forEach(expense => {
            totalExpenses += expense.value;
        });

        // Atualiza o total das despesas no DOM
        lastExpense.textContent = "Total de Despesas: R$ " + totalExpenses.toFixed(2);
    });

    // Função para calcular o orçamento mensal
calculateBudgetBtn.addEventListener("click", function() {
    const income = parseFloat(incomeInput.value);

    // Verifica se o campo de renda mensal não está vazio
    if (isNaN(income) || income <= 0) {
        alert("Por favor, insira um valor válido para a renda mensal.");
        return;
    }

    let totalExpenses = 0;
    expenses.forEach(expense => {
        totalExpenses += expense.value;
    });

    // Calcula o orçamento mensal
    const budget = income - totalExpenses;

    // Atualiza o estado financeiro no DOM
    if (budget < 0) {
        budgetStatus.textContent = `Você está gastando mais do que ganha! Seu orçamento é de R$ ${budget.toFixed(2)}.`;
    } else if (budget === 0) {
        budgetStatus.textContent = `Seu orçamento está equilibrado! Seu orçamento é de R$ ${budget.toFixed(2)}.`;
    } else {
        budgetStatus.textContent = `Você está economizando dinheiro! Seu orçamento é de R$ ${budget.toFixed(2)}.`;
    }

    });

    // Função para enviar resultados para o WhatsApp
sendToWhatsAppBtn.addEventListener("click", function() {
    let message = "Resumo das Despesas:\n";
    expenses.forEach(expense => {
        message += `${expense.item}: R$ ${expense.value.toFixed(2)}\n`;
    });

    let totalExpenses = 0;
    expenses.forEach(expense => {
        totalExpenses += expense.value;
    });
    message += `\nTotal de Despesas: R$ ${totalExpenses.toFixed(2)}`;

    const income = parseFloat(incomeInput.value);
    if (!isNaN(income) && income > 0) {
        const budget = income - totalExpenses;
        message += `\nOrçamento Mensal: R$ ${budget.toFixed(2)}`;
    }

    // Encoda a mensagem para a URL
    const encodedMessage = encodeURIComponent(message);

    // Cria o link do WhatsApp com a mensagem
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;

    // Abre uma nova janela do WhatsApp com a mensagem
    window.open(whatsappLink, "_blank");
});

});
