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

  useEffect(() => {
    getFormStatus();
  }, []);

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
        setIdForm(result);
        console.log("Salvou");
      } else {
        result = undefined;
      }
    }
    console.log(id);
  }

  function handleStatusApro(event) {
    setStatus(true);
    setUserFormStatus(event);
  }

  function handleStatusRepro(event) {
    setStatus(false);
    setUserFormStatus(event);
  }

  async function getFormStatus() {
    let result;
    await api.get(`/status/`).then((response) => {
      result = response.data;
    });
    setStatus(result);
    return result;
  }

  async function setUserFormStatus(event) {
    event.preventDefault();
    try {
      await api.put('/status/', String(status), id).then(response => {
        console.log(response);
      });
    } catch(e) {
      console.log(e);
    }
  }

  // Mostra para editar o form.
  if (props.typeEdit !== false && props.typeEdit !== undefined) {
    return (
      <div className="card noselect">
        <div className="card-header"><h4 className="text-center">{props.nomeRelatorio}</h4></div>
        <div className="card-body">
          <div className="card-text">
            <p className="status-info">{props.descricaoRelatorio}</p>
          </div>
          <hr className="me-2"></hr>
          <div className="btn-group">
            <div className="btn-div-size">
              <Link to={{ pathname: `/edit/${props.id}`, params: props.id }} replace onClick={setId(props.id)}><button type="button" className="btn btnSubmitO" id="btnSubmit">Editar</button></Link>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <p className="text-center">Data limite para editar: {props.data}</p>
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
              <p className="status-info">{props.descricaoRelatorio}</p>
            </div>
            <hr className="me-2"></hr>
            <div className="card-text">
              <p className="status-comentário">{props.comentarioCoord}</p>
            </div>
            <hr className="me-2"></hr>
            <div className="btn-group">
              <Link to={{ pathname: `/adm/edit/${props.id}`, params: props.id }} replace onClick={setId(props.id)}><button type="button" className="btn btnSubmitO" id="btnSubmit">Avaliar</button></Link>
            </div>
          </div>
          <div className="card-footer ">
            <div className="btn-group">
              <div className="btn-div-size">
                <button type="button" className="btn btnSubmitApprove" id="btnSubmit" data-bs-toggle="modal" data-bs-target="#aprovado" onClick={handleStatusApro}>Aprovar</button>
              </div>
              <div className="btn-div-size">
                <button type="button" className="btn btnSubmitClose" id="btnSubmit" data-bs-toggle="modal" data-bs-target="#reprovado" onClick={handleStatusRepro}>Reprovar</button>
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
  } else {
    // Mostra apenas o status do relatório
    return (
      <div className="card noselect">
        <div className="card-header"><h4 className="text-center">{props.nomeRelatorio}</h4></div>
        <div className="card-body">
          <div className="card-text">
            <p className="status-info">{props.descricaoRelatorio}</p>
          </div>
          <hr className="me-2"></hr>
          <div className="card-text">
            <p className="status-comentário">{props.comentarioCoord}</p>
          </div>
        </div>
        <div className={"card-footer " + props.relStatus}>
          <h4 className="text-center">{props.statusDado}</h4>
        </div>
      </div>
    );
  }
}

export default Status;