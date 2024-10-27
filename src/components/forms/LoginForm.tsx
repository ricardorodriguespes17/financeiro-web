import { useNavigate } from "react-router-dom"
import { Form, Formik, FormikHelpers } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import useAuthActions from "../../hooks/useAuthActions"
import * as Yup from 'yup'

type FormProps = {
  email: string
  password: string
}

const valdationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Digite o seu email'),
  password: Yup.string()
    .required('Digite a sua senha'),
})

const initialValues: FormProps = {
  email: "",
  password: "",
}

const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuthActions()

  const onSubmit = async (values: FormProps, { setSubmitting }: FormikHelpers<FormProps>) => {
    setSubmitting(true)

    await login({
      email: values.email.trim(),
      password: values.password.trim()
    })

    setSubmitting(false)
  }

  const goToRegister = () => {
    navigate("/register")
  }

  return (
    <Formik<FormProps>
      initialValues={initialValues}
      validationSchema={valdationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors }) => (
        <Form className="w-[400px] max-w-full flex flex-col gap-3">
          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            onChange={(event) => setFieldValue("email", event.target.value)}
          />

          <TextInput
            label="Senha"
            type="password"
            autoComplete="password"
            value={values.password}
            error={errors.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
          />

          <Button type="submit" loading={isSubmitting}>
            Entrar
          </Button>

          <Button
            type="button"
            variant="plain"
            disabled={isSubmitting}
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