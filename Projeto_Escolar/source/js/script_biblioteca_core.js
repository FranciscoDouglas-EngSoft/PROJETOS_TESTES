// Script principal para a página da biblioteca
document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburguer
    const menuBtn = document.querySelector('.menu_amburgue');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('change');
            navMenu.classList.toggle('active');
            
            const expanded = navMenu.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                if (menuBtn) {
                    menuBtn.classList.remove('change');
                    menuBtn.setAttribute('aria-expanded', false);
                }
            }
        });
    });

    // Botão "Voltar ao topo" - mostrar/esconder conforme rolagem
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // Animação de estatísticas da biblioteca
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationsStarted = false;
    
    if (statNumbers.length > 0) {
        // Função para animar contagem
        function animateCountUp(element) {
            const finalValue = parseInt(element.getAttribute('data-value')) || 0;
            const duration = 2000;
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            let currentFrame = 0;
            
            function easeOutQuad(x) {
                return 1 - (1 - x) * (1 - x);
            }
            
            function animate() {
                currentFrame++;
                const progress = easeOutQuad(currentFrame / totalFrames);
                const currentValue = Math.floor(progress * finalValue);
                
                element.innerHTML = currentValue.toLocaleString();
                
                if (currentFrame < totalFrames) {
                    requestAnimationFrame(animate);
                } else {
                    element.innerHTML = finalValue.toLocaleString();
                }
            }
            
            animate();
        }
        
        // Verificar se os elementos estão visíveis na tela
        function checkVisibility() {
            if (animationsStarted) return;
            
            const statsSection = document.querySelector('.library-stats');
            if (!statsSection) return;
            
            const position = statsSection.getBoundingClientRect();
            
            // Se a seção está visível na tela
            if (position.top < window.innerHeight && position.bottom >= 0) {
                statNumbers.forEach(number => {
                    animateCountUp(number);
                });
                
                animationsStarted = true;
                window.removeEventListener('scroll', checkVisibility);
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // Verificar logo ao carregar a página
    }

    // Validação do formulário de newsletter
    const newsletterForm = document.getElementById('library-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Inscrição realizada com sucesso! Você receberá nossas novidades por email.');
            this.reset();
        });
    }

    // Accordion para FAQs
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                // Fechar todos os outros itens
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar o estado do item atual
                item.classList.toggle('active');
            });
        });
    }

    // Categorias de livros
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active de todas as categorias
                categoryItems.forEach(cat => cat.classList.remove('active'));
                
                // Adiciona active na categoria clicada
                this.classList.add('active');
                
                // Filtra os livros pelo filtro selecionado
                filterBooks(filter);
                
                // Rola para a seção de catálogo
                document.getElementById('catalogo').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Selecionar o filtro correspondente nos selects
                const filterSelects = document.querySelectorAll('.filter-select');
                filterSelects.forEach(select => {
                    if (select.querySelector(`option[value="${filter}"]`)) {
                        select.value = filter;
                    }
                });
            });
        });
    }

    // Função simples para filtrar livros (será implementada completamente em script_biblioteca_catalogo.js)
    function filterBooks(filter) {
        // Esta função será implementada completamente em script_biblioteca_catalogo.js
        console.log(`Filtrando por: ${filter}`);
        
        // Dispara um evento customizado para que o outro script possa reagir
        const event = new CustomEvent('filterBooksRequested', { detail: { filter } });
        document.dispatchEvent(event);
    }

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Verificar se é um link âncora válido
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
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
    
    // Inicializar componentes específicos da biblioteca
    initFeaturedBooks();
});

