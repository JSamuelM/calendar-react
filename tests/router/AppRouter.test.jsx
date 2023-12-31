import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Pruebas en <AppRouter />', () => {

  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar la pantall de carga y llamar checkAuthToken', () => {
    
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    });

    render(<AppRouter />);

    expect(screen.getAllByText('Loading...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('debe de mostrar el login en caso de no estar autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Sign up')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('debe de mostrar el calendario si estamos autenticados', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    
  });


});
