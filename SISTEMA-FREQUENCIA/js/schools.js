document.addEventListener('DOMContentLoaded', () => {
    // Configurar a busca de escolas
    const searchSchool = document.getElementById('searchSchool');
    if (searchSchool) {
        searchSchool.addEventListener('input', () => {
            filterSchools(searchSchool.value.toLowerCase());
        });
    }
    
    // Configurar o botão de adicionar escola
    const addSchoolBtn = document.getElementById('addSchoolBtn');
    if (addSchoolBtn) {
        addSchoolBtn.addEventListener('click', () => {
            // Limpar o formulário
            document.getElementById('schoolForm').reset();
            document.getElementById('schoolId').value = '';
            document.getElementById('schoolModalTitle').textContent = 'Adicionar Escola';
            
            // Abrir o modal
            openModal('schoolModal');
        });
    }
    
    // Configurar o botão de refresh da lista
    const refreshSchoolsBtn = document.getElementById('refreshSchoolsBtn');
    if (refreshSchoolsBtn) {
        refreshSchoolsBtn.addEventListener('click', () => {
            loadSchools();
            showAlert('Lista de escolas atualizada com sucesso!', 'success');
        });
    }
    
    // Configurar os botões do modal de escola
    setupSchoolModal();
    
    // Configurar o modal de QR Code
    setupQrCodeModal();
    
    // Configurar o modal de confirmação
    setupConfirmationModal();
    
    // Carregar a lista de escolas
    loadSchools();
    
    // Configurar os eventos dos botões de ação para cada escola
    setupSchoolActions();
});

/**
 * Filtrar escolas com base na pesquisa
 */
function filterSchools(searchText) {
    const schoolRows = document.querySelectorAll('#schoolsTable tr');
    
    schoolRows.forEach(row => {
        const schoolName = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
        const schoolAddress = row.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';
        
        if (schoolName.includes(searchText) || schoolAddress.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Carregar a lista de escolas
 * Em um sistema real, isso seria feito com uma chamada à API
 */
function loadSchools() {
    // Simulação de carregamento de dados
    const schoolsTable = document.getElementById('schoolsTable');
    
    if (schoolsTable) {
        // Simular um pequeno delay para dar a impressão de carregamento
        schoolsTable.innerHTML = '<tr><td colspan="7" class="loading-data">Carregando escolas...</td></tr>';
        
        setTimeout(() => {
            // Em um sistema real, esses dados viriam de uma API
            const schoolsData = [
                {
                    id: 1,
                    name: 'E.E. Maria José',
                    address: 'Rua das Flores, 123',
                    phone: '(11) 3456-7890',
                    teacherCount: 15,
                    status: 'active'
                },
                {
                    id: 2,
                    name: 'Colégio São Paulo',
                    address: 'Av. Paulista, 1500',
                    phone: '(11) 2345-6789',
                    teacherCount: 24,
                    status: 'active'
                },
                {
                    id: 3,
                    name: 'Instituto Técnico',
                    address: 'Rua dos Técnicos, 500',
                    phone: '(11) 3456-1234',
                    teacherCount: 18,
                    status: 'active'
                },
                {
                    id: 4,
                    name: 'Escola Municipal São José',
                    address: 'Rua dos Estudantes, 800',
                    phone: '(11) 7890-1234',
                    teacherCount: 12,
                    status: 'active'
                },
                {
                    id: 5,
                    name: 'Colégio Técnico',
                    address: 'Av. das Indústrias, 2000',
                    phone: '(11) 8765-4321',
                    teacherCount: 15,
                    status: 'active'
                }
            ];
            
            // Renderizar a tabela
            let tableHTML = '';
            
            schoolsData.forEach(school => {
                let statusClass = '';
                let statusText = '';
                
                switch(school.status) {
                    case 'active':
                        statusClass = 'present';
                        statusText = 'Ativo';
                        break;
                    case 'inactive':
                        statusClass = 'absent';
                        statusText = 'Inativo';
                        break;
                }
                
                tableHTML += `
                <tr data-id="${school.id}">
                    <td>${school.id}</td>
                    <td>${school.name}</td>
                    <td>${school.address}</td>
                    <td>${school.phone}</td>
                    <td>${school.teacherCount}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td class="actions">
                        <button title="Ver QR Code" class="qr-btn"><i class="fas fa-qrcode"></i></button>
                        <button title="Editar" class="edit-btn"><i class="fas fa-edit"></i></button>
                        <button title="Excluir" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`;
            });
            
            schoolsTable.innerHTML = tableHTML;
            
            // Configurar os eventos dos botões de ação para cada escola
            setupSchoolActions();
        }, 800);
    }
}

/**
 * Configurar os eventos dos botões de ação para cada escola
 */
function setupSchoolActions() {
    // Configurar os botões de QR Code
    const qrButtons = document.querySelectorAll('.qr-btn');
    qrButtons.forEach(button => {
        button.addEventListener('click', () => {
            const schoolId = button.closest('tr').dataset.id;
            const schoolName = button.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            showSchoolQrCode(schoolId, schoolName);
        });
    });
    
    // Configurar os botões de edição
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const schoolId = button.closest('tr').dataset.id;
            const schoolName = button.closest('tr').querySelector('td:nth-child(2)').textContent;
            const schoolAddress = button.closest('tr').querySelector('td:nth-child(3)').textContent;
            const schoolPhone = button.closest('tr').querySelector('td:nth-child(4)').textContent;
            
            editSchool(schoolId, schoolName, schoolAddress, schoolPhone);
        });
    });
    
    // Configurar os botões de exclusão
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const schoolId = button.closest('tr').dataset.id;
            const schoolName = button.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            confirmDeleteSchool(schoolId, schoolName);
        });
    });
}

