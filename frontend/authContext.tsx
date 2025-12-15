import { use, createContext, type PropsWithChildren} from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
    signIn: () => void;
    signOut: ()=> void;
    session?: string | null;
    isLoading: boolean
}>({
    signIn: ()=> null,
    signOut: ()=> null,
    session: null,
    isLoading: false
});

//hook used to access the user info
export function useSession(){
    const value = use(AuthContext);
    if (!value){
        throw new Error('useSession must be wrapped in a <SessionProvider/>');
    }

    return value;
}

export function Sessionprovider({children}: PropsWithChildren){
    const[[isLoading, session],setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: ()=> {
                    //TODO,Note perform sign in logic here, Come back to this
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
                {children}
            </AuthContext.Provider>
    );
}