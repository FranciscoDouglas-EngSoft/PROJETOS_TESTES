// configuracoes.js - Lógica para página de configurações

document.addEventListener('DOMContentLoaded', function() {
    initConfigurationsPage();
    setupEventListeners();
});

// Inicializar a página de configurações
function initConfigurationsPage() {
    // Carregar as configurações salvas ou usar padrões
    loadSavedConfigurations();
    
    // Inicializar componentes dinâmicos (como seletores de cores)
    initColorPickers();
}

// Configurar ouvintes de eventos
function setupEventListeners() {
    // Navegação entre abas de configuração
    const menuItems = document.querySelectorAll('.config-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-target');
            switchConfigSection(targetSection);
        });
    });
    
    // Botões de salvar configurações
    const saveButtons = document.querySelectorAll('.config-actions .btn-primary');
    saveButtons.forEach(button => {
        button.addEventListener('click', saveConfigurations);
    });
    
    // Botões de cancelar
    const cancelButtons = document.querySelectorAll('.config-actions .btn-outline');
    cancelButtons.forEach(button => {
        button.addEventListener('click', cancelChanges);
    });
    
    // Seletores que afetam exibição condicional
    setupConditionalDisplays();
    
    // Eventos específicos para cada seção de configuração
    setupSpecificSectionEvents();
}

