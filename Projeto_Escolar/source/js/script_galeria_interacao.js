document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && isValidEmail(email)) {
                // Em um caso real, enviaríamos para um servidor
                console.log('Novo inscrito na newsletter:', email);
                
                // Criar mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Inscrição realizada com sucesso! Você receberá nossas novidades no e-mail ${email}.</p>
                `;
                
                // Substituir formulário pela mensagem
                const newsletterContent = document.querySelector('.newsletter-content');
                newsletterForm.style.opacity = '0';
                
                setTimeout(() => {
                    newsletterContent.replaceChild(successMessage, newsletterForm);
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                    }, 100);
                }, 300);
            } else {
                // Destacar campo com erro
                emailInput.classList.add('error');
                emailInput.placeholder = 'Por favor, insira um e-mail válido';
                
                // Remover classe de erro quando o usuário corrigir
                emailInput.addEventListener('focus', function() {
                    this.classList.remove('error');
                    this.placeholder = 'Seu e-mail';
                }, { once: true });
            }
        });
    }
    
    // Validação de e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Compartilhamento em redes sociais
    document.addEventListener('click', function(e) {
        if (e.target.closest('.social-share a')) {
            e.preventDefault();
            
            const shareLink = e.target.closest('.social-share a');
            const network = shareLink.getAttribute('aria-label').toLowerCase();
            
            // Obter informações da página atual
            const pageUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);
            const modalTitle = document.querySelector('.post-modal-content h2');
            const shareTitle = modalTitle ? encodeURIComponent(modalTitle.textContent) : pageTitle;
            
            // URLs para compartilhamento
            let shareUrl = '';
            
            if (network.includes('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            } else if (network.includes('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareTitle}`;
            } else if (network.includes('whatsapp')) {
                shareUrl = `https://api.whatsapp.com/send?text=${shareTitle}%20${pageUrl}`;
            } else if (network.includes('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            } else if (network.includes('e-mail')) {
                shareUrl = `mailto:?subject=${shareTitle}&body=${pageUrl}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        }
    });
    
    // Contador de estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationsStarted = false;
    
    if (statNumbers.length > 0) {
        const startCounting = function() {
            if (!animationsStarted) {
                statNumbers.forEach(stat => {
                    const targetValue = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const step = targetValue / (duration / 16); // 16ms é aproximadamente 1 frame em 60fps
                    
                    let current = 0;
                    const counter = setInterval(() => {
                        current += step;
                        stat.textContent = Math.floor(current);
                        
                        if (current >= targetValue) {
                            stat.textContent = targetValue.toLocaleString();
                            clearInterval(counter);
                        }
                    }, 16);
                });
                
                animationsStarted = true;
            }
        };
        
        // Iniciar contagem quando os elementos entrarem na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationsStarted) {
                    startCounting();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statNumbers[0].parentElement);
    }
    
    // Botões de categoria interativos
    const categoryTiles = document.querySelectorAll('.category-tile');
    
    categoryTiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon i');
            
            // Animação simples
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            
            // Voltar ao normal após um breve período
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
    
    // Efeito de hover nos posts do Instagram
    const instaItems = document.querySelectorAll('.insta-item');
    
    instaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Adicionar efeito de pulsar no ícone
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse 0.6s infinite alternate';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Remover efeito ao sair
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // Botões de tag interativos
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('post-tag')) {
            e.preventDefault();
            
            const tag = e.target.textContent.toLowerCase();
            
            // Em um caso real, isto redirecionaria para uma busca por tag
            // Por enquanto, vamos apenas imprimir a tag clicada
            console.log('Tag clicada:', tag);
            
            // Efeito visual de seleção
            e.target.classList.add('active');
            
            setTimeout(() => {
                e.target.classList.remove('active');
            }, 500);
        }
    });
    
    // Respostas aos comentários
    document.addEventListener('click', function(e) {
        if (e.target.closest('.comment-reply')) {
            e.preventDefault();
            
            const replyBtn = e.target.closest('.comment-reply');
            const commentItem = replyBtn.closest('.comment-item');
            const commentAuthor = commentItem.querySelector('.comment-author').textContent;
            
            // Verificar se já existe um formulário de resposta
            const existingForm = document.querySelector('.reply-form');
            if (existingForm) {
                existingForm.remove();
            }
            
            // Criar formulário de resposta
            const replyForm = document.createElement('div');
            replyForm.className = 'reply-form';
            replyForm.innerHTML = `
                <form>
                    <div class="form-group">
                        <input type="text" placeholder="Nome" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Responder para ${commentAuthor}..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-cancel">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </div>
                </form>
            `;
            
            // Inserir após o comentário
            commentItem.insertAdjacentElement('afterend', replyForm);
            
            // Focar no campo de texto
            setTimeout(() => {
                replyForm.querySelector('textarea').focus();
            }, 100);
            
            // Cancelar resposta
            replyForm.querySelector('.btn-cancel').addEventListener('click', function() {
                replyForm.remove();
            });
            
            // Enviar resposta (simulação)
            replyForm.querySelector('form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = this.querySelector('input').value;
                const message = this.querySelector('textarea').value;
                
                // Criar resposta
                const replyComment = document.createElement('div');
                replyComment.className = 'comment-item reply';
                replyComment.innerHTML = `
                    <div class="comment-avatar">
                        <img src="https://ui-avatars.com/api/?name=${name}&background=random" alt="${name}">
                    </div>
                    <div class="comment-content">
                        <h4 class="comment-author">${name}</h4>
                        <div class="comment-date">Agora mesmo</div>
                        <p class="comment-text"><span class="reply-to">@${commentAuthor}</span> ${message}</p>
                        <div class="comment-reply">
                            <i class="fas fa-reply"></i> Responder
                        </div>
                    </div>
                `;
                
                // Inserir resposta e remover formulário
                commentItem.insertAdjacentElement('afterend', replyComment);
                replyForm.remove();
            });
        }
    });
});