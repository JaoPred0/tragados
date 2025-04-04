import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDEjOyQBdddRZJEF-gSuS2IkAUnd3225IE",
    authDomain: "tragados-57793.firebaseapp.com",
    projectId: "tragados-57793",
    storageBucket: "tragados-57793.appspot.com",
    messagingSenderId: "74076574549",
    appId: "1:74076574549:web:cce79ebb8f995f5b5c15dc",
    measurementId: "G-WQ24B0S56W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase carregado com sucesso!");

const user = "Jao";
const userDocRef = doc(db, "users", user);

// 🔹 Elementos do DOM
const saveButton = document.getElementById("saveNote");
const editor = document.getElementById("editor");
const notesTableBody = document.getElementById("notesTableBody");

// 🔹 Modais
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editContent = document.getElementById("editContent");
const saveEditButton = document.getElementById("saveEdit");

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const confirmDeleteButton = document.getElementById("confirmDelete");

let currentEditId = "";
let currentDeleteId = "";

// 🔹 Função para mostrar/ocultar modal de carregamento
function toggleLoading(show) {
    const modal = document.getElementById("loadingModal");
    if (show) {
        closeAllModals();
        modal.classList.add("show");
        modal.style.display = "block";
    } else {
        modal.classList.remove("show");
        modal.style.display = "none";
    }
}

// 🔹 Salvar Nota
saveButton.addEventListener("click", async () => {
    const noteContent = editor.innerHTML.trim();
    if (!noteContent) {
        alert("A nota está vazia!");
        return;
    }

    try {
        toggleLoading(true);
        await addDoc(collection(db, "notes"), { user: user, content: noteContent });
        editor.innerHTML = "";
        await loadNotes(); // 🔹 Agora espera carregar antes de continuar
    } catch (error) {
        console.error("Erro ao salvar nota:", error);
    } finally {
        toggleLoading(false);
    }
});

// 🔹 Carregar Notas
import { query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

async function loadNotes() {
    try {
        toggleLoading(true);

        // 🔹 Criando uma consulta filtrada para buscar apenas as notas do usuário "Jao"
        const notesQuery = query(collection(db, "notes"), where("user", "==", user));
        const querySnapshot = await getDocs(notesQuery);

        notesTableBody.innerHTML = "";

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${data.content}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${docSnap.id}" data-content="${data.content}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${docSnap.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            notesTableBody.appendChild(tr);
        });

        // 🔹 Adicionando eventos para os botões de edição e exclusão
        document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.addEventListener("click", () => openEditModal(btn.dataset.id, btn.dataset.content));
        });

        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", () => openDeleteModal(btn.dataset.id));
        });

    } catch (error) {
        console.error("Erro ao carregar notas:", error);
    } finally {
        toggleLoading(false);
    }
}


// 🔹 Abrir modal de edição
function openEditModal(id, content) {
    forceCloseModals(); // Fecha qualquer modal preso antes
    currentEditId = id;
    editContent.value = content;
    editModal.show();
}


// 🔹 Salvar edição
saveEditButton.addEventListener("click", async () => {
    if (!editContent.value.trim()) {
        alert("A nota não pode estar vazia!");
        return;
    }

    try {
        toggleLoading(true);
        const noteRef = doc(db, "notes", currentEditId);
        await updateDoc(noteRef, { content: editContent.value });
        await loadNotes(); // 🔹 Aguarda o carregamento antes de fechar
        editModal.hide();
    } catch (error) {
        console.error("Erro ao editar nota:", error);
    } finally {
        toggleLoading(false);
    }
});

// 🔹 Abrir modal de exclusão
function openDeleteModal(id) {
    forceCloseModals(); // Fecha qualquer modal preso antes
    currentDeleteId = id;
    deleteModal.show();
}


// 🔹 Confirmar exclusão
confirmDeleteButton.addEventListener("click", async () => {
    try {
        toggleLoading(true);
        await deleteDoc(doc(db, "notes", currentDeleteId));
        await loadNotes();
        deleteModal.hide();
    } catch (error) {
        console.error("Erro ao excluir nota:", error);
    } finally {
        toggleLoading(false);
    }
});

// 🔹 Fechar todos os modais abertos
function closeAllModals() {
    document.querySelectorAll(".modal.show").forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
    });

    // 🔹 Remover backdrop caso fique preso
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
    document.body.classList.remove("modal-open");
}


// 🔹 Fechar modal ao clicar em cancelar
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
});


function forceCloseModals() {
    document.querySelectorAll(".modal.show").forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
    });

    setTimeout(() => {
        document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
        document.body.classList.remove("modal-open");
    }, 100); // Pequeno delay para garantir remoção
}

document.addEventListener("click", (event) => {
    if (document.body.classList.contains("modal-open")) {
        forceCloseModals();
    }
});


// 🔹 Carregar notas ao iniciar
document.addEventListener("DOMContentLoaded", async () => {
    await loadNotes();
});

