document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados do usuário logado
    loadUserData();
    
    // Configurar listeners para botões
    document.getElementById('editProfileBtn').addEventListener('click', openEditProfileModal);
    document.getElementById('changePasswordBtn').addEventListener('click', openChangePasswordModal);
    document.getElementById('changeAvatarBtn').addEventListener('click', openChangeAvatarModal);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Configurar modais
    setupModals();
    
    // Configurar toggles de senha
    setupPasswordToggles();
    
    // Configurar validação de senha
    setupPasswordValidation();
    
    // Configurar seleção de avatar
    setupAvatarSelection();
    
    // Configurar salvar alterações
    document.getElementById('saveProfileBtn').addEventListener('click', saveProfileChanges);
    document.getElementById('savePasswordBtn').addEventListener('click', savePasswordChanges);
    document.getElementById('saveAvatarBtn').addEventListener('click', saveAvatarChanges);
    
    // Configurar toggles de configurações
    setupToggleSettings();
    
    // Configurar seletores de tema e idioma
    document.getElementById('themeSelector').addEventListener('change', changeTheme);
    document.getElementById('languageSelector').addEventListener('change', changeLanguage);
});

// Carregar dados do usuário logado
function loadUserData() {
    // Em um sistema real, esses dados viriam do servidor
    // Para este exemplo, usamos dados simulados ou do localStorage
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    
    if (loggedUser) {
        document.getElementById('professorName').textContent = loggedUser.name;
        document.getElementById('profileName').textContent = loggedUser.name;
        document.getElementById('fullName').textContent = loggedUser.name;
        
        // Definir a data de nascimento no campo de edição (formato ISO)
        const birthDate = "1985-05-15"; // Formato YYYY-MM-DD para campos date
        document.getElementById('editBirthDate').value = birthDate;
    }
}

// Configurar modais
function setupModals() {
    // Modal de editar perfil
    setupModal('editProfileModal', 'closeEditProfileModal', 'cancelEditProfileBtn');
    
    // Modal de alterar senha
    setupModal('changePasswordModal', 'closeChangePasswordModal', 'cancelChangePasswordBtn');
    
    // Modal de alterar avatar
    setupModal('changeAvatarModal', 'closeChangeAvatarModal', 'cancelAvatarBtn');
}

// Configuração genérica de modal
function setupModal(modalId, closeBtnId, cancelBtnId) {
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);
    
    // Fechar modal quando clicar no X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal quando clicar em Cancelar
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Fechar modal quando clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Abrir modal de editar perfil
function openEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    
    // Preencher o formulário com os dados atuais do usuário
    document.getElementById('editFullName').value = document.getElementById('fullName').textContent;
    document.getElementById('editEmail').value = document.getElementById('email').textContent;
    document.getElementById('editPhone').value = document.getElementById('phone').textContent;
    document.getElementById('editAddress').value = document.getElementById('address').textContent;
    
    // Separar cidade e UF
    const cityState = document.getElementById('cityState').textContent.split('/');
    document.getElementById('editCity').value = cityState[0];
    document.getElementById('editState').value = cityState[1];
    
    document.getElementById('editZipCode').value = document.getElementById('zipCode').textContent;
    
    // Exibir modal
    modal.style.display = 'flex';
}

// Abrir modal de alterar senha
function openChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    
    // Limpar campos do formulário
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Resetar validação
    resetPasswordValidation();
    
    // Exibir modal
    modal.style.display = 'flex';
}

// Abrir modal de alterar avatar
function openChangeAvatarModal() {
    const modal = document.getElementById('changeAvatarModal');
    
    // Definir o avatar atual como preview
    const currentAvatar = document.getElementById('profileAvatar').src;
    document.getElementById('avatarPreview').src = currentAvatar;
    
    // Marcar a opção correspondente como selecionada
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.avatar === currentAvatar) {
            option.classList.add('active');
        }
    });
    
    // Exibir modal
    modal.style.display = 'flex';
}

// Configurar toggles de senha
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputField = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (inputField.type === 'password') {
                inputField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                inputField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Configurar validação de senha
function setupPasswordValidation() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    newPasswordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
}

