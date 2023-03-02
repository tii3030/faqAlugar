import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from '../../types/links';

const RedirectButton: React.FC<Link> = (props) => {
  const { number, title, id } = props;
  const navigate = useNavigate();

  return (
    <div
      className="Redirect-Button"
      onClick={() => navigate(`/home/topics/${id}`)}
      onKeyDown={() => null}
      aria-hidden="true"
    >
      <div className="D-Flex">
        <span className="mr-8">{number}.</span>
        <span>{title}</span>
      </div>
      <div className="Circle-Button">
        <FiChevronRight color="white" size={30} />
      </div>
    </div>
  );
};

export default RedirectButton;
