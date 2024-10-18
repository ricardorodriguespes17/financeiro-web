import AuthBaseLayout from "../components/layout/AuthBase"
import RegisterForm from "../components/forms/RegisterForm"

const RegisterPage = () => {
  return (
    <AuthBaseLayout title="Cadastre-se">
      <RegisterForm />
    </AuthBaseLayout>
  )
}

export default RegisterPage