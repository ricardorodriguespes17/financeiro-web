import { Form, Formik } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { CreateUserAccount } from "../../@types/UserType"
import authController from "../../controller/authController"
import useNotificationStore from "../../store/notificationStore"

export type RegisterFormProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
  birthdate: string
}

const initialValues: RegisterFormProps = {
  name: "",
  email: "",
  birthdate: "",
  password: "",
  confirmPassword: "",
}

const RegisterForm = () => {
  const navigate = useNavigate()
  const { setNotification } = useNotificationStore()

  const onSubmit = async (values: RegisterFormProps) => {
    if (values.confirmPassword !== values.password) {
      return
    }

    const userData: CreateUserAccount = {
      name: values.name.trim(),
      email: values.email.trim(),
      birthdate: values.birthdate,
      password: values.password.trim()
    }

    const response = await authController.createAccount(userData)

    setNotification({
      title: response.title,
      content: response.content,
      type: response.type
    })

    if(response.type === "success") goToLogin()
  }

  const goToLogin = () => {
    navigate("/login")
  }

  return (
    <Formik<RegisterFormProps>
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-full flex flex-col gap-3">
          <TextInput
            label="Nome"
            autoComplete="off"
            value={values.name}
            onChange={(event) => setFieldValue("name", event.target.value)}
          />

          <TextInput
            label="Email"
            type="email"
            autoComplete="off"
            value={values.email}
            onChange={(event) => setFieldValue("email", event.target.value)}
          />

          <TextInput
            label="Data de nascimento"
            type="date"
            autoComplete="off"
            value={values.birthdate}
            onChange={(event) => setFieldValue("birthdate", event.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <TextInput
              label="Senha"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(event) => setFieldValue("password", event.target.value)}
            />

            <TextInput
              label="Confirmação da senha"
              type="password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={(event) => setFieldValue("confirmPassword", event.target.value)}
            />
          </div>

          <Button type="submit">
            Salvar
          </Button>

          <Button
            type="button"
            variant="plain"
            onClick={goToLogin}
          >
            Já tem conta? Faça login
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm