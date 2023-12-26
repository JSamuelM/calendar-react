import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Calendar } from 'react-big-calendar';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar
} from '../';
import { AlertDialogCustom } from '../../components/AlertDialogCustom';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore, useAlertDialog } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
    );
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { 
    alertConfig,
    isOpen,
    onOpen,
    onClose
  } = useAlertDialog();

  const eventStyleGetter = (event /*, start, end, isSelected */) => {

    const isMyEvent = (user.uid === event.user._id) 
      || (user.uid === event.user._id);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660', 
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = () => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <Navbar />

      <AlertDialogCustom
        isAlertOpen={ isOpen }
        onOpen={ onOpen }
        onClose={ onClose }
        title={ alertConfig.title }
        body={ alertConfig.body }
        colorScheme={ alertConfig.colorScheme }
        action={ alertConfig.action }
      ></AlertDialogCustom>

      <Box px={5} py={3} sx={{ height: 'auto' }}>
        <Calendar
          culture='es'
          localizer={ localizer }
          events={ events }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 6rem)' }}
          messages={ getMessagesES }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChange }
        />

        <CalendarModal />

        <FabAddNew />
        <FabDelete />
      </Box>
    </>
  )
}
