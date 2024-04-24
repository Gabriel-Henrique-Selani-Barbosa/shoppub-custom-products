const useApp = () => {
  const appState = useAppState();
  const initialized = ref(false);

  const toggleInitialized = (status?: boolean) => {
    initialized.value =
      typeof status === 'boolean' ? status : !initialized.value;
  };

  return {
    initialized,
    toggleInitialized,
  };
};

export default useApp;
