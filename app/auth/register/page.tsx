import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <h3>Register Page</h3>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Create account</button>
      </form>
      <div>
        Already have an account? <Link href="/auth/login">Login here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
