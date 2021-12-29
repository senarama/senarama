import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import useForm from '@hooks/useForm';
import style from './style.module.scss';

const formMap = {
  type: '',
  userName: '',
  email: '',
  issue: '',
  message: '',
};

const Contact = ({ show, setShow }) => {
  const { data, handleChange } = useForm(formMap);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={style.modal_header}>
        <Modal.Title>Contacto (SENARAMA)</Modal.Title>
      </Modal.Header>
      <div className={style.form_wrapper}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className={style.form_group}>
              <Form.Select
                aria-label="Tipo de pregunta / asunto"
                id="type"
                onChange={handleChange}
                required
                value={data.type}
              >
                <option>Seleccione un asunto</option>
                <option value="Petición">Petición</option>
                <option value="Queja">Queja</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Sugerencia">Sugerencia</option>
                <option value="Soporte tecnico">Soporte tecnico</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className={style.form_group}>
              <Form.Control
                id="userName"
                onChange={handleChange}
                placeholder="Nombre"
                required
                type="text"
                value={data.userName}
              />
              <Form.Control
                id="email"
                onChange={handleChange}
                placeholder="Correo"
                required
                type="email"
                value={data.email}
              />
              <Form.Control
                autoComplete="off"
                id="issue"
                onChange={handleChange}
                placeholder="Asunto"
                required
                type="text"
                value={data.issue}
              />
            </Form.Group>
            <Form.Group className={style.form_group}>
              <Form.FloatingLabel id="message" label="Mensaje">
                <Form.Control
                  as="textarea"
                  autoComplete="off"
                  id="message"
                  onChange={handleChange}
                  placeholder="Mensaje"
                  required
                />
              </Form.FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className={style.modal_footer}>
            <button
              type="submit"
              className="btn btn-outline-success"
            >
              Enviar
            </button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

Contact.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default Contact;
