import { useEffect } from 'react';
import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserContextWrapper({ subPages }) {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={[user, setUser]}>
            {subPages}
        </UserContext.Provider>
    )
};