/**
 * Script para a Área de Estudos
 * 
 * Este script contém as funcionalidades para:
 * - Alternância entre abas de login e registro
 * - Exibição/ocultação de senhas
 * - Manipulação do modal de termos e condições
 * - Manipulação do modal de vídeo
 * - Funcionalidades do FAQ
 */

document.addEventListener('DOMContentLoaded', function() {
    // Alternância entre abas de login e registro
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get target form
            const targetForm = tab.getAttribute('data-tab');
            
            // Hide all forms
            authForms.forEach(form => form.classList.remove('active'));
            
            // Show target form
            document.getElementById(targetForm + '-form').classList.add('active');
        });
    });
    
    // Toggle password visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            const icon = button.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Termos e condições modal
    const termsLink = document.querySelector('.terms-link');
    const termsModal = document.getElementById('termsModal');
    const closeTermsModal = document.getElementById('closeTermsModal');
    const acceptTerms = document.getElementById('acceptTerms');
    
    if (termsLink && termsModal) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeTermsModal.addEventListener('click', () => {
            termsModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        acceptTerms.addEventListener('click', () => {
            const agreeCheckbox = document.getElementById('agree-terms');
            if (agreeCheckbox) {
                agreeCheckbox.checked = true;
            }
            termsModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                termsModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Video modal
    const previewPlayBtn = document.querySelector('.preview-play-btn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    if (previewPlayBtn && videoModal) {
        previewPlayBtn.addEventListener('click', () => {
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Set video URL - Replace with actual video URL
            videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        });
        
        closeVideoModal.addEventListener('click', () => {
            videoModal.style.display = 'none';
            document.body.style.overflow = '';
            videoFrame.src = '';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                document.body.style.overflow = '';
                videoFrame.src = '';
            }
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Formulários de autenticação
    const loginForm = document.getElementById('login-form')?.querySelector('form');
    const registerForm = document.getElementById('register-form')?.querySelector('form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const matricula = document.getElementById('login-matricula').value;
            const senha = document.getElementById('login-senha').value;
            
            // Verificações básicas
            if (!matricula || !senha) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simulando autenticação bem-sucedida - redirecionar para dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('reg-nome').value;
            const matricula = document.getElementById('reg-matricula').value;
            const email = document.getElementById('reg-email').value;
            const serie = document.getElementById('reg-serie').value;
            const senha = document.getElementById('reg-senha').value;
            const confirmaSenha = document.getElementById('reg-confirma-senha').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            
            // Verificações básicas
            if (!nome || !matricula || !email || !serie || !senha) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (senha !== confirmaSenha) {
                alert('As senhas não coincidem.');
                return;
            }
            
            if (!agreeTerms) {
                alert('Você precisa concordar com os Termos e Condições.');
                return;
            }
            
            // Simulando registro bem-sucedido - redirecionar para dashboard
            alert('Registro realizado com sucesso! Faça login para continuar.');
            // Alternar para o formulário de login
            document.querySelector('.auth-tab[data-tab="login"]').click();
        });
    }
});