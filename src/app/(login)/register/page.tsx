export default function Login() {
    return (
        <div className="p-24">
            <p>Login or Register</p>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <div>
                <a href="/signup">Don't have a login? Sign up here</a>
            </div>
            <div>
                <a href="/forgot-password">Forgot your password?</a>
            </div>
        </div>
    );
}
