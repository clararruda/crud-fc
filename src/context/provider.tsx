import { createContext, useContext } from 'react';
import { User } from '../model/User';
import { UseUsers } from './useUsers';

const GlobalContext = createContext<User[]>([]);

export const StoreProvider = ({ children }: any) => {
  const users: User[] = UseUsers();

  const store: User[] = users;
  return (
    <GlobalContext.Provider value={store}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
}