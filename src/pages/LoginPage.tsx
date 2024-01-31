import { useDispatch } from "react-redux";
import Login, { loginType } from "../components/LoginInput";
import { AppDispatch } from "../states";
import { asyncSetAuthUser } from "../states/authUser/action";
import { Link, useNavigate } from "react-router-dom";



function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const onLogin = ({ email, password }: loginType) => {
        dispatch(asyncSetAuthUser({ email, password }))
        navigate('/')
    }

    return (
        <section className="mt-24">
            <header>
                <h1>Hallo Semua</h1>
            </header>
            <Login login={onLogin} />
            <p>Belum punya akun ? <Link to='/signup'>Sign Up Now</Link></p>
        </section>
    )
}

export default LoginPage;