import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <h3>Login Page</h3>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        Do not have an account?{" "}
        <Link href="/auth/signup">Create an account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
