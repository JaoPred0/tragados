import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// 🔹 Configuração correta do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDEjOyQBdddRZJEF-gSuS2IkAUnd3225IE",
    authDomain: "tragados-57793.firebaseapp.com",
    projectId: "tragados-57793",
    storageBucket: "tragados-57793.appspot.com", // 🔹 Corrigido `.app` para `.com`
    messagingSenderId: "74076574549",
    appId: "1:74076574549:web:cce79ebb8f995f5b5c15dc",
    measurementId: "G-WQ24B0S56W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
        await addDoc(collection(db, "notes"), { user: "Wendy", content: noteContent });
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
        const notesQuery = query(collection(db, "notes"), where("user", "==", "Jao"));
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
