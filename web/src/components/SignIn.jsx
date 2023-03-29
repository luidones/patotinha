import { useContext } from 'react';
import { useEffect, useRef } from 'react';
import { redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const CLIENT_ID = '892826153465-gnt9ufvr3k747s4ai9ni6j5t0342fgj7.apps.googleusercontent.com';
export const LOCALSTORAGE_KEY = 'patotinha.credential';

export default function SignIn() {
    const divRef = useRef(null);
    const [user, setUser] = useContext(UserContext);

    const parseUser = (credential) => {
        const user = JSON.parse(atob(credential.split('.')[1]));
        const stillValid = new Date(user.exp * 1000) > new Date();
        
        if (stillValid) {
            setUser(user);
            redirect('/');
        }
        
        return stillValid;
    }

    useEffect(() => {
        const storedCredential = localStorage.getItem(LOCALSTORAGE_KEY);
        const stillValid = storedCredential && parseUser(storedCredential);
        
        if (!stillValid && divRef.current) {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: (res, error) => {
                    localStorage.setItem('patotinha.credential', res.credential);
                    parseUser(res.credential);
                },
            });

            window.google.accounts.id.renderButton(divRef.current, {
                theme: 'outline',
                size: 'small',
                type: 'standard',
                text: 'signin_with.',
            });
        }
      }, [divRef.current]);
      

    return (
        <div>
            <h1>SignIn</h1>
            <div ref={divRef}></div>
        </div>
    );
}