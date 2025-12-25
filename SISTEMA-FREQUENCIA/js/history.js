document.addEventListener('DOMContentLoaded', function() {
    // Carregar nome do professor logado
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        document.getElementById('professorName').textContent = loggedUser.name;
    }
    
    // Configurar filtros
    setupDateRangeFilter();
    loadSchools();
    
    // Configurar botões
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
    document.getElementById('downloadReportBtn').addEventListener('click', downloadReport);
    document.getElementById('refreshHistoryBtn').addEventListener('click', refreshHistory);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Configurar modais
    setupAttendanceDetailModal();
    setupJustifyModal();
    
    // Carregar dados de histórico simulados
    loadAttendanceHistory();
    updateStatistics();
});

// Configurar filtro de datas
function setupDateRangeFilter() {
    const dateRangeFilter = document.getElementById('dateRangeFilter');
    const customDateRange = document.getElementById('customDateRange');
    
    // Configurar data atual para o campo de data final
    const today = new Date();
    document.getElementById('endDate').valueAsDate = today;
    
    // Configurar data de 30 dias atrás para o campo de data inicial
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    document.getElementById('startDate').valueAsDate = thirtyDaysAgo;
    
    // Mostrar/esconder o filtro de data personalizado
    dateRangeFilter.addEventListener('change', function() {
        if (this.value === 'custom') {
            customDateRange.style.display = 'block';
        } else {
            customDateRange.style.display = 'none';
        }
    });
}

// Carregar escolas do professor
function loadSchools() {
    const schoolFilter = document.getElementById('schoolFilter');
    
    // Obter escolas do localStorage (em um sistema real, isso viria do servidor)
    let schools = JSON.parse(localStorage.getItem('schools')) || [];
    
    // Limpar opções existentes, mantendo a opção "Todas as escolas"
    const allOption = schoolFilter.options[0];
    schoolFilter.innerHTML = '';
    schoolFilter.appendChild(allOption);
    
    // Adicionar escolas ao filtro
    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = school.name;
        schoolFilter.appendChild(option);
    });
}

// Aplicar filtros e atualizar dados
function applyFilters() {
    const dateRange = document.getElementById('dateRangeFilter').value;
    const schoolId = document.getElementById('schoolFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    // Em um sistema real, enviaríamos estes filtros para o servidor
    // e receberíamos os dados filtrados
    
    // Para este exemplo, apenas simulamos a atualização
    loadAttendanceHistory(dateRange, schoolId, status);
    updateStatistics();
    
    // Exibir notificação de sucesso
    showToast('Filtros aplicados com sucesso!', 'success');
}

// Carregar histórico de frequência (simulado)
function loadAttendanceHistory(dateRange = '30', schoolId = 'all', status = 'all') {
    const table = document.getElementById('attendanceHistoryTable');
    
    // Em um sistema real, estes dados viriam do servidor com base nos filtros
    // Para este exemplo, usamos dados simulados
    
    // Simular alteração nos dados com base nos filtros
    if (status !== 'all') {
        // Simular que estamos mostrando apenas os registros do status selecionado
        showToast(`Filtrado por status: ${status}`, 'info');
    }
    
    if (schoolId !== 'all') {
        // Simular que estamos mostrando apenas os registros da escola selecionada
        const schoolName = document.getElementById('schoolFilter').options[
            document.getElementById('schoolFilter').selectedIndex
        ].text;
        showToast(`Filtrado por escola: ${schoolName}`, 'info');
    }
    
    // Configurar cliques nos botões de ação
    setTimeout(() => {
        const viewButtons = table.querySelectorAll('button[title="Ver detalhes"]');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', showAttendanceDetails);
        });
        
        const justifyButtons = table.querySelectorAll('button[title="Justificar ausência"]');
        justifyButtons.forEach(btn => {
            btn.addEventListener('click', showJustifyModal);
        });
    }, 100);
}

// Atualizar estatísticas com base no histórico filtrado
function updateStatistics() {
    // Em um sistema real, estes dados viriam do servidor com base nos filtros aplicados
    // Para este exemplo, usamos dados simulados
    
    const totalDays = 22;
    const presentDays = 21;
    const lateDays = 0;
    const absentDays = 1;
    
    document.getElementById('totalDays').textContent = totalDays;
    document.getElementById('presentDays').textContent = presentDays;
    document.getElementById('lateDays').textContent = lateDays;
    document.getElementById('absentDays').textContent = absentDays;
}

