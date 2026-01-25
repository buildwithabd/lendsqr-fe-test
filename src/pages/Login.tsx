import './Login.scss'
import Logo from '../assets/logo.svg';
import LoginImg from '../assets/pablo-sign-in.svg';

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-image">
                <img src={Logo} alt="Lendsqr Logo" className="login-logo" />
                <img src={LoginImg} alt='Login image' className='login-img' />
            </div>
            <div className="login-container">
                <div className="login-form">
                    <div>
                        <h4>Welcome!</h4>
                        <p>Enter details to login.</p>
                    </div>
                    <div className="input-container">
                        <input placeholder='Email' />
                        <input placeholder='Password' />
                        <a href="">Forgot password?</a>
                    </div>
                    <button className='login-btn'>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Login