import { Form, Formik } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"

type FormProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
  birthdate: string
}

const initialValues: FormProps = {
  name: "",
  email: "",
  birthdate: "",
  password: "",
  confirmPassword: "",
}

const RegisterForm = () => {
  const onSubmit = (values: FormProps) => {
    console.log(values)
  }

  return (
    <Formik<FormProps>
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

          <Button type="submit">
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm