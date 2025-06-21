const menuMobile = document.getElementById('open');
const toggleMenuMobile = document.querySelector('.mobile-menu');
const close = document.getElementById('close');
const body = document.querySelector('body');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');


toggleMenuMobile.addEventListener('click', ()=>{
    toggleMenuMobile.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener("click", () => {
    toggleMenuMobile.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
});

const links = document.querySelectorAll('nav ul li a');

for(const link of links){
    link.addEventListener('click', function(){
        toggleMenuMobile.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    });
};

/*== Mudar o header quando der scroll==*/
const header = document.querySelector("#header");
const navheight = header.offsetHeight;


/*== VER MAIS ==*/
const btnVerMais = document.querySelector('.btn-ver-mais');
const txtOculto = document.querySelector('.texto-adicional');
const btnVerMenos = document.querySelector('.btn-ver-menos');

btnVerMais.addEventListener("click", () => {
    txtOculto.classList.add('active');
    btnVerMais.classList.add('active');
});

btnVerMenos.addEventListener("click", () => {
    txtOculto.classList.remove('active');
    btnVerMais.classList.remove('active');
});


















/*======= creating posts =======*/

const textArea = document.getElementById('create');
const btnPost = document.querySelector('.btn-post');
const postContainer = document.querySelector('.testimonials')
const userName = document.getElementById('userName')





// Mostrar cometario na tela
function mostrarComentario(texto){
    const post = document.createElement('div');
    post.classList.add('post');
    post.textContent = texto;
    postContainer.appendChild(post);
}

//carregar comentarios salvos ao abrir o site
function carregarComentarios(){
    const comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosSalvos.forEach(texto => {
        mostrarComentario(texto);
    });
}


//Salvar novo comentario
function salvarComentario(texto){
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.push(texto);

    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

btnPost.addEventListener("click", () => {
    const texto = textArea.value.trim()
    if(texto === ""){
        alert('o campo está vazio');
        return;
    }

    mostrarComentario(texto);
    salvarComentario(texto);
    textArea.value = "";
});

carregarComentarios()
