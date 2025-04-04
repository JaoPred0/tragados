// document.addEventListener("DOMContentLoaded", function () {
//     let hoje = new Date().getDate(); // Obtém o dia atual do sistema
//     console.log("Dia de hoje:", hoje);

//     let dias = document.querySelectorAll(".calendar td"); // Seleciona todas as células do calendário
//     console.log("Total de células encontradas:", dias.length);

//     dias.forEach(td => {
//         let numeroDia = td.textContent.trim(); // Remove espaços extras

//         if (numeroDia == hoje) {
//             console.log("Dia encontrado no calendário:", numeroDia);
//             td.classList.add("hoje");
//         }
//     });
// });
// setTimeout(() => {
//     let hoje = new Date().getDate();
//     console.log("Dia de hoje:", hoje);

//     let dias = document.querySelectorAll(".calendar td");
//     console.log("Total de células encontradas:", dias.length);

//     dias.forEach(td => {
//         let numeroDia = td.textContent.trim();
//         if (numeroDia == hoje) {
//             console.log("Dia encontrado no calendário:", numeroDia);
//             td.classList.add("hoje");
//         }
//     });
// }, 500);

// function formatarTexto(comando) {
//     document.execCommand(comando, false, null);
// }
