// Script para gerenciar o catálogo de livros da biblioteca
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const booksGrid = document.getElementById('books-grid');
    const searchInput = document.getElementById('search-book');
    const searchBtn = document.querySelector('.search-btn');
    const filterSerie = document.getElementById('filter-serie');
    const filterArea = document.getElementById('filter-area');
    const filterDisponibilidade = document.getElementById('filter-disponibilidade');
    const sortSelect = document.getElementById('sort-books');
    const noResults = document.getElementById('no-results');
    const pagination = document.getElementById('books-pagination');
    const prevPageBtn = document.querySelector('.pagination-prev');
    const nextPageBtn = document.querySelector('.pagination-next');
    const pageNumbers = document.querySelector('.pagination-numbers');
    const modal = document.getElementById('bookModal');
    const modalClose = modal.querySelector('.modal-close');
    const modalBody = modal.querySelector('.modal-body');

    // Variáveis de controle
    let currentPage = 1;
    const itemsPerPage = 8;
    let filteredBooks = [...booksData];
    let searchTerm = '';
    let serieFilter = 'todos';
    let areaFilter = 'todos';
    let disponibilidadeFilter = 'todos';
    let sortBy = 'titulo-asc'; // Ordenação padrão

    // Inicializar o catálogo
    initCatalog();
    
    // Eventos de filtro e pesquisa
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchTerm = searchInput.value.toLowerCase().trim();
            currentPage = 1;
            filterBooks();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchTerm = searchInput.value.toLowerCase().trim();
                currentPage = 1;
                filterBooks();
            }
        });
    }
    
    // Filtros de select
    [filterSerie, filterArea, filterDisponibilidade].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                if (this.id === 'filter-serie') serieFilter = this.value;
                if (this.id === 'filter-area') areaFilter = this.value;
                if (this.id === 'filter-disponibilidade') disponibilidadeFilter = this.value;
                
                currentPage = 1;
                filterBooks();
            });
        }
    });
    
    // Ordenação
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortBy = this.value;
            filterBooks();
        });
    }
    
    // Evento de paginação
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderBooks();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderBooks();
            }
        });
    }
    
    // Modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com a tecla Escape
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Escutar evento de filtro de outros componentes
    document.addEventListener('filterBooksRequested', function(e) {
        const filter = e.detail.filter;
        
        // Atualizar os selects conforme o filtro solicitado
        if (filterSerie && bookCategories.series.includes(filter)) {
            filterSerie.value = filter;
            serieFilter = filter;
        } else if (filterArea && bookCategories.areas.includes(filter)) {
            filterArea.value = filter;
            areaFilter = filter;
        } else {
            // Resetar filtros para mostrar todos
            if (filterSerie) filterSerie.value = 'todos';
            if (filterArea) filterArea.value = 'todos';
            serieFilter = 'todos';
            areaFilter = 'todos';
        }
        
        currentPage = 1;
        filterBooks();
    });
    
    // Funções
    function initCatalog() {
        renderBooks();
        renderPagination();
    }
    
    function filterBooks() {
        filteredBooks = booksData.filter(book => {
            const matchesSearch = searchTerm === '' || 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm) ||
                book.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                
            const matchesSerie = serieFilter === 'todos' || book.serie === serieFilter;
            const matchesArea = areaFilter === 'todos' || book.area === areaFilter;
            const matchesDisponibilidade = disponibilidadeFilter === 'todos' || 
                (disponibilidadeFilter === 'disponivel' && book.available) || 
                (disponibilidadeFilter === 'emprestado' && !book.available);
                
            return matchesSearch && matchesSerie && matchesArea && matchesDisponibilidade;
        });
        
        // Aplicar ordenação
        sortBooks();
        
        renderBooks();
        renderPagination();
    }
    
    function renderBooks() {
        if (!booksGrid) return;
        
        booksGrid.innerHTML = '';
        
        if (filteredBooks.length === 0) {
            if (noResults) noResults.classList.remove('hidden');
            return;
        }
        
        if (noResults) noResults.classList.add('hidden');
        
        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, filteredBooks.length);
        
        for (let i = start; i < end; i++) {
            const book = filteredBooks[i];
            const statusClass = book.available ? 'status-available' : 'status-borrowed';
            const statusText = book.available ? 'Disponível' : 'Emprestado';
            const statusIcon = book.available ? 'fa-check-circle' : 'fa-clock';
            const actionBtnText = book.available ? 'Reservar' : 'Entrar na Fila';
            
            const bookElement = document.createElement('div');
            bookElement.className = 'book-item';
            bookElement.innerHTML = `
                <div class="book-cover">
                    <img src="${book.cover}" alt="Capa do livro ${book.title}">
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-tags">
                        ${book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="book-bottom">
                        <span class="book-serie">${book.serie}</span>
                        <span class="book-status ${statusClass}">
                            <i class="fas ${statusIcon}"></i> ${statusText}
                        </span>
                    </div>
                    <div class="book-actions">
                        <button class="book-btn btn-details" data-book-id="${book.id}">
                            <i class="fas fa-info-circle"></i> Detalhes
                        </button>
                        <button class="book-btn btn-reserve">
                            <i class="fas fa-bookmark"></i> ${actionBtnText}
                        </button>
                    </div>
                </div>
            `;
            
            // Adicionar evento para o botão de detalhes
            const detailsBtn = bookElement.querySelector('.btn-details');
            detailsBtn.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-book-id'));
                openBookDetails(bookId);
            });
            
            // Adicionar evento para o botão de reserva
            const reserveBtn = bookElement.querySelector('.btn-reserve');
            reserveBtn.addEventListener('click', function() {
                alert(book.available ? 'Livro reservado com sucesso! Você pode buscá-lo na biblioteca.' : 'Você foi adicionado à fila de espera. Informaremos quando o livro estiver disponível.');
            });
            
            booksGrid.appendChild(bookElement);
        }
    }
    
    // Função para ordenar livros
    function sortBooks() {
        switch (sortBy) {
            case 'titulo-asc':
                filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'titulo-desc':
                filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'autor-asc':
                filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
                break;
            case 'autor-desc':
                filteredBooks.sort((a, b) => b.author.localeCompare(a.author));
                break;
            case 'ano-asc':
                filteredBooks.sort((a, b) => a.year - b.year);
                break;
            case 'ano-desc':
                filteredBooks.sort((a, b) => b.year - a.year);
                break;
            default:
                filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        }
    }
    
    function renderPagination() {
        if (!pagination || !pageNumbers) return;
        
        const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
        
        // Atualizar estados dos botões
        if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
        
        // Renderizar números de página
        pageNumbers.innerHTML = '';
        
        // Lógica para mostrar os números de página (atual, anterior e próximo)
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);
        
        // Ajustar se estamos no fim
        if (endPage - startPage < 2 && startPage > 1) {
            startPage = Math.max(1, endPage - 2);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.className = `page-number${i === currentPage ? ' active' : ''}`;
            pageNumber.textContent = i;
            
            pageNumber.addEventListener('click', function() {
                if (currentPage !== i) {
                    currentPage = i;
                    renderBooks();
                    renderPagination();
                }
            });
            
            pageNumbers.appendChild(pageNumber);
        }
    }
    
    function openBookDetails(bookId) {
        const book = booksData.find(b => b.id === bookId);
        if (!book || !modalBody) return;
        
        const statusClass = book.available ? 'status-available' : 'status-borrowed';
        const statusText = book.available ? 'Disponível' : 'Emprestado';
        
        modalBody.innerHTML = `
            <div class="modal-book-cover">
                <img src="${book.cover}" alt="Capa do livro ${book.title}">
            </div>
            <div class="modal-book-info">
                <h2>${book.title}</h2>
                <p class="modal-book-author">${book.author}</p>
                
                <div class="modal-book-details">
                    <div class="detail-item">
                        <span class="detail-label">Série</span>
                        <span class="detail-value">${book.serie}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Área</span>
                        <span class="detail-value">${book.area}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Ano</span>
                        <span class="detail-value">${book.year}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Editora</span>
                        <span class="detail-value">${book.publisher}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value ${statusClass}">${statusText}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ISBN</span>
                        <span class="detail-value">${book.isbn}</span>
                    </div>
                </div>
                
                <div class="modal-book-desc">
                    <h3>Sinopse</h3>
                    <p>${book.description}</p>
                </div>
                
                <div class="modal-book-actions">
                    ${book.available ? 
                      `<button class="btn btn-secondary"><i class="fas fa-bookmark"></i> Reservar Livro</button>` :
                      `<button class="btn btn-secondary"><i class="fas fa-clock"></i> Entrar na Fila</button>`
                    }
                    ${book.hasEbook ? 
                      `<button class="btn btn-outline"><i class="fas fa-tablet-alt"></i> Ler E-book</button>` : ''
                    }
                </div>
            </div>
        `;
        
        // Adicionar evento para o botão de reserva/fila no modal
        const actionBtn = modalBody.querySelector('.btn-secondary');
        if (actionBtn) {
            actionBtn.addEventListener('click', function() {
                alert(book.available ? 'Livro reservado com sucesso! Você pode buscá-lo na biblioteca.' : 'Você foi adicionado à fila de espera. Informaremos quando o livro estiver disponível.');
                closeModal();
            });
        }
        
        // Adicionar evento para o botão de e-book
        const ebookBtn = modalBody.querySelector('.btn-outline');
        if (ebookBtn) {
            ebookBtn.addEventListener('click', function() {
                alert('Redirecionando para a plataforma de e-books...');
            });
        }
        
        // Atualizar o título do modal para acessibilidade
        modal.setAttribute('aria-labelledby', 'modalTitle');
        
        // Adicionar título identificável para leitores de tela
        modalBody.querySelector('h2').id = 'modalTitle';
        
        // Exibir modal
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        
        // Foco no primeiro elemento interativo do modal
        setTimeout(() => {
            const firstButton = modalBody.querySelector('button');
            if (firstButton) firstButton.focus();
        }, 100);
    }
    
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Categorias disponíveis para livros
const bookCategories = {
    series: ['infantil', 'fundamental-1', 'fundamental-2', 'eja'],
    areas: ['linguagens', 'matematica', 'ciencias', 'humanas']
};

