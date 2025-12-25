# 🎓 Sistema de Frequência de Professores

Sistema moderno e elegante para controle de frequência de professores em múltiplas escolas utilizando QR Code.

[![Design Moderno](https://img.shields.io/badge/Design-Moderno-6366f1)](https://github.com)
[![Tema Claro/Escuro](https://img.shields.io/badge/Tema-Claro%2FEscuro-8b5cf6)](https://github.com)
[![Responsivo](https://img.shields.io/badge/Layout-Responsivo-10b981)](https://github.com)

## ✨ Novidades - Versão 2.0

### 🌓 Sistema de Temas
- **Tema Claro** e **Tema Escuro** totalmente funcionais
- Alternância suave com animações
- Preferência do usuário salva automaticamente
- Design otimizado para ambos os temas

### 🎨 Design Modernizado
- Nova paleta de cores profissional (Indigo, Violeta, Verde moderno)
- Gradientes elegantes e sombras suaves
- Animações fluidas e transições suaves
- Interface mais limpa e organizada
- Cards com efeitos de hover
- Botões com feedback visual (ripple effect)

### 📱 Interface Aprimorada
- Sidebar moderna com indicadores visuais
- Status badges redesenhados
- Tabelas com melhor legibilidade
- Formulários mais acessíveis
- Modais modernizados com backdrop blur
- Alertas com design atualizado

## 📋 Sobre o Sistema

O Sistema de Frequência foi desenvolvido para facilitar o controle de presença de professores que atuam em diferentes instituições de ensino. Utilizando tecnologia de QR Code, o sistema permite:

- ✅ Registro rápido e preciso da presença dos professores
- ✅ Gerenciamento de múltiplas escolas
- ✅ Controle de professores que trabalham em várias instituições
- ✅ Geração de relatórios de presença
- ✅ Dashboards com estatísticas e informações relevantes
- ✅ **NOVO:** Alternância entre temas claro e escuro
- ✅ **NOVO:** Design moderno e profissional

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e moderna
- **CSS3** - Estilos avançados com variáveis CSS e animações
- **JavaScript ES6+** - Lógica e interatividade
- **LocalStorage** - Persistência de dados e preferências
- **QR Code** - Biblioteca html5-qrcode
- **Font Awesome 6.5.1** - Ícones modernos
- **Google Fonts (Poppins)** - Tipografia elegante

## 📁 Estrutura do Projeto

```
SISTEMA-FREQUENCIA/
│
├── css/
│   ├── style.css              # ⭐ Estilos principais com sistema de temas
│   ├── alerts.css             # ⭐ Alertas modernizados
│   └── extra-pages.css        # Estilos extras
│
├── js/
│   ├── theme.js               # 🆕 Gerenciador de temas claro/escuro
│   ├── login.js               # Lógica de autenticação
│   ├── common.js              # Funções comuns
│   ├── dashboard.js           # Dashboard administrativo
│   ├── dashboard-professor.js # Dashboard do professor
│   ├── attendance.js          # Registro de frequência
│   ├── schools.js             # Gerenciamento de escolas
│   ├── profile.js             # Gerenciamento de perfil
│   └── reports.js             # Geração de relatórios
│
├── views/
│   ├── dashboard.html         # Dashboard administrativo
│   ├── dashboard-professor.html # Dashboard do professor
│   ├── escolas.html           # Gerenciamento de escolas
│   ├── professores.html       # Gerenciamento de professores
│   ├── disciplinas.html       # Gerenciamento de disciplinas
│   ├── marcar-presenca.html   # Registro de frequência
│   ├── meu-historico.html     # Histórico de presenças
│   ├── perfil.html            # Perfil do usuário
│   ├── relatorios.html        # Relatórios e análises
│   └── configuracoes.html     # Configurações do sistema
│
├── img/                       # Imagens e ícones
│
├── index.html                 # ⭐ Página de login modernizada
├── guia-componentes.html      # 🆕 Guia visual de componentes
├── README.md                  # Este arquivo
├── ATUALIZACOES.md           # 🆕 Documentação de atualizações
└── GUIA-USO.md               # 🆕 Guia de uso detalhado
```

## 🎯 Instruções de Uso

### 🔐 Acesso ao Sistema

1. Abra o arquivo `index.html` em seu navegador
2. Use as seguintes credenciais para teste:

   **👨‍💼 Administrador:**
   ```
   E-mail: admin@escola.com
   Senha: admin123
   ```

   **👨‍🏫 Professor:**
   ```
   E-mail: professor@escola.com
   Senha: prof123
   ```

3. **Alternar Tema:** Clique no botão de lua/sol no canto superior direito

### 🎨 Explorar Componentes

Abra `guia-componentes.html` para ver:
- Paleta de cores
- Botões e suas variações
- Cards e estatísticas
- Formulários
- Status badges
- Demonstração dos temas

### 📚 Fluxo de Uso para Professores

1. ✅ Faça login como professor
2. 📊 Visualize seu cronograma do dia no dashboard
3. ✔️ Clique em "Marcar Presença" para registrar
4. 📱 Use o scanner de QR Code ou formulário manual
5. 📅 Confira seu histórico de frequência

### 🎛️ Fluxo de Uso para Administradores

1. ✅ Faça login como administrador
2. 📊 Visualize estatísticas gerais no dashboard
3. 🏫 Gerencie escolas, professores e disciplinas
4. 🔲 Gere QR Codes para cada escola
5. 📈 Consulte relatórios detalhados

## ⚡ Funcionalidades

### Para Professores

- 📊 Dashboard personalizado com cronograma diário
- 📱 Registro de presença via QR Code
- 📅 Histórico completo de frequência
- 👤 Gerenciamento de perfil
- 🏫 Visualização das escolas vinculadas
- 🌓 Alternância de temas

### Para Administradores

- 📊 Dashboard com estatísticas gerais
- 🏫 Gerenciamento completo de escolas
- 👥 Gerenciamento de professores e disciplinas
- 🔲 Geração de QR Codes personalizados
- 📈 Relatórios detalhados e análises
- ⚙️ Configurações do sistema
- 🌓 Alternância de temas
- 📊 Monitoramento em tempo real

## 🎨 Características do Design

### Tema Claro
- Background suave (#f8fafc)
- Cards brancos com sombras
- Texto escuro legível
- Ideal para ambientes bem iluminados

### Tema Escuro
- Background escuro (#0f172a)
- Cards em tom azul escuro
- Texto claro otimizado
- Reduz fadiga visual em ambientes com pouca luz

### Animações
- ✨ Fade in ao carregar páginas
- 🔄 Transições suaves entre estados
- 💫 Efeitos hover em elementos interativos
- 🌊 Ripple effect nos botões
- 📊 Animações nos cards estatísticos

## 📚 Documentação Adicional

- **[ATUALIZACOES.md](ATUALIZACOES.md)** - Detalhes completos das atualizações
- **[GUIA-USO.md](GUIA-USO.md)** - Guia detalhado de uso
- **[guia-componentes.html](guia-componentes.html)** - Guia visual interativo

## ⚠️ Considerações de Implementação

Este sistema é uma demonstração e possui algumas limitações:

1. ⚠️ Utiliza localStorage em vez de banco de dados real
2. ⚠️ Não possui backend para processamento de dados
3. ⚠️ Geração e leitura de QR Code são simuladas
4. ⚠️ Dados apresentados são fictícios

### Para Ambiente de Produção

Recomendações para implementação real:

1. ✅ Backend robusto (Node.js, PHP, Python, etc.)
2. ✅ Banco de dados relacional (PostgreSQL, MySQL) ou NoSQL (MongoDB)
3. ✅ Autenticação segura (OAuth 2.0, JWT)
4. ✅ HTTPS obrigatório
5. ✅ Sistema de backup e recuperação
6. ✅ API RESTful ou GraphQL
7. ✅ Implementação de PWA
8. ✅ Testes automatizados

## 🚀 Próximos Passos

### Versão 2.1 (Planejado)
- [ ] Mais opções de personalização de cores
- [ ] Tema de alto contraste
- [ ] Mais animações nos gráficos
- [ ] Modo offline com service workers
- [ ] Notificações push

### Versão 3.0 (Futuro)
- [ ] Backend completo
- [ ] Integração com banco de dados
- [ ] PWA com instalação
- [ ] Autenticação biométrica
- [ ] Integração com sistemas acadêmicos
- [ ] App mobile nativo

## 💻 Compatibilidade

### Navegadores
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Submeter pull requests

## 📄 Licença

Este projeto está disponível para uso educacional e demonstrativo.

---

**Desenvolvido com ❤️ para facilitar o controle de frequência escolar**

*Versão 2.0 - Design Moderno e Profissional | 2025*