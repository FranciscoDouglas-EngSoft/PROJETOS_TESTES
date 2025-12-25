/**
 * Script para o leitor digital - Biblioteca Escolar
 * Implementa a funcionalidade de navegação, anotações e interações do leitor digital
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o leitor digital
    const leitorDigital = {
        init: function() {
            this.configurarNavegacao();
            this.configurarZoom();
            this.configurarAnotacoes();
            this.configurarModalExercicio();
            this.configurarDropdowns();
            this.configurarMenuMobile();
            this.configurarVisaoLeitor();
        },

        configurarNavegacao: function() {
            const btnAnterior = document.querySelector('.nav-btn.prev');
            const btnProximo = document.querySelector('.nav-btn.next');
            const currentPage = document.getElementById('currentPage');
            const totalPages = document.getElementById('totalPages');
            const pageSlider = document.getElementById('pageSlider');
            
            if (btnAnterior && btnProximo && currentPage && totalPages && pageSlider) {
                // Configurar slider
                pageSlider.setAttribute('max', totalPages.textContent);
                pageSlider.setAttribute('value', currentPage.textContent);
                
                // Botão página anterior
                btnAnterior.addEventListener('click', function() {
                    let pagina = parseInt(currentPage.textContent);
                    if (pagina > 1) {
                        pagina--;
                        currentPage.textContent = pagina;
                        pageSlider.value = pagina;
                        leitorDigital.mudarPagina(pagina);
                    }
                });
                
                // Botão próxima página
                btnProximo.addEventListener('click', function() {
                    let pagina = parseInt(currentPage.textContent);
                    let total = parseInt(totalPages.textContent);
                    if (pagina < total) {
                        pagina++;
                        currentPage.textContent = pagina;
                        pageSlider.value = pagina;
                        leitorDigital.mudarPagina(pagina);
                    }
                });
                
                // Controle pelo slider
                pageSlider.addEventListener('input', function() {
                    const pagina = parseInt(this.value);
                    currentPage.textContent = pagina;
                    leitorDigital.mudarPagina(pagina);
                });
            }
        },
        
        mudarPagina: function(numeroPagina) {
            // Implementação para mudar a página atual
            // Aqui carregaria a nova imagem da página do livro
            console.log(`Alterando para página ${numeroPagina}`);
            
            // Exemplo: simular mudança da imagem da página
            const pageImage = document.querySelector('.page-image');
            if (pageImage) {
                // Em um ambiente real, isso carregaria a imagem correspondente à página
                // pageImage.src = `./source/img/livros/pagina-${numeroPagina}.jpg`;
                
                // Atualizar o sumário para refletir a página atual
                this.atualizarSumario(numeroPagina);
            }
        },
        
        atualizarSumario: function(pagina) {
            // Atualizar o estado visual do sumário com base na página atual
            // Por exemplo, marcar o item atual do sumário
            const tocItems = document.querySelectorAll('.toc-item, .toc-subitem');
            
            // Simular lógica para determinar o capítulo atual
            let capituloAtual = null;
            if (pagina >= 1 && pagina <= 20) capituloAtual = 'Capítulo 1';
            else if (pagina >= 21 && pagina <= 40) capituloAtual = 'Capítulo 2';
            else if (pagina >= 41 && pagina <= 80) capituloAtual = 'Capítulo 3';
            else if (pagina >= 81 && pagina <= 100) capituloAtual = 'Capítulo 4';
            else capituloAtual = 'Exercícios';
            
            // Atualizar classes CSS
            tocItems.forEach(item => {
                item.classList.remove('current');
                const itemText = item.textContent;
                
                if (itemText.includes(capituloAtual) || 
                    (capituloAtual === 'Capítulo 3' && pagina >= 45 && pagina <= 55 && itemText.includes('3.2 Equações'))) {
                    item.classList.add('current');
                }
            });
        },

        configurarZoom: function() {
            const zoomInBtn = document.querySelector('.zoom-btn[title="Aumentar zoom"]');
            const zoomOutBtn = document.querySelector('.zoom-btn[title="Diminuir zoom"]');
            const zoomLevel = document.querySelector('.zoom-level');
            const bookPage = document.querySelector('.book-page');
            
            if (zoomInBtn && zoomOutBtn && zoomLevel && bookPage) {
                // Valores de zoom
                let currentZoom = 100;
                const zoomStep = 10;
                const maxZoom = 200;
                const minZoom = 70;
                
                // Aumentar zoom
                zoomInBtn.addEventListener('click', function() {
                    if (currentZoom < maxZoom) {
                        currentZoom += zoomStep;
                        leitorDigital.aplicarZoom(currentZoom, bookPage, zoomLevel);
                    }
                });
                
                // Diminuir zoom
                zoomOutBtn.addEventListener('click', function() {
                    if (currentZoom > minZoom) {
                        currentZoom -= zoomStep;
                        leitorDigital.aplicarZoom(currentZoom, bookPage, zoomLevel);
                    }
                });
            }
        },
        
        aplicarZoom: function(zoomValue, element, zoomLabel) {
            // Aplicar zoom ao elemento
            element.style.transform = `scale(${zoomValue / 100})`;
            zoomLabel.textContent = `${zoomValue}%`;
        },

        configurarAnotacoes: function() {
            // Áreas de anotações no livro
            const noteAreas = document.querySelectorAll('.note-area');
            const noteModal = document.getElementById('noteModal');
            const closeButtons = document.querySelectorAll('.modal-close');
            const modalBtns = document.querySelectorAll('.modal-footer .btn');
            
            // Abrir modal de anotação ao clicar em área de anotação
            if (noteAreas.length > 0 && noteModal) {
                noteAreas.forEach(area => {
                    area.addEventListener('click', function() {
                        noteModal.style.display = 'block';
                    });
                });
            }
            
            // Fechar modais
            if (closeButtons.length > 0) {
                closeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const modal = this.closest('.note-modal, .exercise-modal');
                        if (modal) {
                            modal.style.display = 'none';
                        }
                    });
                });
            }
            
            // Botões de salvar/cancelar anotação
            if (modalBtns.length > 0) {
                modalBtns.forEach(button => {
                    button.addEventListener('click', function() {
                        const modal = this.closest('.note-modal, .exercise-modal');
                        if (modal) {
                            modal.style.display = 'none';
                            
                            // Se for o botão salvar, processar a anotação
                            if (this.classList.contains('btn-primary')) {
                                leitorDigital.salvarAnotacao(modal);
                            }
                        }
                    });
                });
            }
            
            // Configurar editor de texto
            this.configurarEditorTexto();
        },
        
        salvarAnotacao: function(modal) {
            // Implementar lógica para salvar a anotação
            console.log('Anotação salva!');
            
            // Em um ambiente real, isso enviaria a anotação para o servidor
            // e atualizaria a interface com a nova anotação
            
            // Pegar o texto da anotação
            const textArea = modal.querySelector('.note-textarea');
            if (textArea) {
                const textoAnotacao = textArea.value;
                
                // Adicionar a anotação à lista (simulado)
                if (textoAnotacao.trim() !== '') {
                    console.log('Texto da anotação:', textoAnotacao);
                }
            }
        },
        
        configurarEditorTexto: function() {
            const formatButtons = document.querySelectorAll('.format-btn');
            const textArea = document.querySelector('.note-textarea');
            
            if (formatButtons.length > 0 && textArea) {
                formatButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Simular formatação de texto (em um editor real, usaríamos execCommand ou uma biblioteca de edição)
                        console.log('Aplicar formatação:', this.getAttribute('title'));
                    });
                });
                
                // Configurar botões de cores
                const colorButtons = document.querySelectorAll('.color-btn');
                colorButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Simular aplicação de cor ao texto
                        console.log('Aplicar cor:', this.style.backgroundColor);
                    });
                });
            }
        },

        configurarModalExercicio: function() {
            // Simular abertura de exercício interativo
            // Em uma implementação real, isso seria acionado por gatilhos no livro
            setTimeout(() => {
                const exerciseModal = document.getElementById('exerciseModal');
                if (exerciseModal) {
                    // Para fins de demonstração, comentamos esta linha para não abrir automaticamente
                    // exerciseModal.style.display = 'block';
                }
            }, 10000); // Mostrar após 10 segundos (apenas para demonstração)
            
            // Configurar opções de resposta
            const optionContainers = document.querySelectorAll('.option-container');
            if (optionContainers.length > 0) {
                optionContainers.forEach(container => {
                    container.addEventListener('click', function() {
                        // Marcar o input
                        const input = this.querySelector('input');
                        if (input) {
                            input.checked = true;
                        }
                    });
                });
            }
            
            // Configurar verificação de respostas
            const btnVerificar = document.querySelector('#exerciseModal .btn-primary');
            if (btnVerificar) {
                btnVerificar.addEventListener('click', function() {
                    const selectedOption = document.querySelector('input[name="answer"]:checked');
                    if (selectedOption) {
                        // Verificar resposta (simulado)
                        console.log('Resposta selecionada:', selectedOption.value);
                        
                        // Fechar modal após verificação
                        const modal = this.closest('.exercise-modal');
                        if (modal) {
                            modal.style.display = 'none';
                        }
                    } else {
                        alert('Por favor, selecione uma resposta!');
                    }
                });
            }
        },

        configurarDropdowns: function() {
            // Configurar dropdown de usuário
            const userButton = document.querySelector('.user-btn');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            
            if (userButton && dropdownMenu) {
                userButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                });
                
                // Fechar dropdown quando clicar fora
                document.addEventListener('click', function(e) {
                    if (!userButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
                        dropdownMenu.style.display = 'none';
                    }
                });
            }
        },

        configurarMenuMobile: function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const dashboardBody = document.querySelector('.dashboard-body');
            
            if (menuToggle && dashboardBody) {
                menuToggle.addEventListener('click', function() {
                    dashboardBody.classList.toggle('sidebar-collapsed');
                });
            }
        },

        configurarVisaoLeitor: function() {
            // Configurar botões de visualização
            const viewButtons = document.querySelectorAll('.view-btn');
            const readerView = document.querySelector('.reader-view');
            
            if (viewButtons.length > 0 && readerView) {
                viewButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Remover classe ativa de todos os botões
                        viewButtons.forEach(btn => btn.classList.remove('active'));
                        
                        // Adicionar classe ativa ao botão clicado
                        this.classList.add('active');
                        
                        // Implementar lógica de visualização
                        const title = this.getAttribute('title');
                        
                        if (title.includes('página única')) {
                            readerView.classList.remove('double-page');
                            readerView.classList.add('single-page');
                        } else if (title.includes('duas páginas')) {
                            readerView.classList.remove('single-page');
                            readerView.classList.add('double-page');
                        } else if (title.includes('tela cheia')) {
                            // Entrar no modo tela cheia
                            if (document.documentElement.requestFullscreen) {
                                document.documentElement.requestFullscreen();
                            } else if (document.documentElement.webkitRequestFullscreen) {
                                document.documentElement.webkitRequestFullscreen();
                            }
                        }
                    });
                });
            }
        }
    };

    // Inicializar o leitor digital
    leitorDigital.init();
});