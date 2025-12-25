document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulação de autenticação (em um sistema real, isso seria feito no servidor)
            if (email === 'admin@escola.com' && password === 'admin123') {
                // Armazenar o token simulado (em um sistema real, isso seria um JWT)
                localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userName', 'Administrador');
                
                // Redirecionar para o dashboard
                window.location.href = 'views/dashboard.html';
            } else if (email === 'professor@escola.com' && password === 'prof123') {
                // Token simulado para professor
                localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
                localStorage.setItem('userRole', 'professor');
                localStorage.setItem('userName', 'Professor Silva');
                localStorage.setItem('professorId', '1');
                
                // Redirecionar para o dashboard de professor
                window.location.href = 'views/dashboard-professor.html';
            } else {
                // Exibir mensagem de erro
                showAlert('Credenciais inválidas. Por favor, tente novamente.', 'error');
            }
        });
    }
    
    // Verificar se o usuário já está autenticado
    checkAuth();
});

// Função para mostrar alertas
function showAlert(message, type = 'info') {
    // Verificar se já existe um alerta e removê-lo
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Criar o elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(alert);
    
    // Adicionar classe para animar a entrada
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    // Configurar o fechamento do alerta
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    });
    
    // Auto-fechar após 5 segundos para alertas não-erro
    if (type !== 'error') {
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    }
}

// Verificar se o usuário já está autenticado
function checkAuth() {
    const authToken = localStorage.getItem('authToken');
    const currentPath = window.location.pathname;
    
    // Se estiver em uma página que requer autenticação e não estiver autenticado
    if (currentPath !== '/' && currentPath !== '/index.html' && !authToken) {
        window.location.href = '/index.html';
    }
    
    // Se estiver na página de login e já estiver autenticado
    if ((currentPath === '/' || currentPath === '/index.html') && authToken) {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            window.location.href = '/views/dashboard.html';
        } else if (userRole === 'professor') {
            window.location.href = '/views/dashboard-professor.html';
        }
    }
}