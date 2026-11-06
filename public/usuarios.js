const form = document.querySelector("#user-form")
const nameInput = document.querySelector("#nome")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#senha")
const passwordHint = document.querySelector("#password-hint")
const submitButton = document.querySelector("#submit-button")
const cancelButton = document.querySelector("#cancel-button")
const formMessage = document.querySelector("#form-message")
const listMessage = document.querySelector("#list-message")
const userList = document.querySelector("#user-list")
const userCount = document.querySelector("#user-count")
const emptyState = document.querySelector("#empty-state")
const searchInput = document.querySelector("#search")
const deleteDialog = document.querySelector("#delete-dialog")
const deleteUserName = document.querySelector("#delete-user-name")
const cancelDeleteButton = document.querySelector("#cancel-delete")
const confirmDeleteButton = document.querySelector("#confirm-delete")

let users = []
let editingId = null
let pendingDeleteUser = null

async function request(path, options = {}) {
    const response = await fetch(path, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers
        }
    })

    if (!response.ok) {
        const detail = await response.text()
        throw new Error(detail || `Erro na solicitação (${response.status})`)
    }

    const body = await response.text()
    if (!body) return null

    try {
        return JSON.parse(body)
    } catch {
        return body
    }
}

function showMessage(element, message = "", type = "") {
    element.textContent = message
    element.className = `message${type ? ` ${type}` : ""}`
}

function makeActionButton(label, icon, className, handler) {
    const button = document.createElement("button")
    button.type = "button"
    button.className = `icon-button${className ? ` ${className}` : ""}`
    button.setAttribute("aria-label", label)
    button.title = label
    button.textContent = icon
    button.addEventListener("click", handler)
    return button
}

function renderUsers() {
    const query = searchInput.value.trim().toLocaleLowerCase("pt-BR")
    const filteredUsers = users.filter((user) =>
        `${user.nome ?? ""} ${user.email ?? ""}`.toLocaleLowerCase("pt-BR").includes(query)
    )

    userList.replaceChildren()
    userCount.textContent = String(users.length)
    emptyState.hidden = filteredUsers.length > 0

    for (const user of filteredUsers) {
        const row = document.createElement("tr")
        const nameCell = document.createElement("td")
        const emailCell = document.createElement("td")
        const actionsCell = document.createElement("td")
        const actions = document.createElement("div")

        nameCell.className = "user-name"
        nameCell.textContent = user.nome
        emailCell.textContent = user.email
        actions.className = "row-actions"
        actionsCell.append(actions)
        actions.append(
            makeActionButton("Editar usuário", "✎", "", () => startEditing(user)),
            makeActionButton("Excluir usuário", "×", "delete", () => openDeleteDialog(user))
        )
        row.append(nameCell, emailCell, actionsCell)
        userList.append(row)
    }
}

async function loadUsers() {
    showMessage(listMessage, "Carregando usuários...")
    try {
        const result = await request("/usuarios")
        if (!Array.isArray(result)) {
            throw new Error("A API não retornou uma lista válida de usuários.")
        }
        users = result
        renderUsers()
        showMessage(listMessage)
    } catch (error) {
        showMessage(listMessage, `Não foi possível carregar os usuários: ${error.message}`, "error")
    }
}

function resetForm() {
    form.reset()
    editingId = null
    passwordInput.required = true
    passwordInput.minLength = 8
    passwordInput.placeholder = "Mínimo de 8 caracteres"
    passwordHint.textContent = ""
    submitButton.textContent = "Cadastrar usuário"
    cancelButton.hidden = true
    showMessage(formMessage)
}

function startEditing(user) {
    editingId = user.id
    nameInput.value = user.nome ?? ""
    emailInput.value = user.email ?? ""
    passwordInput.value = ""
    passwordInput.required = false
    passwordInput.minLength = 0
    passwordInput.placeholder = "Deixe em branco para manter a senha atual"
    passwordHint.textContent = "(opcional para edição)"
    submitButton.textContent = "Salvar alterações"
    cancelButton.hidden = false
    showMessage(formMessage, `Editando usuário #${user.id}`)
    nameInput.focus()
}

function openDeleteDialog(user) {
    pendingDeleteUser = user
    deleteUserName.textContent = user.nome
    deleteDialog.showModal()
}

async function deleteUser() {
    const user = pendingDeleteUser
    if (!user) return

    confirmDeleteButton.disabled = true
    showMessage(listMessage, "Excluindo usuário...")
    try {
        await request(`/usuarios/${encodeURIComponent(user.id)}`, { method: "DELETE" })
        deleteDialog.close()
        pendingDeleteUser = null
        if (String(editingId) === String(user.id)) resetForm()
        await loadUsers()
        showMessage(listMessage, "Usuário excluído com sucesso.", "success")
    } catch (error) {
        showMessage(listMessage, `Não foi possível excluir o usuário: ${error.message}`, "error")
    } finally {
        confirmDeleteButton.disabled = false
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    showMessage(formMessage)
    submitButton.disabled = true

    const payload = {
        nome: nameInput.value.trim(),
        email: emailInput.value.trim()
    }
    if (passwordInput.value) payload.senha = passwordInput.value

    const isEditing = editingId !== null
    const path = isEditing ? `/usuarios/${encodeURIComponent(editingId)}` : "/usuarios"

    try {
        await request(path, {
            method: isEditing ? "PUT" : "POST",
            body: JSON.stringify(payload)
        })
        resetForm()
        await loadUsers()
        showMessage(formMessage, isEditing ? "Usuário atualizado com sucesso." : "Usuário cadastrado com sucesso.", "success")
    } catch (error) {
        showMessage(formMessage, `Não foi possível salvar o usuário: ${error.message}`, "error")
    } finally {
        submitButton.disabled = false
    }
})

cancelButton.addEventListener("click", resetForm)
cancelDeleteButton.addEventListener("click", () => deleteDialog.close())
confirmDeleteButton.addEventListener("click", deleteUser)
searchInput.addEventListener("input", renderUsers)

loadUsers()
