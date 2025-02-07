
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/Lekh-black.png'

const Navbar = () => {

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },

    ]

    return (
        <header className='w-full h'>
            <nav className='flex'>
                <Link
                    to={'/'}>
                    <img
                        className='w-10 h-10'
                        src={logo}
                        alt='logo'
                    />
                </Link>

                <ul className='flex ml-auto'>
                    {
                        navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                    {
                        authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
