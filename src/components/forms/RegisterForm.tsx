import { Form, Formik, FormikHelpers } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { CreateUserAccount } from "../../@types/UserType"
import authController from "../../controller/authController"
import useNotificationStore from "../../store/notificationStore"
import * as Yup from 'yup'

export type RegisterFormProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
  birthdate: string
}

const valdationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'O nome deve ter pelo menos 3 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('O email inválido')
    .required('O email é obrigatório'),
  birthdate: Yup.date()
    .max(new Date(), 'A data de nascimento não pode ser maior do que a data atual')
    .required('A data de nascimento é obrigatória'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
    .required('A confirmação de senha é obrigatória'),
})

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

  const onSubmit = async (values: RegisterFormProps, { setSubmitting }: FormikHelpers<RegisterFormProps>) => {
    if (values.confirmPassword !== values.password) {
      return
    }

    const userData: CreateUserAccount = {
      name: values.name.trim(),
      email: values.email.trim(),
      birthdate: values.birthdate,
      password: values.password.trim()
    }

    setSubmitting(true)

    const response = await authController.createAccount(userData)

    setSubmitting(true)

    setNotification({
      title: response.title,
      content: response.content,
      type: response.type
    })

    if (response.type === "success") goToLogin()
  }

  const goToLogin = () => {
    navigate("/login")
  }

  return (
    <Formik<RegisterFormProps>
      initialValues={initialValues}
      validationSchema={valdationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors }) => (
        <Form className="w-[400px] max-w-full flex flex-col gap-3">
          <TextInput
            label="Nome"
            autoComplete="off"
            value={values.name}
            error={errors.name}
            onChange={(event) => setFieldValue("name", event.target.value)}
          />

          <TextInput
            label="Email"
            type="email"
            autoComplete="off"
            value={values.email}
            error={errors.email}
            onChange={(event) => setFieldValue("email", event.target.value)}
          />

          <TextInput
            label="Data de nascimento"
            type="date"
            autoComplete="off"
            value={values.birthdate}
            error={errors.birthdate}
            onChange={(event) => setFieldValue("birthdate", event.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <TextInput
              label="Senha"
              type="password"
              autoComplete="new-password"
              value={values.password}
              error={errors.password}
              onChange={(event) => setFieldValue("password", event.target.value)}
            />

            <TextInput
              label="Confirmação da senha"
              type="password"
              autoComplete="new-password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={(event) => setFieldValue("confirmPassword", event.target.value)}
            />
          </div>

          <Button type="submit" loading={isSubmitting}>
            Salvar
          </Button>

          <Button
            type="button"
            variant="plain"
            disabled={isSubmitting}
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