// Alternar entre as seções de configuração
function switchConfigSection(targetId) {
    // Atualizar o menu
    const menuItems = document.querySelectorAll('.config-menu-item');
    menuItems.forEach(item => {
        if (item.getAttribute('data-target') === targetId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Atualizar as seções de conteúdo
    const sections = document.querySelectorAll('.config-section');
    sections.forEach(section => {
        if (section.id === targetId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Carregar configurações salvas (do localStorage)
function loadSavedConfigurations() {
    try {
        // Carregar configurações do localStorage, se disponível
        const savedConfig = localStorage.getItem('systemConfigurations');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            applyConfigurationValues(config);
        }
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        // Continuar com os valores padrão que já estão no HTML
    }
}

// Aplicar valores de configuração aos elementos da interface
function applyConfigurationValues(config) {
    // Aplicar configurações gerais
    if (config.gerais) {
        setInputValue('systemName', config.gerais.systemName);
        setInputValue('systemEmail', config.gerais.systemEmail);
        setInputValue('systemPhone', config.gerais.systemPhone);
        setInputValue('primaryColor', config.gerais.primaryColor);
        setInputValue('secondaryColor', config.gerais.secondaryColor);
        setInputValue('accentColor', config.gerais.accentColor);
        setSelectValue('themeSwitcher', config.gerais.theme);
        setSelectValue('language', config.gerais.language);
        setSelectValue('timezone', config.gerais.timezone);
        setSelectValue('dateFormat', config.gerais.dateFormat);
        setSelectValue('timeFormat', config.gerais.timeFormat);
    }
    
    // Aplicar configurações de escolas
    if (config.escolas) {
        setInputValue('registroQrExpiracao', config.escolas.qrExpiracao);
        setInputValue('distanciaRegistro', config.escolas.distanciaMaxima);
        setCheckboxValue('verificarLocalizacao', config.escolas.verificarLocalizacao);
        setCheckboxValue('permitirRegistroOffline', config.escolas.registroOffline);
        // Os períodos escolares são muito complexos para implementar aqui
    }
    
    // Aplicar configurações de atestados
    if (config.atestados) {
        setInputValue('prazoEnvioAtestado', config.atestados.prazoEnvio);
        setCheckboxValue('exigirCID', config.atestados.exigirCID);
        setCheckboxValue('exigirAssinatura', config.atestados.exigirAssinatura);
        setCheckboxValue('exigirCarimbo', config.atestados.exigirCarimbo);
        setInputValue('diasMaximosSemCID', config.atestados.diasSemCID);
        
        // Configurar opções de rádio para aprovação
        if (config.atestados.aprovacaoPor === 'admin') {
            document.getElementById('aprovacaoAdmin').checked = true;
        } else if (config.atestados.aprovacaoPor === 'coordenador') {
            document.getElementById('aprovacaoCoordenador').checked = true;
        } else if (config.atestados.aprovacaoPor === 'automatica') {
            document.getElementById('aprovacaoAutomatic').checked = true;
        }
        
        setCheckboxValue('notificarAprovacao', config.atestados.notificarAprovacao);
        setSelectValue('justificativaRejeicao', config.atestados.justificativaRejeicao);
        
        // Tipos de atestados
        if (config.atestados.tipos) {
            setCheckboxValue('tipoMedico', config.atestados.tipos.medico);
            setCheckboxValue('tipoOdontologico', config.atestados.tipos.odontologico);
            setCheckboxValue('tipoFisioterapia', config.atestados.tipos.fisioterapia);
            setCheckboxValue('tipoPsicologico', config.atestados.tipos.psicologico);
            setCheckboxValue('tipoAcompanhamento', config.atestados.tipos.acompanhamento);
        }
    }
    
    // Aplicar configurações de notificações
    if (config.notificacoes) {
        setCheckboxValue('notifEmail', config.notificacoes.canais.email);
        setCheckboxValue('notifSMS', config.notificacoes.canais.sms);
        setCheckboxValue('notifPush', config.notificacoes.canais.push);
        setCheckboxValue('notifWhatsapp', config.notificacoes.canais.whatsapp);
        
        // As configurações de eventos são muito complexas para implementar aqui
        
        // SMTP
        setInputValue('smtpServer', config.notificacoes.smtp.server);
        setInputValue('smtpPort', config.notificacoes.smtp.port);
        setInputValue('smtpUser', config.notificacoes.smtp.user);
        // A senha não deve ser preenchida por questões de segurança
        setCheckboxValue('smtpSSL', config.notificacoes.smtp.ssl);
    }
    
    // Aplicar configurações de sistema
    if (config.sistema) {
        setInputValue('cacheTTL', config.sistema.cacheTTL);
        setSelectValue('limparCacheAuto', config.sistema.limparCacheAuto);
        setInputValue('limiteBuscas', config.sistema.limiteBuscas);
        
        // Segurança
        setInputValue('tempoSessao', config.sistema.seguranca.tempoSessao);
        setSelectValue('forcaSenha', config.sistema.seguranca.forcaSenha);
        setSelectValue('expiracaoSenha', config.sistema.seguranca.expiracaoSenha);
        setCheckboxValue('autenticacaoDupla', config.sistema.seguranca.autenticacaoDupla);
        setInputValue('tentativasLogin', config.sistema.seguranca.tentativasLogin);
        setInputValue('tempoBloqueio', config.sistema.seguranca.tempoBloqueio);
    }
}

// Funções auxiliares para configurar valores de elementos
function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
        element.value = value;
    }
}

function setCheckboxValue(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
        element.checked = value;
    }
}

function setSelectValue(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
        element.value = value;
    }
}

// Inicializar seletores de cores
function initColorPickers() {
    // Esta é uma implementação básica.
    // Em uma aplicação real, você usaria uma biblioteca de seletores de cores mais avançada
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateColorPreview(this);
        });
        
        // Inicializar com a cor atual
        updateColorPreview(input);
    });
}

// Atualizar visualização de cores
function updateColorPreview(colorInput) {
    const color = colorInput.value;
    // Aqui você poderia aplicar a cor em um elemento de visualização
    // ou atualizar o tema do aplicativo em tempo real
}

// Configurar exibições condicionais baseadas em seletores
function setupConditionalDisplays() {
    // Exemplo: Mostrar/esconder configurações adicionais de senha com base na força
    const forcaSenha = document.getElementById('forcaSenha');
    if (forcaSenha) {
        forcaSenha.addEventListener('change', function() {
            // Implementação para mostrar/esconder opções adicionais
        });
    }
}

