import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en calendarApi', () => {

  test('debe de tener la configuracion por defecto', () => {
    // console.log(calendarApi);
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('debe de tener el x-token en el header de todas las peticiones', async () => {
    const token = 'ABC-123-XYZ';
    localStorage.setItem('token', token);
    try {
      const res = await calendarApi.get('/auth')
        .then(res => res)
        .catch(res => res);

      expect(res.config.headers['x-token']).toBe(token);
    } catch (error) {
      console.log(error.response.data);
    }
  });

});
