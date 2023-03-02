import React, { useRef, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { Link, useParams } from 'react-router-dom';
import { FiChevronDown, FiXCircle } from 'react-icons/fi';
import { topics } from '../../mocks/links';
import { LinkContent, Content } from '../../types/links';

const Menu: React.FC = () => {
  const { idTopic, idContent } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const [isOpen, handleMenu] = useState(false);

  const icon = () => {
    if (windowSize < 993 && !isOpen) {
      return <FiChevronDown />;
    }
    if (windowSize < 993 && isOpen) {
      return <FiXCircle />;
    }
    return null;
  };

  const links: LinkContent = topics.filter(function (line) {
    return line.id === idTopic;
  })[0];

  return (
    <div ref={ref} className="Menu">
      <div className="Drawer-Header">
        <div
          className="About-More"
          aria-hidden="true"
          onClick={() => (windowSize < 993 ? handleMenu(!isOpen) : null)}
        >
          <span>Mais sobre o assunto:</span>
          {icon()}
        </div>
      </div>
      <div className="Drawer-Container">
        <ul className={isOpen || windowSize > 992 ? 'Open' : 'Close'}>
          {links?.links.map((line: Content) => (
            <li
              key={uuid()}
              className={idContent === line.route ? 'Active' : ''}
            >
              <Link to={`/home/topics/${idTopic}/content/${line.route}`}>
                <span className="Item">{line.titleLink}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
