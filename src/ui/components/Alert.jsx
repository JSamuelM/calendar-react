import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import PropTypes from 'prop-types';
import { useUiStore } from '../../hooks';

export const Alert = ({ show, title, type = 'blue', message = '' }) => {
  const { closeAlert } = useUiStore();
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={ show }
      leastDestructiveRef={ cancelRef }
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            { title }
          </AlertDialogHeader>
          <AlertDialogBody>
            { message }
          </AlertDialogBody>

          <AlertDialogFooter>
            {/* <Button ref={ cancelRef } onClick={ onClose }>
              Cancelar
            </Button> */}
            <Button colorScheme={ type } onClick={ closeAlert } ml={ 3 }>
              Cerrar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string
}