// Gerar e baixar relatório
function downloadReport() {
    // Em um sistema real, geraria um PDF ou CSV com os dados filtrados
    showToast('Gerando relatório em PDF...', 'info');
    
    // Simular geração de relatório
    setTimeout(() => {
        showToast('Relatório gerado com sucesso!', 'success');
        
        // Em um sistema real, iniciaria o download do arquivo aqui
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'relatorio_frequencia.pdf';
        // Simular clique para download (em um sistema real, o link.href seria o caminho para o arquivo real)
        // link.click();
    }, 1500);
}

// Atualizar histórico
function refreshHistory() {
    showToast('Atualizando histórico...', 'info');
    
    // Animação de rotação no ícone de atualizar
    const refreshIcon = document.querySelector('#refreshHistoryBtn i');
    refreshIcon.classList.add('rotating');
    
    // Simular tempo de carregamento
    setTimeout(() => {
        loadAttendanceHistory();
        updateStatistics();
        showToast('Histórico atualizado com sucesso!', 'success');
        refreshIcon.classList.remove('rotating');
    }, 1000);
}

// Configurar modal de detalhes da frequência
function setupAttendanceDetailModal() {
    const modal = document.getElementById('attendanceDetailModal');
    const closeBtn = document.getElementById('closeAttendanceDetailModal');
    const closeBtnFooter = document.getElementById('closeDetailBtn');
    
    // Fechar modal quando clicar no X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal quando clicar em Fechar
    closeBtnFooter.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal quando clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Mostrar detalhes da frequência
function showAttendanceDetails(event) {
    const row = event.target.closest('tr');
    const cells = row.cells;
    
    // Preencher modal com os dados da linha
    document.getElementById('detailDate').textContent = cells[0].textContent;
    document.getElementById('detailSchool').textContent = cells[2].textContent;
    document.getElementById('detailSubject').textContent = cells[3].textContent;
    document.getElementById('detailSchedule').textContent = cells[4].textContent;
    document.getElementById('detailEntry').textContent = cells[5].textContent;
    document.getElementById('detailExit').textContent = 
        cells[5].textContent === '-' ? '-' : 
        cells[4].textContent.split(' - ')[1]; // Horário de saída é o final do horário previsto
    
    // Determinar método de registro
    document.getElementById('detailMethod').textContent = 'QR Code';
    
    // Status
    const statusSpan = cells[6].querySelector('span');
    document.getElementById('detailStatus').textContent = statusSpan.textContent;
    document.getElementById('detailStatus').className = statusSpan.className;
    
    // Observações
    document.getElementById('detailNotes').textContent = 'Nenhuma observação registrada.';
    
    // Exibir modal
    document.getElementById('attendanceDetailModal').style.display = 'flex';
}

// Configurar modal de justificativa
function setupJustifyModal() {
    const modal = document.getElementById('justifyModal');
    const closeBtn = document.getElementById('closeJustifyModal');
    const cancelBtn = document.getElementById('cancelJustifyBtn');
    const submitBtn = document.getElementById('submitJustifyBtn');
    
    // Fechar modal quando clicar no X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal quando clicar em Cancelar
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Submeter justificativa
    submitBtn.addEventListener('click', submitJustify);
    
    // Fechar modal quando clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Mostrar modal de justificativa de ausência
function showJustifyModal(event) {
    const row = event.target.closest('tr');
    const cells = row.cells;
    
    // Preencher modal com os dados da linha
    document.getElementById('justifyDate').value = cells[0].textContent;
    document.getElementById('justifySchool').value = cells[2].textContent;
    
    // Exibir modal
    document.getElementById('justifyModal').style.display = 'flex';
}

// Enviar justificativa
function submitJustify() {
    const form = document.getElementById('justifyForm');
    const reason = document.getElementById('justifyReason').value;
    const description = document.getElementById('justifyDescription').value;
    
    if (!reason || !description) {
        showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Em um sistema real, enviaríamos os dados para o servidor
    
    // Simulação de envio
    showToast('Enviando justificativa...', 'info');
    
    setTimeout(() => {
        // Fechar modal
        document.getElementById('justifyModal').style.display = 'none';
        
        // Resetar formulário
        document.getElementById('justifyReason').value = '';
        document.getElementById('justifyDescription').value = '';
        document.getElementById('justifyDocument').value = '';
        
        showToast('Justificativa enviada com sucesso! Aguardando aprovação.', 'success');
        
        // Atualizar dados da tabela (em um sistema real, recarregaríamos os dados do servidor)
        setTimeout(() => {
            loadAttendanceHistory();
        }, 1000);
    }, 1500);
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