/**
 * Mostrar o QR Code de uma escola
 */
function showSchoolQrCode(schoolId, schoolName) {
    // Atualizar o nome da escola no modal
    document.getElementById('qrSchoolName').textContent = schoolName;
    
    // Em um sistema real, aqui seria gerado um QR Code específico para esta escola
    
    // Abrir o modal
    openModal('qrCodeModal');
}

/**
 * Editar uma escola
 */
function editSchool(schoolId, schoolName, schoolAddress, schoolPhone) {
    // Preencher o formulário com os dados da escola
    document.getElementById('schoolId').value = schoolId;
    document.getElementById('schoolName').value = schoolName;
    document.getElementById('schoolAddress').value = schoolAddress;
    document.getElementById('schoolPhone').value = schoolPhone;
    document.getElementById('schoolEmail').value = `contato@${schoolName.toLowerCase().replace(/\s+/g, '')}.edu.br`;
    
    // Atualizar o título do modal
    document.getElementById('schoolModalTitle').textContent = 'Editar Escola';
    
    // Abrir o modal
    openModal('schoolModal');
}

/**
 * Confirmar exclusão de uma escola
 */
function confirmDeleteSchool(schoolId, schoolName) {
    // Atualizar o nome da escola no modal de confirmação
    document.getElementById('schoolToDelete').textContent = schoolName;
    
    // Armazenar o ID da escola para exclusão
    document.getElementById('confirmDeleteBtn').dataset.schoolId = schoolId;
    
    // Abrir o modal de confirmação
    openModal('confirmationModal');
}

/**
 * Configurar o modal de escola
 */
function setupSchoolModal() {
    // Configurar o botão de fechar
    const closeSchoolModal = document.getElementById('closeSchoolModal');
    if (closeSchoolModal) {
        closeSchoolModal.addEventListener('click', () => {
            closeModal('schoolModal');
        });
    }
    
    // Configurar o botão de cancelar
    const cancelSchoolBtn = document.getElementById('cancelSchoolBtn');
    if (cancelSchoolBtn) {
        cancelSchoolBtn.addEventListener('click', () => {
            closeModal('schoolModal');
        });
    }
    
    // Configurar o botão de salvar
    const saveSchoolBtn = document.getElementById('saveSchoolBtn');
    if (saveSchoolBtn) {
        saveSchoolBtn.addEventListener('click', () => {
            // Verificar se é adição ou edição
            const schoolId = document.getElementById('schoolId').value;
            
            if (schoolId) {
                // Edição de escola existente
                showAlert(`Escola atualizada com sucesso! (ID: ${schoolId})`, 'success');
            } else {
                // Adição de nova escola
                showAlert('Nova escola adicionada com sucesso!', 'success');
            }
            
            // Fechar o modal
            closeModal('schoolModal');
            
            // Em um sistema real, isso enviaria os dados para o servidor
            
            // Recarregar a lista de escolas
            loadSchools();
        });
    }
}

/**
 * Configurar o modal de QR Code
 */
function setupQrCodeModal() {
    // Configurar o botão de fechar
    const closeQrCodeModal = document.getElementById('closeQrCodeModal');
    if (closeQrCodeModal) {
        closeQrCodeModal.addEventListener('click', () => {
            closeModal('qrCodeModal');
        });
    }
    
    // Configurar o botão de download
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', () => {
            showAlert('Download do QR Code iniciado.', 'success');
            // Em um sistema real, isso iniciaria o download do QR Code
        });
    }
    
    // Configurar o botão de impressão
    const printQrBtn = document.getElementById('printQrBtn');
    if (printQrBtn) {
        printQrBtn.addEventListener('click', () => {
            window.print();
            // Em um sistema real, isso abriria o diálogo de impressão
        });
    }
}

/**
 * Configurar o modal de confirmação
 */
function setupConfirmationModal() {
    // Configurar o botão de fechar
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    if (closeConfirmationModal) {
        closeConfirmationModal.addEventListener('click', () => {
            closeModal('confirmationModal');
        });
    }
    
    // Configurar o botão de cancelar
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            closeModal('confirmationModal');
        });
    }
    
    // Configurar o botão de confirmar
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const schoolId = confirmDeleteBtn.dataset.schoolId;
            
            // Em um sistema real, isso enviaria uma solicitação para o servidor
            
            showAlert(`Escola excluída com sucesso! (ID: ${schoolId})`, 'success');
            
            // Fechar o modal
            closeModal('confirmationModal');
            
            // Recarregar a lista de escolas
            loadSchools();
        });
    }
}