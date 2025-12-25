document.addEventListener('DOMContentLoaded', function() {
    // Carregar nome do professor logado
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        document.getElementById('professorName').textContent = loggedUser.name;
    }
    
    // Configurar botões
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Carregar escolas do professor
    loadTeacherSchools();
    
    // Configurar modal de horários
    setupScheduleModal();
});

// Carregar escolas do professor
function loadTeacherSchools() {
    // Em um sistema real, estas informações viriam do servidor
    // Para este exemplo, usamos dados simulados
    
    const schools = [
        {
            id: 1,
            name: "E.E. Maria José",
            address: "Rua das Flores, 123 - Centro",
            image: "../img/school1.jpg",
            type: "Pública",
            classes: 6,
            students: 180,
            schedules: [
                { day: "Segunda", time: "08:00 - 10:00", subject: "Matemática" },
                { day: "Quarta", time: "08:00 - 10:00", subject: "Matemática" },
                { day: "Sexta", time: "08:00 - 10:00", subject: "Matemática" }
            ],
            fullSchedule: {
                "Segunda-feira": [
                    { time: "08:00 - 10:00", subject: "Matemática", room: "Sala 101" },
                    { time: "10:20 - 12:20", subject: "Matemática", room: "Sala 205" }
                ],
                "Terça-feira": [],
                "Quarta-feira": [
                    { time: "08:00 - 10:00", subject: "Matemática", room: "Sala 101" }
                ],
                "Quinta-feira": [],
                "Sexta-feira": [
                    { time: "08:00 - 10:00", subject: "Matemática", room: "Sala 101" }
                ],
                "Sábado": [],
                "Domingo": []
            }
        },
        {
            id: 2,
            name: "Colégio São Paulo",
            address: "Avenida Principal, 456 - Jardim Europa",
            image: "../img/school2.jpg",
            type: "Privada",
            classes: 4,
            students: 120,
            schedules: [
                { day: "Segunda", time: "14:00 - 16:00", subject: "Matemática" },
                { day: "Quinta", time: "10:30 - 12:30", subject: "Matemática" }
            ],
            fullSchedule: {
                "Segunda-feira": [
                    { time: "14:00 - 16:00", subject: "Matemática", room: "Sala 202" }
                ],
                "Terça-feira": [],
                "Quarta-feira": [],
                "Quinta-feira": [
                    { time: "10:30 - 12:30", subject: "Matemática", room: "Sala 301" }
                ],
                "Sexta-feira": [],
                "Sábado": [],
                "Domingo": []
            }
        },
        {
            id: 3,
            name: "Instituto Técnico",
            address: "Rua da Tecnologia, 789 - Bairro Novo",
            image: "../img/school3.jpg",
            type: "Técnica",
            classes: 3,
            students: 90,
            schedules: [
                { day: "Terça", time: "19:00 - 22:00", subject: "Estatística" },
                { day: "Quinta", time: "14:00 - 16:00", subject: "Estatística" }
            ],
            fullSchedule: {
                "Segunda-feira": [],
                "Terça-feira": [
                    { time: "19:00 - 22:00", subject: "Estatística", room: "Lab 3" }
                ],
                "Quarta-feira": [],
                "Quinta-feira": [
                    { time: "14:00 - 16:00", subject: "Estatística", room: "Lab 1" }
                ],
                "Sexta-feira": [],
                "Sábado": [],
                "Domingo": []
            }
        }
    ];
    
    // Renderizar escolas
    renderSchools(schools);
}