// Validar força da senha
function validatePassword() {
    const password = document.getElementById('newPassword').value;
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    // Atualizar indicadores de requisitos
    Object.keys(requirements).forEach(req => {
        const reqElement = document.querySelector(`.requirement[data-requirement="${req}"] i`);
        if (requirements[req]) {
            reqElement.classList.remove('fa-circle');
            reqElement.classList.add('fa-check-circle');
            reqElement.parentElement.classList.add('met');
        } else {
            reqElement.classList.remove('fa-check-circle');
            reqElement.classList.add('fa-circle');
            reqElement.parentElement.classList.remove('met');
        }
    });
    
    // Calcular pontuação de força (0-4)
    const strength = Object.values(requirements).filter(Boolean).length;
    
    // Atualizar medidor de força
    const segments = document.querySelectorAll('.strength-segment');
    segments.forEach((segment, index) => {
        segment.className = 'strength-segment';
        if (index < strength) {
            switch (strength) {
                case 1:
                    segment.classList.add('very-weak');
                    break;
                case 2:
                    segment.classList.add('weak');
                    break;
                case 3:
                    segment.classList.add('medium');
                    break;
                case 4:
                case 5:
                    segment.classList.add('strong');
                    break;
            }
        }
    });
    
    // Atualizar texto de força
    const strengthText = document.querySelector('.strength-text');
    switch (strength) {
        case 0:
        case 1:
            strengthText.textContent = 'Senha muito fraca';
            break;
        case 2:
            strengthText.textContent = 'Senha fraca';
            break;
        case 3:
            strengthText.textContent = 'Senha média';
            break;
        case 4:
            strengthText.textContent = 'Senha forte';
            break;
        case 5:
            strengthText.textContent = 'Senha muito forte';
            break;
    }
    
    // Verificar correspondência de senhas
    checkPasswordMatch();
}

// Verificar se as senhas são iguais
function checkPasswordMatch() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (confirmPassword) {
        if (newPassword === confirmPassword) {
            document.getElementById('confirmPassword').classList.remove('invalid');
            document.getElementById('confirmPassword').classList.add('valid');
        } else {
            document.getElementById('confirmPassword').classList.remove('valid');
            document.getElementById('confirmPassword').classList.add('invalid');
        }
    }
}

// Resetar validação de senha
function resetPasswordValidation() {
    // Limpar campos
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Resetar medidor de força
    const segments = document.querySelectorAll('.strength-segment');
    segments.forEach(segment => {
        segment.className = 'strength-segment';
    });
    
    // Resetar texto de força
    document.querySelector('.strength-text').textContent = 'Senha fraca';
    
    // Resetar requisitos
    const requirements = document.querySelectorAll('.requirement i');
    requirements.forEach(req => {
        req.classList.remove('fa-check-circle');
        req.classList.add('fa-circle');
        req.parentElement.classList.remove('met');
    });
    
    // Resetar campo de confirmação
    document.getElementById('confirmPassword').classList.remove('valid');
    document.getElementById('confirmPassword').classList.remove('invalid');
}

// Configurar seleção de avatar
function setupAvatarSelection() {
    const avatarOptions = document.querySelectorAll('.avatar-option');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarUpload = document.getElementById('avatarUpload');
    
    // Selecionar avatar predefinido
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            avatarOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            avatarPreview.src = this.dataset.avatar;
        });
    });
    
    // Upload de avatar personalizado
    avatarUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
                avatarOptions.forEach(opt => opt.classList.remove('active'));
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// Configurar toggles de configurações
function setupToggleSettings() {
    const toggleCheckboxes = document.querySelectorAll('.toggle-checkbox');
    
    toggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Em um sistema real, enviaríamos esta alteração para o servidor
            const settingName = this.parentElement.previousElementSibling.querySelector('.setting-name').textContent;
            const settingEnabled = this.checked;
            
            showToast(`${settingName} ${settingEnabled ? 'ativado' : 'desativado'}.`, 'success');
        });
    });
}

