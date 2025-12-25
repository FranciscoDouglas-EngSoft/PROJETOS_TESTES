document.addEventListener('DOMContentLoaded', function() {
    // Dados dos professores
    const professores = [
        {
            id: 1,
            nome: "Ana Silva",
            cargo: "Professora de Português",
            foto: "https://randomuser.me/api/portraits/women/1.jpg",
            area: "fundamental2",
            disciplinas: ["Português", "Literatura", "Redação"],
            formacao: "Licenciatura em Letras",
            experiencia: "12 anos",
            email: "ana.silva@escola.com",
            bio: "Especialista em literatura brasileira, Ana desenvolve projetos de incentivo à leitura e escrita criativa. Seu método de ensino combina técnicas tradicionais com abordagens inovadoras."
        },
        {
            id: 2,
            nome: "Carlos Oliveira",
            cargo: "Professor de Matemática",
            foto: "https://randomuser.me/api/portraits/men/2.jpg",
            area: "fundamental2",
            disciplinas: ["Matemática", "Geometria", "Estatística"],
            formacao: "Mestrado em Matemática",
            experiencia: "8 anos",
            email: "carlos.oliveira@escola.com",
            bio: "Carlos transforma conceitos matemáticos complexos em aprendizados práticos e divertidos. Utiliza jogos e tecnologia para despertar o interesse dos alunos pela matemática."
        },
        {
            id: 3,
            nome: "Mariana Costa",
            cargo: "Professora de História",
            foto: "https://randomuser.me/api/portraits/women/3.jpg",
            area: "fundamental2",
            disciplinas: ["História", "Geografia", "Estudos Sociais"],
            formacao: "Doutorado em História",
            experiencia: "15 anos",
            email: "mariana.costa@escola.com",
            bio: "Especialista em História do Brasil, Mariana trabalha com metodologias ativas que estimulam o pensamento crítico. Organiza visitas a museus e sítios históricos para enriquecer o aprendizado."
        },
        {
            id: 4,
            nome: "Pedro Santos",
            cargo: "Professor de Ciências",
            foto: "https://randomuser.me/api/portraits/men/4.jpg",
            area: "fundamental2",
            disciplinas: ["Ciências", "Biologia", "Educação Ambiental"],
            formacao: "Licenciatura em Biologia",
            experiencia: "10 anos",
            email: "pedro.santos@escola.com",
            bio: "Pedro desenvolve experimentos práticos que despertam a curiosidade científica. Coordena projetos de sustentabilidade e educação ambiental na escola."
        },
        {
            id: 5,
            nome: "Luísa Mendes",
            cargo: "Professora do 5º ano",
            foto: "https://randomuser.me/api/portraits/women/5.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia",
            experiencia: "9 anos",
            email: "luisa.mendes@escola.com",
            bio: "Especialista em alfabetização e letramento, Luísa adapta suas aulas para atender diferentes estilos de aprendizagem. Trabalha com projetos interdisciplinares que estimulam a criatividade."
        },
        {
            id: 6,
            nome: "Roberto Alves",
            cargo: "Professor de Educação Física",
            foto: "https://randomuser.me/api/portraits/men/6.jpg",
            area: "especiais",
            disciplinas: ["Educação Física", "Esportes Coletivos", "Jogos Recreativos"],
            formacao: "Licenciatura em Educação Física",
            experiencia: "7 anos",
            email: "roberto.alves@escola.com",
            bio: "Roberto promove a importância da atividade física para a saúde e bem-estar. Organiza torneios e atividades que desenvolvem o espírito de equipe e cooperação."
        },
        {
            id: 7,
            nome: "Juliana Ferreira",
            cargo: "Professora de Artes",
            foto: "https://randomuser.me/api/portraits/women/7.jpg",
            area: "especiais",
            disciplinas: ["Artes Visuais", "Música", "Teatro"],
            formacao: "Licenciatura em Artes",
            experiencia: "11 anos",
            email: "juliana.ferreira@escola.com",
            bio: "Juliana estimula a expressão artística e a criatividade dos alunos. Organiza exposições e apresentações que valorizam a produção cultural dos estudantes."
        },
        {
            id: 8,
            nome: "Ricardo Nunes",
            cargo: "Professor de Inglês",
            foto: "https://randomuser.me/api/portraits/men/8.jpg",
            area: "especiais",
            disciplinas: ["Inglês", "Conversação", "Cultura Inglesa"],
            formacao: "Licenciatura em Letras - Inglês",
            experiencia: "6 anos",
            email: "ricardo.nunes@escola.com",
            bio: "Ricardo utiliza tecnologia e recursos audiovisuais para tornar o aprendizado de inglês mais dinâmico. Organiza intercâmbios virtuais com escolas de países anglófonos."
        },
        {
            id: 9,
            nome: "Clara Rodrigues",
            cargo: "Professora do 2º ano",
            foto: "https://randomuser.me/api/portraits/women/9.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia",
            experiencia: "14 anos",
            email: "clara.rodrigues@escola.com",
            bio: "Clara é especialista em desenvolvimento infantil e alfabetização. Utiliza jogos pedagógicos e atividades lúdicas para estimular o aprendizado."
        },
        {
            id: 10,
            nome: "Fernando Lima",
            cargo: "Professor do 4º ano",
            foto: "https://randomuser.me/api/portraits/men/10.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia com especialização em Psicopedagogia",
            experiencia: "8 anos",
            email: "fernando.lima@escola.com",
            bio: "Fernando trabalha com metodologias ativas que colocam o aluno como protagonista do aprendizado. Desenvolve projetos que integram tecnologia e educação."
        },
        {
            id: 11,
            nome: "Beatriz Campos",
            cargo: "Professora de Geografia",
            foto: "https://randomuser.me/api/portraits/women/11.jpg",
            area: "fundamental2",
            disciplinas: ["Geografia", "Estudos Ambientais"],
            formacao: "Licenciatura em Geografia",
            experiencia: "9 anos",
            email: "beatriz.campos@escola.com",
            bio: "Beatriz utiliza mapas interativos e tecnologia para ensinar geografia de forma dinâmica. Desenvolve projetos sobre sustentabilidade e consciência ambiental."
        },
        {
            id: 12,
            nome: "Lucas Martins",
            cargo: "Professor de Informática",
            foto: "https://randomuser.me/api/portraits/men/12.jpg",
            area: "especiais",
            disciplinas: ["Informática", "Programação", "Robótica"],
            formacao: "Ciência da Computação",
            experiencia: "5 anos",
            email: "lucas.martins@escola.com",
            bio: "Lucas introduz conceitos de programação e pensamento computacional desde cedo. Coordena o clube de robótica e participa de competições tecnológicas."
        },
        {
            id: 13,
            nome: "Sofia Pereira",
            cargo: "Professora do 1º ano",
            foto: "https://randomuser.me/api/portraits/women/13.jpg",
            area: "fundamental1",
            disciplinas: ["Alfabetização", "Matemática Básica", "Ciências"],
            formacao: "Pedagogia com especialização em Alfabetização",
            experiencia: "12 anos",
            email: "sofia.pereira@escola.com",
            bio: "Sofia é especialista em alfabetização e letramento. Seu método lúdico e afetuoso facilita a adaptação das crianças à vida escolar."
        },
        {
            id: 14,
            nome: "Gabriel Carvalho",
            cargo: "Professor de Ciências",
            foto: "https://randomuser.me/api/portraits/men/14.jpg",
            area: "fundamental2",
            disciplinas: ["Ciências", "Iniciação Científica"],
            formacao: "Licenciatura em Ciências Biológicas",
            experiencia: "7 anos",
            email: "gabriel.carvalho@escola.com",
            bio: "Gabriel transforma a sala de aula em um laboratório de descobertas. Seus experimentos práticos despertam o interesse pela investigação científica."
        },
        {
            id: 15,
            nome: "Camila Oliveira",
            cargo: "Professora do 3º ano",
            foto: "https://randomuser.me/api/portraits/women/15.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia",
            experiencia: "10 anos",
            email: "camila.oliveira@escola.com",
            bio: "Camila desenvolve atividades que estimulam a autonomia e o pensamento crítico. Trabalha com projetos interdisciplinares que conectam o aprendizado à vida cotidiana."
        },
        {
            id: 16,
            nome: "Rafael Torres",
            cargo: "Professor de Matemática",
            foto: "https://randomuser.me/api/portraits/men/16.jpg",
            area: "fundamental2",
            disciplinas: ["Matemática", "Raciocínio Lógico"],
            formacao: "Licenciatura em Matemática",
            experiencia: "11 anos",
            email: "rafael.torres@escola.com",
            bio: "Rafael utiliza jogos e desafios para tornar a matemática mais acessível e divertida. Desenvolve oficinas de raciocínio lógico e resolução de problemas."
        },
        {
            id: 17,
            nome: "Laura Gomes",
            cargo: "Professora de Literatura",
            foto: "https://randomuser.me/api/portraits/women/17.jpg",
            area: "fundamental2",
            disciplinas: ["Literatura", "Redação Criativa"],
            formacao: "Licenciatura em Letras",
            experiencia: "13 anos",
            email: "laura.gomes@escola.com",
            bio: "Laura cultiva o amor pela leitura através de clubes do livro e contação de histórias. Incentiva a escrita criativa e a expressão pessoal através de projetos literários."
        },
        {
            id: 18,
            nome: "Thiago Sousa",
            cargo: "Professor de Educação Física",
            foto: "https://randomuser.me/api/portraits/men/18.jpg",
            area: "especiais",
            disciplinas: ["Educação Física", "Ginástica", "Natação"],
            formacao: "Licenciatura em Educação Física",
            experiencia: "6 anos",
            email: "thiago.sousa@escola.com",
            bio: "Thiago promove a importância da atividade física para o desenvolvimento integral. Trabalha com uma variedade de modalidades esportivas para atender diferentes interesses."
        },
        {
            id: 19,
            nome: "Natália Lima",
            cargo: "Professora de Música",
            foto: "https://randomuser.me/api/portraits/women/19.jpg",
            area: "especiais",
            disciplinas: ["Música", "Coral", "Instrumentos Musicais"],
            formacao: "Licenciatura em Música",
            experiencia: "9 anos",
            email: "natalia.lima@escola.com",
            bio: "Natália desperta o interesse pela música através de atividades lúdicas e práticas. Coordena o coral da escola e organiza apresentações musicais."
        },
        {
            id: 20,
            nome: "Victor Ramos",
            cargo: "Professor de História",
            foto: "https://randomuser.me/api/portraits/men/20.jpg",
            area: "fundamental2",
            disciplinas: ["História", "Estudos Sociais"],
            formacao: "Licenciatura em História",
            experiencia: "8 anos",
            email: "victor.ramos@escola.com",
            bio: "Victor transforma fatos históricos em narrativas envolventes. Utiliza filmes, documentários e visitas virtuais para enriquecer o aprendizado."
        },
        {
            id: 21,
            nome: "Isabela Castro",
            cargo: "Professora de Artes Visuais",
            foto: "https://randomuser.me/api/portraits/women/21.jpg",
            area: "especiais",
            disciplinas: ["Artes Visuais", "História da Arte"],
            formacao: "Licenciatura em Artes Visuais",
            experiencia: "7 anos",
            email: "isabela.castro@escola.com",
            bio: "Isabela estimula a criatividade e expressão artística. Organiza exposições dos trabalhos dos alunos e visitas virtuais a museus e galerias."
        },
        {
            id: 22,
            nome: "Diego Almeida",
            cargo: "Professor de Inglês",
            foto: "https://randomuser.me/api/portraits/men/22.jpg",
            area: "especiais",
            disciplinas: ["Inglês", "Cultura Americana"],
            formacao: "Licenciatura em Letras - Inglês",
            experiencia: "10 anos",
            email: "diego.almeida@escola.com",
            bio: "Diego torna o aprendizado de inglês prático e contextualizado. Utiliza músicas, filmes e jogos para ensinar o idioma de forma natural e divertida."
        },
        {
            id: 23,
            nome: "Renata Dias",
            cargo: "Professora de Geografia",
            foto: "https://randomuser.me/api/portraits/women/23.jpg",
            area: "fundamental2",
            disciplinas: ["Geografia", "Cartografia"],
            formacao: "Licenciatura em Geografia",
            experiencia: "11 anos",
            email: "renata.dias@escola.com",
            bio: "Renata relaciona a geografia com questões contemporâneas. Trabalha com mapas interativos e tecnologia para tornar a disciplina mais dinâmica."
        },
        {
            id: 24,
            nome: "André Moreira",
            cargo: "Professor do 5º ano",
            foto: "https://randomuser.me/api/portraits/men/24.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia",
            experiencia: "8 anos",
            email: "andre.moreira@escola.com",
            bio: "André prepara os alunos para a transição ao Ensino Fundamental II. Desenvolve projetos que estimulam a autonomia e o pensamento crítico."
        },
        {
            id: 25,
            nome: "Paula Ribeiro",
            cargo: "Professora de Português",
            foto: "https://randomuser.me/api/portraits/women/25.jpg",
            area: "fundamental2",
            disciplinas: ["Português", "Gramática", "Produção Textual"],
            formacao: "Licenciatura em Letras",
            experiencia: "14 anos",
            email: "paula.ribeiro@escola.com",
            bio: "Paula desenvolve projetos de leitura e escrita que estimulam a expressão pessoal. Trabalha com diversos gêneros textuais e literatura brasileira."
        },
        {
            id: 26,
            nome: "Marcos Vieira",
            cargo: "Professor de Informática",
            foto: "https://randomuser.me/api/portraits/men/26.jpg",
            area: "especiais",
            disciplinas: ["Informática Básica", "Cidadania Digital"],
            formacao: "Análise de Sistemas com especialização em Educação",
            experiencia: "6 anos",
            email: "marcos.vieira@escola.com",
            bio: "Marcos ensina tecnologia com foco na cidadania digital. Aborda temas como segurança online, fake news e uso responsável das redes sociais."
        },
        {
            id: 27,
            nome: "Cristina Pinto",
            cargo: "Professora do 2º ano",
            foto: "https://randomuser.me/api/portraits/women/27.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia com especialização em Alfabetização",
            experiencia: "15 anos",
            email: "cristina.pinto@escola.com",
            bio: "Cristina é especialista em alfabetização e numeracia. Utiliza jogos e atividades lúdicas para consolidar a aprendizagem da leitura e escrita."
        },
        {
            id: 28,
            nome: "Henrique Costa",
            cargo: "Professor de Ciências",
            foto: "https://randomuser.me/api/portraits/men/28.jpg",
            area: "fundamental2",
            disciplinas: ["Ciências", "Laboratório"],
            formacao: "Licenciatura em Ciências Biológicas",
            experiencia: "9 anos",
            email: "henrique.costa@escola.com",
            bio: "Henrique transforma conceitos científicos em experiências práticas. Seu laboratório de ciências é um espaço de investigação e descoberta."
        },
        {
            id: 29,
            nome: "Daniela Rocha",
            cargo: "Professora do 1º ano",
            foto: "https://randomuser.me/api/portraits/women/29.jpg",
            area: "fundamental1",
            disciplinas: ["Alfabetização", "Matemática Básica", "Artes"],
            formacao: "Pedagogia",
            experiencia: "11 anos",
            email: "daniela.rocha@escola.com",
            bio: "Daniela cria um ambiente acolhedor para a adaptação das crianças à vida escolar. Utiliza contação de histórias e brincadeiras dirigidas para introduzir a alfabetização."
        },
        {
            id: 30,
            nome: "José Pereira",
            cargo: "Professor de Matemática",
            foto: "https://randomuser.me/api/portraits/men/30.jpg",
            area: "fundamental2",
            disciplinas: ["Matemática", "Geometria"],
            formacao: "Licenciatura em Matemática",
            experiencia: "16 anos",
            email: "jose.pereira@escola.com",
            bio: "José faz conexões entre a matemática e situações do cotidiano. Utiliza desafios e competições matemáticas para estimular o raciocínio lógico."
        },
        {
            id: 31,
            nome: "Fernanda Machado",
            cargo: "Professora do 3º ano",
            foto: "https://randomuser.me/api/portraits/women/31.jpg",
            area: "fundamental1",
            disciplinas: ["Português", "Matemática", "Ciências", "História", "Geografia"],
            formacao: "Pedagogia",
            experiencia: "8 anos",
            email: "fernanda.machado@escola.com",
            bio: "Fernanda trabalha com projetos interdisciplinares que integram diferentes áreas do conhecimento. Estimula a curiosidade e o pensamento investigativo."
        },
        {
            id: 32,
            nome: "Leandro Santos",
            cargo: "Professor de Educação Física",
            foto: "https://randomuser.me/api/portraits/men/32.jpg",
            area: "especiais",
            disciplinas: ["Educação Física", "Jogos Cooperativos"],
            formacao: "Licenciatura em Educação Física",
            experiencia: "7 anos",
            email: "leandro.santos@escola.com",
            bio: "Leandro promove valores como cooperação e fair play através dos esportes. Trabalha com atividades inclusivas que respeitam as habilidades individuais."
        }
    ];

    // Dados dos colaboradores/staff
    const colaboradores = [
        {
            id: 1,
            nome: "Maria Oliveira",
            cargo: "Diretora",
            foto: "https://randomuser.me/api/portraits/women/41.jpg",
            departamento: "direcao",
            contato: "diretoria@escola.com",
            info: "Especialista em Gestão Escolar"
        },
        {
            id: 2,
            nome: "João Silva",
            cargo: "Vice-Diretor",
            foto: "https://randomuser.me/api/portraits/men/42.jpg",
            departamento: "direcao",
            contato: "vicediretoria@escola.com",
            info: "Mestre em Educação"
        },
        {
            id: 3,
            nome: "Carla Souza",
            cargo: "Coordenadora Pedagógica - Ensino Fundamental I",
            foto: "https://randomuser.me/api/portraits/women/43.jpg",
            departamento: "coordenacao",
            contato: "coordenacao.ef1@escola.com",
            info: "Especialista em Alfabetização"
        },
        {
            id: 4,
            nome: "Roberto Almeida",
            cargo: "Coordenador Pedagógico - Ensino Fundamental II",
            foto: "https://randomuser.me/api/portraits/men/44.jpg",
            departamento: "coordenacao",
            contato: "coordenacao.ef2@escola.com",
            info: "Mestre em Gestão Educacional"
        },
        {
            id: 5,
            nome: "Lúcia Santos",
            cargo: "Psicopedagoga",
            foto: "https://randomuser.me/api/portraits/women/45.jpg",
            departamento: "coordenacao",
            contato: "psicopedagogia@escola.com",
            info: "Especialista em Psicopedagogia"
        },
        {
            id: 6,
            nome: "Fernando Costa",
            cargo: "Psicólogo Escolar",
            foto: "https://randomuser.me/api/portraits/men/46.jpg",
            departamento: "coordenacao",
            contato: "psicologia@escola.com",
            info: "CRP 12345"
        },
        {
            id: 7,
            nome: "Amanda Lima",
            cargo: "Secretária Escolar",
            foto: "https://randomuser.me/api/portraits/women/47.jpg",
            departamento: "administrativo",
            contato: "secretaria@escola.com",
            info: "Especialista em Gestão de Documentos Escolares"
        },
        {
            id: 8,
            nome: "Paulo Martins",
            cargo: "Auxiliar Administrativo",
            foto: "https://randomuser.me/api/portraits/men/48.jpg",
            departamento: "administrativo",
            contato: "administrativo@escola.com",
            info: "Bacharel em Administração"
        },
        {
            id: 9,
            nome: "Juliana Rocha",
            cargo: "Bibliotecária",
            foto: "https://randomuser.me/api/portraits/women/49.jpg",
            departamento: "administrativo",
            contato: "biblioteca@escola.com",
            info: "CRB 45678"
        },
        {
            id: 10,
            nome: "Ricardo Ferreira",
            cargo: "Técnico em Informática",
            foto: "https://randomuser.me/api/portraits/men/50.jpg",
            departamento: "administrativo",
            contato: "suporte@escola.com",
            info: "Especialista em Redes e Sistemas"
        },
        {
            id: 11,
            nome: "Beatriz Campos",
            cargo: "Nutricionista",
            foto: "https://randomuser.me/api/portraits/women/51.jpg",
            departamento: "administrativo",
            contato: "nutricao@escola.com",
            info: "CRN 56789"
        },
        {
            id: 12,
            nome: "Antônio Pereira",
            cargo: "Auxiliar de Manutenção",
            foto: "https://randomuser.me/api/portraits/men/52.jpg",
            departamento: "apoio",
            contato: "manutencao@escola.com",
            info: "Técnico em Edificações"
        },
        {
            id: 13,
            nome: "Sandra Ribeiro",
            cargo: "Cozinheira",
            foto: "https://randomuser.me/api/portraits/women/53.jpg",
            departamento: "apoio",
            contato: "cozinha@escola.com",
            info: "Especialista em Alimentação Escolar"
        },
        {
            id: 14,
            nome: "Carlos Gomes",
            cargo: "Porteiro",
            foto: "https://randomuser.me/api/portraits/men/54.jpg",
            departamento: "apoio",
            contato: "portaria@escola.com",
            info: "10 anos de experiência"
        },
        {
            id: 15,
            nome: "Rita Oliveira",
            cargo: "Auxiliar de Limpeza",
            foto: "https://randomuser.me/api/portraits/women/55.jpg",
            departamento: "apoio",
            contato: "servicos.gerais@escola.com",
            info: "8 anos de experiência"
        },
        {
            id: 16,
            nome: "Marcos Dias",
            cargo: "Vigia Noturno",
            foto: "https://randomuser.me/api/portraits/men/56.jpg",
            departamento: "apoio",
            contato: "seguranca@escola.com",
            info: "Formação em Segurança Patrimonial"
        }
    ];

    // Referências a elementos DOM
    const teamColumn1 = document.getElementById('teamColumn1');
    const teamColumn2 = document.getElementById('teamColumn2');
    const teamModal = document.getElementById('teamModal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const teamTabs = document.querySelectorAll('.tab-btn');
    const staffGrid = document.querySelector('.staff-grid');
    const staffTabs = document.querySelectorAll('.staff-tab');
    const paginationDots = document.querySelector('.pagination-dots');
    const prevTeamBtn = document.getElementById('prevTeam');
    const nextTeamBtn = document.getElementById('nextTeam');

    // Variáveis para controle
    let currentArea = 'todos';
    let currentPage = 0;
    let itemsPerPage = 8; // 4 por coluna * 2 colunas
    let currentDepartment = 'all';
    
    // Inicializar a visualização
    initTeamView();
    initStaffView();
    createPaginationDots();

    // Inicializar seção de professores
    function initTeamView() {
        distributeTeamCards(filterProfessores(currentArea), currentPage);
        
        // Adicionar eventos de clique para as tabs
        teamTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const area = this.getAttribute('data-area');
                currentArea = area;
                currentPage = 0;
                
                // Atualizar classe active
                teamTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Atualizar cards
                distributeTeamCards(filterProfessores(area), currentPage);
                createPaginationDots();
            });
        });
        
        // Eventos de paginação
        prevTeamBtn.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                distributeTeamCards(filterProfessores(currentArea), currentPage);
                updatePaginationDots();
            }
        });
        
        nextTeamBtn.addEventListener('click', function() {
            const filteredTeachers = filterProfessores(currentArea);
            const maxPages = Math.ceil(filteredTeachers.length / itemsPerPage);
            
            if (currentPage < maxPages - 1) {
                currentPage++;
                distributeTeamCards(filteredTeachers, currentPage);
                updatePaginationDots();
            }
        });
        
        // Evento para fechar o modal
        modalClose.addEventListener('click', function() {
            teamModal.classList.remove('show');
        });
        
        // Fechar modal ao clicar fora dele
        window.addEventListener('click', function(e) {
            if (e.target === teamModal) {
                teamModal.classList.remove('show');
            }
        });
    }

    // Inicializar seção de colaboradores
    function initStaffView() {
        renderStaffCards(filterColaboradores(currentDepartment));
        
        // Adicionar eventos de clique para as tabs
        staffTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const department = this.getAttribute('data-department');
                currentDepartment = department;
                
                // Atualizar classe active
                staffTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Atualizar cards
                renderStaffCards(filterColaboradores(department));
            });
        });
    }

    // Filtrar professores por área
    function filterProfessores(area) {
        if (area === 'todos') {
            return professores;
        } else {
            return professores.filter(professor => professor.area === area);
        }
    }

    // Filtrar colaboradores por departamento
    function filterColaboradores(department) {
        if (department === 'all') {
            return colaboradores;
        } else {
            return colaboradores.filter(colaborador => colaborador.departamento === department);
        }
    }

    // Distribuir cards de professores em duas colunas
    function distributeTeamCards(teachers, page) {
        // Limpar colunas
        teamColumn1.innerHTML = '';
        teamColumn2.innerHTML = '';
        
        // Calcular índices de início e fim para a página atual
        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, teachers.length);
        const pageTeachers = teachers.slice(startIndex, endIndex);
        
        // Dividir professores entre as duas colunas
        const halfIndex = Math.ceil(pageTeachers.length / 2);
        
        // Primeira coluna
        for (let i = 0; i < halfIndex; i++) {
            const teacher = pageTeachers[i];
            if (teacher) {
                teamColumn1.appendChild(createTeacherCard(teacher));
            }
        }
        
        // Segunda coluna
        for (let i = halfIndex; i < pageTeachers.length; i++) {
            const teacher = pageTeachers[i];
            if (teacher) {
                teamColumn2.appendChild(createTeacherCard(teacher));
            }
        }
        
        // Adicionar eventos de clique após criar os cards
        document.querySelectorAll('.team-card').forEach(card => {
            card.addEventListener('click', function() {
                const teacherId = parseInt(this.getAttribute('data-id'));
                const teacher = professores.find(p => p.id === teacherId);
                if (teacher) {
                    showTeacherModal(teacher);
                }
            });
        });
    }

    // Criar card de professor
    function createTeacherCard(teacher) {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.setAttribute('data-id', teacher.id);
        card.setAttribute('data-area', teacher.area);
        card.style.animationDelay = `${Math.random() * 0.5}s`;
        
        card.innerHTML = `
            <div class="team-card-inner">
                <img src="${teacher.foto}" alt="${teacher.nome}" class="team-image">
                <div class="team-info">
                    <h3>${teacher.nome}</h3>
                    <span class="team-position">${teacher.cargo}</span>
                    <div class="team-subjects">
                        ${teacher.disciplinas.slice(0, 2).map(subject => 
                            `<span class="subject-tag">${subject}</span>`
                        ).join('')}
                        ${teacher.disciplinas.length > 2 ? '<span class="subject-tag">+</span>' : ''}
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }

    // Renderizar cards de colaboradores
    function renderStaffCards(staff) {
        staffGrid.innerHTML = '';
        
        staff.forEach((colaborador, index) => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            card.setAttribute('data-department', colaborador.departamento);
            card.style.setProperty('--index', index);
            
            card.innerHTML = `
                <div class="staff-header">
                    ${getDepartmentName(colaborador.departamento)}
                </div>
                <div class="staff-content">
                    <img src="${colaborador.foto}" alt="${colaborador.nome}" class="staff-image">
                    <div class="staff-info">
                        <h3>${colaborador.nome}</h3>
                        <span class="staff-position">${colaborador.cargo}</span>
                        <div class="staff-contact">
                            <i class="far fa-envelope"></i>
                            ${colaborador.contato}
                        </div>
                    </div>
                </div>
            `;
            
            staffGrid.appendChild(card);
        });
    }

    // Obter nome do departamento
    function getDepartmentName(department) {
        const departments = {
            'direcao': 'Direção',
            'coordenacao': 'Coordenação Pedagógica',
            'administrativo': 'Setor Administrativo',
            'apoio': 'Equipe de Apoio'
        };
        
        return departments[department] || 'Departamento';
    }

    // Mostrar modal com detalhes do professor
    function showTeacherModal(teacher) {
        modalBody.innerHTML = `
            <div class="teacher-profile">
                <div class="teacher-profile-image">
                    <img src="${teacher.foto}" alt="${teacher.nome}">
                </div>
                <div class="teacher-profile-info">
                    <h2>${teacher.nome}</h2>
                    <span class="teacher-profile-position">${teacher.cargo}</span>
                    
                    <div class="teacher-profile-details">
                        <div class="teacher-detail-item">
                            <div class="detail-label">Formação:</div>
                            <div class="detail-value">${teacher.formacao}</div>
                        </div>
                        <div class="teacher-detail-item">
                            <div class="detail-label">Experiência:</div>
                            <div class="detail-value">${teacher.experiencia}</div>
                        </div>
                        <div class="teacher-detail-item">
                            <div class="detail-label">Email:</div>
                            <div class="detail-value">${teacher.email}</div>
                        </div>
                    </div>
                    
                    <div class="teacher-subjects-list">
                        <h4>Disciplinas:</h4>
                        <div class="subjects-tags">
                            ${teacher.disciplinas.map(subject => 
                                `<span class="subject-pill">${subject}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="teacher-bio">
                <h3>Biografia</h3>
                <p>${teacher.bio}</p>
            </div>
            
            <div class="teacher-stats">
                <div class="teacher-stat-item">
                    <span class="teacher-stat-number">${Math.floor(Math.random() * 20) + 5}</span>
                    <span class="teacher-stat-label">Turmas</span>
                </div>
                <div class="teacher-stat-item">
                    <span class="teacher-stat-number">${Math.floor(Math.random() * 300) + 100}</span>
                    <span class="teacher-stat-label">Alunos</span>
                </div>
                <div class="teacher-stat-item">
                    <span class="teacher-stat-number">${Math.floor(Math.random() * 10) + 3}</span>
                    <span class="teacher-stat-label">Projetos</span>
                </div>
                <div class="teacher-stat-item">
                    <span class="teacher-stat-number">${Math.floor(Math.random() * 15) + 1}</span>
                    <span class="teacher-stat-label">Prêmios</span>
                </div>
            </div>
            
            <div class="teacher-contact">
                <a href="#" aria-label="Email"><i class="far fa-envelope"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="#" aria-label="Academia"><i class="fas fa-graduation-cap"></i></a>
            </div>
        `;
        
        teamModal.classList.add('show');
    }

    // Criar pontos de paginação
    function createPaginationDots() {
        const filteredTeachers = filterProfessores(currentArea);
        const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
        
        paginationDots.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === currentPage) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', function() {
                currentPage = i;
                distributeTeamCards(filteredTeachers, currentPage);
                updatePaginationDots();
            });
            
            paginationDots.appendChild(dot);
        }
    }

    // Atualizar pontos de paginação
    function updatePaginationDots() {
        const dots = document.querySelectorAll('.pagination-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
});