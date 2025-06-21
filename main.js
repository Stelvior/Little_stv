const menuMobile = document.getElementById('open');
const toggleMenuMobile = document.querySelector('.mobile-menu');
const body = document.querySelector('body');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const postContainer = document.querySelector('.testimonials');
const textArea = document.getElementById('create');
const btnPost = document.querySelector('.btn-post');
const userNameInput = document.getElementById('username');

// Toggle menu mobile
toggleMenuMobile.addEventListener('click', () => {
    toggleMenuMobile.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener("click", () => {
    toggleMenuMobile.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
});

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMenuMobile.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// === VER MAIS / VER MENOS ===
const btnVerMais = document.querySelector('.btn-ver-mais');
const txtOculto = document.querySelector('.texto-adicional');
const btnVerMenos = document.querySelector('.btn-ver-menos');

if (btnVerMais && txtOculto && btnVerMenos) {
    btnVerMais.addEventListener("click", () => {
        txtOculto.classList.add('active');
        btnVerMais.classList.add('active');
    });

    btnVerMenos.addEventListener("click", () => {
        txtOculto.classList.remove('active');
        btnVerMais.classList.remove('active');
    });
}

// expandir a caixa de comentarios
textArea.addEventListener("input", () => {
  textArea.style.height = "auto"; // Reseta pra calcular novamente
  textArea.style.height = textArea.scrollHeight + "px";
});

// Criar comentário
btnPost.addEventListener("click", () => {
    const texto = textArea.value.trim();
    const nome = userNameInput.value.trim();

    if (texto === "" || nome === "") {
        alert('Por favor, preencha seu nome e comentário!');
        return;
    }

    const novoComentario = { nome, texto };
    salvarComentario(novoComentario);
    carregarComentarios();

    textArea.value = "";
    userNameInput.value = "";
});

// Mostrar comentário
function mostrarComentario({ nome, texto }, index) {
    if (!nome || !texto) return;

    const post = document.createElement('div');
    post.classList.add('testimonial');

    const userIcon = document.createElement('div');
    userIcon.classList.add('user-icon');
    userIcon.textContent = nome && nome[0] ? nome[0].toUpperCase() : '?';

    const userName = document.createElement('div');
    userName.classList.add('user-name');
    userName.textContent = nome;

    const header = document.createElement('div');
    header.classList.add('comment-header');
    header.appendChild(userIcon);
    header.appendChild(userName);

    // Botão ⋮ e menu
    const menuBtn = document.createElement('button');
    menuBtn.classList.add('menu-btn');
    menuBtn.innerHTML = '&#8942;'; // ⋮

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown-menu');
    dropdown.innerHTML = `
        <span class="editar">Editar</span>
        <span class="apagar">Apagar</span>
    `;

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('menu-wrapper');
    menuWrapper.appendChild(menuBtn);
    menuWrapper.appendChild(dropdown);
    header.appendChild(menuWrapper);

    const comment = document.createElement('div');
    comment.classList.add('user-comment');
    comment.textContent = texto;

    post.appendChild(header);
    post.appendChild(comment);
    postContainer.appendChild(post);

    // Toggle menu
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        dropdown.classList.toggle('active');
    });

    // Editar
    dropdown.querySelector('.editar').addEventListener('click', () => {
        const novoTexto = prompt("Editar comentário:", texto);
        if (novoTexto !== null && novoTexto.trim() !== "") {
            editarComentario(index, novoTexto);
        }
    });

    // Apagar
    dropdown.querySelector('.apagar').addEventListener('click', () => {
        deletarComentario(index);
    });
}

// Fecha dropdowns ao clicar fora
document.addEventListener('click', () => {
    closeAllDropdowns();
});

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
}

// Carregar comentários
function carregarComentarios() {
    postContainer.innerHTML = "";
    let comentarios = [];
    const dados = localStorage.getItem('comentarios');

    try {
        if (dados) comentarios = JSON.parse(dados);
    } catch (e) {
        console.warn("Erro ao carregar os comentários:", e);
        comentarios = [];
    }

    // Corrige comentários inválidos
    comentarios = comentarios.filter(c => c && typeof c.nome === 'string' && typeof c.texto === 'string');

    comentarios.forEach((comentario, index) => {
        mostrarComentario(comentario, index);
    });
}

// Salvar comentário
function salvarComentario(novoComentario) {
    let comentarios = [];
    const dados = localStorage.getItem('comentarios');

    try {
        if (dados) comentarios = JSON.parse(dados);
    } catch (e) {
        comentarios = [];
    }

    comentarios.push(novoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

// Apagar
function deletarComentario(index) {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.splice(index, 1);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    carregarComentarios();
}

// Editar
function editarComentario(index, novoTexto) {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios[index].texto = novoTexto;
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    carregarComentarios();
}

// Inicializa com dois comentários
function inicializarComentarios() {
    if (!localStorage.getItem('comentarios')) {
        const iniciais = [
            { nome: "Bruxo", texto: "Aqui começa o legado dos comentários." },
            { nome: "Caranguejo_st", texto: "Nada mal pra um começo, né?" }
        ];
        localStorage.setItem('comentarios', JSON.stringify(iniciais));
    }
    carregarComentarios();
}

inicializarComentarios();


function verificarCampos() {
    const nome = userNameInput.value.trim();
    const texto = textArea.value.trim();
    btnPost.disabled = nome === "" || texto === "";
}

// Verifica em tempo real
userNameInput.addEventListener('input', verificarCampos);
textArea.addEventListener('input', verificarCampos);

// Inicialmente desativado
verificarCampos();

//mudar o tema
const toggle = document.getElementById("theme-toggle");
const label = document.getElementById("theme-label");

function setTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  label.textContent = mode === 'dark' ? 'Modo Escuro' : 'Modo Claro';
  toggle.checked = mode === 'dark';
}

// Detectar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Ao mudar o toggle
toggle.addEventListener("change", () => {
  const mode = toggle.checked ? 'dark' : 'light';
  setTheme(mode);
});









  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          navLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });




  
