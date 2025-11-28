import LoginForm from "./AuthenticationComponents/LoginForm";


const Login = () => {
    return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
    );
};

export default Login;