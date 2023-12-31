import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';
import { Provider } from 'react-redux';
import { store } from '../../../src/store';

jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => {

  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el componente correctamente', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: false
    });

    render(
      <Provider store={ store }>
        <FabDelete />
      </Provider>
    );
    const btn = screen.getByLabelText('Delete');
    // console.log(btn.classList.toString());
    expect(btn.classList).toContain('chakra-button');
    expect(btn.style.display).toBe('');
  });

  test('debe de mostrar el boton si hay un evento activo', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: true
    });

    render(
      <Provider store={ store }>
        <FabDelete />
      </Provider>
    );
    const btn = screen.getByLabelText('Delete');
    // console.log(btn.classList.toString());
    expect(btn.style.display).toBe('');
  });

  test('debe de llamar startDeletingEvent si hay evento activo', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      starDeletingEvent: mockStartDeletingEvent
    });

    render(
      <Provider store={ store }>
        <FabDelete />
      </Provider>
    );
    const btn = screen.getByLabelText('Delete');
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });

});