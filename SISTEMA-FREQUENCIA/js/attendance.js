document.addEventListener('DOMContentLoaded', () => {
    // Atualizar o nome do professor na página
    const professorName = document.getElementById('professorName');
    if (professorName) {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            professorName.textContent = storedName;
        }
    }
    
    // Configurar o scanner de QR Code
    setupQrScanner();
    
    // Configurar o formulário de registro manual
    setupManualForm();
});

/**
 * Configurar o scanner de QR Code
 */
function setupQrScanner() {
    const startScanBtn = document.getElementById('startScanBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');
    const scannerStatus = document.getElementById('scannerStatus');
    const qrScanner = document.getElementById('qrScanner');
    
    let scanner = null;
    
    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            startScanBtn.disabled = true;
            stopScanBtn.disabled = false;
            scannerStatus.innerHTML = '<span class="status-scanning">Inicializando câmera...</span>';
            
            // Verificar se temos acesso à câmera
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Em um sistema real, isso usaria uma biblioteca como html5-qrcode
                // Por enquanto, apenas simulamos o comportamento
                
                // Simular o acesso à câmera
                setTimeout(() => {
                    scannerStatus.innerHTML = '<span class="status-scanning">Scanner ativo. Posicione o QR Code.</span>';
                    
                    // Simular uma leitura bem-sucedida após alguns segundos
                    setTimeout(() => {
                        // Simular a leitura de um QR Code
                        const qrData = {
                            schoolId: 1,
                            schoolName: 'E.E. Maria José',
                            subjectId: 1,
                            subjectName: 'Matemática',
                            timestamp: new Date().toISOString()
                        };
                        
                        processQrCode(qrData);
                        
                        // Desabilitar o scanner
                        startScanBtn.disabled = false;
                        stopScanBtn.disabled = true;
                        scannerStatus.innerHTML = '<span class="status-success">QR Code lido com sucesso!</span>';
                    }, 3000);
                }, 1000);
            } else {
                scannerStatus.innerHTML = '<span class="status-error">Seu navegador não suporta acesso à câmera. Use o registro manual.</span>';
                startScanBtn.disabled = false;
            }
        });
    }
    
    if (stopScanBtn) {
        stopScanBtn.disabled = true;
        stopScanBtn.addEventListener('click', () => {
            // Parar o scanner
            startScanBtn.disabled = false;
            stopScanBtn.disabled = true;
            scannerStatus.innerHTML = '<span>Scanner parado. Clique em "Iniciar Scanner" para ativar.</span>';
            
            // Em um sistema real, aqui seria feito o cleanup do scanner
        });
    }
}

/**
 * Processar os dados do QR Code lido
 */
function processQrCode(qrData) {
    // Preencher o modal de sucesso com os dados lidos
    document.getElementById('schoolName').textContent = qrData.schoolName;
    document.getElementById('subjectName').textContent = qrData.subjectName;
    document.getElementById('attendanceDate').textContent = formatDate(new Date());
    document.getElementById('attendanceTime').textContent = formatTime(new Date());
    
    // Mostrar o modal de sucesso
    openModal('successModal');
    
    // Em um sistema real, isso enviaria os dados para o servidor
    
    // Atualizar a lista de registros recentes
    updateRecentAttendances(qrData);
    
    // Configurar o botão OK do modal
    const okSuccessBtn = document.getElementById('okSuccessBtn');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    
    if (okSuccessBtn) {
        okSuccessBtn.addEventListener('click', () => {
            closeModal('successModal');
        });
    }
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', () => {
            closeModal('successModal');
        });
    }
}

/**
 * Configurar o formulário de registro manual
 */
function setupManualForm() {
    const manualAttendanceForm = document.getElementById('manualAttendanceForm');
    
    if (manualAttendanceForm) {
        manualAttendanceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obter os dados do formulário
            const schoolId = document.getElementById('schoolSelect').value;
            const schoolName = document.getElementById('schoolSelect').options[document.getElementById('schoolSelect').selectedIndex].text;
            const subjectId = document.getElementById('subjectSelect').value;
            const subjectName = document.getElementById('subjectSelect').options[document.getElementById('subjectSelect').selectedIndex].text;
            const attendanceCode = document.getElementById('attendanceCode').value;
            const attendanceNote = document.getElementById('attendanceNote').value;
            
            // Validar o código de presença (em um sistema real, isso seria validado no servidor)
            if (attendanceCode !== '123456') {
                showAlert('Código de presença inválido. Por favor, tente novamente.', 'error');
                return;
            }
            
            // Criar o objeto de dados
            const attendanceData = {
                schoolId: parseInt(schoolId),
                schoolName: schoolName,
                subjectId: parseInt(subjectId),
                subjectName: subjectName,
                timestamp: new Date().toISOString(),
                note: attendanceNote
            };
            
            // Processar o registro
            processManualAttendance(attendanceData);
            
            // Limpar o formulário
            manualAttendanceForm.reset();
        });
    }
}

/**
 * Processar o registro manual de presença
 */
function processManualAttendance(attendanceData) {
    // Preencher o modal de sucesso com os dados
    document.getElementById('schoolName').textContent = attendanceData.schoolName;
    document.getElementById('subjectName').textContent = attendanceData.subjectName;
    document.getElementById('attendanceDate').textContent = formatDate(new Date());
    document.getElementById('attendanceTime').textContent = formatTime(new Date());
    
    // Mostrar o modal de sucesso
    openModal('successModal');
    
    // Em um sistema real, isso enviaria os dados para o servidor
    
    // Atualizar a lista de registros recentes
    updateRecentAttendances(attendanceData, 'Manual');
}

/**
 * Atualizar a lista de registros recentes
 */
function updateRecentAttendances(attendanceData, method = 'QR Code') {
    const recentAttendances = document.getElementById('recentAttendances');
    
    if (recentAttendances) {
        // Criar uma nova linha na tabela
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${formatDate(new Date())}</td>
            <td>${attendanceData.schoolName}</td>
            <td>${attendanceData.subjectName}</td>
            <td>${formatTime(new Date())}</td>
            <td>${method}</td>
            <td><span class="status present">Confirmado</span></td>
        `;
        
        // Adicionar a nova linha no início da tabela
        if (recentAttendances.firstChild) {
            recentAttendances.insertBefore(newRow, recentAttendances.firstChild);
        } else {
            recentAttendances.appendChild(newRow);
        }
        
        // Se tiver mais de 5 linhas, remover a última
        if (recentAttendances.children.length > 5) {
            recentAttendances.removeChild(recentAttendances.lastChild);
        }
    }
}