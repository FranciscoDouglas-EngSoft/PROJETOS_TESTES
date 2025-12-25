// reports.js - Lógica para página de relatórios

document.addEventListener('DOMContentLoaded', function() {
    initReports();
    setupEventListeners();
});

// Inicializar os relatórios com dados de exemplo
function initReports() {
    // Obter o contexto dos gráficos e criar gráficos
    createMainChart();
    createSchoolChart();
    createPeriodChart();
    
    // Carregar dados iniciais
    updateReportTitle();
}

// Configurar ouvintes de eventos
function setupEventListeners() {
    // Controle de filtros
    document.getElementById('filterReportType').addEventListener('change', updateReportTitle);
    document.getElementById('filterSchool').addEventListener('change', updateReportTitle);
    document.getElementById('filterPeriodo').addEventListener('change', function() {
        const customDateRange = document.getElementById('customDateRange');
        if (this.value === 'custom') {
            customDateRange.style.display = 'flex';
        } else {
            customDateRange.style.display = 'none';
        }
        updateReportTitle();
    });
    
    // Botões de ação
    document.getElementById('generateReportBtn').addEventListener('click', generateReport);
    document.getElementById('downloadReportBtn').addEventListener('click', downloadReport);
    
    // Modal de Atestado
    const viewAtestadoModal = document.getElementById('viewAtestadoModal');
    const closeAtestadoModal = document.getElementById('closeAtestadoModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const atestadoBtns = document.querySelectorAll('.actions button[title="Ver detalhes"]');
    
    atestadoBtns.forEach(btn => {
        btn.addEventListener('click', openAtestadoModal);
    });
    
    if (closeAtestadoModal) {
        closeAtestadoModal.addEventListener('click', () => {
            viewAtestadoModal.classList.remove('active');
        });
    }
    
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', () => {
            viewAtestadoModal.classList.remove('active');
        });
    }
}

// Abrir modal de atestado
function openAtestadoModal() {
    const viewAtestadoModal = document.getElementById('viewAtestadoModal');
    viewAtestadoModal.classList.add('active');
}

// Atualizar o título do relatório com base nos filtros selecionados
function updateReportTitle() {
    const reportType = document.getElementById('filterReportType');
    const school = document.getElementById('filterSchool');
    const periodo = document.getElementById('filterPeriodo');
    
    const reportTitle = document.querySelector('.card-title h2');
    const reportSubtitle = document.querySelector('.card-subtitle');
    
    if (reportTitle && reportSubtitle) {
        // Mapear valores do select para textos descritivos
        const reportTypeText = reportType.options[reportType.selectedIndex].text;
        const schoolText = school.options[school.selectedIndex].text;
        const periodoText = periodo.options[periodo.selectedIndex].text;
        
        reportTitle.textContent = reportTypeText;
        reportSubtitle.textContent = `${periodoText} - ${schoolText}`;
    }
}

// Gerar relatório com base nos filtros selecionados
function generateReport() {
    // Simular carregamento
    showLoading();
    
    // Em uma aplicação real, aqui seria feita uma chamada à API ou processamento de dados
    setTimeout(() => {
        // Atualizar gráficos
        updateMainChart();
        updateSchoolChart();
        updatePeriodChart();
        
        // Esconder carregamento
        hideLoading();
        
        // Mostrar notificação
        showNotification('Relatório gerado com sucesso!', 'success');
    }, 1000);
}

// Baixar relatório
function downloadReport() {
    // Simular download
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification('Relatório baixado com sucesso!', 'success');
    }, 1500);
}

