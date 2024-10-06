import "../styles/Login.css";

function Login() {
    return (
        <div className="login-page-container">
            <h1 className="login-page-title">Login</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p className="signup-link">
                    Don&apos;t have an account? <a href="/signup">Sign up here</a>
                </p>
            </form>
        </div>
    );
}

export default Login;