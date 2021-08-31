import React, { useState } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';

// Import de API
import api from "../../api";

// Import de CSS.
import '../login/login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const CadComponent = (props) => {
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [informacoes, setInformacoes] = useState({});

  async function HandleSubmit(event) {
    event.preventDefault();
    try {

      let numero_usp = informacoes.numero_usp;
      let nome = informacoes.nome;
      let email = informacoes.email;
      let senha = informacoes.senha;
      let nome_usuario = informacoes.nome_usuario;
      let numero_usp_professor = informacoes.numero_usp_prof;
      let lattes = informacoes.link_lattes;
      let curso = informacoes.curso;

      if (informacoes.senha === confirmeSenha) {
        await api
          .post("/aluno", {nome_usuario, email, senha, nome, numero_usp, numero_usp_professor, lattes, curso})
          .then(response => {
            alert("Usuário criado!");
          });
      } else {
        alert("Suas senhas não batem!!!!");
      }
    } catch (error) {
      
      console.log(error.res);
    }
  }

  const setInformacoesForm = (event) => {
    event.persist();
    setInformacoes(informacoes => ({
      ...informacoes,
      [event.target.name]: event.target.value,
    }));
  };

  function HandleConfirmeSenha(e) {
    setConfirmeSenha(e.target.value);
  }

  return (
    <>
      <form action="" id="registerForm" className={`${(props.showCad === false) ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`} onSubmit={HandleSubmit}>
        <h3 className="text-center noselect">Cadastro</h3>
        <div className="input-group form-floating">
          <input type="text" className="form-control" name="nome_usuario" id="floatingInput" placeholder="Usuário" aria-label="Usuário" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Usuário</label>
        </div>
        <div className="input-group form-floating">
          <input type="text" className="form-control" name="numero_usp" id="floatingInput" placeholder="Número USP" aria-label="Número USP" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Número USP</label>
        </div>
        <div className="input-group form-floating">
          <input type="email" className="form-control" name="email" id="floatingInput" placeholder="Email" aria-label="Email" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Email</label>
        </div>
        <div className="input-group form-floating">
          <input type="password" className="form-control" name="senha" id="floatingInput" placeholder="Senha" aria-label="Senha" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Senha</label>
        </div>
        <div className="input-group form-floating">
          <input type="password" className="form-control" name="confirme_senha" id="floatingInput" placeholder="Confirme a senha" aria-label="Senha" onChange={HandleConfirmeSenha} />
          <label className="noselect" htmlFor="floatingInput">Confirme a senha</label>
        </div>
        <div className="input-group form-floating">
          <input type="text" className="form-control" name="nome" id="floatingInput" placeholder="Nome" aria-label="Nome" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Nome completo</label>
        </div>
        <div className="input-group form-floating">
          <input type="text" className="form-control" name="numero_usp_prof" id="floatingInput" placeholder="Número Usp Professor" aria-label="Número Usp Professor" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Número USP do professor</label>
        </div>
        <div className="input-group form-floating">
          <input type="text" className="form-control" name="link_lattes" id="floatingInput" placeholder="Nome" aria-label="Nome" onChange={setInformacoesForm} />
          <label className="noselect" htmlFor="floatingInput">Link Lattes</label>
        </div>
        <div className="content-checkbox noselect">
          <label className="noselect">Qual o tipo do seu curso ?</label>
          <ul className="list-group-check-box">
            <li className="form-check">
              <input className="form-check-input" type="radio" name="curso" id="cRadios1" value="doutorado" onChange={setInformacoesForm} />
              <label className="form-check-label" htmlFor="cRadios1">
                Doutorado
              </label>
            </li>
            <li className="form-check">
              <input className="form-check-input" type="radio" name="curso" id="cRadios2" value="mestrado" onChange={setInformacoesForm} />
              <label className="form-check-label" htmlFor="cRadios2">
                Mestrado
              </label>
            </li>
          </ul>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn" id="btnSubmit">Registrar-se</button>
        </div>
      </form>
    </>
  );
}
export default CadComponent;