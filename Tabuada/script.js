// Selecionando elementos do DOM
const numberInput = document.getElementById('numberInput');
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
const generateButton = document.getElementById('generateButton');
const resultContainer = document.getElementById('resultContainer');
const resultList = document.getElementById('resultList');
const tableNumber = document.getElementById('tableNumber');
const decrementBtn = document.getElementById('decrementBtn');
const incrementBtn = document.getElementById('incrementBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial
    updateRangeValue();
    
    // Botão de gerar tabuada
    generateButton.addEventListener('click', generateTable);
    
    // Atualizar o valor do range ao mudar
    rangeInput.addEventListener('input', updateRangeValue);
    
    // Botões de incremento e decremento
    decrementBtn.addEventListener('click', () => {
        if (numberInput.value > 1) {
            numberInput.value = parseInt(numberInput.value) - 1;
        }
    });
    
    incrementBtn.addEventListener('click', () => {
        numberInput.value = parseInt(numberInput.value) + 1;
    });
    
    // Gerar tabuada inicial
    generateTable();
});

// Atualiza o valor exibido do range
function updateRangeValue() {
    rangeValue.textContent = rangeInput.value;
    
    // Atualiza o background do slider
    const percentage = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeInput.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-border) ${percentage}%, var(--color-border) 100%)`;
}

// Gera a tabuada
function generateTable() {
    const number = parseInt(numberInput.value) || 5;
    const range = parseInt(rangeInput.value) || 10;
    
    // Atualiza o número da tabuada exibido
    tableNumber.textContent = number;
    
    // Limpa os resultados anteriores
    resultList.innerHTML = '';
    
    // Mostra o container de resultados com animação
    resultContainer.classList.add('active');
    
    // Gera os itens da tabuada
    for (let i = 1; i <= range; i++) {
        const result = number * i;
        
        // Cria o elemento da tabuada
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `${number} × ${i} = <strong>${result}</strong>`;
        
        // Adiciona à lista
        resultList.appendChild(resultItem);
        
        // Adiciona animação com delay baseado no índice
        setTimeout(() => {
            resultItem.classList.add('visible');
        }, i * 100);
    }
    
    // Animação do container
    resultContainer.style.opacity = 0;
    resultContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultContainer.style.opacity = 1;
        resultContainer.style.transform = 'translateY(0)';
    }, 100);
}

// Validação para o input de número
numberInput.addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    if (this.value > 100) this.value = 100;
});

// Easter egg - mostra uma mensagem de incentivo ao clicar várias vezes no botão
let clickCount = 0;
generateButton.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 5) {
        const messages = [
            "Você está indo muito bem!",
            "Continue praticando!",
            "A matemática é divertida!",
            "Você está se tornando um mestre da tabuada!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('success-message');
        messageElement.textContent = randomMessage;
        messageElement.style.position = 'fixed';
        messageElement.style.top = '20px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.background = 'var(--color-success)';
        messageElement.style.color = 'white';
        messageElement.style.padding = '15px 25px';
        messageElement.style.borderRadius = 'var(--border-radius-md)';
        messageElement.style.boxShadow = 'var(--shadow-md)';
        messageElement.style.zIndex = '1000';
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        }, 3000);
        
        clickCount = 0;
    }
});