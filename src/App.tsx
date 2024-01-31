import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import { Link, Route, Routes } from "react-router-dom";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { AppDispatch, RootState } from "./states";
import ThreadsPage from "./pages/ThreadsPage";
import Naviation from "./components/Navigation";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import RegistPage from "./pages/RegistrasiPage";



function App() {
    const {
        authUser = null,
        isPreload = false,
    } = useSelector((states: RootState) => states);
    console.log(authUser)
    console.log(isPreload)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // @TODO: dispatch async action to preload app
        dispatch(asyncPreloadProcess())
    }, [dispatch])

    const onSignOut = () => {
        dispatch(asyncUnsetAuthUser())
    }

    if (isPreload) {
        console.log('preload')
        return null
    }
    return (
        <>
            <header className="fixed top-0 left-0 w-full flex items-center justify-center z-10">
                <Naviation authUser={authUser} />
            </header>
            <main className="mx-auto container relative">
                <nav id="nav-menu" className="hidden fixed py-5 bg-white shadow-lg rounded-lg max-w-[200px] w-full right-32 top-20 z-10">
                    <ul className="flex flex-col gap-5 text-center">
                        <Link to='/'><li className="group">Home</li></Link>
                        {authUser === null ? <Link to='/login'><li className="group">Login</li></Link> : <button onClick={onSignOut}><li className="group">Logout</li></button>}
                    </ul>
                </nav>
                <Routes>
                    <Route path='/' element={<ThreadsPage />}></Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<RegistPage />}></Route>
                </Routes>
            </main>
        </>
    )
}

export default App;