// Dados simulados de livros
const booksData = [
    {
        id: 1,
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        cover: "https://m.media-amazon.com/images/I/61-hMfd7NGL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-1",
        area: "linguagens",
        year: 2018,
        publisher: "HarperCollins",
        isbn: "978-8595081512",
        available: true,
        hasEbook: true,
        tags: ["Literatura", "Clássico", "Aventura"],
        description: "Uma das obras mais traduzidas da literatura mundial, que aborda temas como amizade, amor e o sentido da vida através da história de um principezinho que deixa seu asteroide para conhecer a Terra."
    },
    {
        id: 2,
        title: "Harry Potter e a Pedra Filosofal",
        author: "J.K. Rowling",
        cover: "https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "linguagens",
        year: 2017,
        publisher: "Rocco",
        isbn: "978-8532530783",
        available: false,
        hasEbook: true,
        tags: ["Fantasia", "Aventura", "Magia"],
        description: "Harry Potter é um garoto órfão que vive infeliz com seus tios. Ao completar 11 anos, descobre que é um bruxo e que foi aceito na Escola de Magia e Bruxaria de Hogwarts, onde se envolve em uma perigosa aventura."
    },
    {
        id: 3,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        cover: "https://m.media-amazon.com/images/I/61Vy6JUQy3L._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "linguagens",
        year: 2019,
        publisher: "Penguin",
        isbn: "978-8563560308",
        available: true,
        hasEbook: true,
        tags: ["Literatura Brasileira", "Clássico", "Romance"],
        description: "Bento Santiago, o Bentinho, narra sua história de amor por Capitu e como o ciúme corroeu seu relacionamento, levando-o a suspeitar que foi traído pela esposa com seu melhor amigo, Escobar."
    },
    {
        id: 4,
        title: "A Menina que Roubava Livros",
        author: "Markus Zusak",
        cover: "https://m.media-amazon.com/images/I/91r5G8RxqfL._AC_UF1000,1000_QL80_.jpg",
        serie: "eja",
        area: "linguagens",
        year: 2013,
        publisher: "Intrínseca",
        isbn: "978-8580572261",
        available: true,
        hasEbook: false,
        tags: ["Romance", "História", "Segunda Guerra"],
        description: "Durante a Segunda Guerra Mundial na Alemanha, a jovem Liesel encontra consolo ao roubar livros para compartilhar com outros, incluindo um judeu que sua família esconde em seu porão."
    },
    {
        id: 5,
        title: "A Revolução dos Bichos",
        author: "George Orwell",
        cover: "https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg",
        serie: "eja",
        area: "humanas",
        year: 2007,
        publisher: "Companhia das Letras",
        isbn: "978-8535909555",
        available: false,
        hasEbook: true,
        tags: ["Literatura", "Política", "Fábula"],
        description: "Uma fábula sobre a revolução dos animais de uma fazenda contra seus donos humanos. A narrativa é uma alegoria da Revolução Russa e crítica ao totalitarismo."
    },
    {
        id: 6,
        title: "Diário de um Banana",
        author: "Jeff Kinney",
        cover: "https://m.media-amazon.com/images/I/81pgVXMcKoL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-1",
        area: "linguagens",
        year: 2008,
        publisher: "V&R Editoras",
        isbn: "978-8576831303",
        available: true,
        hasEbook: false,
        tags: ["Infantojuvenil", "Humor", "Quadrinhos"],
        description: "Greg Heffley é um garoto que está sempre se metendo em confusões na escola e em casa. Através de seu diário ilustrado, ele narra com humor as desventuras do dia a dia."
    },
    {
        id: 7,
        title: "Percy Jackson e o Ladrão de Raios",
        author: "Rick Riordan",
        cover: "https://m.media-amazon.com/images/I/9187FI7nMvL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "linguagens",
        year: 2014,
        publisher: "Intrínseca",
        isbn: "978-8580575361",
        available: true,
        hasEbook: true,
        tags: ["Aventura", "Mitologia", "Fantasia"],
        description: "Percy Jackson descobre que é filho de um deus grego e embarca em uma perigosa missão para impedir uma guerra entre os deuses do Olimpo, que poderia devastar o mundo."
    },
    {
        id: 8,
        title: "O Hobbit",
        author: "J.R.R. Tolkien",
        cover: "https://m.media-amazon.com/images/I/814u7+5arnL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "linguagens",
        year: 2019,
        publisher: "HarperCollins",
        isbn: "978-8595084742",
        available: false,
        hasEbook: true,
        tags: ["Fantasia", "Aventura", "Clássico"],
        description: "Bilbo Bolseiro é um hobbit que leva uma vida confortável até ser recrutado pelo mago Gandalf para uma aventura com um grupo de anões para recuperar um tesouro guardado por um dragão."
    },
    {
        id: 9,
        title: "Anne Frank: O Diário de Uma Menina",
        author: "Anne Frank",
        cover: "https://m.media-amazon.com/images/I/8192kx4b-kL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "humanas",
        year: 2019,
        publisher: "Record",
        isbn: "978-8501012319",
        available: true,
        hasEbook: false,
        tags: ["História", "Biografia", "Segunda Guerra"],
        description: "O relato pessoal de Anne Frank, uma adolescente judia que se escondeu com sua família em um anexo secreto em Amsterdã durante a ocupação nazista da Holanda na Segunda Guerra Mundial."
    },
    {
        id: 10,
        title: "Matemática Divertida",
        author: "Carlos Fernandes",
        cover: "https://m.media-amazon.com/images/I/61h2SXfW0JL._AC_UF1000,1000_QL80_.jpg",
        serie: "infantil",
        area: "matematica",
        year: 2022,
        publisher: "Editora Escolar",
        isbn: "978-8534523659",
        available: true,
        hasEbook: true,
        tags: ["Educativo", "Infantil", "Números"],
        description: "Um livro colorido e interativo que ensina conceitos básicos de matemática para crianças através de jogos, quebra-cabeças e atividades divertidas."
    },
    {
        id: 11,
        title: "O Corpo Humano: Uma Viagem Fantástica",
        author: "Maria Santos",
        cover: "https://m.media-amazon.com/images/I/71b8RbqOuHL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-1",
        area: "ciencias",
        year: 2021,
        publisher: "Moderna",
        isbn: "978-8516120382",
        available: false,
        hasEbook: true,
        tags: ["Ciências", "Anatomia", "Educativo"],
        description: "Uma jornada ilustrada pelo corpo humano, explicando de forma simples e didática como funcionam os sistemas, órgãos e células que compõem nosso organismo."
    },
    {
        id: 12,
        title: "Geografia do Brasil Ilustrada",
        author: "Paulo Mendes",
        cover: "https://m.media-amazon.com/images/I/71oD4KyKOaL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "humanas",
        year: 2020,
        publisher: "Scipione",
        isbn: "978-8526276451",
        available: true,
        hasEbook: false,
        tags: ["Geografia", "Brasil", "Educativo"],
        description: "Um guia completo sobre a geografia brasileira, com mapas, fotos e infográficos que exploram a diversidade de biomas, relevos, climas e culturas regionais do país."
    },
    {
        id: 13,
        title: "Vamos Aprender a Ler",
        author: "Júlia Lima",
        cover: "https://m.media-amazon.com/images/I/61e8mGPzKiL._AC_UF1000,1000_QL80_.jpg",
        serie: "infantil",
        area: "linguagens",
        year: 2023,
        publisher: "Positivo",
        isbn: "978-8546728364",
        available: true,
        hasEbook: true,
        tags: ["Alfabetização", "Infantil", "Educativo"],
        description: "Um livro interativo com jogos, atividades e histórias curtas que ajudam crianças no processo de alfabetização e desenvolvimento da leitura."
    },
    {
        id: 14,
        title: "História da Filosofia",
        author: "Ricardo Almeida",
        cover: "https://m.media-amazon.com/images/I/71Qe+rQwCpL._AC_UF1000,1000_QL80_.jpg",
        serie: "eja",
        area: "humanas",
        year: 2018,
        publisher: "Ática",
        isbn: "978-8508193578",
        available: false,
        hasEbook: true,
        tags: ["Filosofia", "História", "Pensamento"],
        description: "Uma introdução à história da filosofia, apresentando as principais correntes de pensamento, filósofos e conceitos que moldaram a forma como compreendemos o mundo."
    },
    {
        id: 15,
        title: "Física Básica Explicada",
        author: "Fernando Silva",
        cover: "https://m.media-amazon.com/images/I/71DH8OaHvBL._AC_UF1000,1000_QL80_.jpg",
        serie: "fundamental-2",
        area: "ciencias",
        year: 2021,
        publisher: "FTD",
        isbn: "978-8532278934",
        available: true,
        hasEbook: false,
        tags: ["Física", "Ciências", "Educativo"],
        description: "Um guia ilustrado que explica conceitos fundamentais da física de forma acessível, com exemplos do cotidiano e experimentos práticos que podem ser realizados em casa ou sala de aula."
    },
    {
        id: 16,
        title: "Poemas para Crianças",
        author: "Ana Oliveira",
        cover: "https://m.media-amazon.com/images/I/61fhfL5oRPL._AC_UF1000,1000_QL80_.jpg",
        serie: "infantil",
        area: "linguagens",
        year: 2022,
        publisher: "Salamandra",
        isbn: "978-8516103729",
        available: true,
        hasEbook: true,
        tags: ["Poesia", "Infantil", "Literatura"],
        description: "Uma coletânea de poemas coloridos e rimados para crianças, com ilustrações vibrantes que estimulam a imaginação e introduzem os pequenos leitores ao mundo da poesia."
    }
];