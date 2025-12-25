/**
 * Sistema de Gerenciamento de Temas - Claro/Escuro
 */

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Aplicar tema salvo
        this.applyTheme(this.theme);
        
        // Criar botão de alternância se não existir
        this.createToggleButton();
        
        // Adicionar listener para mudanças de preferência do sistema
        this.watchSystemTheme();
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        // Atualizar ícone do botão
        this.updateToggleIcon(theme);
        
        // Salvar preferência
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Adicionar animação de transição
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    createToggleButton() {
        // Verificar se já existe
        if (document.getElementById('themeToggle')) {
            const existingBtn = document.getElementById('themeToggle');
            existingBtn.addEventListener('click', () => this.toggleTheme());
            this.updateToggleIcon(this.theme);
            return;
        }

        // Criar botão apenas em páginas do dashboard
        const userInfo = document.querySelector('.user-info');
        if (!userInfo) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'themeToggle';
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('title', 'Alternar tema');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        
        toggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Inserir antes da info do usuário
        userInfo.parentElement.insertBefore(toggleBtn, userInfo);
        
        this.updateToggleIcon(this.theme);
    }

    updateToggleIcon(theme) {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            toggleBtn.setAttribute('title', 'Mudar para tema claro');
        } else {
            icon.className = 'fas fa-moon';
            toggleBtn.setAttribute('title', 'Mudar para tema escuro');
        }
    }

    watchSystemTheme() {
        // Detectar mudanças nas preferências do sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Apenas aplicar se o usuário não tiver uma preferência salva
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    getTheme() {
        return this.theme;
    }
}

// Inicializar gerenciador de temas quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Aplicar tema imediatamente para evitar flash
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();
