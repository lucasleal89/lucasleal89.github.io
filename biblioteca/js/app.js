let livros = carregarLivros();
let emprestimos = carregarEmprestimos();

// Elementos DOM
const formLivro = document.getElementById("formLivro");
const formEmprestimo = document.getElementById("formEmprestimo");
const inputPesquisa = document.getElementById("pesquisa");
const selectLivro = document.getElementById("selectLivro");
const listaLivrosContainer = document.getElementById("listaLivros");
const listaEmprestimosContainer = document.getElementById("listaEmprestimos");
const estatisticasContainer = document.getElementById("estatisticas");
const btnNaoLidos = document.getElementById("btnNaoLidos");
const btnTodos = document.getElementById("btnTodos");

// Data padrão de hoje para o input date
document.getElementById("dataEmprestimo").valueAsDate = new Date();

function init() {
  atualizarTela();
}

function atualizarTela(listaExibicao = livros) {
  renderizarLivros(listaExibicao);
  renderizarEmprestimos();
  atualizarEstatisticas();
  atualizarSelectLivros();
}

function renderizarLivros(lista) {
  listaLivrosContainer.innerHTML = "";
  if (lista.length === 0) {
    listaLivrosContainer.innerHTML = "<p>Nenhum livro cadastrado.</p>";
    return;
  }

  lista.forEach(livro => {
    const div = document.createElement("div");
    div.className = `item-list ${livro.lido ? 'lido' : ''}`;
    div.innerHTML = `
      <div>
        <strong>${livro.titulo}</strong>
        <p><small>${livro.autor} | ${livro.genero} | ${livro.paginas} págs.</small></p>
        <small>${livro.lido ? '✓ Lido' : '⏳ Não lido'}</small>
      </div>
      <div>
        ${!livro.lido ? `<button class="btn-small btn-lido" onclick="handleMarcarLido(${livro.id})">Marcar Lido</button>` : ''}
        <button class="btn-small btn-excluir" onclick="handleRemoverLivro(${livro.id})">Excluir</button>
      </div>
    `;
    listaLivrosContainer.appendChild(div);
  });
}

function renderizarEmprestimos() {
  listaEmprestimosContainer.innerHTML = "";
  const lista = listarEmprestimos(emprestimos);

  if (lista.length === 0) {
    listaEmprestimosContainer.innerHTML = "<p>Nenhum empréstimo ativo.</p>";
    return;
  }

  lista.forEach(emp => {
    const div = document.createElement("div");
    div.className = "item-list";
    div.innerHTML = `
      <div>
        <strong>Amigo: ${emp.amigo}</strong>
        <p><small>Livro: ${emp.tituloLivro}</small></p>
        <small>Data: ${emp.dataEmprestimo}</small>
      </div>
    `;
    listaEmprestimosContainer.appendChild(div);
  });
}

function atualizarEstatisticas() {
  const total = livros.length;
  const lidos = livros.filter(l => l.lido).length;
  const naoLidos = total - lidos;
  const paginas = totalPaginas(livros);

  estatisticasContainer.innerHTML = `
    <div class="stat-item"><h3>${total}</h3><p>Total</p></div>
    <div class="stat-item"><h3>${lidos}</h3><p>Lidos</p></div>
    <div class="stat-item"><h3>${naoLidos}</h3><p>Não Lidos</p></div>
    <div class="stat-item"><h3>${paginas}</h3><p>Páginas</p></div>
  `;
}

function atualizarSelectLivros() {
  selectLivro.innerHTML = '<option value="">Selecione um Livro...</option>';
  livros.forEach(livro => {
    const option = document.createElement("option");
    option.value = livro.id;
    option.textContent = livro.titulo;
    selectLivro.appendChild(option);
  });
}

// Manipuladores de Eventos
formLivro.addEventListener("submit", (e) => {
  e.preventDefault();
  const novoLivro = {
    id: Date.now(),
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    genero: document.getElementById("genero").value,
    paginas: Number(document.getElementById("paginas").value),
    lido: false
  };

  livros = adicionarLivro(livros, novoLivro);
  salvarLivros(livros);
  formLivro.reset();
  atualizarTela();
});

formEmprestimo.addEventListener("submit", (e) => {
  e.preventDefault();
  const libroId = Number(selectLivro.value);
  const livroEncontrado = livros.find(l => l.id === libroId);

  if (!livroEncontrado) return;

  const novoEmprestimo = {
    amigo: document.getElementById("nomeAmigo").value,
    livroId: libroId,
    tituloLivro: livroEncontrado.titulo,
    dataEmprestimo: document.getElementById("dataEmprestimo").value
  };

  emprestimos = registrarEmprestimo(emprestimos, novoEmprestimo);
  salvarEmprestimos(emprestimos);
  formEmprestimo.reset();
  document.getElementById("dataEmprestimo").valueAsDate = new Date();
  atualizarTela();
});

inputPesquisa.addEventListener("input", (e) => {
  const filtrados = pesquisarLivros(livros, e.target.value);
  renderizarLivros(filtrados);
});

btnNaoLidos.addEventListener("click", () => {
  renderizarLivros(listarNaoLidos(livros));
});

btnTodos.addEventListener("click", () => {
  renderizarLivros(livros);
});

window.handleMarcarLido = (id) => {
  livros = marcarComoLido(livros, id);
  salvarLivros(livros);
  atualizarTela();
};

window.handleRemoverLivro = (id) => {
  livros = removerLivro(livros, id);
  salvarLivros(livros);
  atualizarTela();
};

init();