// Configurar eventos específicos para cada seção
function setupSpecificSectionEvents() {
    // Eventos para a seção de sistema
    setupSystemEvents();
    
    // Eventos para a seção de logs
    setupLogEvents();
    
    // Eventos para a seção de escolas
    setupSchoolEvents();
    
    // Eventos para a seção de atestados
    setupAtestadosEvents();
}

// Eventos específicos para cada seção
function setupSystemEvents() {
    const verifyUpdateBtn = document.querySelector('.version-actions .btn');
    if (verifyUpdateBtn) {
        verifyUpdateBtn.addEventListener('click', checkForUpdates);
    }
}

function setupLogEvents() {
    const filterBtn = document.querySelector('#logs .filter-actions .btn-primary');
    if (filterBtn) {
        filterBtn.addEventListener('click', filterLogs);
    }
    
    const clearFilterBtn = document.querySelector('#logs .filter-actions .btn-outline');
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', clearLogFilters);
    }
    
    const exportLogsBtn = document.querySelector('#logs .config-actions .btn-outline');
    if (exportLogsBtn) {
        exportLogsBtn.addEventListener('click', exportLogs);
    }
    
    const clearLogsBtn = document.querySelector('#logs .config-actions .btn-danger');
    if (clearLogsBtn) {
        clearLogsBtn.addEventListener('click', clearLogs);
    }
}

function setupSchoolEvents() {
    const addPeriodBtn = document.querySelector('.table-actions .btn');
    if (addPeriodBtn) {
        addPeriodBtn.addEventListener('click', addSchoolPeriod);
    }
    
    // Configurar eventos de editar e excluir para períodos existentes
    const editButtons = document.querySelectorAll('#escolas .actions button[title="Editar"]');
    const deleteButtons = document.querySelectorAll('#escolas .actions button[title="Remover"]');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            editSchoolPeriod(row);
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            deleteSchoolPeriod(row);
        });
    });
}

function setupAtestadosEvents() {
    const addTypeBtn = document.querySelector('#atestados .btn-sm');
    if (addTypeBtn) {
        addTypeBtn.addEventListener('click', addCustomAtestadoType);
    }
}

// Funções para eventos específicos
function checkForUpdates() {
    showNotification('Verificando atualizações...', 'info');
    
    // Simular verificação
    setTimeout(() => {
        const versionStatus = document.querySelector('.version-value.version-uptodate');
        if (versionStatus) {
            versionStatus.textContent = 'Atualizado';
            versionStatus.className = 'version-value version-uptodate';
        }
        showNotification('Sistema atualizado para a versão mais recente!', 'success');
    }, 2000);
}

function filterLogs() {
    // Implementação para filtrar logs
    showNotification('Filtros aplicados aos logs', 'success');
}

function clearLogFilters() {
    // Limpar os filtros
    const filterInputs = document.querySelectorAll('#logs .filter-group input, #logs .filter-group select');
    filterInputs.forEach(input => {
        if (input.type === 'text') {
            input.value = '';
        } else if (input.type === 'date') {
            input.value = '';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        }
    });
    
    showNotification('Filtros de logs removidos', 'info');
}

function exportLogs() {
    showNotification('Exportando logs...', 'info');
    
    // Simular exportação
    setTimeout(() => {
        showNotification('Logs exportados com sucesso!', 'success');
    }, 1500);
}

function clearLogs() {
    if (confirm('Tem certeza que deseja limpar os logs antigos? Esta ação não pode ser desfeita.')) {
        showNotification('Limpando logs antigos...', 'info');
        
        // Simular limpeza
        setTimeout(() => {
            // Remover algumas linhas da tabela para simular a limpeza
            const logRows = document.querySelectorAll('#logs table tbody tr');
            if (logRows.length > 2) {
                for (let i = 2; i < logRows.length; i++) {
                    logRows[i].remove();
                }
            }
            
            showNotification('Logs antigos foram removidos com sucesso!', 'success');
        }, 1500);
    }
}

