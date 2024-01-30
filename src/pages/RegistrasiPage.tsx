import { useDispatch } from "react-redux";
import { AppDispatch } from "../states";
import { RegisterUser, asyncregister } from "../states/users/action";
import Registrasi from "../components/RegistrasiInput";
import { Link, useNavigate } from "react-router-dom";


function RegistPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const onRegist = ({ name, email, password }: RegisterUser) => {
        dispatch(asyncregister({ email, name, password }))
        navigate('/login')
    }

    return (
        <section>
            <h1>Sign Up</h1>
            <Registrasi onRegist={onRegist} />
            <Link to='/login'>Back to Login</Link>
        </section>
    )
}

export default RegistPage;