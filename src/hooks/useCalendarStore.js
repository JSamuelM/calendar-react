import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { activeEvent, events } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // updating
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      // creating
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent());
    } catch (error) {
      console.error('Error: ' + error.response);
      return error.response.data;
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error');
      console.log(error);
    }
  }

  return {
    // Propierties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent?.id,

    // Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}