//prova
document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Adicionar nova prova
    async function adicionarProva() {
        const dataProva = document.getElementById("dataProva").value;
        const materia = document.getElementById("materia").value;
        const diaSemana = document.getElementById("diaSemana").value;
        const conteudo = document.getElementById("conteudo").value;
        const rascunho = document.getElementById("rascunho").value;

        if (!dataProva || !materia || !diaSemana || !conteudo) {
            alert("Preencha todos os campos!");
            return;
        }

        const createdAt = new Date().toISOString();

        await addDoc(collection(db, "provas"), {
            user,
            dataProva,
            materia,
            diaSemana,
            conteudo,
            rascunho,
            createdAt
        });

        carregarProvas(); // Atualiza a lista
        marcarDiasProva(); // Atualiza o calendário
    }

    window.adicionarProva = adicionarProva;

    // 🔹 Carregar lista de provas
    async function carregarProvas() {
        const listaProvas = document.getElementById("listaProvas");
        listaProvas.innerHTML = "";

        const querySnapshot = await getDocs(collection(db, "provas"));
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.user === user) {
                const dataCriacao = new Date(data.createdAt).toLocaleString("pt-BR");
                const li = document.createElement("li");
                li.classList.add("list-group-item", "animate__animated", "animate__fadeInUp");
                li.innerHTML = `
                    <strong>${data.materia}</strong> - Prova: ${data.dataProva} (${data.diaSemana})<br>
                    <small>Criado em: ${dataCriacao}</small><br>
                    ${data.conteudo} <br> ${data.rascunho}
                    <button class="btn btn-danger btn-sm float-end remover-btn" data-id="${docSnap.id}">Remover</button>`;
                listaProvas.appendChild(li);
            }
        });

        document.querySelectorAll(".remover-btn").forEach(button => {
            button.addEventListener("click", async () => {
                await removerProva(button.dataset.id);
            });
        });
    }

    // 🔹 Remover prova
    async function removerProva(id) {
        await deleteDoc(doc(db, "provas", id));
        carregarProvas();
        marcarDiasProva();
    }

    // 🔹 Marcar dias de prova no calendário
    async function marcarDiasProva() {
        const listaProvas = document.getElementById("lista-provas");
        listaProvas.innerHTML = ""; // limpa a lista antes de preencher

        const querySnapshot = await getDocs(collection(db, "provas"));

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.user === user) {
                const dataObj = new Date(data.dataProva + "T00:00:00");
                const dia = String(dataObj.getDate()).padStart(2, '0');
                const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // mês começa do 0
                const ano = dataObj.getFullYear();
                const dataFormatada = `${ano}-${mes}-${dia}`;

                // ✅ Marcar o dia no calendário
                const celula = document.querySelector(`td[data-dia="${dataFormatada}"]`);
                if (celula) {
                    celula.classList.add("dia-prova");
                }

                // ✅ Adicionar na lista lateral
                const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                const diaSemana = diasSemana[dataObj.getDay()];

                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                <span class="badge bg-primary p-2">${dia}</span>
                    <span class="fw-bold text-primary">${data.materia}</span>
                `;
                listaProvas.appendChild(li);
            }
        });
    }


    // 🔹 Marcar o dia de hoje
    function marcarHoje() {
        const hoje = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
        const dias = document.querySelectorAll(".calendar td");
        dias.forEach(td => {
            if (td.dataset.dia === hoje) {
                td.classList.add("hoje");
            }
        });
    }

    // 🔹 Inicialização
    carregarProvas();
    marcarDiasProva();
    marcarHoje();
});

// Perfil
document.getElementById("editNameBtn").addEventListener("click", () => {
    new bootstrap.Modal(document.getElementById("editNameModal")).show();
});

document.getElementById("saveName").addEventListener("click", () => {
    const newName = document.getElementById("newProfileName").value.trim();
    if (!newName) {
        alert("O nome não pode estar vazio!");
        return;
    }
    document.getElementById("profileName").textContent = newName;
    bootstrap.Modal.getInstance(document.getElementById("editNameModal")).hide();
});

document.getElementById("editDOBBtn").addEventListener("click", () => {
    new bootstrap.Modal(document.getElementById("editDOBModal")).show();
});

document.getElementById("saveDOB").addEventListener("click", () => {
    const newDOB = document.getElementById("newProfileDOB").value;
    if (!newDOB) {
        alert("Data de nascimento inválida!");
        return;
    }
    document.getElementById("profileDOB").textContent = newDOB;
    bootstrap.Modal.getInstance(document.getElementById("editDOBModal")).hide();
});

document.getElementById("saveProfile").addEventListener("click", async () => {
    const user = "id_do_usuario"; // Defina o ID do usuário autenticado

    const nome = document.getElementById("profileName").textContent.trim();
    const dataNascimento = document.getElementById("profileDOB").textContent.trim();

    if (!nome || !dataNascimento) {
        document.getElementById("errorMessage").textContent = "Preencha todos os campos!";
        new bootstrap.Modal(document.getElementById("errorModal")).show();
        return;
    }

    new bootstrap.Modal(document.getElementById("loadingModal")).show();

    try {
        await firebase.firestore().collection("usuarios").doc(user).set({
            nome: nome,
            dataNascimento: dataNascimento,
        });

        bootstrap.Modal.getInstance(document.getElementById("loadingModal")).hide();
        alert("Perfil atualizado!");
    } catch (error) {
        bootstrap.Modal.getInstance(document.getElementById("loadingModal")).hide();
        document.getElementById("errorMessage").textContent = "Erro ao salvar: " + error.message;
        new bootstrap.Modal(document.getElementById("errorModal")).show();
    }
});
