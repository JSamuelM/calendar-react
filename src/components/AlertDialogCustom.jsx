import { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'

export const AlertDialogCustom = ({
  title, body = '', action, colorScheme = 'blue',
  isAlertOpen, onClose, confirm = false, handleClick
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={ isAlertOpen }
      leastDestructiveRef={ cancelRef }
      onClose={ onClose }
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            { title }
          </AlertDialogHeader>

          <AlertDialogBody>
            { body }
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button 
              colorScheme={ colorScheme } onClick={ onClose } ml={ 3 }
              variant={ confirm ? 'outline' : 'solid' }
            >
              { action }
            </Button>
            {
              confirm &&
                <Button colorScheme="red" onClick={ handleClick } ml={ 3 }>
                  Confirm
                </Button>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

AlertDialogCustom.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isAlertOpen: PropTypes.bool,
  confirm: PropTypes.bool,
  handleClick: PropTypes.func
}
