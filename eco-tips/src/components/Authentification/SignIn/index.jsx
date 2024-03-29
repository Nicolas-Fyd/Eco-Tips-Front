import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateAuthField, submitLogin } from '@/actions/user';
import Field from '@/components/Authentification/Field';
import ErrorNotifications from '@/components/ErrorNotifications';
import SuccessNotifications from '@/components/SuccessNotifications';

function SignIn() {
  const { email, password, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeField = (newValue, identifier) => {
    const action = updateAuthField(newValue, identifier);
    dispatch(action);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitLogin());
  };
  // when token save in store navigate to home page
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <form
        autoComplete="off"
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <SuccessNotifications />
        <ErrorNotifications />
        <Field
          name="email"
          labelName="Email"
          type="email"
          placeholder="nom@exemple.com"
          onChange={changeField}
          value={email}
          autocomplete="email"
        />
        <Field
          name="password"
          labelName="Mot de passe"
          type="password"
          placeholder="********"
          onChange={changeField}
          value={password}
          autocomplete="password"
        />
        <button
          className="w-full py-1 font-bold green-button green-button:hover button-active active:animate-buttonAnimation"
          type="submit"
        >
          Se connecter
        </button>
        <p className="text-sm text-center text-gray-400">
          Vous n'avez pas encore de compte ?
          <Link to="/sign-up" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"> Inscrivez vous</Link>
        </p>

      </form>
    </div>

  );
}

export default SignIn;
