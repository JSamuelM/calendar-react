export const events = [
  {
    id: 1,
    start: new Date('2023-10-21 13:00:00'),
    end: new Date('2023-10-21 15:00:00'),
    title: 'Cumpleaños de Sammy',
    notes: 'Nota normal',
  },
  {
    id: 2,
    start: new Date('2023-12-02 13:00:00'),
    end: new Date('2023-12-02 15:00:00'),
    title: 'Cumpleaños Mami',
    notes: 'Nota normal',
  }
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] }
}
