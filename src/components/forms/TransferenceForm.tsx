import { Form, Formik, FormikHelpers } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import * as Yup from 'yup'
import { TransferenceCreateType, TransferenceType } from "../../@types/TransferenceType"
import { useEffect, useState } from "react"
import Select from "../ui/Select"
import useTransferenceActions from "../../hooks/useTransferenceActions"

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
  type: Yup.string()
    .oneOf(['income', 'expense'], 'O tipo inválido')
    .required('Tipo é obrigatório'),
  boardId: Yup.string()
    .required('O quadro é obrigatório'),
})

type TransferenceFormProps = {
  transference?: Partial<TransferenceType> | null
  onSubmit: () => void
  onClose: () => void
}

const defautlValues: TranferenceValuesProps = {
  name: "",
  boardId: "",
  expireDay: "",
  type: "expense",
  value: "",
  description: ""
}

const TransferenceForm = (props: TransferenceFormProps) => {
  const { createTransference, updateTransference } = useTransferenceActions()
  const [initialValues, setInitialValues] = useState<TranferenceValuesProps>(defautlValues)

  useEffect(() => {
    const data = props.transference

    if (data) {
      setInitialValues({
        name: data.name || "",
        boardId: data.boardId || "",
        description: data.description || "",
        expireDay: String(data.expireDay || ""),
        type: data.type || "expense",
        value: String(data.value || "")
      })
    } else {
      setInitialValues(defautlValues)
    }
  }, [props.transference])

  const onSubmit = async (values: TranferenceValuesProps, helpers: FormikHelpers<TranferenceValuesProps>) => {
    const transferenceData: TransferenceCreateType = {
      name: values.name.trim(),
      description: values.description.trim(),
      expireDay: parseInt(values.expireDay),
      type: values.type as "expense" | "income",
      value: parseFloat(values.value),
      boardId: values.boardId
    }

    helpers.setSubmitting(true)

    if (props.transference?.id) {
      updateTransference(props.transference.id, transferenceData)
    } else {
      createTransference(transferenceData)
    }

    helpers.setSubmitting(true)

    onReset(values, helpers)
    onClose()
  }

  const onReset = (_values: TranferenceValuesProps, { setValues }: FormikHelpers<TranferenceValuesProps>) => {
    setValues(defautlValues)
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
      onReset={onReset}
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

          <div className="w-full flex gap-4 flex-col md:flex-row">
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

            <Select
              label="Tipo"
              autoComplete="off"
              value={values.type}
              error={errors.type}
              options={[
                { label: "Despesa", value: "expense" },
                { label: "Receita", value: "income" },
              ]}
              onChange={(event) => setFieldValue("type", event.target.value)}
            />
          </div>

          <div className="flex w-full gap-4 flex-col md:flex-row md:mt-4">
            <Button
              type="reset"
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