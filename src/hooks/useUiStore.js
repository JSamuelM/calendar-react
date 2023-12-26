import { useDispatch, useSelector } from 'react-redux'
import { onAlertClose, onAlertOpen, onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {

  const dispatch = useDispatch();

  const {
    isAlertOpen,
    isDateModalOpen
  } = useSelector(state => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  }

  const openAlert = () => {
    dispatch(onAlertOpen());
  }

  const closeAlert = () => {
    dispatch(onAlertClose());
  }

  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  }

  return {
    // Propierties
    isDateModalOpen,
    isAlertOpen,

    // Methods
    closeDateModal,
    openDateModal,
    toggleDateModal,
    openAlert,
    closeAlert,
  }
}
