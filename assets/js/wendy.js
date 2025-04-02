document.addEventListener("DOMContentLoaded", function () {
    const verificarAulas = () => {
        const mensagemElement = document.getElementById('mensagem');

        if (!mensagemElement) {
            console.warn("Aguardando #mensagem aparecer...");
            setTimeout(verificarAulas, 100); // Tenta novamente em 100ms
            return;
        }

        const aulasMatutinas = [
            { disciplina: "Química 4", sala: "Sala 08", horario: "08:30 - 09:15", dia: "terça-feira" },
            { disciplina: "Química 4", sala: "Sala 08", horario: "09:35 - 10:20", dia: "terça-feira" },
            { disciplina: "Química 4", sala: "Sala 08", horario: "08:30 - 09:15", dia: "sexta-feira" },
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