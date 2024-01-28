import { useDispatch } from "react-redux";
import Login, { loginType } from "../components/LoginInput";
import { AppDispatch } from "../states";
import { asyncSetAuthUser } from "../states/authUser/action";



function LoginPage() {
    const dispatch = useDispatch<AppDispatch>()

    const onLogin = ({ email, password }: loginType) => {
        dispatch(asyncSetAuthUser({ email, password }))
    }

    return (
        <section>
            <header>
                <h1>Hallo Semua</h1>
            </header>
            <Login login={onLogin} />
        </section>
    )
}

export default LoginPage;