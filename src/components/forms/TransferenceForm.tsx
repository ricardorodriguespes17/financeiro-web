import { Form, Formik, FormikHelpers } from "formik"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import * as Yup from 'yup'
import { TransferenceCreateType, TransferenceType } from "../../@types/TransferenceType"
import { useEffect, useState } from "react"
import Select from "../ui/Select"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import useMonth from "../../store/monthStore"
import switchRecurrenceByMethod from "../../utils/switchRecurrenceByMethod"

export type TranferenceValuesProps = {
  name: string
  expireDay: string
  type: string
  value: string
  description: string
  month: string
  category?: string
  recurrenceLimit: string
  method: string
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
  month: Yup.string()
    .required('O mês é obrigatório'),
  category: Yup.string(),
  recurrenceLimit: Yup.string()
})

type TransferenceFormProps = {
  transference?: Partial<TransferenceType> | null
  onSubmit: () => void
  onClose: () => void
}

const defautlValues: TranferenceValuesProps = {
  name: "",
  expireDay: "",
  type: "expense",
  value: "",
  description: "",
  month: "",
  category: "",
  recurrenceLimit: "1",
  method: "unique"
}

const TransferenceForm = (props: TransferenceFormProps) => {
  const { createTransference, updateTransference } = useTransferenceActions()
  const { monthDate } = useMonth()
  const [initialValues, setInitialValues] = useState<TranferenceValuesProps>(defautlValues)

  useEffect(() => {
    const data = props.transference

    if (data) {
      setInitialValues({
        name: data.name || "",
        month: data.month || monthDate,
        description: data.description || "",
        expireDay: String(data.expireDay || ""),
        type: data.type || "expense",
        value: data.value ? data.value.toFixed(2) : "",
        category: data.category || "",
        recurrenceLimit: String(data.recurrenceLimit || ""),
        method: data.recurrenceLimit
          ? data.recurrenceLimit === 1
            ? "unique"
            : "parceled"
          : "recurrent"
      })
    } else {
      setInitialValues(defautlValues)
    }
  }, [props.transference, monthDate])

  const onSubmit = async (values: TranferenceValuesProps, helpers: FormikHelpers<TranferenceValuesProps>) => {
    const transferenceData: TransferenceCreateType = {
      name: values.name.trim(),
      description: values.description.trim(),
      expireDay: parseInt(values.expireDay),
      type: values.type as "expense" | "income",
      value: parseFloat(values.value),
      month: values.month,
      category: values.category || null,
      recurrenceLimit: switchRecurrenceByMethod(values.method, parseInt(values.recurrenceLimit)),
    }

    helpers.setSubmitting(true)

    if (props.transference?.id) {
      updateTransference(props.transference.id, transferenceData)
    } else {
      createTransference(transferenceData)
    }

    helpers.setSubmitting(false)

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
              min={0}
              autoComplete="off"
              value={values.value}
              error={errors.value}
              onChange={(event) => setFieldValue("value", event.target.value)}
            />

            <TextInput
              label="Vencimento"
              type="number"
              min={0}
              max={31}
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

          <Select
            label="Forma"
            autoComplete="off"
            value={values.method}
            error={errors.method}
            options={[
              { label: "Pagamento único", value: "unique" },
              { label: "Pagamento recorrente", value: "recurrent" },
              { label: "Pagamento parcelado", value: "parceled" },
            ]}
            onChange={(event) => setFieldValue("method", event.target.value)}
          />

          {values.method === "parceled" && (
            <TextInput
              label="Parcelas"
              type="number"
              min={0}
              autoComplete="off"
              value={values.recurrenceLimit}
              error={errors.recurrenceLimit}
              onChange={(event) => setFieldValue("recurrenceLimit", event.target.value)}
            />
          )}

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