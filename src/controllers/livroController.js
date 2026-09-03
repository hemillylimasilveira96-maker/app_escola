class Livro {
  static id_livro = 0;

  constructor(titulo, autor, ano, exemplares) {
    this.id = ++Livro.id_livro;
    this.titulo = titulo;
    this.autor = autor;
    this.ano = Number(ano);
    this.exemplares = Number(exemplares);
    this.emprestados = 0;
  }
}

const livros = [];

class LivroController {
  store(req, res) {
    const { titulo, autor, ano, exemplares } = req.body;

    livros.push(new Livro(titulo, autor, ano, exemplares));

    return res.redirect("/livros");
  }

  index(req, res) {
    const lista = livros.map((l) => ({
      ...l,
      disponiveis: l.exemplares - l.emprestados,
      disponivel: l.exemplares - l.emprestados > 0,
      situacao:
        l.exemplares - l.emprestados > 0 ? "Disponível" : "Todos emprestados",
    }));

    const total = livros.length;

    const totalExemplares = livros.reduce(
      (soma, livro) => soma + livro.exemplares,
      0,
    );

    return res.render("livros", {
      livros: lista,
      total: total,
      totalExemplares: totalExemplares,
    });
  }
}

export default new LivroController();