// Renderizar escolas na página
function renderSchools(schools) {
    const container = document.getElementById('schoolsGrid');
    container.innerHTML = '';
    
    schools.forEach(school => {
        // Criar card da escola
        const schoolCard = document.createElement('div');
        schoolCard.className = 'card school-card';
        
        // Imagem e tipo da escola
        const imageDiv = document.createElement('div');
        imageDiv.className = 'school-image';
        imageDiv.innerHTML = `
            <img src="${school.image}" alt="${school.name}">
            <span class="school-type">${school.type}</span>
        `;
        
        // Conteúdo da escola
        const contentDiv = document.createElement('div');
        contentDiv.className = 'school-content';
        
        // Nome e endereço
        contentDiv.innerHTML = `
            <h3 class="school-name">${school.name}</h3>
            <p class="school-address">${school.address}</p>
            
            <div class="school-info">
                <div class="school-info-item">
                    <div class="info-number">${school.classes}</div>
                    <div class="info-label">Turmas</div>
                </div>
                <div class="school-info-item">
                    <div class="info-number">${school.students}</div>
                    <div class="info-label">Alunos</div>
                </div>
            </div>
        `;
        
        // Horários
        const scheduleDiv = document.createElement('div');
        scheduleDiv.className = 'school-schedule';
        scheduleDiv.innerHTML = `<div class="schedule-title"><i class="fas fa-clock"></i> Meus Horários</div>`;
        
        const scheduleList = document.createElement('ul');
        scheduleList.className = 'schedule-list';
        
        // Adicionar até 3 horários, com indicação de ver mais se necessário
        const displaySchedules = school.schedules.slice(0, 3);
        displaySchedules.forEach(schedule => {
            const scheduleItem = document.createElement('li');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <span class="day-badge">${schedule.day}</span>
                <span class="time-badge">${schedule.time}</span>
                <span>${schedule.subject}</span>
            `;
            scheduleList.appendChild(scheduleItem);
        });
        
        if (school.schedules.length > 3) {
            const moreItem = document.createElement('li');
            moreItem.className = 'schedule-item';
            moreItem.innerHTML = `<span class="more-link">+ ${school.schedules.length - 3} mais...</span>`;
            scheduleList.appendChild(moreItem);
        }
        
        scheduleDiv.appendChild(scheduleList);
        contentDiv.appendChild(scheduleDiv);
        
        // Botões de ação
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'school-actions';
        actionsDiv.innerHTML = `
            <button class="btn btn-outline view-schedule-btn" data-school-id="${school.id}">
                <i class="fas fa-calendar"></i> Ver Horários
            </button>
            <button class="btn btn-primary mark-attendance-btn" data-school-id="${school.id}">
                <i class="fas fa-qrcode"></i> Marcar Presença
            </button>
        `;
        
        contentDiv.appendChild(actionsDiv);
        
        // Montar o card completo
        schoolCard.appendChild(imageDiv);
        schoolCard.appendChild(contentDiv);
        container.appendChild(schoolCard);
    });
    
    // Adicionar event listeners aos botões
    addButtonEventListeners(schools);
}

// Adicionar event listeners aos botões dos cards de escolas
function addButtonEventListeners(schools) {
    // Botões para ver horários
    const viewScheduleButtons = document.querySelectorAll('.view-schedule-btn');
    viewScheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const schoolId = parseInt(this.getAttribute('data-school-id'));
            const school = schools.find(s => s.id === schoolId);
            showScheduleModal(school);
        });
    });
    
    // Botões para marcar presença
    const markAttendanceButtons = document.querySelectorAll('.mark-attendance-btn');
    markAttendanceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const schoolId = this.getAttribute('data-school-id');
            // Redirecionar para a página de marcar presença com o ID da escola
            window.location.href = `marcar-presenca.html?school=${schoolId}`;
        });
    });
}

// Configurar modal de horários
function setupScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    const closeBtn = document.getElementById('closeScheduleModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Fechar modal quando clicar no X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal quando clicar em Fechar
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal quando clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Mostrar modal com horários completos da escola
function showScheduleModal(school) {
    // Preencher nome da escola
    document.getElementById('scheduleModalTitle').textContent = `Horários - ${school.name}`;
    
    // Limpar horários existentes
    const scheduleContainer = document.getElementById('scheduleDetails');
    scheduleContainer.innerHTML = '';
    
    // Dias da semana
    const weekDays = [
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
        "Domingo"
    ];
    
    // Adicionar horários para cada dia da semana
    weekDays.forEach(day => {
        const daySchedule = school.fullSchedule[day] || [];
        
        // Criar seção para o dia
        const daySection = document.createElement('div');
        daySection.className = 'schedule-detail-day';
        
        // Cabeçalho do dia
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        daySection.appendChild(dayHeader);
        
        if (daySchedule.length > 0) {
            // Adicionar cada aula do dia
            daySchedule.forEach(classItem => {
                const classDiv = document.createElement('div');
                classDiv.className = 'class-item';
                classDiv.innerHTML = `
                    <div class="class-time">${classItem.time}</div>
                    <div class="class-subject">${classItem.subject}</div>
                    <div class="class-room">${classItem.room}</div>
                `;
                daySection.appendChild(classDiv);
            });
        } else {
            // Mensagem quando não há aulas
            const noClassesDiv = document.createElement('div');
            noClassesDiv.className = 'no-classes';
            noClassesDiv.textContent = 'Sem aulas neste dia';
            daySection.appendChild(noClassesDiv);
        }
        
        scheduleContainer.appendChild(daySection);
    });
    
    // Exibir modal
    document.getElementById('scheduleModal').style.display = 'flex';
}

// Função de logout
function logout() {
    // Remover dados de sessão
    localStorage.removeItem('loggedUser');
    // Redirecionar para página de login
    window.location.href = '../index.html';
}