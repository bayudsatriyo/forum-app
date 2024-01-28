
import useInput from "../hooks/useInput";

export interface loginType {
  email: string,
  password: string;
}

function Login({ login }: { login: ({ email, password }: loginType) => void }) {
  const [password, onPasswordChange] = useInput('')
  const [email, onEmailChange] = useInput('')

  return (
    <form className="login-input">
      <input type="text" value={email} onChange={onEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button type="button" onClick={() => login({ email, password })}>Login</button>
    </form>
  );
}

export default Login;