function addSchoolPeriod() {
    const tbody = document.querySelector('#escolas table tbody');
    if (tbody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" placeholder="Nome do período"></td>
            <td><input type="time" value="08:00"></td>
            <td><input type="time" value="12:00"></td>
            <td><input type="number" value="10" min="0" max="60"></td>
            <td class="actions">
                <button title="Editar"><i class="fas fa-edit"></i></button>
                <button title="Remover"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        
        // Adicionar eventos aos novos botões
        const editBtn = newRow.querySelector('button[title="Editar"]');
        const deleteBtn = newRow.querySelector('button[title="Remover"]');
        
        editBtn.addEventListener('click', function() {
            editSchoolPeriod(newRow);
        });
        
        deleteBtn.addEventListener('click', function() {
            deleteSchoolPeriod(newRow);
        });
        
        showNotification('Novo período adicionado', 'success');
    }
}

function editSchoolPeriod(row) {
    // Tornar os campos editáveis ou abrir um modal de edição
    row.classList.add('editing');
    
    // Em uma implementação real, você poderia abrir um modal aqui
    showNotification('Editando período...', 'info');
}

function deleteSchoolPeriod(row) {
    if (confirm('Tem certeza que deseja remover este período?')) {
        row.remove();
        showNotification('Período removido com sucesso', 'success');
    }
}

function addCustomAtestadoType() {
    // Abrir um prompt ou modal para adicionar um tipo personalizado
    const typeName = prompt('Digite o nome do tipo de atestado:');
    
    if (typeName && typeName.trim() !== '') {
        const tipoId = 'tipo' + typeName.replace(/\s+/g, '');
        
        const container = document.querySelector('#atestados .config-form');
        const lastCheckboxGroup = container.querySelector('.input-group:nth-last-child(2)');
        
        const newCheckboxGroup = document.createElement('div');
        newCheckboxGroup.className = 'input-group checkbox';
        newCheckboxGroup.innerHTML = `
            <input type="checkbox" id="${tipoId}" checked>
            <label for="${tipoId}">${typeName}</label>
        `;
        
        container.insertBefore(newCheckboxGroup, lastCheckboxGroup.nextSibling);
        
        showNotification(`Tipo "${typeName}" adicionado com sucesso`, 'success');
    }
}

// Salvar configurações
function saveConfigurations() {
    // Coletar todos os valores das configurações
    const config = collectConfigurationValues();
    
    // Salvar no localStorage
    try {
        localStorage.setItem('systemConfigurations', JSON.stringify(config));
        showNotification('Configurações salvas com sucesso!', 'success');
        
        // Aplicar mudanças na interface
        applyConfigurationChanges(config);
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        showNotification('Erro ao salvar configurações.', 'error');
    }
}

