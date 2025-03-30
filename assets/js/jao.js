window.onload = function() {
    // Função que será chamada assim que a página carregar
    function verificarAulas() {
        // Definindo os horários de aula para amanhã (exemplo: quinta-feira)
        const aulasMatutinas = [
            { disciplina: "Matemática 3", sala: "Sala 03", horario: "07:00 - 07:45", dia: "Quinta-feira" },
            { disciplina: "Química 2", sala: "Sala 03", horario: "09:35 - 10:20", dia: "Quinta-feira" },
            { disciplina: "Biologia 1", sala: "Sala 03", horario: "09:35 - 10:20", dia: "Quinta-feira" },
            { disciplina: "Matemática 3", sala: "Sala 03", horario: "10:20 - 11:05", dia: "Quinta-feira" },
            { disciplina: "Química 2", sala: "Sala 03", horario: "10:20 - 11:05", dia: "Quinta-feira" },
            { disciplina: "Biologia 1", sala: "Sala 03", horario: "10:20 - 11:05", dia: "Quinta-feira" },
            { disciplina: "Matemática 3", sala: "Sala 03", horario: "11:05 - 11:50", dia: "Quinta-feira" }
        ];

        // Verifica se amanhã é quinta-feira
        const hoje = new Date();
        const diaDaSemana = hoje.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, etc.

        // Definir qual dia é amanhã
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);
        const nomeDia = amanha.toLocaleString('pt-BR', { weekday: 'long' });

        // Filtra aulas para o dia seguinte
        const aulasAmanha = aulasMatutinas.filter(aula => aula.dia === nomeDia);

        const mensagemElement = document.getElementById('mensagem');
        
        if (aulasAmanha.length > 0) {
            let mensagem = `Amanhã, ${nomeDia}, teremos as seguintes aulas:<br>`;
            aulasAmanha.forEach(aula => {
                mensagem += `${aula.disciplina} (${aula.sala}) - Horário: ${aula.horario}<br>`;
            });
            mensagemElement.innerHTML = mensagem;
        } else {
            mensagemElement.innerHTML = `Não haverá aula amanhã de manhã.`;
        }
    }

    // Chama a função assim que a página for carregada
    verificarAulas();
};