const {
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
} = require("../js/livros");

describe("Testes da Biblioteca (TDD)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("deve adicionar um livro à coleção", () => {
    const livros = [];
    const livro = { id: 1, titulo: "JavaScript", autor: "David Flanagan", genero: "Programação", paginas: 680, lido: false };
    const resultado = adicionarLivro(livros, livro);
    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toEqual(livro);
  });

  test("deve encontrar livros pelo título", () => {
    const livros = [
      { id: 1, titulo: "JavaScript", autor: "Autor A" },
      { id: 2, titulo: "HTML e CSS", autor: "Autor B" }
    ];
    const resultado = pesquisarLivros(livros, "javascript");
    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe("JavaScript");
  });

  test("pesquisa sem correspondência deve retornar array vazio", () => {
    const livros = [{ id: 1, titulo: "JavaScript", autor: "Autor A" }];
    const resultado = pesquisarLivros(livros, "Python");
    expect(resultado).toHaveLength(0);
  });

  test("deve retornar somente livros não lidos", () => {
    const livros = [
      { id: 1, titulo: "JavaScript", lido: false },
      { id: 2, titulo: "HTML", lido: true },
      { id: 3, titulo: "CSS", lido: false }
    ];
    const resultado = listarNaoLidos(livros);
    expect(resultado).toHaveLength(2);
    expect(resultado.map(l => l.titulo)).toEqual(["JavaScript", "CSS"]);
  });

  test("deve marcar um livro como lido", () => {
    const livros = [{ id: 1, titulo: "JavaScript", lido: false }];
    const resultado = marcarComoLido(livros, 1);
    expect(resultado[0].lido).toBe(true);
  });

  test("não deve alterar a lista quando o livro não existe ao marcar como lido", () => {
    const livros = [{ id: 1, titulo: "JavaScript", lido: false }];
    const resultado = marcarComoLido(livros, 99);
    expect(resultado).toEqual(livros);
  });

  test("deve remover um livro pelo ID", () => {
    const livros = [{ id: 1, titulo: "JS" }, { id: 2, titulo: "HTML" }];
    const resultado = removerLivro(livros, 1);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(2);
  });

  test("deve calcular o total de páginas com reduce", () => {
    const livros = [{ paginas: 100 }, { paginas: 250 }, { paginas: 150 }];
    expect(totalPaginas(livros)).toBe(500);
  });

  test("deve verificar se existem livros não lidos com some", () => {
    const livros = [{ lido: true }, { lido: false }];
    expect(possuiLivrosNaoLidos(livros)).toBe(true);
  });

  test("deve verificar se todos os livros foram lidos com every", () => {
    const livros = [{ lido: true }, { lido: true }];
    expect(todosForamLidos(livros)).toBe(true);
  });

  test("deve registrar um empréstimo com amigo, livro e data", () => {
    const emprestimos = [];
    const dados = {
      amigo: "Gabriel",
      livroId: 1,
      tituloLivro: "JavaScript: O Guia Definitivo",
      dataEmprestimo: "2026-10-15"
    };

    const resultado = registrarEmprestimo(emprestimos, dados);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].amigo).toBe("Gabriel");
    expect(resultado[0].tituloLivro).toBe("JavaScript: O Guia Definitivo");
    expect(resultado[0].dataEmprestimo).toBe("2026-10-15");
  });

  test("deve listar os empréstimos cadastrados", () => {
    const emprestimos = [
      { id: 1, amigo: "Lucas", tituloLivro: "Clean Code", dataEmprestimo: "2026-10-10" }
    ];
    expect(listarEmprestimos(emprestimos)).toEqual(emprestimos);
  });

  test("deve salvar e carregar dados no localStorage", () => {
    const livros = [{ id: 1, titulo: "JS", lido: false }];
    salvarLivros(livros);
    expect(carregarLivros()).toEqual(livros);

    const emprestimos = [{ id: 101, amigo: "Maria", tituloLivro: "JS" }];
    salvarEmprestimos(emprestimos);
    expect(carregarEmprestimos()).toEqual(emprestimos);
  });
});