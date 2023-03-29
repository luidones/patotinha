import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE_KEY } from './Profile';
import Map from './Map';

export default function Home() {
    const navigate = useNavigate();
    const profile = localStorage.getItem(PROFILE_KEY);

    useEffect(() => {
        if (!profile) navigate('/profile');
    }, []);
    
    return (
        <div className="home">
            <nav className="menu">

            </nav>
            <Map />
        </div>
    );
}