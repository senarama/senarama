import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@views/Home';
import Login from '@views/Login';
import SignUp from '@views/SignUp';
import PublicRoute from './PubicRoute';

const AppRouter = () => {
  const authenticated = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={(
            <PublicRoute isAuthenticated={authenticated}>
              <Login />
            </PublicRoute>
          )}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
