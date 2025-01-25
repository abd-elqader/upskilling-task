
import { Outlet } from 'react-router-dom'
import tele from '../assets/tele.jpg';

export default function Layout() {
    return (
        <>
            <div style={{ backgroundImage: `url(${tele})` }} // Use inline styles for dynamic background images
                className="bg-cover bg-center h-screen">
                <Outlet />
                <h1>hi</h1>
            </div>
        </>
    )
}
