import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ToggleColorMode } from '../../ui/components';
import { useAlertDialog, useAuthStore, useForm } from '../../hooks';
import { AlertDialogCustom } from '../../components/AlertDialogCustom';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const LoginPage = () => {

  const { startLogin, startRegister, errorMessage } = useAuthStore();
  const { alertConfig, isOpen, configAlert, onOpen, onClose, onToggle } = useAlertDialog();
  const [showPassword, setShowPassword] = useState(false);
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange
  } = useForm(registerFormFields);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  }

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      configAlert({
        title: 'Register error',
        body: 'Passwords are not the same',
        action: 'Close',
        colorScheme: 'red'
      });
      onToggle();
      return;
    }
    startRegister({
      name: registerName,
      email: registerEmail, 
      password: registerPassword
    });
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      configAlert({
        title: 'Authentication error!',
        body: errorMessage,
        action: 'Close',
        colorScheme: 'red'
      });
      onToggle();
    }
  }, [errorMessage]);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >

      <Box position="absolute" top={5} right={5}>
        <ToggleColorMode />
      </Box>

      <AlertDialogCustom 
        isAlertOpen={ isOpen }
        onOpen={ onOpen }
        onClose={ onClose }
        title={ alertConfig.title }
        body={ alertConfig.body }
        colorScheme={ alertConfig.colorScheme }
        action={ alertConfig.action }
      ></AlertDialogCustom>

      <Stack
        spacing={8}
        mx={'auto'}
        w={'500px'}
        maxWidth={'xl'}
        py={12}
        px={6}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'} mb={8}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >

          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Sign up</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={4}>
                  <form onSubmit={ onLoginSubmit }>
                    <FormControl id="loginEmail" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        name="loginEmail"
                        value={ loginEmail }
                        onChange={ onLoginInputChange }
                      />
                    </FormControl>
                    <FormControl id="loginPassword" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'}
                          name="loginPassword"
                          value={ loginPassword }
                          onChange={ onLoginInputChange }
                        />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}
                          >
                            { showPassword ? <ViewIcon /> : <ViewOffIcon /> }
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type='submit'
                        loadingText="Submitting"
                        size={'lg'}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500'
                        }}
                      >
                        Sign up
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={4}>
                  <form onSubmit={ onRegisterSubmit }>
                    <FormControl id="registerName" isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name="registerName"
                        value={ registerName }
                        onChange={ onRegisterInputChange }
                      />
                    </FormControl>
                    <FormControl id="registerEmail" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        name="registerEmail"
                        value={ registerEmail }
                        onChange={ onRegisterInputChange }
                      />
                    </FormControl>
                    <FormControl id="registerPassword" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="registerPassword"
                          value={ registerPassword }
                          onChange={ onRegisterInputChange }
                        />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}
                          >
                            { showPassword ? <ViewIcon /> : <ViewOffIcon /> }
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="confirmPassword" isRequired>
                      <FormLabel>Confirm password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="registerPassword2"
                          value={ registerPassword2 }
                          onChange={ onRegisterInputChange }
                        />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}
                          >
                            { showPassword ? <ViewIcon /> : <ViewOffIcon /> }
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type='submit'
                        loadingText="Submitting"
                        size={'lg'}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500'
                        }}
                      >
                        Register
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Box>
      </Stack>
    </Flex>
  )
}