// Salvar alterações de perfil
function saveProfileChanges() {
    // Obter valores do formulário
    const fullName = document.getElementById('editFullName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const address = document.getElementById('editAddress').value;
    const city = document.getElementById('editCity').value;
    const state = document.getElementById('editState').value;
    const zipCode = document.getElementById('editZipCode').value;
    
    // Validar formulário
    if (!fullName || !email || !phone || !address || !city || !state || !zipCode) {
        showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Em um sistema real, enviaríamos estas alterações para o servidor
    
    // Atualizar informações exibidas
    document.getElementById('fullName').textContent = fullName;
    document.getElementById('profileName').textContent = fullName;
    document.getElementById('professorName').textContent = fullName;
    document.getElementById('email').textContent = email;
    document.getElementById('phone').textContent = phone;
    document.getElementById('address').textContent = address;
    document.getElementById('cityState').textContent = `${city}/${state}`;
    document.getElementById('zipCode').textContent = zipCode;
    
    // Atualizar usuário no localStorage
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {};
    loggedUser.name = fullName;
    loggedUser.email = email;
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    
    // Fechar modal
    document.getElementById('editProfileModal').style.display = 'none';
    
    // Mostrar notificação
    showToast('Perfil atualizado com sucesso!', 'success');
}

// Salvar alterações de senha
function savePasswordChanges() {
    // Obter valores do formulário
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validar formulário
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Verificar senha atual (em um sistema real, isto seria verificado no servidor)
    if (currentPassword !== '123456') {
        showToast('Senha atual incorreta. Por favor, tente novamente.', 'error');
        return;
    }
    
    // Verificar correspondência de senhas
    if (newPassword !== confirmPassword) {
        showToast('As senhas não correspondem. Por favor, tente novamente.', 'error');
        return;
    }
    
    // Verificar força da senha
    const requirements = {
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        lowercase: /[a-z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        special: /[^A-Za-z0-9]/.test(newPassword)
    };
    
    const strength = Object.values(requirements).filter(Boolean).length;
    
    if (strength < 3) {
        showToast('Por favor, escolha uma senha mais forte.', 'error');
        return;
    }
    
    // Em um sistema real, enviaríamos a nova senha para o servidor
    
    // Fechar modal
    document.getElementById('changePasswordModal').style.display = 'none';
    
    // Mostrar notificação
    showToast('Senha alterada com sucesso!', 'success');
}

// Salvar alterações de avatar
function saveAvatarChanges() {
    // Obter o avatar selecionado
    const newAvatar = document.getElementById('avatarPreview').src;
    
    // Em um sistema real, enviaríamos o novo avatar para o servidor
    
    // Atualizar avatar na página
    document.getElementById('profileAvatar').src = newAvatar;
    document.querySelector('.user-avatar').src = newAvatar;
    
    // Fechar modal
    document.getElementById('changeAvatarModal').style.display = 'none';
    
    // Mostrar notificação
    showToast('Avatar atualizado com sucesso!', 'success');
}

// Alterar tema
function changeTheme(event) {
    const theme = event.target.value;
    
    // Em um sistema real, aplicaríamos o tema selecionado
    showToast(`Tema alterado para ${theme}.`, 'success');
    
    // Simulação de alteração de tema
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}

// Alterar idioma
function changeLanguage(event) {
    const language = event.target.value;
    const languages = {
        'pt-br': 'Português (Brasil)',
        'en': 'English',
        'es': 'Español'
    };
    
    // Em um sistema real, aplicaríamos o idioma selecionado
    showToast(`Idioma alterado para ${languages[language]}.`, 'success');
}

// Função para exibir notificações tipo toast
function showToast(message, type = 'info') {
    // Se a função não existe no common.js, implementamos aqui
    if (typeof window.showAlert !== 'function') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    } else {
        // Usar a função do common.js se disponível
        window.showAlert(message, type);
    }
}

// Função de logout
function logout() {
    // Remover dados de sessão
    localStorage.removeItem('loggedUser');
    // Redirecionar para página de login
    window.location.href = '../index.html';
}