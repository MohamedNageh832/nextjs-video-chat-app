import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen p-6">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
