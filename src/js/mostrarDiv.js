function mostrarDiv(id) {
    let divs = document.querySelectorAll('.dm');

    divs.forEach(div => {
        div.classList.remove('fade-in'); // Remove a animação antiga
        div.classList.add('oculto'); // Mantém a div oculta corretamente
    });

    let divAtiva = document.getElementById(id);

    // Garante que a opacidade só mude após a classe ser aplicada
    setTimeout(() => {
        divAtiva.classList.remove('oculto');
        divAtiva.classList.add('fade-in');
    }, 50); // Pequeno delay para evitar o "piscar"
}
