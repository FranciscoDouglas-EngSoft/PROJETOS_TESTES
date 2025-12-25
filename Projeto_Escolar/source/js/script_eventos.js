document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const menuBtn = document.querySelector('.menu_amburgue');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('change');
            navMenu.classList.toggle('active');
            
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (menuBtn) {
                menuBtn.classList.remove('change');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Botão Voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar o estado do item atual
                item.classList.toggle('active');
                
                // Alterar o ícone
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            });
        }
    });

    // Modal de Evento
    const eventModal = document.getElementById('eventModal');
    const modalClose = document.querySelector('.modal-close');
    const eventButtons = document.querySelectorAll('.btn-details, .event-link');
    
    // Dados dos eventos (simulados, normalmente viriam de um banco de dados)
    const eventsData = {
        1: {
            title: 'Feira de Ciências Anual',
            date: '15 de Novembro, 2025',
            time: '09:00 - 17:00',
            location: 'Pátio da Escola',
            image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            description: `<p>Nossa feira de ciências anual apresenta projetos inovadores desenvolvidos por alunos de todas as séries, com experimentos, demonstrações e exposições interativas que exploram diversos campos científicos.</p>
                        <p>Este evento é uma oportunidade para os estudantes demonstrarem sua criatividade, pensamento crítico e habilidades de pesquisa, enquanto compartilham seus conhecimentos com a comunidade escolar.</p>
                        <p>Professores orientadores estarão presentes para explicar a metodologia pedagógica por trás dos projetos e como eles se alinham com o currículo escolar.</p>`,
            schedule: [
                {time: '09:00 - 10:00', activity: 'Abertura oficial e apresentação dos jurados'},
                {time: '10:00 - 12:00', activity: 'Exposição de projetos - Turmas de Ensino Fundamental I'},
                {time: '12:00 - 13:30', activity: 'Intervalo para almoço'},
                {time: '13:30 - 15:30', activity: 'Exposição de projetos - Turmas de Ensino Fundamental II'},
                {time: '16:00 - 17:00', activity: 'Premiação dos melhores projetos e encerramento'}
            ],
            organizers: 'Coordenação Pedagógica e Professores de Ciências'
        },
        2: {
            title: 'Mostra Cultural',
            date: '22 de Novembro, 2025',
            time: '14:00 - 18:00',
            location: 'Auditório',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            description: `<p>Exposição de trabalhos artísticos e apresentações culturais dos alunos, celebrando a diversidade cultural brasileira.</p>
                        <p>O evento inclui apresentações de dança, teatro, música, além de exposição de artes visuais produzidas pelos alunos durante o ano letivo.</p>`,
            schedule: [
                {time: '14:00 - 14:30', activity: 'Abertura com apresentação do coral da escola'},
                {time: '14:30 - 16:00', activity: 'Apresentações de dança e teatro'},
                {time: '16:00 - 16:30', activity: 'Intervalo para visita à exposição de artes visuais'},
                {time: '16:30 - 18:00', activity: 'Apresentações musicais e encerramento'}
            ],
            organizers: 'Departamento de Artes e Cultura'
        }
        // Outros eventos seriam adicionados aqui
    };
    
    // Abrir modal com detalhes do evento
    eventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event-id');
            const eventData = eventsData[eventId];
            
            if (eventData) {
                // Preencher o modal com os dados do evento
                let scheduleHTML = '';
                if (eventData.schedule) {
                    scheduleHTML = `
                        <div class="event-schedule">
                            <h3>Programação</h3>
                            <ul class="schedule-list">
                                ${eventData.schedule.map(item => `
                                    <li>
                                        <span class="schedule-time">${item.time}</span>
                                        <span class="schedule-activity">${item.activity}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                const modalContent = `
                    <div class="event-modal-header">
                        <img src="${eventData.image}" alt="${eventData.title}">
                        <div class="event-modal-badge">${eventData.date}</div>
                    </div>
                    <div class="event-modal-content">
                        <h2>${eventData.title}</h2>
                        <div class="event-modal-meta">
                            <span><i class="far fa-clock"></i> ${eventData.time}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${eventData.location}</span>
                        </div>
                        <div class="event-modal-description">
                            ${eventData.description}
                        </div>
                        ${scheduleHTML}
                        <div class="event-modal-organizer">
                            <strong>Organização:</strong> ${eventData.organizers || 'Equipe da Escola'}
                        </div>
                        <div class="event-modal-actions">
                            <a href="#" class="btn btn-secondary event-reminder"><i class="far fa-bell"></i> Definir Lembrete</a>
                            <a href="#" class="btn share-event"><i class="fas fa-share-alt"></i> Compartilhar</a>
                        </div>
                    </div>
                `;
                
                document.querySelector('.modal-body').innerHTML = modalContent;
                eventModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Previne rolagem enquanto o modal está aberto
            }
        });
    });
    
    // Fechar modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            eventModal.classList.remove('show');
            document.body.style.overflow = ''; // Restaura rolagem
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Calendário de Eventos
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    // Data atual
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Dados de eventos no calendário (simulados)
    const calendarEvents = {
        '2025-11-15': [{ title: 'Feira de Ciências Anual', category: 'cientifico' }],
        '2025-11-22': [{ title: 'Mostra Cultural', category: 'cultural' }],
        '2025-11-28': [{ title: 'Reunião de Pais e Mestres', category: 'administrativo' }],
        '2025-12-05': [{ title: 'Torneio Esportivo Interclasse', category: 'esportivo' }],
        '2025-12-10': [{ title: 'Palestra sobre Meio Ambiente', category: 'palestra' }],
        '2025-12-15': [{ title: 'Formatura do 9º Ano', category: 'cerimonia' }],
        '2025-12-20': [{ title: 'Festa de Natal', category: 'celebracao' }]
    };
    
    // Gerar calendário
    function generateCalendar(month, year) {
        // Limpar conteúdo anterior
        if (calendarDays) {
            calendarDays.innerHTML = '';
            
            // Atualizar título do mês
            const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            currentMonthElement.textContent = `${monthNames[month]} ${year}`;
            
            // Primeiro dia do mês
            const firstDay = new Date(year, month, 1);
            const startingDay = firstDay.getDay(); // 0 = domingo, 1 = segunda, etc.
            
            // Último dia do mês
            const lastDay = new Date(year, month + 1, 0);
            const totalDays = lastDay.getDate();
            
            // Dias do mês anterior
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            // Total de células no calendário (42 = 6 semanas de 7 dias)
            const totalCells = 42;
            
            // Data atual
            const today = new Date();
            
            // Gerar células do calendário
            for (let i = 0; i < totalCells; i++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                
                // Dias do mês anterior
                if (i < startingDay) {
                    const prevMonthDay = prevMonthLastDay - startingDay + i + 1;
                    dayCell.innerHTML = `<span class="day-number">${prevMonthDay}</span>`;
                    dayCell.classList.add('other-month');
                    dayCell.dataset.date = `${year}-${month === 0 ? 12 : month}-${prevMonthDay}`;
                } 
                // Dias do mês atual
                else if (i >= startingDay && i < startingDay + totalDays) {
                    const day = i - startingDay + 1;
                    const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    
                    dayCell.innerHTML = `<span class="day-number">${day}</span>`;
                    dayCell.dataset.date = dateString;
                    
                    // Verificar se é hoje
                    if (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) {
                        dayCell.classList.add('today');
                    }
                    
                    // Verificar se há eventos neste dia
                    if (calendarEvents[dateString]) {
                        dayCell.classList.add('has-event');
                        
                        // Adicionar indicadores de eventos
                        const eventsList = document.createElement('div');
                        eventsList.className = 'day-events';
                        
                        calendarEvents[dateString].forEach(event => {
                            const eventIndicator = document.createElement('span');
                            eventIndicator.className = 'day-event-indicator';
                            eventIndicator.textContent = event.title;
                            eventsList.appendChild(eventIndicator);
                        });
                        
                        dayCell.appendChild(eventsList);
                    }
                } 
                // Dias do próximo mês
                else {
                    const nextMonthDay = i - startingDay - totalDays + 1;
                    dayCell.innerHTML = `<span class="day-number">${nextMonthDay}</span>`;
                    dayCell.classList.add('other-month');
                    dayCell.dataset.date = `${year}-${month === 11 ? 1 : month + 2}-${nextMonthDay}`;
                }
                
                calendarDays.appendChild(dayCell);
            }
            
            // Atualizar eventos do mês
            updateMonthEvents(month, monthNames);
        }
    }
    
    // Atualizar lista de eventos do mês
    function updateMonthEvents(month, monthNames) {
        const monthEventsContainer = document.querySelector('.month-events h3');
        const eventTimeline = document.querySelector('.event-timeline');
        
        if (monthEventsContainer) {
            monthEventsContainer.textContent = `Eventos em ${monthNames[month]}`;
        }
        
        if (eventTimeline) {
            // Limpar eventos anteriores
            eventTimeline.innerHTML = '';
            
            // Filtrar eventos do mês atual
            const monthPrefix = `${currentYear}-${(month + 1).toString().padStart(2, '0')}`;
            const monthEvents = [];
            
            for (const dateKey in calendarEvents) {
                if (dateKey.startsWith(monthPrefix)) {
                    const day = dateKey.split('-')[2];
                    calendarEvents[dateKey].forEach(event => {
                        monthEvents.push({
                            day: parseInt(day),
                            month: month,
                            title: event.title,
                            category: event.category
                        });
                    });
                }
            }
            
            // Ordenar eventos por dia
            monthEvents.sort((a, b) => a.day - b.day);
            
            // Adicionar eventos à timeline
            const monthShort = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
            
            if (monthEvents.length > 0) {
                monthEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'timeline-event';
                    eventElement.innerHTML = `
                        <div class="timeline-date">
                            <span class="day">${event.day}</span>
                            <span class="month">${monthShort[event.month]}</span>
                        </div>
                        <div class="timeline-content">
                            <h4>${event.title}</h4>
                            <div class="event-time"><i class="far fa-clock"></i> Horário a confirmar</div>
                            <div class="event-location"><i class="fas fa-map-marker-alt"></i> Local a confirmar</div>
                            <div class="event-description">Mais detalhes serão divulgados em breve.</div>
                        </div>
                    `;
                    
                    eventTimeline.appendChild(eventElement);
                });
            } else {
                const noEvents = document.createElement('p');
                noEvents.className = 'no-events';
                noEvents.textContent = 'Não há eventos programados para este mês.';
                eventTimeline.appendChild(noEvents);
            }
        }
    }
    
    // Mudar para o mês anterior
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Mudar para o próximo mês
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Inicializar calendário
    if (calendarDays) {
        generateCalendar(currentMonth, currentYear);
    }

    // Formulário de inscrição para eventos
    const eventSubscriptionForm = document.querySelector('.event-subscription-form');
    
    if (eventSubscriptionForm) {
        eventSubscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const interest = formData.get('interest') || this.querySelector('select').value;
            
            // Simulação de envio (em um caso real, enviaria para um servidor)
            console.log('Inscrição realizada:', { name, email, interest });
            
            // Feedback visual
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Inscrição realizada com sucesso! Você receberá notificações sobre os próximos eventos.</p>
            `;
            
            // Substituir formulário pela mensagem
            this.style.opacity = '0';
            setTimeout(() => {
                this.parentNode.replaceChild(successMessage, this);
                successMessage.style.opacity = '1';
            }, 300);
        });
    }
    
    // Carregar mais eventos
    const loadMoreBtn = document.querySelector('.load-more-events');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Adicionar eventos adicionais (em um caso real, faria uma requisição AJAX)
            const eventsGrid = document.querySelector('.events-grid');
            
            // Simulação de novos eventos
            const newEvents = `
                <div class="event-card" style="opacity: 0; transform: translateY(20px);">
                    <div class="event-image">
                        <img src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Volta às Aulas 2026" loading="lazy">
                        <div class="event-date-badge">
                            <span class="day">05</span>
                            <span class="month">FEV</span>
                        </div>
                    </div>
                    <div class="event-content">
                        <div class="event-category">Institucional</div>
                        <h3>Volta às Aulas 2026</h3>
                        <div class="event-details">
                            <span><i class="far fa-clock"></i> 07:30 - 12:00</span>
                            <span><i class="fas fa-map-marker-alt"></i> Toda a Escola</span>
                        </div>
                        <p>Recepção dos alunos para o início do ano letivo de 2026, com atividades de integração e boas-vindas.</p>
                        <a href="#" class="event-link" data-event-id="8">Saiba mais <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                
                <div class="event-card" style="opacity: 0; transform: translateY(20px);">
                    <div class="event-image">
                        <img src="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Reunião do Conselho Escolar" loading="lazy">
                        <div class="event-date-badge">
                            <span class="day">12</span>
                            <span class="month">FEV</span>
                        </div>
                    </div>
                    <div class="event-content">
                        <div class="event-category">Administrativo</div>
                        <h3>Reunião do Conselho Escolar</h3>
                        <div class="event-details">
                            <span><i class="far fa-clock"></i> 19:00 - 21:00</span>
                            <span><i class="fas fa-map-marker-alt"></i> Sala de Reuniões</span>
                        </div>
                        <p>Primeira reunião do ano do Conselho Escolar para definir estratégias e ações para o ano letivo de 2026.</p>
                        <a href="#" class="event-link" data-event-id="9">Saiba mais <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                
                <div class="event-card" style="opacity: 0; transform: translateY(20px);">
                    <div class="event-image">
                        <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Dia da Família na Escola" loading="lazy">
                        <div class="event-date-badge">
                            <span class="day">20</span>
                            <span class="month">FEV</span>
                        </div>
                    </div>
                    <div class="event-content">
                        <div class="event-category">Comunitário</div>
                        <h3>Dia da Família na Escola</h3>
                        <div class="event-details">
                            <span><i class="far fa-clock"></i> 09:00 - 15:00</span>
                            <span><i class="fas fa-map-marker-alt"></i> Área de Lazer</span>
                        </div>
                        <p>Evento de integração entre famílias, alunos e equipe escolar, com atividades recreativas e palestras.</p>
                        <a href="#" class="event-link" data-event-id="10">Saiba mais <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
            
            // Adicionar ao grid e animar aparecimento
            eventsGrid.insertAdjacentHTML('beforeend', newEvents);
            
            // Animar novos cards
            const newCards = eventsGrid.querySelectorAll('.event-card[style*="opacity: 0"]');
            let delay = 0;
            
            newCards.forEach(card => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);
                delay += 200;
            });
            
            // Esconder botão após carregar mais eventos
            this.style.display = 'none';
        });
    }

    // Revelar elementos durante o scroll
    const revealElements = document.querySelectorAll('.event-card, .category-card, .gallery-item, .timeline-event');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
        
        // Adicionar classe para elementos revelados
        document.addEventListener('scroll', function() {
            document.querySelectorAll('.revealed').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }
});