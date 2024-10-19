import { Form, Formik } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"

type FormProps = {
  email: string
  password: string
}

const initialValues: FormProps = {
  email: "",
  password: "",
}

const LoginForm = () => {
  const navigate = useNavigate()

  const onSubmit = (values: FormProps) => {
    console.log(values)
    navigate("/dashboard")
  }

  const goToRegister = () => {
    navigate("/register")
  }

  return (
    <Formik<FormProps>
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-full flex flex-col gap-3">
          <TextInput
            label="Email"
            type="email"
            autoComplete="off"
            value={values.email}
            onChange={(event) => setFieldValue("email", event.target.value)}
          />

          <TextInput
            label="Senha"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
          />

          <Button type="submit">
            Entrar
          </Button>

          <Button
            type="button"
            variant="plain"
            onClick={goToRegister}
          >
            Não tem conta? Cadastre-se
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm