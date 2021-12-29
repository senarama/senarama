import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import useForm from '@hooks/useForm';
import useTitle from '@hooks/useTitle';
import style from './style.module.scss';

const formMap = {
  userType: '',
  document: '',
  idType: '',
  userID: '',
  userName: '',
  lastName: '',
  email: '',
  description: '',
  instagram: '',
  facebook: '',
  twitter: '',
  tiktok: '',
  youtube: '',
  profile: '',
  hasProject: false,
  accept: false,
  password: '',
};

const SignUp = () => {
  useTitle('Registro | SENARAMA');
  const { data, handleChange } = useForm(formMap);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header home={false} title="Registro" />
      <div className={style.container}>
        <h2>SOLICITUD DE REGISTRO</h2>
        <p className={style.form_des}>
          Esta información sera revisada por el administrador y dependiendo
          de la validez de la información se activara su cuenta o no.
        </p>
        <Form onSubmit={handleSubmit}>
          <div className={style.content}>
            <div className={style.wrapper}>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="userType">Tipo de usuario</Form.Label>
                <Form.Select
                  aria-label="Seccion tipo de usuario"
                  id="userType"
                  onChange={handleChange}
                  required
                  value={data.type}
                >
                  <option>Seleccione el tipo se usuario</option>
                  <option value="Aprendiz">Aprendiz SENA</option>
                  <option value="Egresado">Egresado SENA</option>
                  <option value="Empleado">Empleado SENA</option>
                  <option value="Agente cultural">Agente cultural externo</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="document">Agregar documento</Form.Label>
                <Form.Control
                  aria-describedby="documentHelp"
                  id="document"
                  onChange={handleChange}
                  type="file"
                />
                <Form.Text id="documentHelp">
                  Adjunte su documento según sea su caso, e.g carnet de empleado,
                  carnet de aprendiz, diploma de egresado, RUT o camara de comercio.
                </Form.Text>
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="idType">Tipo de identificación</Form.Label>
                <Form.Select
                  id="idType"
                  onChange={handleChange}
                  required
                  value={data.idType}
                >
                  <option>Seleccione tipo de identificación</option>
                  <option value="Tarjeta de identidad/TI">Tarjeta de identidad</option>
                  <option value="Cedula de ciudadanía/CC">Cedula de ciudadanía</option>
                  <option value="Registro único tributario/RUT">Registro único tributario</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="userID">Número de documento</Form.Label>
                <Form.Control
                  id="userID"
                  onChange={handleChange}
                  type="number"
                  value={data.userID}
                />
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="userName">Nombre</Form.Label>
                <Form.Control
                  id="userName"
                  onChange={handleChange}
                  type="text"
                  value={data.userName}
                />
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="lastName">Apellidos</Form.Label>
                <Form.Control
                  id="lastName"
                  onChange={handleChange}
                  type="text"
                  value={data.lastName}
                />
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  id="email"
                  onChange={handleChange}
                  type="email"
                  value={data.email}
                />
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="password">Contraseña</Form.Label>
                <Form.Control
                  id="password"
                  onChange={handleChange}
                  type="password"
                  value={data.password}
                  required
                />
              </Form.Group>
            </div>
            <div className={style.wrapper}>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="description">
                  En breves palabras hablanos de tú experiencia
                </Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  onChange={handleChange}
                  value={data.description}
                />
              </Form.Group>
              <Form.Group className={`${style.form_group} ${style.group_social}`}>
                <Form.Label>Redes Sociales</Form.Label>
                <Form.Control
                  id="instagram"
                  onChange={handleChange}
                  placeholder="Instagram"
                  type="text"
                  value={data.instagram}
                />
                <Form.Control
                  id="facebook"
                  placeholder="Facebook"
                  onChange={handleChange}
                  value={data.facebook}
                />
                <Form.Control
                  id="twitter"
                  placeholder="Twitter"
                  onChange={handleChange}
                  type="text"
                  value={data.twitter}
                />
                <Form.Control
                  id="tiktok"
                  placeholder="Tik Tok"
                  onChange={handleChange}
                  type="text"
                  value={data.tiktok}
                />
                <Form.Control
                  id="youtube"
                  placeholder="YouTube"
                  onChange={handleChange}
                  type="text"
                  value={data.youtube}
                />
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label htmlFor="profile">Perfil profesional</Form.Label>
                <Form.Control
                  id="profile"
                  placeholder="LinkedIn..."
                  onChange={handleChange}
                  required
                  type="text"
                  value={data.profile}
                />
              </Form.Group>
              <Form.Group className={style.form_group}>
                <Form.Label>
                  ¿Tienes un proyecto en gestación relacionado con la cultura?
                  <br />
                  Ejemplo: Producción teatral, danza, música, multimedia,
                  audiovisual, mixta o transmedia.
                </Form.Label>
                <br />
                <Form.Check
                  checked={data.hasProject}
                  id="hasProject"
                  inline
                  label="Si"
                  onChange={handleChange}
                  type="radio"
                  value="yes"
                />
                <Form.Check
                  checked={!data.hasProject}
                  id="hasProject"
                  inline
                  label="No"
                  onChange={handleChange}
                  type="radio"
                  value="no"
                />
              </Form.Group>
            </div>
          </div>
          <div className={style.terms}>
            <Form.Check
              id="accept"
              type="checkbox"
            >
              <Form.Check.Input
                checked={data.accept}
                onChange={handleChange}
                type="checkbox"
              />
              <Form.Check.Label>
                Acepto los
                <Link to="/terms-and-conditions"> terminos y condiciones</Link>
              </Form.Check.Label>
            </Form.Check>
          </div>
          <div className={style.form_footer}>
            <button
              className="btn btn-success"
              type="submit"
              disabled={!data.accept}
            >
              Enviar solicitud
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
