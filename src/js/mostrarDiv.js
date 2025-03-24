function mostrarDiv(id) {
    let divs = document.querySelectorAll('.dm');

    divs.forEach(div => {
        div.classList.remove('fade-in');
        div.classList.add('oculto');
    });

    let divAtiva = document.getElementById(id);

    if (!divAtiva) {
        console.error("Elemento não encontrado:", id);
        return; // Sai da função se não encontrar o ID
    }

    setTimeout(() => {
        divAtiva.classList.remove('oculto');
        divAtiva.classList.add('fade-in');
    }, 50);
}
    