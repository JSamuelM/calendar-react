import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { Center, Flex, Spinner, Text, VStack } from '@chakra-ui/react';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'

  useEffect(() => {
    checkAuthToken()
  }, []);

  if (status === 'checking') {
    return (
      <Flex height="100vh" justifyContent="center">
        <Center>
          <VStack spacing={ 4 }>
            <Spinner size="xl" />
            <Text fontSize="xl">Loading...</Text>
          </VStack>
        </Center>
      </Flex>
    )
  }  

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? (
            <>
              <Route path="/" element={ <CalendarPage /> } />
              <Route path="/*" element={ <Navigate to="/" /> } />
            </>
          )
          : (
            <>
              <Route path="/auth/*" element={ <LoginPage /> } />
              <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            </>
          )
      }
    </Routes>
  )
}
