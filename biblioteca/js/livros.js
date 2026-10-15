// --- Gerenciamento de Livros ---

function adicionarLivro(livros, novoLivro) {
  return [...livros, novoLivro];
}

function pesquisarLivros(livros, termo) {
  if (!termo) return livros;
  return livros.filter(livro =>
    livro.titulo.toLowerCase().includes(termo.toLowerCase()) ||
    livro.autor.toLowerCase().includes(termo.toLowerCase())
  );
}

function listarNaoLidos(livros) {
  return livros.filter(livro => !livro.lido);
}

function marcarComoLido(livros, id) {
  return livros.map(livro => {
    if (livro.id === id) {
      return { ...livro, lido: true };
    }
    return livro;
  });
}

function removerLivro(livros, id) {
  return livros.filter(livro => livro.id !== id);
}

function totalPaginas(livros) {
  return livros.reduce((total, livro) => total + (Number(livro.paginas) || 0), 0);
}

function possuiLivrosNaoLidos(livros) {
  return livros.some(livro => !livro.lido);
}

function todosForamLidos(livros) {
  if (livros.length === 0) return false;
  return livros.every(livro => livro.lido);
}

// --- Gerenciamento de Empréstimos ---

function registrarEmprestimo(emprestimos, { amigo, livroId, tituloLivro, dataEmprestimo }) {
  const novoEmprestimo = {
    id: Date.now(),
    amigo,
    livroId,
    tituloLivro,
    dataEmprestimo: dataEmprestimo || new Date().toISOString().split('T')[0]
  };
  return [...emprestimos, novoEmprestimo];
}

function listarEmprestimos(emprestimos) {
  return emprestimos;
}

// --- Persistência (localStorage) ---

function salvarLivros(livros) {
  localStorage.setItem("livros", JSON.stringify(livros));
}

function carregarLivros() {
  const dados = localStorage.getItem("livros");
  return dados ? JSON.parse(dados) : [];
}

function salvarEmprestimos(emprestimos) {
  localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
}

function carregarEmprestimos() {
  const dados = localStorage.getItem("emprestimos");
  return dados ? JSON.parse(dados) : [];
}

// Exportação para o Jest
if (typeof module !== 'undefined') {
  module.exports = {
    adicionarLivro,
    pesquisarLivros,
    listarNaoLidos,
    marcarComoLido,
    removerLivro,
    totalPaginas,
    possuiLivrosNaoLidos,
    todosForamLidos,
    registrarEmprestimo,
    listarEmprestimos,
    salvarLivros,
    carregarLivros,
    salvarEmprestimos,
    carregarEmprestimos
  };
}