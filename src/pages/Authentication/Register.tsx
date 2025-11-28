import RegisterForm from "./AuthenticationComponents/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
