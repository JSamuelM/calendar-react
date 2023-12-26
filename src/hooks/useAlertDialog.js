import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

export const useAlertDialog = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [alertConfig, setAlertConfig] = useState({
    title: 'title',
    body: 'body',
    action: 'Save',
    colorScheme: 'blue'
  });

  const configAlert = ({ title, body, action, colorScheme }) => {
    setAlertConfig({
      title,
      body,
      action,
      colorScheme,
    });
  }

  return {
    isOpen,
    alertConfig,

    onToggle,
    onOpen,
    onClose,
    configAlert
  }
}
