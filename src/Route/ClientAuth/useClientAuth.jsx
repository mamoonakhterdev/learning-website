import { useContext } from 'react';
import { ClientContext } from './ClientContext';

const useClientAuth = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientProvider');
  }
  return context;
};

export default useClientAuth;
