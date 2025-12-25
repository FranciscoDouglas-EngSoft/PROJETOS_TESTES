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
                        top: targetElement.offsetTop - 100,
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

    // Tab Switcher para Categorias de Cursos
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            
            // Remover classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Filtro de Cursos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            // Filtrar os cursos
            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && toggle) {
            question.addEventListener('click', () => {
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                    }
                });
                
                // Alternar o estado do item atual
                item.classList.toggle('active');
                
                // Alterar o ícone
                const icon = toggle.querySelector('i');
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            });
        }
    });

    // Slider de Professores
    const teacherSlider = document.querySelector('.teachers-slider');
    const prevTeacherBtn = document.getElementById('prevTeacher');
    const nextTeacherBtn = document.getElementById('nextTeacher');
    const teacherDots = document.querySelectorAll('.slider-dots .dot');
    let teacherScrollPosition = 0;
    let teacherDotIndex = 0;

    if (teacherSlider && prevTeacherBtn && nextTeacherBtn) {
        // Definir a largura de scroll com base no tamanho da tela
        const getTeacherScrollWidth = () => {
            if (window.innerWidth < 768) {
                return teacherSlider.scrollWidth;
            } else if (window.innerWidth < 992) {
                return teacherSlider.scrollWidth / 2;
            } else {
                return teacherSlider.scrollWidth / 3;
            }
        };

        prevTeacherBtn.addEventListener('click', () => {
            teacherScrollPosition = Math.max(0, teacherScrollPosition - getTeacherScrollWidth());
            teacherSlider.scrollTo({
                left: teacherScrollPosition,
                behavior: 'smooth'
            });
            updateTeacherDots();
        });

        nextTeacherBtn.addEventListener('click', () => {
            teacherScrollPosition = Math.min(
                teacherSlider.scrollWidth - teacherSlider.clientWidth,
                teacherScrollPosition + getTeacherScrollWidth()
            );
            teacherSlider.scrollTo({
                left: teacherScrollPosition,
                behavior: 'smooth'
            });
            updateTeacherDots();
        });

        // Atualizar os pontos do slider
        function updateTeacherDots() {
            const totalWidth = teacherSlider.scrollWidth - teacherSlider.clientWidth;
            const progress = teacherScrollPosition / totalWidth;
            const dotCount = teacherDots.length;
            const newDotIndex = Math.min(dotCount - 1, Math.floor(progress * dotCount));
            
            if (newDotIndex !== teacherDotIndex) {
                teacherDots.forEach(dot => dot.classList.remove('active'));
                teacherDots[newDotIndex].classList.add('active');
                teacherDotIndex = newDotIndex;
            }
        }

        // Clicar nos pontos do slider
        teacherDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const totalWidth = teacherSlider.scrollWidth - teacherSlider.clientWidth;
                teacherScrollPosition = (index / (teacherDots.length - 1)) * totalWidth;
                
                teacherSlider.scrollTo({
                    left: teacherScrollPosition,
                    behavior: 'smooth'
                });
                
                teacherDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                teacherDotIndex = index;
            });
        });
    }

    // Slider de Depoimentos
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonials-slider + .slider-controls .dot');
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;

    if (testimonialSlides.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        function showTestimonial(index) {
            // Garantir que o índice está dentro dos limites
            if (index < 0) index = testimonialSlides.length - 1;
            if (index >= testimonialSlides.length) index = 0;
            
            // Esconder todos os slides
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            
            // Mostrar o slide atual
            testimonialSlides[index].classList.add('active');
            
            // Atualizar os pontos
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            
            currentTestimonial = index;
        }

        prevTestimonialBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });

        nextTestimonialBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });

        // Clicar nos pontos do slider
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Auto-play para os depoimentos
        let testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);

        // Parar o auto-play quando o mouse estiver sobre o slider
        const testimonialContainer = document.querySelector('.testimonials-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialContainer.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(() => {
                    showTestimonial(currentTestimonial + 1);
                }, 5000);
            });
        }
    }

    // Função para animações de scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.section-header, .feature-card, .how-step, .course-card, .teacher-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar a opacidade e transformação para animação
    document.querySelectorAll('.section-header, .feature-card, .how-step, .course-card, .teacher-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Adicionar evento de scroll para animar elementos
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
});