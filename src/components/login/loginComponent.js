import React, { Component, useState } from 'react';
import { useHistory } from 'react-router';
// Import de libs de react.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from "react-router-dom";

// Import de CSS.
import '../../components/login/login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

// Import de API..
import api from "../../api";
import { login, loginError } from "../../auth";

const LoginComponent = (props) => {
  const [informacoes, setInformacoes] = useState({});
  const [erro, setErro] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [count, setCount] = useState(6);

  let history = useHistory();

  const getCountTimeout = () => {
    setTimeout(() => {
      setCount(count - 1);
    }, 2000);
  };

  async function auth(email, password, nivel) {
    try {
      await api.post("/session", {
        email: email,
        senha: password,
        nivel: nivel
      }, {timeout: 4000}).then((response) => {
        console.log(response.status, response.statusText);
        setLoginStatus(true);
        if(response.status === 200) {
          login(response.data.token);
          nivel === "aluno" ? history.push("/dashboard") : history.push("/adm/dashboard");
        }
      })
    } catch (error) {
      console.log(error);
      setLoginStatus(false);
      loginError(null);
      if (error.response.status === 400) {
        setLoginStatus(false);
        setErro("Erro de request no sistema, digitou os dados corretos ?");
      } else if (error.response.status === 404) {
        setLoginStatus(false);
        setErro("Não foi encontrado nos sistemas!");
      } else if (error.response.status === 401) {
        setLoginStatus(false);
        setErro("Requisição HTTPS não aceita.");
      } else if (error.response.status === 405) {
        setLoginStatus(false);
        setErro("Método não permitido...");
      } else if (error.response.status === 406) {
        setLoginStatus(false);
        setErro("Not Acceptable");
      } else if (error.response.status === 408) {
        setLoginStatus(false);
        setErro("Conexão com o server caiu... timeout");
      } else if (error.response.status === 413) {
        setLoginStatus(false);
        setErro("Informações adicionadas são excedem a carga do servidor.");
      } else if (error.response.status === 429) {
        setLoginStatus(false);
        setErro("Muitas tentativas de login realizadas em um periodo curto de tempo, espere um pouco e tente novamente...");
      } else {
        setLoginStatus(false);
        setErro("Erro genérico.");
      }
      setLoginStatus(false);
      loginError(null);
    }
  }

  const setInformacoesForm = (event) => {
    event.persist();
    setInformacoes(informacoes => ({
      ...informacoes,
      [event.target.name]: event.target.value,
    }));
  };

  function HandleSubmit(event) {
    event.preventDefault();
    auth(informacoes.email, informacoes.password, informacoes.nivel);
  };

  return (
    <form action="" id="loginForm" className={`${(props.showLogin === false) ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`} onSubmit={HandleSubmit}>
      <h3 className="text-center noselect">Login</h3>
      <div className="input-group form-floating">
        <input type="email" className="form-control" name="email" id="floatingInput" placeholder="Email" aria-label="Email" onChange={setInformacoesForm} />
        <label className="noselect" htmlFor="floatingInput">Email</label>
      </div>
      <div className="input-group form-floating text-center">
        <input type="password" className="form-control" name="password" id="floatingInput" placeholder="Senha" aria-label="Senha" onChange={setInformacoesForm} />
        <label className="noselect" htmlFor="floatingInput">Senha</label>
      </div>
      <div className="btn-group">
        <button className="btn" id="btnSubmit" type="submit" onClick={getCountTimeout()}>Login</button>
      </div>
      <div className="content-checkbox noselect">
        <label className="noselect">Qual o tipo do seu curso ?</label>
        <ul className="list-group-check-box">
          <li className="form-check">
            <input className="form-check-input" type="radio" name="nivel" id="cRadios1" value="professor" onChange={setInformacoesForm} />
            <label className="form-check-label" htmlFor="cRadios1">
              Professor
            </label>
          </li>
          <li className="form-check">
            <input className="form-check-input" type="radio" name="nivel" id="cRadios2" value="aluno" onChange={setInformacoesForm} />
            <label className="form-check-label" htmlFor="cRadios2">
              Aluno
            </label>
          </li>
          <li className="form-check">
            <input className="form-check-input" type="radio" name="nivel" id="cRadios2" value="coordenador" onChange={setInformacoesForm} />
            <label className="form-check-label" htmlFor="cRadios2">
              Coordenadoria
            </label>
          </li>
        </ul>
      </div>
      <div id="text-forgot-panel">
        <p className="text-center">
          {loginStatus === true
            ? `Logado, redirecionando em ` + count
            : loginStatus === false
              ? erro
              : ``}
        </p>
      </div>
    </form>
  );
}
export default LoginComponent;