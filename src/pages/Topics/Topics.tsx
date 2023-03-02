import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronsDown, FiSearch } from 'react-icons/fi';
import { topics } from '../../mocks/links';
import { Content } from '../../types/links';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const Topics: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const { idTopic } = useParams();
  const navigate = useNavigate();
  const links: any = topics.filter(function (line) {
    return line.id === idTopic;
  })[0];
  const [searchInput, setSearchInput] = useState('');
  const [onInputClick, setOnInputClick] = useState(false);
  const [results, setResult] = useState<Content[]>();
  const currentPath = window.location.pathname;

  const handleChange = (e: any | (() => void)) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const result = links?.links.filter((line: Content) =>
      line.titleLink.toLowerCase().includes(searchInput.toLowerCase())
    );
    setResult(result);
  }, [searchInput]);

  useEffect(() => {
    if (links === undefined) {
      navigate(`/error`);
    }
  }, [links]);

  const [isSubLinks, setIsSubLinks] = useState<string | undefined>('');

  return (
    <div className="Topics">
      <section className="Top-Section">
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
                results.map((line: Content) => (
                  <div key={uuid()}>
                    <li
                      aria-hidden="true"
                      onMouseDown={() => setSearchInput(line.titleLink)}
                    >
                      {line.titleLink}
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
        <div>
          <h1>{links?.title}</h1>
          <div
            className="SubTitle"
            dangerouslySetInnerHTML={{
              __html: links?.subTitle.replace(/'/g, ''),
            }}
          />
        </div>
      </section>
      <section className="Links-Section">
        <div>
          {results?.map((line: Content) =>
            !line.subLinks ? (
              <div
                key={uuid()}
                onClick={() => navigate(`${currentPath}/content/${line.route}`)}
                onKeyDown={() => null}
                aria-hidden="true"
              >
                <span key={uuid()}>{line.titleLink}</span>
                <hr />
              </div>
            ) : (
              <div
                key={uuid()}
                onClick={() => setIsSubLinks(line.titleLink)}
                onKeyDown={() => null}
                aria-hidden="true"
              >
                <div className='Line-Collapsible'>
                  <span key={uuid()}>{line.titleLink}</span>
                  {isSubLinks === line.titleLink 
                    ? <FiChevronDown size={23} />
                    : <FiChevronRight size={23} />
                  }
                </div>
                <hr />
                <div
                  className={
                    isSubLinks === line.titleLink
                      ? 'Sub-Links Open-Sub'
                      : 'Close-Sub'
                  }
                >
                  {line.subLinks?.map((subLine: any) => (
                    <div
                      key={uuid()}
                      onClick={() =>
                        navigate(`${currentPath}/content/${subLine.route}`)
                      }
                      onKeyDown={() => null}
                      aria-hidden="true"
                    >
                      <span key={uuid()}>{subLine.titleLink}</span>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Topics;
