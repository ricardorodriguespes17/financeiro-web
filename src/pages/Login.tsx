import LoginForm from "../components/forms/LoginForm"
import AuthBaseLayout from "../components/layout/AuthBase"

const LoginPage = () => {
  return (
    <AuthBaseLayout title="Entre na sua conta">
      <LoginForm />
    </AuthBaseLayout>
  )
}

export default LoginPage