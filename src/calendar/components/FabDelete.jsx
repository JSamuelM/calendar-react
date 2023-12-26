import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { useAlertDialog, useCalendarStore, useUiStore } from '../../hooks';
import { AlertDialogCustom } from '../../components/AlertDialogCustom';

export const FabDelete = () => {

  const { colorMode } = useColorMode();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();
  const {
    alertConfig,
    isOpen,
    configAlert,
    onOpen,
    onClose,
    onToggle
  } = useAlertDialog();

  const handleDelete = () => {
    configAlert({
      title: 'Are you sure?',
      body: 'Do you want delete this event?',
      action: 'Close',
      colorScheme: 'red'
    });
    onToggle();
    return;
  }
  
  const onHandleConfirm = () => {
    const resp = startDeletingEvent();
    onClose();
    if (!resp.ok) {
      configAlert({
        title: 'Error deleting event',
        body: resp.msg,
        action: 'Close',
        colorScheme: 'red'
      });
      onToggle();
      return;
    }
  }

  return (
    <>
      <AlertDialogCustom 
        isAlertOpen={ isOpen }
        onOpen={ onOpen }
        onClose={ onClose }
        title={ alertConfig.title }
        body={ alertConfig.body }
        colorScheme={ alertConfig.colorScheme }
        action={ alertConfig.action }
        confirm
        handleClick={ onHandleConfirm }
      ></AlertDialogCustom>

      {
        !isDateModalOpen &&
        <IconButton
          onClick={ handleDelete }
          isRound={true}
          bgColor={ colorMode === 'light' ? 'red.300' : 'red.700' }
          variant='solid'
          aria-label='Delete'
          fontSize='25px'
          bottom={'25px'}
          position={'fixed'}
          left={25}
          icon={<DeleteIcon />}
          w={'70px'}
          h={'70px'}
          sx={{
            display: hasEventSelected ? 'block' : 'none'
          }}
        />
      }
    </>
  )
}