// Inicializar o carrossel de livros em destaque
function initFeaturedBooks() {
    const container = document.getElementById('featured-books-slider');
    if (!container) return;
    
    const wrapper = container.querySelector('.swiper-wrapper');
    const prevButton = document.getElementById('featured-prev');
    const nextButton = document.getElementById('featured-next');
    
    let currentPosition = 0;
    const slideWidth = 25; // 25% por slide em telas grandes
    const slideCount = featuredBooksData.length;
    const maxPosition = Math.max(0, slideCount - 4); // 4 slides visíveis em telas grandes
    
    // Ajusta para telas menores
    function getVisibleSlides() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 992) return 3;
        return 4;
    }
    
    function updateButtons() {
        prevButton.disabled = currentPosition <= 0;
        nextButton.disabled = currentPosition >= maxPosition;
    }
    
    function slideToPosition() {
        const visibleSlides = getVisibleSlides();
        const actualMaxPosition = Math.max(0, slideCount - visibleSlides);
        
        // Certifica-se de que a posição atual não ultrapasse o máximo possível
        if (currentPosition > actualMaxPosition) {
            currentPosition = actualMaxPosition;
        }
        
        const translateValue = -(currentPosition * (100 / visibleSlides));
        wrapper.style.transform = `translateX(${translateValue}%)`;
        
        updateButtons();
    }
    
    // Preencher com dados de exemplo
    featuredBooksData.forEach(book => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const statusClass = book.available ? 'status-available' : 'status-borrowed';
        const statusText = book.available ? 'Disponível' : 'Emprestado';
        const statusIcon = book.available ? 'fa-check-circle' : 'fa-clock';
        
        slide.innerHTML = `
            <div class="book-card">
                <div class="book-card-image">
                    <img src="${book.cover}" alt="Capa do livro ${book.title}">
                    ${book.featured ? '<span class="book-badge">Destaque</span>' : ''}
                </div>
                <div class="book-card-content">
                    <h3 class="book-card-title">${book.title}</h3>
                    <p class="book-card-author">${book.author}</p>
                    <div class="book-card-bottom">
                        <span class="book-card-serie">${book.serie}</span>
                        <span class="book-card-status ${statusClass}">
                            <i class="fas ${statusIcon}"></i> ${statusText}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        wrapper.appendChild(slide);
    });
    
    // Eventos dos botões
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                slideToPosition();
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const visibleSlides = getVisibleSlides();
            const actualMaxPosition = Math.max(0, slideCount - visibleSlides);
            
            if (currentPosition < actualMaxPosition) {
                currentPosition++;
                slideToPosition();
            }
        });
    }
    
    // Ajustar quando a janela for redimensionada
    window.addEventListener('resize', slideToPosition);
    
    // Inicializar
    updateButtons();
}

// Dados de livros em destaque
const featuredBooksData = [
    {
        id: 1,
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        cover: "https://m.media-amazon.com/images/I/61-hMfd7NGL._AC_UF1000,1000_QL80_.jpg",
        serie: "Fundamental I",
        available: true,
        featured: true
    },
    {
        id: 2,
        title: "Harry Potter e a Pedra Filosofal",
        author: "J.K. Rowling",
        cover: "https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg",
        serie: "Fundamental II",
        available: false,
        featured: true
    },
    {
        id: 3,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        cover: "https://m.media-amazon.com/images/I/61Vy6JUQy3L._AC_UF1000,1000_QL80_.jpg",
        serie: "Fundamental II",
        available: true,
        featured: false
    },
    {
        id: 4,
        title: "A Menina que Roubava Livros",
        author: "Markus Zusak",
        cover: "https://m.media-amazon.com/images/I/91r5G8RxqfL._AC_UF1000,1000_QL80_.jpg",
        serie: "EJA",
        available: true,
        featured: false
    },
    {
        id: 5,
        title: "A Revolução dos Bichos",
        author: "George Orwell",
        cover: "https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg",
        serie: "EJA",
        available: false,
        featured: false
    },
    {
        id: 6,
        title: "Diário de um Banana",
        author: "Jeff Kinney",
        cover: "https://m.media-amazon.com/images/I/81pgVXMcKoL._AC_UF1000,1000_QL80_.jpg",
        serie: "Fundamental I",
        available: true,
        featured: false
    },
    {
        id: 7,
        title: "Percy Jackson e o Ladrão de Raios",
        author: "Rick Riordan",
        cover: "https://m.media-amazon.com/images/I/9187FI7nMvL._AC_UF1000,1000_QL80_.jpg",
        serie: "Fundamental II",
        available: true,
        featured: false
    },
    {
        id: 8,
        title: "O Hobbit",
        author: "J.R.R. Tolkien",
        cover: "https://m.media-amazon.com/images/I/814u7+5arnL._AC_UF1000,1000_QL80_.jpg",
        serie: "Fundamental II",
        available: false,
        featured: false
    },
];