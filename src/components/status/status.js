import React, { useState, useEffect, } from 'react';

// Import de libs de react.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from "react-router-dom";

import { setId } from '../../id';
import api from '../../api';

// Import de CSS.
import './status.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const Status = (props) => {
  const [id, setIdForm] = useState(props.id);
  const [status, setStatus] = useState();
  const [data, setData] = useState();
  const [avaliacao_professor, setAvalProf] = useState();

  // User e Adm.
  useEffect(() => {
    getFormStatus();
  }, []);

  async function findForm() {
    let dataForm;
    let result;

    if ((props.typeEdit !== false && props.typeEdit !== undefined) && (props.coord === undefined || props.coord === undefined)) {
      await api.get(`/formularios/aluno`).then(response => {
        dataForm = response.data;
      });
    } else {
      dataForm = undefined;
    }

    for (let value of dataForm) {
      if (id === value.cod_formulario) {
        result = value;
        setIdForm(result);
      } else {
        result = undefined;
      }
    }
    setIdForm(id.cod_formulario);
    console.log(id);
  }

  async function getFormStatus() {
    let result;
    if ((props.typeEdit !== false && props.typeEdit !== undefined) && (props.coord === undefined || props.coord === undefined)) {
      await api.get(`/status`).then(response => {

        result = response.data;
        if (result[0].status === "Enviado para o professor") {
          setStatus("Pendente");
        } else if (result[0].status === "aprovado") {
          setStatus("Aprovado");
        } else if (result[0].status === "reprovado") {
          setStatus("Reprovado");
        } else {
          setStatus("Pendente");
        }

        let d = result[0].data;
        setData(d);
      });
    } else {
      return;
    }

  }

  async function setUserFormStatus(event) {
    event.preventDefault();
    try {
      await api.put('/status/professor', { cod_formulario: id, status:  avaliacao_professor, avaliacao_professor: avaliacao_professor }).then(response => {
        console.log(response.status, response.statusText);
      });
    } catch (e) {
      console.log(e);
    }
  }
  // User e Adm.

  // Handle de aprovar
  function handleAprovar(event) {
    setAvalProf("aprovado");
    setUserFormStatus(event);
  }

  function handleReprovar(event) {
    setAvalProf("reprovado");
    setUserFormStatus(event);
  }
  

  // Mostra para editar o form.
  if (props.typeEdit !== false && props.typeEdit !== undefined) {
    return (
      <div className="card noselect">
        <div className="card-header"><h4 className="text-center">{props.nomeRelatorio}</h4></div>
        <div className="card-body">
          <div className="card-text">
            <p className="status-info">Descrição: {props.descricaoRelatorio}</p>
          </div>
          <div className="card-text">
            <p className="status-comentário">Comentário do avaliador: {props.comentarioCoord}</p>
          </div>
          <hr className="me-2"></hr>
          <div className="btn-group">
            <div className="btn-div-size">
              <Link to={{ pathname: `/edit/${props.id}`, params: props.id }} replace onClick={setId(props.id)}><button type="button" className="btn btnSubmitO" id="btnSubmit" onClick={setId(props.id)}>Editar</button></Link>
            </div>
          </div>
          <div className={"card-footer " + status}>
            <h4 className="text-center">{status}</h4>
          </div>
        </div>
        <div className="card-footer">
          <p className="text-center">Data limite para editar: {data}</p>
        </div>
      </div>
    );
  } else if ((props.coord === true)) {
    return (
      <>
        <div className="card noselect">
          <div className="card-header"><h4 className="text-center">{props.nomeRelatorio}</h4></div>
          <div className="card-body">
            <div className="card-text">
              <p className="status-info">Descrição: {props.descricaoRelatorio}</p>
            </div>
            <hr className="me-2"></hr>
            <div className="card-text">
              <p className="status-comentário">Comentário do avaliador: {props.comentarioCoord}</p>
            </div>
            <hr className="me-2"></hr>
            <div className="btn-group">
              <Link to={{ pathname: `/adm/edit/${props.id}`, params: props.id }} replace onClick={setId(props.id)}><button type="button" className="btn btnSubmitO" id="btnSubmit" onClick={setId(props.id)}>Avaliar</button></Link>
            </div>
          </div>
          <div className="card-footer ">
            <div className="btn-group">
              <div className="btn-div-size">
                <button type="button" className="btn btnSubmitApprove" id="btnSubmit" data-bs-toggle="modal" data-bs-target="#aprovado" onClick={handleAprovar}>Aprovar</button>
              </div>
              <div className="btn-div-size">
                <button type="button" className="btn btnSubmitClose" id="btnSubmit" data-bs-toggle="modal" data-bs-target="#reprovado" onClick={handleReprovar}>Reprovar</button>
              </div>
            </div>
          </div>
        </div>
        <div id="aprovado" className="modal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Relatório Aprovado</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btnSubmitB" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>

        <div id="reprovado" className="modal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Relatório Reprovado</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btnSubmitB" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Status;