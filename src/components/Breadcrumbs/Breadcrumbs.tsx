import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { Link, useParams, useLocation } from 'react-router-dom';
import { topics, content } from '../../mocks/links';
import { LinkContent, DataContent } from '../../types/links';

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const { idTopic, idContent } = useParams();
  const [routes, pushRoutes] = useState(['Home']);

  useEffect(() => {
    if (paths.length === 4) {
      const topicsPath: any = topics.filter(function (line) {
        return line.id === idTopic || '';
      })[0];
      pushRoutes(['Home', topicsPath?.title]);
    }
    if (paths.length === 6) {
      const topicsPath: any = topics.filter(function (line) {
        return line.id === idTopic || '';
      })[0];
      const contentPath: DataContent = content.filter(function (line) {
        return line.id === idContent || '';
      })[0];
      pushRoutes(['Home', topicsPath?.title, contentPath?.title]);
    }
    if (paths.length === 2) {
      pushRoutes(['Home']);
    }
  }, [idTopic, idContent]);

  const toRoute = (index: number) => {
    if (index === 0) {
      return '/home';
    }
    if (index === 1) {
      return `/home/topics/${idTopic}`;
    }
    return `/home/topics/${idTopic}/content/${idContent}`;
  };

  return (
    <nav className="Breadcrumbs">
      {routes.map((item: string, index: number) => (
        <div key={uuid()}>
          <Link
            key={uuid()}
            to={toRoute(index)}
            className={
              index === routes.length - 1
                ? 'Breadcrumb-Active'
                : 'Breadcrumb-Not-Active'
            }
          >
            {item}
          </Link>
          {index !== routes.length - 1 && (
            <span className="Breadcrumb-Arrow">&gt;</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
