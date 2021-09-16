import React, { useState, useEffect, } from 'react';

// Import de libs de react.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from "react-router-dom";

// Import de componenets
import Navbar from '../../components/navbar/navbar';
import Profile from '../../components/profile/profile';
import Status from '../../components/status/status';

// Import de API.
import api from '../../api';

// Import de CSS.
import './dashboard.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const vetor_pessoas = [
  {
    idRelatorio: 1,
    nomeRelatorio: "Relatório A",
    descricaoRelatorio: "desc A",
    comentarioCoord: "comentou A",
    statusDado: "Aprovado",
    data: "06/06/2021",
    formulario: {},
  },
  {
    idRelatorio: 2,
    nomeRelatorio: "Relatório D",
    descricaoRelatorio: "desc D",
    comentarioCoord: "comentou D",
    statusDado: "Reprovado",
    data: "07/06/2021",
    formulario: {},
  },
  {
    idRelatorio: 3,
    nomeRelatorio: "Relatório E",
    descricaoRelatorio: "desc E",
    comentarioCoord: "comentou E",
    statusDado: "Pendente",
    data: "18/09/2021",
    formulario: {},
  },
  {
    idRelatorio: 4,
    nomeRelatorio: "Relatório F",
    descricaoRelatorio: "desc F",
    comentarioCoord: "comentou F",
    statusDado: "Pendente",
    data: "03/03/2021",
    formulario: {},
  },
]

const vetor_vetor_pessoas = [
  vetor_pessoas,
  vetor_pessoas
]

const Dashboard = (props) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getForms();
  }, []);

  async function getForms() {
    let result;
    await api.get(`/formularios/aluno`).then((response) => {
      result = response.data;
    });
    setFormData(result);
    return result;
  }

  return (
    <>
      <Navbar />
      <div id="main-dash">

        <div className="container info">
          <div className="row">
            <div className="col list-menu-options">
              <div className="list-menu list-group list-group" id="list-tab" role="tablist">
                <Link to={{ pathname: "/Form/" }} className="list-menu-item list-group-item list-group-item-action noselect" role="tab" aria-controls="enviar formulário">Enviar Formulário</Link>
                <button className="list-menu-item list-group-item list-group-item-action noselect" data-bs-toggle="list" href="#list-editar-form" role="tab" aria-controls="list-profile">Editar Formulário</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" data-bs-toggle="list" href="#list-status-form" role="tab" aria-controls="list-messages">Status Formulário</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" data-bs-toggle="list" href="#list-perfil" role="tab" aria-controls="list-settings">Perfil</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade" id="list-editar-form" role="tabpanel" aria-labelledby="list-profile-list">
                  <div className="container">
                    { // Primeiro vetor pega um vetor de relatórios e passa em cada uma row
                      formData === undefined ? "" : formData.map((element, index) => {
                        return (
                          <div className="row" key={index}>
                            { // Parse do vetor que contém as colunas.
                              <div className="col" key={index}>
                              <Status
                                id={ element.cod_formulario}
                                nomeRelatorio={"Relatório " + element.cod_formulario}
                                descricaoRelatorio={ element.declaracao}
                                comentarioCoord={ element.comentario_orientador}
                                statusDado={ element.statusDado}
                                relStatus={ element.statusDado}
                                data={ element.data}
                                form={ element.formulario}
                                typeEdit={true}
                              />
                            </div>
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <div className="tab-pane fade" id="list-status-form" role="tabpanel" aria-labelledby="list-messages-list">
                  <div className="container">
                    { // Primeiro vetor pega um vetor de relatórios e passa em cada uma row
                      formData === undefined ? "" : formData.map((element, index) => {
                        return (
                          <div className="row" key={index}>
                            { // Parse do vetor que contém as colunas.
                              <div className="col" key={index}>
                              <Status
                                id={ element.cod_formulario}
                                nomeRelatorio={"Relatório " + element.cod_formulario}
                                descricaoRelatorio={ element.declaracao}
                                comentarioCoord={ element.comentario_orientador}
                                statusDado={ element.statusDado}
                                relStatus={ element.statusDado}
                                data={ element.data}
                                form={ element.formulario}
                                typeEdit={true}
                              />
                            </div>
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <div className="tab-pane fade" id="list-perfil" role="tabpanel" aria-labelledby="list-settings-list">
                  <Profile tipo={props.perfilType} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container noselect" id="about">
          <div className="row">
            <div className="col">
              <div><h2 className="text-center">Sobre</h2></div>
              <div>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit nisl vitae neque sodales placerat. Mauris leo lacus, ultricies sed egestas eget, gravida a magna. Quisque efficitur lectus a condimentum egestas. Curabitur erat sapien, tempus dictum orci ut, vulputate eleifend ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam sed varius mi, vitae suscipit orci. Nulla ante eros, blandit in ultricies sed, tincidunt et ligula. Cras blandit accumsan sem, ac eleifend purus ornare quis. Vestibulum eget sem eu leo vulputate placerat non sed justo. Maecenas lacinia dignissim mauris nec vulputate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;