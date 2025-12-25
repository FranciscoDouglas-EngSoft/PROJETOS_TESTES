document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburguer
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
            if (navMenu) {
                navMenu.classList.remove('active');
                if (menuBtn) {
                    menuBtn.classList.remove('change');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Adicionar classe active ao link de menu atual
    function setActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveMenu);
    
    // Animação de rolagem suave para âncoras
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

    // Validação do formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulação de envio de formulário
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

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

    // Animação de estatísticas - CORRIGIDO
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationsStarted = false;
    
    if (statNumbers.length > 0) {
        // Função para animar contagem
        function animateCountUp(element) {
            // Obter os valores dos atributos data
            const finalValue = parseInt(element.getAttribute('data-value')) || 0;
            const suffix = element.getAttribute('data-suffix') || '';
            
            // Iniciar a contagem em 0
            let startValue = 0;
            element.textContent = startValue + suffix;
            
            // Configuração da animação
            const duration = 2000;
            const step = Math.ceil(finalValue / (duration / 20));
            
            const counter = setInterval(() => {
                startValue += step;
                
                if (startValue >= finalValue) {
                    startValue = finalValue;
                    clearInterval(counter);
                }
                
                element.textContent = startValue + suffix;
            }, 20);
        }
        
        // Observer para iniciar animação quando o elemento está visível
        const observer = new IntersectionObserver((entries) => {
            if (animationsStarted) return; // Evitar iniciar as animações mais de uma vez
            
            const isIntersecting = entries.some(entry => entry.isIntersecting);
            
            if (isIntersecting) {
                statNumbers.forEach(stat => {
                    animateCountUp(stat);
                });
                animationsStarted = true;
                observer.disconnect(); // Parar de observar após iniciar as animações
            }
        }, { threshold: 0.5 });
        
        // Observar o container das estatísticas ao invés de cada número individualmente
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    }

    // Revelar elementos durante o scroll
    const revealElements = document.querySelectorAll('.micro_cards, .vision-box, .facility-item');
    
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