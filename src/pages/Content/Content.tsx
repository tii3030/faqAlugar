import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowUpCircle } from 'react-icons/fi';
import Menu from '../../components/Menu/Menu';
import { content, topics, questions } from '../../mocks/links';
import { DataContent, LinkContent } from '../../types/links';
import getRating from '../../infra/firebase/getData';
import updateRate from '../../infra/firebase/updateRate';
import { Rating } from '../../types/rating';
import { Question, TypeQuest } from '../../types/questions';

const Content: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const { idContent } = useParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [onInputClick, setOnInputClick] = useState(false);
  const [results, setResult] = useState<TypeQuest>(questions);
  const [rating, setRating] = useState<Rating>();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [loadYes, setLoadYes] = useState(false);
  const [loadNo, setLoadNo] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    if (!idContent) {
      navigate('/home');
    }
  }, []);

  useEffect(() => {
    const result = results.filter((line) =>
      line.question.toLowerCase().includes(searchInput.toLowerCase())
    );
    setResult(result);
  }, [searchInput]);

  const data: DataContent = content.filter(function (line) {
    return line.id === idContent;
  })[0];

  const handleChange = (e: any | (() => void)) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const [audioFile, setAudioFile] = useState('');

  useEffect(() => {
    async function importFile() {
      const file = await import(`../../assets/audio/${idContent}.wav`);
      setAudioFile(file?.default);
    }
    importFile();

    getRating(idContent).then((value) => {
      setRating(value);
    });
  }, [idContent]);

  const incrementRate = async (type: string) => {
    if (type === 'yes') setLoadYes(!loadYes);
    if (type === 'no') setLoadNo(!loadNo);
    await updateRate(idContent, type).then(() => {
      getRating(idContent).then((value) => {
        setRating(value);
        if (type === 'yes') setLoadYes(false);
        if (type === 'no') setLoadNo(false);
      });
    });
  };

  const onSubmit = (question: string, id: string) => {
    setSearchInput(question);
    const topic: LinkContent = topics.filter(function (line) {
      return line.links.filter(function (op) {
        return op.route === id;
      })[0];
    })[0];

    navigate(`/home/Topics/${topic.id}/content/${id}`);
  };

  return (
    <div className="Content">
      <Menu />
      <section>
        <div className="Search-Area">
          <input
            type="text"
            className="Search-Input"
            placeholder="Pesquise aqui..."
            onChange={handleChange}
            value={searchInput}
            onFocus={() => setOnInputClick(true)}
            onBlur={() => setOnInputClick(false)}
          />
          <FiSearch className="Search-Input-Button" color="#333333" size={35} />
          <div className={onInputClick ? 'Pop-Selection-02' : 'Is-Hide'}>
            <ul>
              {results?.length ? (
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
        <h1 className="Title-Content">{data.title}</h1>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        {audioFile && <audio src={audioFile} autoPlay={false} controls />}
        <div
          className="Content-Text"
          dangerouslySetInnerHTML={{
            __html: data.content.replace(/'/g, ''),
          }}
        />
        <hr />
        <span className="Rate-Text">Esse artigo foi útil?</span>
        <div className="Container-RateIt">
          <div
            className="Button-RateIt"
            onClick={() => incrementRate('yes')}
            onKeyDown={() => null}
            aria-hidden="true"
          >
            {loadYes ? (
              <div className="Loader" />
            ) : (
              <span>SIM: {rating?.yes}</span>
            )}
          </div>
          <div
            className="Button-RateIt"
            onClick={() => incrementRate('no')}
            onKeyDown={() => null}
            aria-hidden="true"
          >
            {loadNo ? (
              <div className="Loader" />
            ) : (
              <span>NÃO: {rating?.no}</span>
            )}
          </div>
        </div>
        {windowSize < 992 && (
          <div
            className="Scroll-Top"
            aria-hidden="true"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <span>Voltar ao topo</span>
            <FiArrowUpCircle size={30} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Content;
