/**
 * Arquivo de funções comuns utilizadas em todo o sistema
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configurar o botão de logout em todas as páginas
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
        });
    }
    
    // Verificar autenticação em todas as páginas
    checkAuth();
});

/**
 * Função para fazer logout do sistema
 */
function logout() {
    // Limpar os dados da sessão
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('professorId');
    
    // Redirecionar para a página de login
    window.location.href = '../index.html';
}

/**
 * Verificar se o usuário está autenticado
 */
function checkAuth() {
    const authToken = localStorage.getItem('authToken');
    const currentPath = window.location.pathname;
    
    // Se estiver em uma página que requer autenticação e não estiver autenticado
    if (!authToken && !currentPath.includes('index.html')) {
        window.location.href = '../index.html';
    }
    
    // Verificar o papel do usuário e restringir acesso
    const userRole = localStorage.getItem('userRole');
    
    // Se for administrador tentando acessar páginas de professor
    if (userRole === 'admin' && 
        (currentPath.includes('dashboard-professor.html') || 
         currentPath.includes('marcar-presenca.html') || 
         currentPath.includes('minhas-escolas.html') || 
         currentPath.includes('meu-historico.html') || 
         currentPath.includes('perfil.html'))) {
        window.location.href = 'dashboard.html';
    }
    
    // Se for professor tentando acessar páginas de administrador
    if (userRole === 'professor' && 
        (currentPath.includes('dashboard.html') && !currentPath.includes('dashboard-professor.html') ||
         currentPath.includes('escolas.html') || 
         currentPath.includes('professores.html') || 
         currentPath.includes('disciplinas.html') || 
         currentPath.includes('relatorios.html') || 
         currentPath.includes('configuracoes.html'))) {
        window.location.href = 'dashboard-professor.html';
    }
}

/**
 * Função para mostrar alertas
 */
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

/**
 * Função para abrir modais
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

/**
 * Função para fechar modais
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Função para formatar data no padrão brasileiro
 */
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
}

/**
 * Função para formatar hora
 */
function formatTime(date) {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
}

/**
 * Função para formatar data e hora
 */
function formatDateTime(date) {
    return `${formatDate(date)} - ${formatTime(date)}`;
}

/**
 * Função para gerar um ID único
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Função para gerar um token JWT simulado
 */
function generateSimulatedJWT(payload) {
    // Em um sistema real, este token seria gerado no servidor
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    // Em um sistema real, o signature seria gerado usando uma chave secreta
    const signature = btoa('simulated-signature');
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}