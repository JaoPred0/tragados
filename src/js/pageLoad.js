document.addEventListener("DOMContentLoaded", () => {
  function carregarConteudo(arquivo, container) {
    const caminho = `base/${arquivo}.html`; // Adiciona automaticamente 'base/' e '.html'
    const caminhoJao = `base/jao/${arquivo}.html`;
    const caminhoWendy = `base/wendy/${arquivo}.html`;
    const caminhoFelipe = `base/felipe/${arquivo}.html`;
    const caminhoMatheus = `base/matheus/${arquivo}.html`;
    const caminhoTragados = `base/tragados/${arquivo}.html`;
    fetch(caminho)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const elemento = document.getElementById(container);
        if (elemento) {
          elemento.innerHTML = html;
        } else {
          console.warn(`Elemento com ID "${container}" não encontrado.`);
        }
      })
      .catch((error) => console.error(`Erro ao carregar ${caminho}:`, error));
    fetch(caminhoJao)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const elemento = document.getElementById(container);
        if (elemento) {
          elemento.innerHTML = html;
        } else {
          console.warn(`Elemento com ID "${container}" não encontrado.`);
        }
      })
      .catch((error) =>
        console.error(`Erro ao carregar ${caminhoJao}:`, error)
      );
    fetch(caminhoWendy)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const elemento = document.getElementById(container);
        if (elemento) {
          elemento.innerHTML = html;
        } else {
          console.warn(`Elemento com ID "${container}" não encontrado.`);
        }
      })
      .catch((error) =>
        console.error(`Erro ao carregar ${caminhoWendy}:`, error)
      );
    fetch(caminhoFelipe)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const elemento = document.getElementById(container);
        if (elemento) {
          elemento.innerHTML = html;
        } else {
          console.warn(`Elemento com ID "${container}" não encontrado.`);
        }
      })
      .catch((error) =>
        console.error(`Erro ao carregar ${caminhoFelipe}:`, error)
      );
    fetch(caminhoMatheus)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        return response.text();
      })
      .then((html) => {
        const elemento = document.getElementById(container);
        if (elemento) {
          elemento.innerHTML = html;
        } else {
          console.warn(`Elemento com ID "${container}" não encontrado.`);
        }
      })
      .catch((error) =>
        console.error(`Erro ao carregar ${caminhoMatheus}:`, error)
      );
  }

  const elementos = [
    { arquivo: "index-body", container: "container-body" },
    { arquivo: "index-nav", container: "container-nav" },
    { arquivo: "index-config", container: "container-config" },
    { arquivo: "index-versao", container: "container-versao" },
  ];

  const elementosJao = [
    { arquivo: "navbarJ", container: "jaoContainer-navbar" },
    { arquivo: "homeJ", container: "jaoContainer-home" },
    { arquivo: "perfilJ", container: "jaoContainer-perfil" },
    { arquivo: "menuJ", container: "jaoContainer-menu" },
    { arquivo: "horarioJ", container: "jaoContainer-horario" },
    { arquivo: "horarioJ", container: "jaoContainer-horario" },
    { arquivo: "calendarioJ", container: "jaoContainer-calendario" },
    { arquivo: "blocoNotasJ", container: "jaoContainer-blocoNotas" },
  ];
  const elementosMatheus = [
    { arquivo: "horarioM", container: "matheusContainer-horario" },
  ];
  const elementosFelipe = [
    { arquivo: "navbarF", container: "felipeContainer-navbar" },
    { arquivo: "homeF", container: "felipeContainer-home" },
    { arquivo: "perfilF", container: "felipeContainer-perfil" },
    { arquivo: "menuF", container: "felipeContainer-menu" },
    { arquivo: "horarioF", container: "felipeContainer-horario" },
    { arquivo: "calendarioF", container: "felipeContainer-calendario" },
  ];

  const elementosWendy = [
    { arquivo: "navbarW", container: "wendyContainer-navbar" },
    { arquivo: "homeW", container: "wendyContainer-home" },
    { arquivo: "perfilW", container: "wendyContainer-perfil" },
    { arquivo: "menuW", container: "wendyContainer-menu" },
    { arquivo: "horarioW", container: "wendyContainer-horario" },
    { arquivo: "calendarioW", container: "wendyContainer-calendario" },
  ];

  const elementosTragados = [
    { arquivo: "navbarT", container: "tragadosContainer-navbar" },
    { arquivo: "menuT", container: "tragadosContainer-menu" },
  ];

  elementos.forEach((item) => carregarConteudo(item.arquivo, item.container));
  elementosJao.forEach((item) =>
    carregarConteudo(item.arquivo, item.container)
  );
  elementosWendy.forEach((item) =>
    carregarConteudo(item.arquivo, item.container)
  );
  elementosFelipe.forEach((item) =>
    carregarConteudo(item.arquivo, item.container)
  );
  elementosTragados.forEach((item) =>
    carregarConteudo(item.arquivo, item.container)
  );
  elementosMatheus.forEach((item) =>
    carregarConteudo(item.arquivo, item.container)
  );
});
