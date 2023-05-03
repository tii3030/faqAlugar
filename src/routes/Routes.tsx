import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Routers,
  Route,
  Navigate,
} from 'react-router-dom';
import Error from '../components/404/404';
import Wrapper from '../wrapper/wrapper';
import Home from '../pages/Home/Home';
import Topics from '../pages/Topics/Topics';
// import Faq03 from '../pages/Content/Content';

const Routes: React.FC = () => (
  <Router>
    <Routers>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <Wrapper>
            <Home />
          </Wrapper>
        }
      />
      <Route
        path="/home/topics/:idTopic"
        element={
          <Wrapper>
            <Topics />
          </Wrapper>
        }
      />
      {/* <Route
        path="/home/topics/:idTopic/content/:idContent"
        element={
          <Wrapper>
            <Faq03 />
          </Wrapper>
        }
      /> */}
      <Route
        path="/error"
        element={
          <Wrapper>
            <Error />
          </Wrapper>
        }
      />
      <Route
        path="*"
        element={
          <Wrapper>
            <Error />
          </Wrapper>
        }
      />
    </Routers>
  </Router>
);

export default Routes;
