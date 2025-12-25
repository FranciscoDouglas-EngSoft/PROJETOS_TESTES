document.addEventListener('DOMContentLoaded', function() {
    // Filtro de Categorias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const categoryTiles = document.querySelectorAll('.category-tile');
    
    // Função para aplicar filtro
    function applyFilter(filter) {
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
        
        // Atualizar botões de filtro ativos
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }
    
    // Adicionar eventos aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            applyFilter(filter);
        });
    });
    
    // Adicionar eventos às categorias na grade
    categoryTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Rolar para a seção da galeria
            const gallerySection = document.getElementById('gallery-posts');
            window.scrollTo({
                top: gallerySection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Aplicar filtro após rolagem
            setTimeout(() => {
                applyFilter(category);
            }, 800);
        });
    });
    
    // Alternar Layout (Grid/Lista)
    const layoutButtons = document.querySelectorAll('.layout-btn');
    const galleryContainer = document.querySelector('.gallery-container');
    
    layoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            const layout = this.dataset.layout;
            
            // Ativar botão clicado e desativar outros
            layoutButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.layout === layout);
            });
            
            // Aplicar layout
            galleryContainer.className = 'gallery-container ' + layout + '-layout';
            
            // Animar transição de layout
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 300);
            });
        });
    });
    
    // Paginação
    const paginationLinks = document.querySelectorAll('.pagination a');
    const itemsPerPage = 9; // Itens por página
    let currentPage = 1;
    
    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // Esconder todos os itens primeiro
        galleryItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Mostrar apenas itens da página atual
        const visibleItems = Array.from(galleryItems).filter(item => {
            const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
            return currentFilter === 'all' || item.dataset.category === currentFilter;
        });
        
        visibleItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 + (index - startIndex) * 50);
            }
        });
        
        // Atualizar links de paginação
        paginationLinks.forEach(link => {
            if (link.textContent.trim() === String(page) || 
                (link.classList.contains('next') && page === Math.ceil(visibleItems.length / itemsPerPage))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        currentPage = page;
        
        // Rolar para o topo da galeria
        const gallerySection = document.getElementById('gallery-posts');
        window.scrollTo({
            top: gallerySection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    
    // Adicionar eventos aos links de paginação
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('next')) {
                showPage(currentPage + 1);
            } else {
                const page = parseInt(this.textContent);
                showPage(page);
            }
        });
    });
    
    // Atualizar paginação quando mudar filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                showPage(1); // Voltar para primeira página ao mudar filtro
            }, 500);
        });
    });
    
    // Inicializar com página 1
    showPage(1);
});