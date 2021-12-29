import { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import useScroll from '@hooks/useScroll';
import senaLogo from '@icons/sena.png';
import senaramaLogo from '@icons/senarama.png';
import facebookLogo from '@icons/facebook.png';
import instagramLogo from '@icons/instagram.png';
import twitterLogo from '@icons/twitter.png';
import youtubeLogo from '@icons/youtube.png';
import Contact from '@components/Contact';
import style from './style.module.scss';
import './default.css';

const Header = ({
  home,
  title,
  isAuthenticated,
  loginBtn,
}) => {
  const scroll = useScroll();
  const [showContact, setShowContact] = useState(false);

  const Title = (
    <div className={style.title}>
      <h1>{title}</h1>
    </div>
  );

  const AuthAction = (
    <Link
      className={`${style.auth_btn} ${style.auth_action}`}
      to={loginBtn ? '/login' : '/signup'}
    >
      {loginBtn ? 'Iniciar sesión' : 'Registrarse'}
    </Link>
  );

  const ExtraMenu = (
    <>
      <Link
        className={style.item_link}
        to="/projects"
      >
        Proyectos
      </Link>
      <Link
        className={style.item_link}
        to="/senarautas"
      >
        Senarautas
      </Link>
      <Link
        className={style.item_link}
        to="/billboard"
      >
        Cartelera
      </Link>
    </>
  );
  const Logout = (
    <button
      className={`${style.auth_btn} ${style.logout}`}
      type="button"
      onClick={() => {}}
    >
      Cerrar sesión
    </button>
  );

  return (
    <header>
      <Navbar
        className={`${style.navbar} ${scroll || !home ? style.active : ''}`}
        expand="lg"
        fixed="top"
        variant="dark"
      >
        <Container fluid="lg" className={style.container}>
          <div className={style.logos}>
            <Navbar.Brand
              href="https://www.sena.edu.co/es-co/Paginas/default.aspx"
            >
              <img src={senaLogo} alt="SENA" />
            </Navbar.Brand>
            <Link to="/">
              <img src={senaramaLogo} alt="SENARAMA" />
            </Link>
          </div>
          { !home && Title }
          <Navbar.Toggle aria-controls="collapse-navbar" />
          <Navbar.Collapse id="collapse-navbar">
            <Nav className={style.menu} navbarScroll>
              <Link
                className={style.item_link}
                to="/"
              >
                Inicio
              </Link>
              { home && ExtraMenu }
              <button
                className={style.item_btn}
                type="button"
                onClick={() => { setShowContact(true); }}
              >
                Contacto
              </button>
              <NavDropdown className={style.social_networks} title="REDES">
                <NavDropdown.Item
                  href="https://facebook.com"
                >
                  <img src={facebookLogo} alt="Facebook" />
                  Facebook
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://twitter.com"
                >
                  <img src={twitterLogo} alt="Twitter" />
                  Twitter
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://instagram.com"
                >
                  <img src={instagramLogo} alt="Instagram" />
                  Instagram
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://youtube.com"
                >
                  <img src={youtubeLogo} alt="YouTube" />
                  YouTube
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className={style.auth}>
              {
                isAuthenticated
                  ? Logout
                  : AuthAction
              }
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Contact show={showContact} setShow={setShowContact} />
    </header>
  );
};

export default Header;
Header.propTypes = {
  home: PropTypes.bool,
  title: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  loginBtn: PropTypes.bool,
};

Header.defaultProps = {
  home: true,
  title: 'SENARAMA',
  isAuthenticated: false,
  loginBtn: true,
};
