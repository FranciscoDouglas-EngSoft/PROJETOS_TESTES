document.addEventListener('DOMContentLoaded', () => {
    // Atualizar o nome do professor no dashboard
    const professorName = document.getElementById('professorName');
    if (professorName) {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            professorName.textContent = storedName;
        }
    }
    
    // Configurar os botões de ação rápida
    const scanQrBtn = document.getElementById('scanQrBtn');
    if (scanQrBtn) {
        scanQrBtn.addEventListener('click', () => {
            window.location.href = 'marcar-presenca.html';
        });
    }
    
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', () => {
            generateReport();
        });
    }
    
    const requestLeaveBtn = document.getElementById('requestLeaveBtn');
    if (requestLeaveBtn) {
        requestLeaveBtn.addEventListener('click', () => {
            showAlert('Funcionalidade de solicitação de folga em desenvolvimento.', 'info');
        });
    }
    
    // Configurar o refresh da agenda
    const refreshScheduleBtn = document.getElementById('refreshSchedule');
    if (refreshScheduleBtn) {
        refreshScheduleBtn.addEventListener('click', () => {
            loadTodaySchedule();
            showAlert('Agenda atualizada com sucesso!', 'success');
        });
    }
    
    // Carregar a agenda do dia
    loadTodaySchedule();
});

/**
 * Função para carregar a agenda do dia
 * Em um sistema real, isso seria feito com uma chamada à API
 */
function loadTodaySchedule() {
    // Simulação de carregamento de dados
    const scheduleTable = document.getElementById('scheduleTable');
    
    if (scheduleTable) {
        // Simular um pequeno delay para dar a impressão de carregamento
        scheduleTable.innerHTML = '<tr><td colspan="5" class="loading-data">Carregando agenda...</td></tr>';
        
        setTimeout(() => {
            // Em um sistema real, esses dados viriam de uma API
            const currentDate = new Date();
            const scheduleData = [
                {
                    id: 1,
                    school: 'E.E. Maria José',
                    subject: 'Matemática',
                    startTime: new Date(currentDate.setHours(8, 0, 0, 0)),
                    endTime: new Date(currentDate.setHours(10, 0, 0, 0)),
                    status: 'registered' // registered, pending, absent
                },
                {
                    id: 2,
                    school: 'Colégio São Paulo',
                    subject: 'Matemática',
                    startTime: new Date(currentDate.setHours(10, 30, 0, 0)),
                    endTime: new Date(currentDate.setHours(12, 30, 0, 0)),
                    status: 'pending'
                },
                {
                    id: 3,
                    school: 'Instituto Técnico',
                    subject: 'Estatística',
                    startTime: new Date(currentDate.setHours(14, 0, 0, 0)),
                    endTime: new Date(currentDate.setHours(16, 0, 0, 0)),
                    status: 'pending'
                }
            ];
            
            // Renderizar a tabela
            let tableHTML = '';
            
            scheduleData.forEach(item => {
                let statusClass = '';
                let statusText = '';
                let actionButton = '';
                
                switch(item.status) {
                    case 'registered':
                        statusClass = 'present';
                        statusText = 'Registrado';
                        actionButton = `<button title="Ver detalhes"><i class="fas fa-eye"></i></button>`;
                        break;
                    case 'pending':
                        statusClass = '';
                        statusText = 'Pendente';
                        actionButton = `<button title="Registrar presença" onclick="openQrScanner(${item.id})"><i class="fas fa-qrcode"></i></button>`;
                        break;
                    case 'absent':
                        statusClass = 'absent';
                        statusText = 'Ausente';
                        actionButton = `<button title="Justificar ausência"><i class="fas fa-comment"></i></button>`;
                        break;
                }
                
                tableHTML += `
                <tr>
                    <td>${item.school}</td>
                    <td>${item.subject}</td>
                    <td>${formatTime(item.startTime)} - ${formatTime(item.endTime)}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td class="actions">
                        ${actionButton}
                    </td>
                </tr>`;
            });
            
            scheduleTable.innerHTML = tableHTML;
        }, 800);
    }
}

/**
 * Função para abrir o scanner de QR code
 */
function openQrScanner(scheduleId) {
    // Em um sistema real, armazenaria o ID da agenda para vincular ao registro
    localStorage.setItem('currentScheduleId', scheduleId);
    openModal('qrScannerModal');
    
    // Configurar o escaneamento do QR Code
    const qrScanner = document.getElementById('qrScanner');
    
    // Aqui viria a lógica para inicializar o scanner de QR code
    // Usando uma biblioteca como jsQR, instascan, ou html5-qrcode
    
    // Configurar os botões do scanner
    const startScanBtn = document.getElementById('startScanBtn');
    const cancelScanBtn = document.getElementById('cancelScanBtn');
    
    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            // Simulação: apenas para demonstração, em um sistema real isso iniciaria o scanner
            setTimeout(() => {
                // Simular leitura bem-sucedida de QR Code após 2 segundos
                closeModal('qrScannerModal');
                
                // Preencher os dados do registro
                document.getElementById('schoolName').textContent = 'E.E. Maria José';
                document.getElementById('subjectName').textContent = 'Matemática';
                document.getElementById('attendanceDate').textContent = formatDate(new Date());
                document.getElementById('attendanceTime').textContent = formatTime(new Date());
                
                // Mostrar o modal de sucesso
                openModal('successModal');
                
                // Em um sistema real, isso atualizaria o registro no servidor
                setTimeout(() => {
                    loadTodaySchedule();
                }, 500);
            }, 2000);
        });
    }
    
    if (cancelScanBtn) {
        cancelScanBtn.addEventListener('click', () => {
            closeModal('qrScannerModal');
        });
    }
    
    // Configurar o botão de fechar o modal do scanner
    const closeQrScannerModal = document.getElementById('closeQrScannerModal');
    if (closeQrScannerModal) {
        closeQrScannerModal.addEventListener('click', () => {
            closeModal('qrScannerModal');
        });
    }
    
    // Configurar o modal de sucesso
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const okSuccessBtn = document.getElementById('okSuccessBtn');
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', () => {
            closeModal('successModal');
        });
    }
    
    if (okSuccessBtn) {
        okSuccessBtn.addEventListener('click', () => {
            closeModal('successModal');
        });
    }
}

/**
 * Função para gerar relatório de presença
 * Em um sistema real, isso geraria um PDF ou planilha
 */
function generateReport() {
    showAlert('Gerando relatório de presença... O download iniciará em breve.', 'info');
    
    // Simular a geração de um relatório
    setTimeout(() => {
        showAlert('Relatório gerado com sucesso!', 'success');
    }, 2000);
}