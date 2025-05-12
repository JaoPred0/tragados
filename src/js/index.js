const a = document.createElement('script');
a.src = 'https://cdn.jsdelivr.net/npm/@tabler/core@1.2.0/dist/js/tabler.min.js';
document.head.appendChild(a);

// 🔄 Inicializar AOS após o carregamento do script
scriptAOS.onload = () => {
    AOS.init({ duration: 500 });
};