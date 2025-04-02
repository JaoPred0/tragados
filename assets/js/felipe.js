document.addEventListener("DOMContentLoaded", function () {
    const verificarAulas = () => {
        const mensagemElement = document.getElementById('mensagem');

        if (!mensagemElement) {
            console.warn("Aguardando #mensagem aparecer...");
            setTimeout(verificarAulas, 100); // Tenta novamente em 100ms
            return;
        }

        const aulasMatutinas = [
            { disciplina: "Matemática 3", sala: "Sala 05", horario: "07:00 - 07:45", dia: "Terça-feira" },
            { disciplina: "Matemática 3", sala: "Sala 05", horario: "10:20 - 11:05", dia: "Sexta-feira" },
            { disciplina: "Matemática 3", sala: "Sala 05", horario: "11:05 - 11:50", dia: "Sexta-feira" },
        ];

        const hoje = new Date();
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);

        // Obtém o nome do dia da semana e padroniza para minúsculas e sem acentos
        const nomeDia = amanha.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase();
        const nomeDiaNormalizado = normalizarTexto(nomeDia);

        // Filtra aulas para o dia seguinte
        const aulasAmanha = aulasMatutinas.filter(aula => normalizarTexto(aula.dia) === nomeDiaNormalizado);

        if (aulasAmanha.length > 0) {
            let mensagem = `<strong>Amanhã, ${nomeDia}, teremos:</strong><br>`;
            aulasAmanha.forEach(aula => {
                mensagem += `${aula.disciplina} (${aula.sala}) - Horário: ${aula.horario}<br>`;
            });
            mensagemElement.innerHTML = mensagem;
        } else {
            mensagemElement.innerHTML = `<strong>Não haverá aula amanhã de manhã.</strong>`;
        }
    };

    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    verificarAulas();
});