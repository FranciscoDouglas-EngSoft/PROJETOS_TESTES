document.addEventListener('DOMContentLoaded', function() {
    // Modal do Post
    const postModal = document.getElementById('postModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');
    const postLinks = document.querySelectorAll('.post-link, .btn-details, .overlay-link');
    
    // Dados dos posts (simulados, em um caso real viriam de um banco de dados)
    const postsData = {
        1: {
            title: 'Festa Junina 2025: Celebrando a Cultura Brasileira',
            category: 'Eventos',
            date: '20 de Junho, 2025',
            author: 'Coordenação de Eventos',
            image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            description: `
                <p>Nossa tradicional festa junina reuniu toda a comunidade escolar em uma celebração vibrante das tradições culturais brasileiras. Com apresentações de dança, barracas de comidas típicas e brincadeiras, o evento foi um grande sucesso.</p>
                <p>Alunos de todas as séries participaram das apresentações de dança, mostrando coreografias típicas como quadrilha, xote e baião. Os ensaios ocorreram durante um mês antes do evento, sob a coordenação dos professores de educação física e artes.</p>
                <p>As barracas de comidas típicas, organizadas pelos pais e responsáveis, ofereceram uma deliciosa variedade de iguarias juninas como canjica, pamonha, bolo de milho, pé-de-moleque, entre outras. Todo o lucro obtido será revertido para a compra de materiais didáticos para a biblioteca da escola.</p>
                <p>Agradecemos a todos que participaram e contribuíram para fazer deste evento um momento especial de integração da comunidade escolar!</p>`,
            gallery: [
                'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1567863825744-5a2ec56ba979?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1468359601543-843bfaef291a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1567430688043-5c8f7f9a4889?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1600177897995-e67c73ed44e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            ],
            tags: ['Festa Junina', 'Cultura Brasileira', 'Dança', 'Comidas Típicas', 'Tradição'],
            comments: [
                {
                    author: 'Maria Silva',
                    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
                    date: '21 de Junho, 2025',
                    text: 'Foi uma festa maravilhosa! Meus filhos amaram participar da quadrilha.'
                },
                {
                    author: 'João Pereira',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    date: '22 de Junho, 2025',
                    text: 'Parabéns à organização! As comidas estavam deliciosas e as apresentações foram incríveis.'
                }
            ]
        },
        2: {
            title: 'Alunos Premiados na Olimpíada de Matemática',
            category: 'Acadêmico',
            date: '15 de Maio, 2025',
            author: 'Prof. Matemática',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            description: `
                <p>Temos o prazer de anunciar que cinco estudantes da nossa escola receberam medalhas na Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP). Este resultado excepcional destaca o excelente trabalho pedagógico realizado por nossos professores e o empenho dos alunos.</p>
                <p>Os alunos premiados são:</p>
                <ul>
                    <li>Ana Beatriz Santos - Medalha de Ouro (9º ano)</li>
                    <li>Pedro Henrique Lima - Medalha de Prata (8º ano)</li>
                    <li>Juliana Ferreira - Medalha de Prata (7º ano)</li>
                    <li>Rafael Costa - Medalha de Bronze (9º ano)</li>
                    <li>Mariana Oliveira - Medalha de Bronze (6º ano)</li>
                </ul>
                <p>Os estudantes se prepararam durante todo o ano, participando do grupo de estudos avançados em matemática coordenado pelo professor Carlos Alberto.</p>
                <p>A premiação acontecerá no dia 30 de maio, no auditório da Secretaria de Educação. Toda a comunidade escolar está convidada para prestigiar nossos jovens matemáticos!</p>`,
            gallery: [
                'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            ],
            tags: ['Olimpíada de Matemática', 'OBMEP', 'Premiação', 'Medalhas', 'Excelência Acadêmica'],
            comments: [
                {
                    author: 'Sandra Rodrigues',
                    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
                    date: '16 de Maio, 2025',
                    text: 'Parabéns a todos os alunos! Minha filha Ana está super orgulhosa da medalha de ouro!'
                }
            ]
        },
        // Outros posts seriam adicionados aqui
    };
    
    // Abrir modal com detalhes do post
    postLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('data-post-id');
            const postData = postsData[postId];
            
            if (postData) {
                // Gerar galeria de imagens
                let galleryHTML = '';
                if (postData.gallery && postData.gallery.length > 0) {
                    galleryHTML = `
                        <div class="post-modal-gallery">
                            ${postData.gallery.map((img, index) => `
                                <img src="${img}" alt="${postData.title} - Imagem ${index + 1}" data-index="${index}" class="gallery-img">
                            `).join('')}
                        </div>
                    `;
                }
                
                // Gerar tags
                let tagsHTML = '';
                if (postData.tags && postData.tags.length > 0) {
                    tagsHTML = `
                        <div class="post-modal-tags">
                            ${postData.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                        </div>
                    `;
                }
                
                // Gerar comentários
                let commentsHTML = '';
                if (postData.comments && postData.comments.length > 0) {
                    commentsHTML = `
                        <div class="post-comments">
                            <h3>Comentários (${postData.comments.length})</h3>
                            ${postData.comments.map(comment => `
                                <div class="comment-item">
                                    <div class="comment-avatar">
                                        <img src="${comment.avatar}" alt="${comment.author}">
                                    </div>
                                    <div class="comment-content">
                                        <h4 class="comment-author">${comment.author}</h4>
                                        <div class="comment-date">${comment.date}</div>
                                        <p class="comment-text">${comment.text}</p>
                                        <div class="comment-reply">
                                            <i class="fas fa-reply"></i> Responder
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            
                            <div class="comment-form">
                                <h4>Deixe um comentário</h4>
                                <form id="commentForm">
                                    <div class="form-group">
                                        <label for="name">Nome</label>
                                        <input type="text" id="name" name="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">E-mail</label>
                                        <input type="email" id="email" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">Comentário</label>
                                        <textarea id="message" name="message" required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Enviar Comentário</button>
                                </form>
                            </div>
                        </div>
                    `;
                }
                
                // Conteúdo completo do modal
                const modalContent = `
                    <div class="post-modal-header">
                        <img src="${postData.image}" alt="${postData.title}">
                        <div class="post-modal-badge">${postData.category}</div>
                    </div>
                    <div class="post-modal-content">
                        <h2>${postData.title}</h2>
                        <div class="post-modal-meta">
                            <span><i class="far fa-calendar"></i> ${postData.date}</span>
                            <span><i class="far fa-user"></i> ${postData.author}</span>
                            <span><i class="far fa-folder"></i> ${postData.category}</span>
                            <span><i class="far fa-comments"></i> ${postData.comments ? postData.comments.length : 0} Comentários</span>
                        </div>
                        <div class="post-modal-description">
                            ${postData.description}
                        </div>
                        ${galleryHTML}
                        ${tagsHTML}
                        <div class="post-modal-share">
                            <span class="share-title">Compartilhar:</span>
                            <div class="social-share">
                                <a href="#" aria-label="Compartilhar no Facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Compartilhar no Twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Compartilhar no WhatsApp"><i class="fab fa-whatsapp"></i></a>
                                <a href="#" aria-label="Compartilhar no LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                                <a href="#" aria-label="Compartilhar por E-mail"><i class="far fa-envelope"></i></a>
                            </div>
                        </div>
                        ${commentsHTML}
                    </div>
                `;
                
                // Inserir conteúdo no modal
                modalBody.innerHTML = modalContent;
                
                // Exibir o modal
                postModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Previne rolagem enquanto o modal está aberto
                
                // Configurar visualizador de imagens em tela cheia
                setupGalleryViewer();
                
                // Configurar formulário de comentários
                setupCommentForm();
            }
        });
    });
    
    // Fechar modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === postModal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && postModal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        postModal.classList.remove('show');
        document.body.style.overflow = ''; // Restaurar rolagem
        
        // Remover visualizador de imagens em tela cheia se estiver aberto
        const fullscreenContainer = document.querySelector('.fullscreen-image');
        if (fullscreenContainer) {
            document.body.removeChild(fullscreenContainer);
        }
    }
    
    // Configurar visualizador de imagens em tela cheia
    function setupGalleryViewer() {
        const galleryImages = document.querySelectorAll('.gallery-img');
        if (galleryImages.length === 0) return;
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const currentIndex = parseInt(this.dataset.index);
                const images = Array.from(galleryImages).map(img => img.src);
                
                createFullscreenViewer(images, currentIndex);
            });
        });
    }
    
    // Criar visualizador de imagens em tela cheia
    function createFullscreenViewer(images, startIndex) {
        // Remover instância anterior se existir
        const existingViewer = document.querySelector('.fullscreen-image');
        if (existingViewer) {
            document.body.removeChild(existingViewer);
        }
        
        // Criar container
        const fullscreenContainer = document.createElement('div');
        fullscreenContainer.className = 'fullscreen-image';
        
        // Criar botões de navegação
        const prevButton = document.createElement('div');
        prevButton.className = 'fullscreen-nav prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextButton = document.createElement('div');
        nextButton.className = 'fullscreen-nav next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        // Criar botão de fechar
        const closeButton = document.createElement('div');
        closeButton.className = 'fullscreen-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        // Criar container de controles
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'fullscreen-controls';
        controlsContainer.appendChild(prevButton);
        controlsContainer.appendChild(nextButton);
        
        // Criar imagem principal
        const mainImage = document.createElement('img');
        mainImage.src = images[startIndex];
        
        // Adicionar tudo ao container
        fullscreenContainer.appendChild(closeButton);
        fullscreenContainer.appendChild(mainImage);
        fullscreenContainer.appendChild(controlsContainer);
        
        // Adicionar ao body
        document.body.appendChild(fullscreenContainer);
        
        // Ativar viewer após pequeno delay para permitir animação
        setTimeout(() => {
            fullscreenContainer.classList.add('active');
        }, 50);
        
        // Variáveis para controle
        let currentIndex = startIndex;
        
        // Função para trocar imagem
        function changeImage(index) {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            
            currentIndex = index;
            mainImage.src = images[currentIndex];
        }
        
        // Eventos de navegação
        prevButton.addEventListener('click', () => changeImage(currentIndex - 1));
        nextButton.addEventListener('click', () => changeImage(currentIndex + 1));
        closeButton.addEventListener('click', () => {
            fullscreenContainer.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(fullscreenContainer);
            }, 300);
        });
        
        // Navegar com teclado
        document.addEventListener('keydown', function navigationHandler(e) {
            if (!fullscreenContainer.classList.contains('active')) {
                document.removeEventListener('keydown', navigationHandler);
                return;
            }
            
            if (e.key === 'ArrowLeft') changeImage(currentIndex - 1);
            if (e.key === 'ArrowRight') changeImage(currentIndex + 1);
            if (e.key === 'Escape') {
                fullscreenContainer.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(fullscreenContainer);
                }, 300);
            }
        });
    }
    
    // Configurar formulário de comentários
    function setupCommentForm() {
        const commentForm = document.getElementById('commentForm');
        if (!commentForm) return;
        
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Em um caso real, enviaríamos para um servidor
            console.log('Novo comentário:', { name, email, message });
            
            // Feedback visual (simulação)
            const commentsList = document.querySelector('.post-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="comment-avatar">
                    <img src="https://ui-avatars.com/api/?name=${name}&background=random" alt="${name}">
                </div>
                <div class="comment-content">
                    <h4 class="comment-author">${name}</h4>
                    <div class="comment-date">Agora mesmo</div>
                    <p class="comment-text">${message}</p>
                    <div class="comment-reply">
                        <i class="fas fa-reply"></i> Responder
                    </div>
                </div>
            `;
            
            // Inserir novo comentário
            const commentFormDiv = document.querySelector('.comment-form');
            commentsList.insertBefore(newComment, commentFormDiv);
            
            // Limpar formulário
            this.reset();
            
            // Mensagem de sucesso
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Comentário enviado com sucesso!';
            
            commentFormDiv.insertBefore(successMessage, commentForm);
            
            // Remover mensagem após alguns segundos
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    commentFormDiv.removeChild(successMessage);
                }, 300);
            }, 3000);
        });
    }
});