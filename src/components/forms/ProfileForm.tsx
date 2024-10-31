import { Form, Formik, FormikHelpers } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import * as Yup from "yup"
import useUserActions from "../../hooks/useUserActions"
import { UpdateUserType } from "../../@types/UserType"
import { useEffect } from "react"

export type ProfileFormProps = {
  name: string
  email: string
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
})



const ProfileForm = () => {
  const { updateUser, getUser, getUserData, isLoading } = useUserActions()
  const user = getUser()

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialValues: ProfileFormProps = {
    name: user?.name || "",
    email: user?.email || "",
    birthdate: user?.birthdate || "",
  }

  const onSubmit = async (
    values: ProfileFormProps,
    { setSubmitting }: FormikHelpers<ProfileFormProps>
  ) => {
    const userData: UpdateUserType = {
      name: values.name.trim(),
      email: values.email.trim(),
      birthdate: values.birthdate,
    }

    setSubmitting(true)

    await updateUser(userData)

    setSubmitting(true)
  }

  return (
    <Formik<ProfileFormProps>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={valdationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors }) => (
        <Form className="w-full flex justify-center">
          <div className="w-[400px] max-w-full flex flex-col gap-3">
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

            <Button type="submit" loading={isSubmitting || isLoading}>
              Salvar
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  )
}

export default ProfileForm