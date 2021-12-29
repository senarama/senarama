import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import decodeToken from '../utils/decode-jwt';

const PrivateRoute = ({ isAuthenticated, children, requireAdmin }) => {
  const notify = (type) => {
    const options = {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    };

    switch (type) {
      case 1:
        return toast.warning('Error al comprobar el rol de usuario', options);
      case 2:
        return toast.warning('Necesita ser administrador', options);
      case 3:
        return toast.warning('Necesita iniciar sesión para acceder a esta página');
      default:
        return toast.success('Identidad verificada. Accediendo...', options);
    }
  };
  if (isAuthenticated) {
    if (requireAdmin) {
      const payload = decodeToken();
      if (payload) {
        if (payload.role === 'admin') {
          notify(1);
          return children;
        }
        notify(2);
        return <Navigate to="/home" />;
      }
      notify();
      return <ToastContainer />;
    }

    return children;
  }
  notify(3);
  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  requireAdmin: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  requireAdmin: false,
};

export default PrivateRoute;
