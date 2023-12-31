import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState, notAuthenticatedState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {

  test('debe de regresar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('debe de realizar un login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      ...authenticatedState,
      user: testUserCredentials
    });
  });

  test('debe de realizar el logout', () => {
    const errorMessage = 'Credenciales no validas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage
    });
  });

  test('debe de limpiar el mensaje de error', () => {
    const errorMessage = 'Credenciales no validas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
