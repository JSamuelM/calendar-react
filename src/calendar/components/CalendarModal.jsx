import { useEffect, useMemo, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react'
import { AlertDialogCustom } from '../../components/AlertDialogCustom';
import { useUiStore, useCalendarStore, useAlertDialog } from '../../hooks';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addHours, addYears, differenceInSeconds, setHours, setMinutes } from 'date-fns';
import es from 'date-fns/locale/es';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const toast = useToast();
  const { alertConfig, isOpen, configAlert, onOpen, onClose, onToggle } = useAlertDialog();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const hasTitle = formValues.title === '';
  const titleValidation = useMemo(() => {
    if (!formSubmitted) return false;

    return formValues.title.length > 0;
  }, [formValues.title, formSubmitted]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      toast({
        title: 'Advertencia',
        description: 'Existe un error en el tiempo del evento',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);

    const resp = await startSavingEvent(formValues);
    if (!resp.ok) {
      configAlert({
        title: 'Error updating event!',
        body: resp.msg,
        action: 'Close',
        colorScheme: 'red'
      });
      onToggle();
      return;
    }
    closeDateModal();
    setFormSubmitted(false);
  }

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({
        ...activeEvent
      });
    }
  }, [activeEvent]);
  

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
      ></AlertDialogCustom>
      <Modal
        isOpen={ isDateModalOpen }
        onClose={ closeDateModal }
        size={'xl'}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={ onSubmit }>
            <ModalHeader>Nuevo Evento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl>
                  <FormLabel>Fecha y hora de inicio</FormLabel>
                  <DatePicker
                    minDate={ new Date() }
                    selected={ formValues.start }
                    onChange={ (event) => onDateChanged(event, 'start') }
                    customInput={ <Input /> }
                    wrapperClassName={ 'w-full' }
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                  />
                </FormControl>
                <FormControl mb={2}>
                  <FormLabel>Fecha y hora de fin</FormLabel>
                  <DatePicker
                    minDate={
                      formValues.start
                    }
                    minTime={
                      setHours(
                        setMinutes(
                          new Date(), formValues.start.getMinutes()
                        ), formValues.start.getHours() + 1
                      )
                    }
                    maxTime={
                        setHours(
                          setMinutes(addYears(new Date(), 1000) , 30), 23
                        )
                    }
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end') }
                    customInput={ <Input /> }
                    wrapperClassName={ 'w-full' }
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                  />
                </FormControl>
                <Divider />
                <FormControl isInvalid={ hasTitle }>
                  <FormLabel>Titulo y notas</FormLabel>
                  <Input
                    name="title"
                    type="text"
                    placeholder="Titulo del evento"
                    value={ formValues.title }
                    onChange={ onInputChange }
                  />
                  {
                    titleValidation ? (
                      <FormHelperText>Una descripción corta</FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        El titulo es requerido
                      </FormErrorMessage>
                    )
                  }
                </FormControl>
                <FormControl>
                  <Textarea
                    name="notes"
                    placeholder="Notas"
                    size="md"
                    resize={'none'}
                    rows={4}
                    value={ formValues.notes }
                    onChange={ onInputChange }
                  />
                  <FormHelperText>Información adicional</FormHelperText>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={ 3 } onClick={ closeDateModal }>
                Close
              </Button>
              <Button
                type="submit"
                leftIcon={ <AddIcon /> }
                variant="outline"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