// Coletar valores de configuração
function collectConfigurationValues() {
    const config = {
        gerais: {
            systemName: getInputValue('systemName'),
            systemEmail: getInputValue('systemEmail'),
            systemPhone: getInputValue('systemPhone'),
            primaryColor: getInputValue('primaryColor'),
            secondaryColor: getInputValue('secondaryColor'),
            accentColor: getInputValue('accentColor'),
            theme: getSelectValue('themeSwitcher'),
            language: getSelectValue('language'),
            timezone: getSelectValue('timezone'),
            dateFormat: getSelectValue('dateFormat'),
            timeFormat: getSelectValue('timeFormat')
        },
        escolas: {
            qrExpiracao: getInputValue('registroQrExpiracao'),
            distanciaMaxima: getInputValue('distanciaRegistro'),
            verificarLocalizacao: getCheckboxValue('verificarLocalizacao'),
            registroOffline: getCheckboxValue('permitirRegistroOffline')
            // Os períodos escolares são muito complexos para implementar aqui
        },
        atestados: {
            prazoEnvio: getInputValue('prazoEnvioAtestado'),
            exigirCID: getCheckboxValue('exigirCID'),
            exigirAssinatura: getCheckboxValue('exigirAssinatura'),
            exigirCarimbo: getCheckboxValue('exigirCarimbo'),
            diasSemCID: getInputValue('diasMaximosSemCID'),
            aprovacaoPor: getRadioValue('aprovacao'),
            notificarAprovacao: getCheckboxValue('notificarAprovacao'),
            justificativaRejeicao: getSelectValue('justificativaRejeicao'),
            tipos: {
                medico: getCheckboxValue('tipoMedico'),
                odontologico: getCheckboxValue('tipoOdontologico'),
                fisioterapia: getCheckboxValue('tipoFisioterapia'),
                psicologico: getCheckboxValue('tipoPsicologico'),
                acompanhamento: getCheckboxValue('tipoAcompanhamento')
            }
        },
        notificacoes: {
            canais: {
                email: getCheckboxValue('notifEmail'),
                sms: getCheckboxValue('notifSMS'),
                push: getCheckboxValue('notifPush'),
                whatsapp: getCheckboxValue('notifWhatsapp')
            },
            // As configurações de eventos são muito complexas para implementar aqui
            smtp: {
                server: getInputValue('smtpServer'),
                port: getInputValue('smtpPort'),
                user: getInputValue('smtpUser'),
                password: getInputValue('smtpPass') ? '********' : '', // Nunca armazenar a senha real
                ssl: getCheckboxValue('smtpSSL')
            }
        },
        sistema: {
            cacheTTL: getInputValue('cacheTTL'),
            limparCacheAuto: getSelectValue('limparCacheAuto'),
            limiteBuscas: getInputValue('limiteBuscas'),
            seguranca: {
                tempoSessao: getInputValue('tempoSessao'),
                forcaSenha: getSelectValue('forcaSenha'),
                expiracaoSenha: getSelectValue('expiracaoSenha'),
                autenticacaoDupla: getCheckboxValue('autenticacaoDupla'),
                tentativasLogin: getInputValue('tentativasLogin'),
                tempoBloqueio: getInputValue('tempoBloqueio')
            }
        }
    };
    
    return config;
}

// Funções auxiliares para obter valores de elementos
function getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : null;
}

function getCheckboxValue(id) {
    const element = document.getElementById(id);
    return element ? element.checked : false;
}

function getSelectValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : null;
}

function getRadioValue(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    for (const radio of radios) {
        if (radio.checked) {
            if (radio.id === 'aprovacaoAdmin') return 'admin';
            if (radio.id === 'aprovacaoCoordenador') return 'coordenador';
            if (radio.id === 'aprovacaoAutomatic') return 'automatica';
        }
    }
    return null;
}

// Aplicar mudanças de configuração na interface
function applyConfigurationChanges(config) {
    // Aplicar tema
    if (config.gerais && config.gerais.theme) {
        document.body.setAttribute('data-theme', config.gerais.theme);
    }
    
    // Aplicar cores
    if (config.gerais) {
        document.documentElement.style.setProperty('--color-primary', config.gerais.primaryColor);
        document.documentElement.style.setProperty('--color-secondary', config.gerais.secondaryColor);
        document.documentElement.style.setProperty('--color-accent', config.gerais.accentColor);
    }
}

// Cancelar mudanças
function cancelChanges() {
    if (confirm('Tem certeza que deseja cancelar as alterações? As mudanças não salvas serão perdidas.')) {
        // Recarregar configurações originais
        loadSavedConfigurations();
        showNotification('Alterações descartadas', 'info');
    }
}

// Mostrar notificação
function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        </div>
        <div class="notification-content">${message}</div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Configurar botão de fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto fechar após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}