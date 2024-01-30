import useInput from "../hooks/useInput";
import { RegisterUser } from "../states/users/action";



function Registrasi({ onRegist }: { onRegist: ({ name, email, password }: RegisterUser) => void }) {
    const [name, onNameChange] = useInput('')
    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')

    return (
        <>
            <form action="registrasi" className="register" >
                <input type="text" name="name" id="name" value={name} onChange={onNameChange} placeholder="isikan nama anda" />
                <input type="email" name="email" id="email" value={email} onChange={onEmailChange} placeholder="masukan email anda" />
                <input type="password" name="password" id="password" value={password} onChange={onPasswordChange} placeholder="isikan password anda" />
                <button type="submit" onClick={() => onRegist({ name, email, password })}>SingUp Now</button>
            </form>
        </>
    )
}

export default Registrasi;