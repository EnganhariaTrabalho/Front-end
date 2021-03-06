import React, { useState, useEffect, } from 'react';

// Import de libs de react.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de componenets
import Navbar from '../../components/navbar/navbar';

// Import de API..
import api from "../../api";
import { getId } from "../../id";

// Import de CSS.
import './form.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const EditForm = (props) => {
  const id = getId();
  console.log(id);
  // Variáveis do formulário.
  
  const [informacoes, setInformacoes] = useState({});
  const [idAluno, setIdAluno] = useState(false);
  const [editForm, setForm] = useState({});

  async function HandleSubmit(event) {
    event.preventDefault();
    // Objeto a ser enviado
    let form = {
      tipo_curso: informacoes.tipoCurso,
      semestre: informacoes.semestre,
      aprovacao_grad: informacoes.aprovacaoGrad,
      aprovacao_opt: informacoes.aprovacaoOpt,
      conceitos: informacoes.conceitos,
      reprova_total: informacoes.reprovadoTotal,
      reprova_ultimo_semestre: informacoes.reprovadoUltimoSemestre,
      aprova_proef: informacoes.aprovaProef,
      exame_quali: informacoes.exameQualificador,
      limite_quali: informacoes.limiteQuali,
      limite_tese: informacoes.limiteTese,
      artigos_aceito: informacoes.artigoAceito,
      artigos_aguardando: informacoes.artigoAguardando,
      estagio_artigo_submissao: informacoes.artigoEstagioSubmissao,
      estagio_pesquisa: informacoes.estagioPesquisa,
      participou_congresso_nacional: informacoes.partiCongressoNacional,
      participou_congresso_exterior: informacoes.partiCongressoExterior,
      participou_pesquisa_exterior: informacoes.partiPesquisaExterior,
      algo_declarar: informacoes.algoDeclarar,
      ultima_atualizacao_do_lattes: informacoes.ultimaAtualizacaoDolattes,
      resultado_ultima_avaliacao: informacoes.resultadoUltimaAvaliacao,
      id_aluno: idAluno
    }
    console.log(form);
    try {
      await api
        .put(`/formularios`, {
            semestre_curso: form.semestre,
            ultima_atualizacao_do_lattes: form.ultima_atualizacao_do_lattes,
            resultado_ultima_avaliacao: form.resultado_ultima_avaliacao,
            aprovacao_obrigatorias: form.aprovacao_grad,
            aprovacao_optativas: form.aprovacao_opt,
            conceitos: form.conceitos,
            disciplinas_repovadas_curso: form.reprova_total,
            disciplinas_repovadas_semestre: form.reprova_ultimo_semestre,
            exame_proeficiencia: form.aprova_proef,
            exame_de_qualificacao: form.exame_quali,
            limite_max_qualificacao: form.limite_quali,
            tempo_limite_deposito: form.limite_tese,
            artigos_publicados: form.artigos_aceito,
            artigos_espera: form.artigos_aguardando,
            artigo_preparacao: form.estagio_artigo_submissao,
            estagio_atual_pesquisa: form.estagio_pesquisa,
            congresso: form.participou_congresso_nacional,
            congresso_exterior: form.participou_congresso_exterior,
            pesquisa_exterior: form.participou_pesquisa_exterior,
            declaracao: form.algo_declarar
          }
        )
        .then((response) => {
          console.log(response.status, response.statusText);
          alert("Formulário atualizado!!!");
        })

      props.history.push("/dashboard");
    } catch (error) {
      console.log(error.response.status, error.response.statusText);
    }
  }

  const setInformacoesForm = (event) => {
    event.persist();
    setInformacoes(informacoes => ({
      ...informacoes,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    findForm();
  }, []);

  async function findForm() {
    let data;
    let result;

    await api.get(`/formularios/aluno`).then(response => {
      data = response.data;
    });

    for (let value of data) {
      console.log("Pegando form: ",id);
      console.log(value.cod_formulario);
      console.log("id === value.cod_formulario ", id === value.cod_formulario);
      if(id === value.cod_formulario) {
        result = value;
        setForm(result);
        console.log("Salvou");
      } else {
        result = undefined;
      }
    }
    console.log(editForm);
  }

  function submitNewForm() {
    // TODO
    // SUBMIT(id);
  }

  function HandleIdAluno(e) {
    setIdAluno(e.target.value);
  }

  return (
    <>
      <div id="main-form">
        <Navbar isOnFormsPage={true} isCoord={false} />
        <div id="container">
          <h1 className="text-center noselect">Formulário a ser enviado.</h1>
          <form className="form container" onSubmit={HandleSubmit}>
            <h2 className="noselect">Dados gerais<hr className="my-2"></hr></h2>
            <h4 className="noselect">Ultima atualização do perfil lattes.</h4>
            <div className="form-wrapper">
              <label>Em quantas disciplinas obrigatórias você já obteve aprovação ?</label>
              <div className="input-group form-floating">
                <input type="name" className="defaultInput form-control" name="ultimaAtualizacaoDolattes" id="floatingInput" placeholder="Insira uma data válida" aria-label="ultima Atualização Do lattes, ultima Atualização Do lattes" onChange={setInformacoesForm} />
                <label className="noselect" htmlFor="floatingInput">Resposta</label>
              </div>
            </div>
            <h4 className="noselect">Qual foi o resultado da avaliação do seu último relatório?</h4>
            <div className="content-checkbox noselect">
              <label className="noselect">Marcar apenas 1 oval:</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="resultadoUltimaAvaliacao" id="apRadios1" value="aprovado" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="apRadios1">
                    Aprovado.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="resultadoUltimaAvaliacao" id="apRadios2" value="aprovado-ressalvas" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="apRadios2">
                    Aprovado com ressalvas.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="resultadoUltimaAvaliacao" id="apRadios3" value="insatisfatorio" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="apRadios3">
                    Insatisfatório.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="resultadoUltimaAvaliacao" id="apRadios4" value="primeiro-relatorio" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="apRadios4">
                    Não se aplica(é meu primeiro relatório).
                  </label>
                </li>
              </ul>
            </div>
            <h4 className="noselect">Referente ao ultimo semestre concluido.</h4>
            <div className="content-checkbox noselect">
              <label className="noselect">(Ignorar se for do mestrado) Semestre atual:</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="bRadios1" value="1" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="bRadios1">
                    1° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="bRadios2" value="2" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="bRadios2">
                    2° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="bRadios3" value="3" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="bRadios3">
                    3° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="bRadios4" value="4" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="bRadios4">
                    4° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="bRadios5" value="5" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="bRadios5">
                    5° semestre
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox noselect">
              <label className="noselect">(Apenas para quem é do mestrado) Semestre atual:</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios1" value="1" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios1">
                    1° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios2" value="2" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios2">
                    2° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios3" value="3" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios3">
                    3° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios4" value="4" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios4">
                    4° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios5" value="5" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios5">
                    5° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios6" value="6" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios6">
                    6° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios7" value="7" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios7">
                    7° semestre
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="semestre" id="mRadios8" value="8" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="mRadios8">
                    8° semestre
                  </label>
                </li>
              </ul>
            </div>
            <h2 className="noselect">Atividades didáticas <hr className="my-2"></hr></h2>
            <div className="form-wrapper">
              <label>Em quantas disciplinas obrigatórias você já obteve aprovação ?</label>
              <div className="input-group form-floating">
                <input type="name" className="defaultInput form-control" name="aprovacaoGrad" id="floatingInput" placeholder="Nome" aria-label="Nome" onChange={setInformacoesForm} />
                <label className="noselect" htmlFor="floatingInput">Resposta</label>
              </div>
            </div>
            <div className="form-wrapper">
              <label>Em quantas disciplinas optativas você já obteve aprovação ?</label>
              <div className="input-group form-floating">
                <input type="name" className="defaultInput form-control" name="aprovacaoOpt" id="floatingInput" placeholder="Nome" aria-label="Nome" onChange={setInformacoesForm} />
                <label className="noselect" htmlFor="floatingInput">Resposta</label>
              </div>
            </div>

            <div className="content-checkbox">
              <label className="noselect">
                Todos os conceitos em disciplinas cursadas no último semestre já foram divulgados? Caso não, espere até 2 dias antes da data máxima definida no site do PPgSI para enviar o seu relatório.
              </label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="conceitos" id="disciplinaRadios1" value="Sim" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="disciplinaRadios1">
                    Sim.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="conceitos" id="disciplinaRadios2" value="Não" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="disciplinaRadios2">
                    Não.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">Em quantas disciplinas você foi reprovado desde o início do mestrado/doutorado?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoTotal" id="repRadios1" value="0" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repRadios1">
                    0
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoTotal" id="repRadios2" value="1" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repRadios2">
                    1
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoTotal" id="repRadios3" value="2" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repRadios3">
                    2
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">Em quantas disciplinas vocês foi reprovado no último semestre cursado?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoUltimoSemestre" id="repSemestreRadios1" value="0" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repSemestreRadios1">
                    0
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoUltimoSemestre" id="repSemestreRadios2" value="1" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repSemestreRadios2">
                    1
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoUltimoSemestre" id="repSemestreRadios3" value="2" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repSemestreRadios3">
                    2
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="reprovadoUltimoSemestre" id="repSemestreRadios4" value="terminado" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repSemestreRadios4">
                    Já temrinei as disciplinas.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">Você já foi aprovado no exame de proficiência em idiomas?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="aprovaProef" id="idiomaRadios1" value="Sim" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="idiomaRadios1">
                    Sim.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="aprovaProef" id="idiomaRadios2" value="Não" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="idiomaRadios2">
                    Não.
                  </label>
                </li>
              </ul>
            </div>

            <h2 className="noselect">Atividades de pesquisa <hr className="my-2"></hr></h2>
            <div className="content-checkbox">
              <label className="noselect">Você realizou o exame de qualificação ?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="exameQualificador" id="exameRadios1" value="Sim-Aprovado" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="exameRadios1">
                    Sim, fui aprovado.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="exameQualificador" id="exameRadios2" value="Sim-Reprovado" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="exameRadios2">
                    Sim, fui reprovado.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="exameQualificador" id="exameRadios3" value="Não" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="exameRadios3">
                    Não.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">Se não qualificou, quanto tempo falta para o limite máximo de qualificação?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="limiteQuali" id="repQualificarTempo1" value="3" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repQualificarTempo1">
                    Menos de 3 meses.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="limiteQuali" id="repQualificarTempo2" value="6" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repQualificarTempo2">
                    Entre 3 a 6 meses.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="limiteQuali" id="repQualificarTempo3" value="7" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="repQualificarTempo3">
                    Mais de 6 meses.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">
                Se você já fez sua qualificação e foi aprovado, quanto tempo falta para o limite máximo do depósito da sua dissertação/tese?
              </label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="limiteTese" id="aprQualificarTempo1" value="3" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="aprQualificarTempo1">
                    Menos de 3 meses.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="limiteTese" id="aprQualificarTempo2" value="6" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="aprQualificarTempo2">
                    Entre 3 a 6 meses.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="limiteTese" id="aprQualificarTempo3" value="7" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="aprQualificarTempo3">
                    Mais de 6 meses.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">
                Quantos artigos referentes a sua pesquisa de mestrado/doutorado você teve aceitos ou publicados? (Obs: Você deve inserir os artigos publicados no seu currículo Lattes)
              </label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoAceito" id="lattesRadios1" value="0" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="lattesRadios1">
                    0.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoAceito" id="lattesRadios2" value="1" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="lattesRadios2">
                    1.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoAceito" id="lattesRadios3" value="2" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="lattesRadios3">
                    Mais de 2.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">Quantos artigos você submeteu e ainda estão aguardando resposta?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoAguardando" id="aguardoLattesRadios1" value="0" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="aguardoLattesRadios1">
                    0.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoAguardando" id="aguardoLattesRadios2" value="1" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="aguardoLattesRadios2">
                    1.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoAguardando" id="aguardoLattesRadios3" value="2" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="aguardoLattesRadios3">
                    Mais de 2.
                  </label>
                </li>
              </ul>
            </div>

            <div className="content-checkbox">
              <label className="noselect">Você possui artigo em preparação para submissão? Qual o estágio dele?</label>
              <ul className="list-group list-group-check-box">
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoEstagioSubmissao" id="artigoRadios1" value="nao-passou" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="artigoRadios1">
                    Não passuo.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoEstagioSubmissao" id="artigoRadios2" value="em-elaboracao" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="artigoRadios2">
                    Experimentos em elaboração.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoEstagioSubmissao" id="artigoRadios3" value="em-coleta-de-dados" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="artigoRadios3">
                    Aguardando coleta de dados.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoEstagioSubmissao" id="artigoRadios4" value="em-fase-escrita" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="artigoRadios4">
                    Em fase de escrita.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoEstagioSubmissao" id="artigoRadios5" value="em-fase-traducao" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="artigoRadios5">
                    Em fase de tradução.
                  </label>
                </li>
                <li className="form-check">
                  <input className="form-check-input" type="radio" name="artigoEstagioSubmissao" id="artigoRadios6" value="em-preparo-repostas-revisores" onChange={setInformacoesForm} />
                  <label className="form-check-label" htmlFor="artigoRadios6">
                    Preparando respostas para os revisores.
                  </label>
                </li>
              </ul>
            </div>

            <div className="form-wrapper">
              <label className="noselect">
                Qual o estágio atual de sua pesquisa? Apresente toda e qualquer atividade que já tenha sido realizada no contexto de seu projeto de pesquisa (mesmo que ainda incompleta). Faça uma descrição detalhada.
              </label>
              <textarea type="name" className="defaultTextArea form-control" name="estagioPesquisa" id="floatingInput" aria-label="Nome" onChange={setInformacoesForm} />
            </div>

            <div className="form-wrapper">
              <label className="noselect">
                Você participou de algum congressos no país? Se sim, indicar local, se houve apresentação de trabalho e se o congresso é ou não internacional.
              </label>
              <textarea type="name" className="defaultTextArea form-control" name="partiCongressoNacional" id="floatingInput" aria-label="Nome" onChange={setInformacoesForm} />
            </div>

            <div className="form-wrapper">
              <label className="noselect">
                Você participou de algum congresso no exterior? Se sim, indicar local e se houve apresentação de trabalho.
              </label>
              <textarea type="name" className="defaultTextArea form-control" name="partiCongressoExterior" id="floatingInput" aria-label="Nome" onChange={setInformacoesForm} />
            </div>

            <div className="form-wrapper">
              <label className="noselect">
                Você realizou algum estágio de pesquisa ou visita de pesquisa no exterior (incluindo sanduíche)? Se sim, indique o nome da universidade e o período.
              </label>
              <textarea type="name" className="defaultTextArea form-control" name="partiPesquisaExterior" id="floatingInput" aria-label="Nome" onChange={setInformacoesForm} />
            </div>

            <div className="form-wrapper">
              <label className="noselect">Você tem algo a mais a declarar para a CCP - PPgSI?</label>
              <textarea type="name" className="defaultTextArea form-control" name="algoDeclarar" id="floatingInput" aria-label="Você tem algo a mais a declarar para a CCP - PPgSI?" onChange={setInformacoesForm} />
            </div>

            <div className="btn-group">
              <div className="btn-div-size">
                <button type="submit" className="btn btnSubmitO" id="btnSubmit">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditForm;