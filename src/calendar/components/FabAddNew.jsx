import { AddIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { useCalendarStore, useUiStore } from '../../hooks';
import { addHours } from 'date-fns';

export const FabAddNew = () => {

  const { colorMode } = useColorMode();
  const { setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Fernando'
      }
    });
    openDateModal();
  }

  return (
    <IconButton
      onClick={ handleClickNew }
      isRound={true}
      bgColor={ colorMode === 'light' ? 'blue.300' : 'blue.700' }
      variant='solid'
      aria-label='Add'
      fontSize='20px'
      bottom={'25px'}
      position={'fixed'}
      right={25}
      icon={<AddIcon />}
      w={'50px'}
      h={'50px'}
    />
  )
}
