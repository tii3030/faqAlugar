import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { FiCodesandbox, FiHome, FiCornerRightDown } from 'react-icons/fi';
import RedirectButton from '../../components/RedirectButton/RedirectButton';
import {
  linksTenantHelp,
  landlordHelp,
  about,
  questions,
  topics,
} from '../../mocks/links';
import { Link } from '../../types/links';
import { Question, TypeQuest } from '../../types/questions';
import Aulugar from '../../assets/img/aulugar-rounded.png';
import ChooseCity from '../ChooseCity/ChooseCity';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [onInputClick, setOnInputClick] = useState(false);
  const [results, setResult] = useState<TypeQuest>(questions);

  const handleChange = (e: any | (() => void)) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const result = results.filter((person: Question) =>
      person.question.toLowerCase().includes(searchInput.toLowerCase())
    );
    setResult(result);
  }, [searchInput]);

  const onSubmit = (question: string, id: string) => {
    setSearchInput(question);
    const topic: any = topics.filter(function (line) {
      return line.links.filter(function (op) {
        return op.route === id;
      })[0];
    })[0];

    navigate(`/home/Topics/${topic.id}/content/${id}`);
  };

  return (
    <>
      <ChooseCity />
      <div className="Faq01">
        <section className="Help-Search-Area">
          <div>
            <h1>Como podemos te ajudar?</h1>
            <div className="Custom-Search">
              <input
                type="text"
                className="Custom-Search-Input"
                placeholder="Digite sua dúvida..."
                onChange={handleChange}
                value={searchInput}
                onFocus={() => setOnInputClick(true)}
                onBlur={() => setOnInputClick(false)}
              />
              <button className="Custom-Search-Button" type="submit">
                BUSCAR
              </button>
              <div className={onInputClick ? 'Pop-Selection' : 'Is-Hide'}>
                <ul>
                  {results.length ? (
                    results.map((line: Question) => (
                      <div key={uuid()}>
                        <li
                          aria-hidden="true"
                          onMouseDown={() => onSubmit(line.question, line.id)}
                        >
                          {line.question}
                        </li>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p>Não encontramos a sua dúvida ...</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="Container">
          <section className="Sections">
            <div className="Left-Section">
              <div>
                <h1>Ajuda locatário</h1>
                <span>(Inquilino)</span>
                <FiCodesandbox />
              </div>
              <div className="Description">
                <img
                  src={Aulugar}
                  alt="Aulugar-Rounded"
                  className="Aulugar-Rounded"
                />
                <p>
                  Oi, sou o Aulugar, assistente virtual da Alugar Imóveis. Aqui
                  você encontra tudo que precisa saber sobre sua locação. Acesse
                  e saiba sobre nosso aplicativo, área do cliente, pagamentos,
                  rescisão e muito mais.
                </p>
              </div>
            </div>
            <div className="Right-Section">
              <div>
                {linksTenantHelp.map((line: Link) => (
                  <RedirectButton
                    number={line.number}
                    title={line.title}
                    id={line.id}
                    key={uuid()}
                  />
                ))}
              </div>
            </div>
          </section>
          <hr />
          <section className="Sections">
            <div className="Left-Section">
              <div>
                <h1>Ajuda locador</h1>
                <span>(proprietário)</span>
                <FiHome />
              </div>
              <div className="Description">
                <img
                  src={Aulugar}
                  alt="Aulugar-Rounded"
                  className="Aulugar-Rounded"
                />
                <p>
                  Oi, sou o Aulugar, assistente virtual da Alugar Imóveis. Veja
                  como acompanhar todas as informações e status do seu imóvel
                  através do nosso aplicativo e área do cliente.
                </p>
              </div>
            </div>
            <div className="Right-Section">
              <div>
                {landlordHelp.map((line: Link) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <RedirectButton
                    number={line.number}
                    title={line.title}
                    id={line.id}
                    key={uuid()}
                  />
                ))}
              </div>
            </div>
          </section>
          <hr />
          <section className="Sections">
            <div className="Left-Section">
              <div>
                <h1>Sobre a Alugar</h1>
                <FiCornerRightDown />
              </div>
              <div className="Description">
                <img
                  src={Aulugar}
                  alt="Aulugar-Rounded"
                  className="Aulugar-Rounded"
                />
                <p>
                  Oi, sou o Aulugar, assistente virtual da Alugar Imóveis. Saiba
                  mais sobre nossos programas e diferenciais.
                </p>
              </div>
            </div>
            <div className="Right-Section">
              <div>
                {about.map((line: Link) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <RedirectButton
                    number={line.number}
                    title={line.title}
                    id={line.id}
                    key={uuid()}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
