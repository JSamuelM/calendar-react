import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
    }
  }

  const resetErrorMessage = ({ msg }) => {
    dispatch(clearErrorMessage(msg));
  }

  const startRegister = async ({ name, email, password }) => {
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const errors = error.response.data?.msg ||
        Object.values(error.response.data?.errors)
          .map((message) => message.msg)
          .join();
      dispatch(onLogout(errors));
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.removeItem('token');
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    localStorage.removeItem('lastView');
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  }

  return {
    // * Props
    errorMessage,
    status,
    user,

    // * Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
    resetErrorMessage
  }
}
