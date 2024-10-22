import { Form, Formik, FormikHelpers } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import useNotificationStore from "../../store/notificationStore"
import * as Yup from 'yup'
import { TransferenceCreateType, TransferenceType } from "../../@types/TransferenceType"
import transferenceController from "../../controller/transferenceController"
import { useEffect, useState } from "react"
import { ControllerResponseType } from "../../@types/ControllerResponseType"

export type TranferenceValuesProps = {
  name: string,
  boardId: string,
  expireDay: string,
  type: string,
  value: string,
  description: string
}

const valdationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório'),
  description: Yup.string(),
  value: Yup.number()
    .required('O valor é obrigatório'),
  expireDay: Yup.number()
    .min(1, 'O vencimento deve ser entre 1 e 31')
    .max(31, 'O vencimento deve ser entre 1 e 31')
    .required('O vencimento é obrigatório'),
  boardId: Yup.string()
    .required('O quadro é obrigatório'),
})

type TransferenceFormProps = {
  transference?: TransferenceType | null
  onClose: () => void
}

const TransferenceForm = (props: TransferenceFormProps) => {
  const { setNotification } = useNotificationStore()
  const [initialValues, setInitialValues] = useState<TranferenceValuesProps>({
    name: "",
    boardId: "",
    expireDay: "",
    type: "",
    value: "",
    description: ""
  })

  useEffect(() => {
    const data = props.transference

    if (data) {
      setInitialValues({
        name: data.name,
        boardId: data.boardId,
        description: data.description || "",
        expireDay: String(data.expireDay),
        type: data.type,
        value: String(data.value)
      })
    }
  }, [props.transference])

  const onSubmit = async (values: TranferenceValuesProps, { setSubmitting }: FormikHelpers<TranferenceValuesProps>) => {
    const transferenceData: TransferenceCreateType = {
      name: values.name.trim(),
      description: values.description.trim(),
      expireDay: parseInt(values.expireDay),
      type: values.type as "expense" | "income",
      value: parseFloat(values.value),
      boardId: values.boardId
    }

    setSubmitting(true)

    let response: ControllerResponseType

    if (props.transference) {
      response = await transferenceController.updateTransference(
        props.transference.id, transferenceData
      )
    } else {
      response = await transferenceController.createTransference(transferenceData)
    }

    setSubmitting(true)

    setNotification({
      title: response.title,
      content: response.content,
      type: response.type
    })

    if (response.type === "success") onClose()
  }

  const onClose = () => {
    props.onClose()
  }

  return (
    <Formik<TranferenceValuesProps>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={valdationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors }) => (
        <Form className="w-full flex flex-col gap-3">
          <TextInput
            label="Nome"
            autoComplete="off"
            value={values.name}
            error={errors.name}
            onChange={(event) => setFieldValue("name", event.target.value)}
          />

          <TextInput
            label="Descrição"
            autoComplete="off"
            value={values.description}
            error={errors.description}
            onChange={(event) => setFieldValue("description", event.target.value)}
          />

          <div className="w-full flex gap-4">
            <TextInput
              label="Valor"
              type="number"
              autoComplete="off"
              value={values.value}
              error={errors.value}
              onChange={(event) => setFieldValue("value", event.target.value)}
            />

            <TextInput
              label="Vencimento"
              type="number"
              autoComplete="off"
              value={values.expireDay}
              error={errors.expireDay}
              onChange={(event) => setFieldValue("expireDay", event.target.value)}
            />
          </div>

          <TextInput
            label="Quadro"
            autoComplete="off"
            value="2024-10"
            disabled
            error={errors.description}
            onChange={(event) => setFieldValue("description", event.target.value)}
          />

          <div className="flex w-full gap-4">
            <Button
              type="button"
              variant="plain"
              disabled={isSubmitting}
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button type="submit" loading={isSubmitting}>
              Salvar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default TransferenceForm