// Funções de feedback visual
function showLoading() {
    // Implementação de um indicador de carregamento
    // Em uma aplicação real, poderia adicionar um spinner ou overlay
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
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

// Funções de criação e atualização de gráficos
function createMainChart() {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;

    const mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01/09', '08/09', '15/09', '22/09', '29/09', '06/10', '13/10'],
            datasets: [{
                label: 'Presenças',
                data: [93, 95, 92, 94, 96, 95, 94],
                backgroundColor: 'rgba(67, 97, 238, 0.2)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }, {
                label: 'Faltas',
                data: [3, 2, 4, 3, 2, 3, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }, {
                label: 'Atrasos',
                data: [4, 3, 4, 3, 2, 2, 3],
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Armazenar a referência do gráfico para atualizações futuras
    window.mainChart = mainChart;
}

function updateMainChart() {
    if (!window.mainChart) return;
    
    // Simular novos dados com base nos filtros
    const data1 = Array.from({length: 7}, () => Math.floor(Math.random() * 10) + 85);
    const data2 = Array.from({length: 7}, () => Math.floor(Math.random() * 5) + 1);
    const data3 = Array.from({length: 7}, () => Math.floor(Math.random() * 6) + 1);
    
    window.mainChart.data.datasets[0].data = data1;
    window.mainChart.data.datasets[1].data = data2;
    window.mainChart.data.datasets[2].data = data3;
    
    window.mainChart.update();
    
    // Atualizar estatísticas
    document.querySelectorAll('.stat-value')[0].textContent = (Math.average(data1)).toFixed(1) + '%';
    document.querySelectorAll('.stat-value')[1].textContent = (Math.average(data3)).toFixed(1) + '%';
    document.querySelectorAll('.stat-value')[2].textContent = (Math.average(data2)).toFixed(1) + '%';
}

function createSchoolChart() {
    const ctx = document.getElementById('schoolChart');
    if (!ctx) return;

    const schoolChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['E.E. Maria José', 'Colégio São Paulo', 'Instituto Técnico'],
            datasets: [{
                label: 'Taxa de Presença',
                data: [94.2, 92.5, 96.1],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(63, 55, 201, 0.7)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(76, 201, 240, 1)',
                    'rgba(63, 55, 201, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100
                }
            }
        }
    });

    window.schoolChart = schoolChart;
}

function updateSchoolChart() {
    if (!window.schoolChart) return;
    
    const newData = [
        Math.floor(Math.random() * 8) + 90,
        Math.floor(Math.random() * 8) + 90,
        Math.floor(Math.random() * 8) + 90
    ];
    
    window.schoolChart.data.datasets[0].data = newData;
    window.schoolChart.update();
}

function createPeriodChart() {
    const ctx = document.getElementById('periodChart');
    if (!ctx) return;

    const periodChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Presença', 'Pontualidade', 'Atrasos', 'Faltas', 'Atestados'],
            datasets: [{
                label: 'Mês Atual',
                data: [94, 90, 3, 2, 1],
                backgroundColor: 'rgba(76, 201, 240, 0.2)',
                borderColor: 'rgba(76, 201, 240, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(76, 201, 240, 1)'
            }, {
                label: 'Mês Anterior',
                data: [92, 88, 4, 3, 1],
                backgroundColor: 'rgba(67, 97, 238, 0.2)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(67, 97, 238, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    window.periodChart = periodChart;
}

function updatePeriodChart() {
    if (!window.periodChart) return;
    
    // Gerar dados aleatórios para simulação
    const currentData = [
        Math.floor(Math.random() * 10) + 85, // Presença
        Math.floor(Math.random() * 15) + 80, // Pontualidade
        Math.floor(Math.random() * 5) + 1,   // Atrasos
        Math.floor(Math.random() * 5) + 1,   // Faltas
        Math.floor(Math.random() * 3)        // Atestados
    ];
    
    const previousData = [
        Math.floor(Math.random() * 10) + 85,
        Math.floor(Math.random() * 15) + 80,
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 3)
    ];
    
    window.periodChart.data.datasets[0].data = currentData;
    window.periodChart.data.datasets[1].data = previousData;
    window.periodChart.update();
}

// Função auxiliar para calcular média
Math.average = function(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};