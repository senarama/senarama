import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import SenaramaLogo from '@icons/senarama.png';
import useForm from '@hooks/useForm';
import LoginImage from '@images/login-image.jpg';
import useTitle from '@hooks/useTitle';
import Header from '@components/Header';
import style from './style.module.scss';

const formMap = {
  username: '',
  password: '',
};

const Login = () => {
  const { data, handleChange } = useForm(formMap);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useTitle('Iniciar sesión | SENARAMA');
  return (
    <>
      <Header home={false} title="Iniciar sesión" loginBtn={false} />
      <div className={style.container}>
        <div className={style.login_image}>
          <img
            src={LoginImage}
            alt="Senarama Preview"
          />
        </div>
        <div className={style.login_wrapper}>
          <div className={style.senarama_design}>
            <img
              src={SenaramaLogo}
              alt="Senarama Logo"
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormControl
                autoComplete="off"
                className={data.username ? '' : 'input-empty'}
                id="username"
                onChange={handleChange}
                placeholder="Usuario"
                type="text"
                value={data.username}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormControl
                autoComplete="off"
                className={data.password ? '' : 'input-empty'}
                id="password"
                onChange={handleChange}
                placeholder="Contraseña"
                type="password"
                value={data.password}
              />
            </FormGroup>
            <button
              className="btn btn-success"
              type="submit"
            >
              Iniciar sesión
            </button>
          </Form>
          <div className={style.login_help}>
            <p>¿Aún no eres Senarauta?</p>
            <Link to="/signup">¡Registrarse ahora!</Link>
            <Link to="/terms-and-conditions">Terminos y condiciones</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
