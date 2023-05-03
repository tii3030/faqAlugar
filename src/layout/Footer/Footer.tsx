import React from 'react';
import { FiInstagram, FiFacebook } from 'react-icons/fi';
import Logo from '../../assets/img/logo.png';

const Footer: React.FC = () => {
  return (
    <div className="Footer-Container">
      <div>
        <div className="Col">
          <div className="Cols">
            <h5>INSTITUCIONAL</h5>
            <a href="https://www.rotina.com.br/sobre">Quem somos ?</a>
            <a href="https://centraldeajudarotina.com.br/">Central de ajuda</a>
          </div>
          <div>
            <h5>IMÓVEIS</h5>
            <div className="Cols">
              <a href="https://www.rotina.com.br/anuncie-seu-imovel">
                Anuncie com a Rotina
              </a>
              <a href="https://www.rotina.com.br/aluguel/comercial">
                Comerciais
              </a>
              <a href="https://www.rotina.com.br/aluguel/apartamento">
                Apartamentos
              </a>
              <a href="https://www.rotina.com.br/aluguel/casa">Casas</a>
              <a href="https://www.rotina.com.br/venda/imovel/brasil/todos-os-bairros/todos-os-condominios/apenas-lancamentos">
                Lançamentos
              </a>
              <a href="https://www.rotina.com.br/aluguel/chacara">Chácaras</a>
              <a href="https://www.rotina.com.br/aluguel/terreno">Terrenos</a>
              <a href="https://www.rotina.com.br/aluguel/cobertura">
                Coberturas
              </a>
            </div>
          </div>
        </div>
        <div className="Cols Icons-Footer">
          <h5>CONTATO</h5>
          <a href="https://www.rotina.com.br/contato">Fale com a gente</a>
          <p>CRECI PJ 132</p>
          <div>
            <a
              href="https://www.instagram.com/alugarbr/"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram color="#EAF300" size={30} />
            </a>
            <a
              href="https://www.facebook.com/alugarbr/"
              target="_blank"
              rel="noreferrer"
            >
              <FiFacebook color="#EAF300" size={30} />
            </a>
          </div>
        </div>
      </div>
      <div>
        <a href="https://www.rotina.com.br/">
          <img src={Logo} alt="Rotina Imobiliária" className="Logo" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
