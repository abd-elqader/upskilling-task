
import { Outlet } from 'react-router-dom'
import tele from '../assets/tele.jpg'; // Import the image

export default function Layout() {
    return (
        <>
            <div
                style={{ backgroundImage: `url(${tele})` }} // Use inline styles
                className="bg-cover bg-center h-screen">
                <Outlet />
            </div>
        </>
    )
}
