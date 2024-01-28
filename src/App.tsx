import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { AppDispatch, RootState } from "./states";
import ThreadsPage from "./pages/ThreadsPage";



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

    // const onSignOut = () => {
    //     dispatch(asyncUnsetAuthUser())
    // }

    if (isPreload) {
        return null
    }

    if (authUser === null) {
        return (
            <>
                <main>
                    <Routes>
                        <Route path='/' element={<ThreadsPage />}></Route>
                        <Route path='/login' element={<LoginPage />} />
                    </Routes>
                </main>
            </>
        )
    }
}

export default App;