document.addEventListener('DOMContentLoaded', () => {
    // Atualizar o nome do administrador no dashboard
    const userName = document.querySelector('.user-name');
    if (userName) {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            userName.textContent = storedName;
        }
    }
    
    // Configurar o botão de refresh das atividades
    const refreshActivitiesBtn = document.getElementById('refreshActivities');
    if (refreshActivitiesBtn) {
        refreshActivitiesBtn.addEventListener('click', () => {
            loadRecentActivities();
            showAlert('Atividades atualizadas com sucesso!', 'success');
        });
    }
    
    // Carregar atividades recentes
    loadRecentActivities();
    
    // Configurar os botões da paginação
    setupPagination();
});

/**
 * Função para carregar as atividades recentes
 * Em um sistema real, isso seria feito com uma chamada à API
 */
function loadRecentActivities() {
    // Simulação de carregamento de dados
    const activitiesTable = document.getElementById('activitiesTable');
    
    if (activitiesTable) {
        // Simular um pequeno delay para dar a impressão de carregamento
        activitiesTable.innerHTML = '<tr><td colspan="5" class="loading-data">Carregando atividades...</td></tr>';
        
        setTimeout(() => {
            // Em um sistema real, esses dados viriam de uma API
            const currentDate = new Date();
            const activitiesData = [
                {
                    id: 1,
                    professor: 'João Silva',
                    school: 'E.E. Maria José',
                    time: formatDateTime(new Date(currentDate.setHours(8, 0, 0, 0))),
                    status: 'present' // present, late, absent
                },
                {
                    id: 2,
                    professor: 'Ana Souza',
                    school: 'Colégio São Paulo',
                    time: formatDateTime(new Date(currentDate.setHours(7, 45, 0, 0))),
                    status: 'present'
                },
                {
                    id: 3,
                    professor: 'Carlos Oliveira',
                    school: 'Instituto Técnico',
                    time: formatDateTime(new Date(currentDate.setHours(7, 55, 0, 0))),
                    status: 'late'
                },
                {
                    id: 4,
                    professor: 'Márcia Santos',
                    school: 'Escola Municipal',
                    time: formatDateTime(new Date(currentDate.setHours(8, 30, 0, 0))),
                    status: 'absent'
                }
            ];
            
            // Renderizar a tabela
            let tableHTML = '';
            
            activitiesData.forEach(item => {
                let statusClass = '';
                let statusText = '';
                
                switch(item.status) {
                    case 'present':
                        statusClass = 'present';
                        statusText = 'Presente';
                        break;
                    case 'late':
                        statusClass = 'late';
                        statusText = 'Atrasado';
                        break;
                    case 'absent':
                        statusClass = 'absent';
                        statusText = 'Ausente';
                        break;
                }
                
                tableHTML += `
                <tr>
                    <td>${item.professor}</td>
                    <td>${item.school}</td>
                    <td>${item.time}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td class="actions">
                        <button title="Ver detalhes" onclick="viewDetails(${item.id})"><i class="fas fa-eye"></i></button>
                    </td>
                </tr>`;
            });
            
            activitiesTable.innerHTML = tableHTML;
        }, 800);
    }
}

/**
 * Função para visualizar detalhes de um registro
 */
function viewDetails(activityId) {
    // Em um sistema real, isso abriria um modal com os detalhes do registro
    showAlert(`Visualizando detalhes do registro ID: ${activityId}. Funcionalidade em desenvolvimento.`, 'info');
}

/**
 * Configurar os botões de paginação
 */
function setupPagination() {
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover a classe ativa de todos os botões
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar a classe ativa ao botão clicado
            if (!button.classList.contains('fa-chevron-left') && !button.classList.contains('fa-chevron-right')) {
                button.classList.add('active');
            }
            
            // Em um sistema real, isso carregaria a página correspondente
            // Por enquanto, apenas exibir um alerta
            if (button.textContent.trim()) {
                loadRecentActivities();
            }
        });
    });
}

/**
 * Gerar estatísticas aleatórias para demonstração
 */
function generateRandomStats() {
    const stats = {
        schools: Math.floor(Math.random() * 10) + 5,
        teachers: Math.floor(Math.random() * 50) + 30,
        attendance: Math.floor(Math.random() * 20) + 80,
        absences: Math.floor(Math.random() * 10) + 1
    };
    
    return stats;
}