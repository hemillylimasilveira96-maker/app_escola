import { livros } from "../models/livroController.js";
import { alunos } from "../models/alunoController.js";

class Emprestimo {
  constructor(id, livro, usuario, data_emprestimo, data_devolucao) {
    this.id = id;
    this.livro = livro;
    this.usuario = usuario;
    this.data_emprestimo = data_emprestimo;
    this.data_devolucao = data_devolucao;
  }
}

const emprestimos = [];

class EmprestimoController {
  index(req, res) {
    return res.json({ message: "Emprestimos", emprestimos, livros, alunos });
  }

  cadastrarEmprestimo(req, res) {
    const { livroID, alunoID, data_emprestimo, data_devolucao } = req.body;
    const livro = livros.find((livro) => livro.id === livroID);
    const aluno = alunos.find((aluno) => aluno.id === alunoID);

    if (!livro || !aluno) {
      return res
        .status(404)
        .json({ message: "Livro ou aluno não encontrado." });
    }

    livro.disponivel = false;
    const emprestimo = new Emprestimo(
      emprestimos.length + 1,
      livro,
      aluno,
      data_emprestimo,
      data_devolucao
    );
    emprestimos.push(emprestimo);
    return res.redirect("/emprestimos");
  }
}

export { emprestimos };
export default new EmprestimoController();