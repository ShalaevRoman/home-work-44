import type { FC } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { RegistrationFormValues } from '../types/models'

const initialValues: RegistrationFormValues = {
  name: '',
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я має містити не більше 50 символів")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email('Некоректний формат email')
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(6, 'Пароль має містити щонайменше 6 символів')
    .matches(/\d/, 'Пароль має містити хоча б одну цифру')
    .required("Пароль обов'язковий"),
})

export const RegistrationForm: FC = () => {
  const [submittedData, setSubmittedData] = useState<RegistrationFormValues | null>(null)

  const formik = useFormik<RegistrationFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setSubmittedData(values)
      resetForm()
    },
  })

  return (
    <form className="app-form" noValidate onSubmit={formik.handleSubmit}>
      <h2>Реєстрація (Formik + Yup)</h2>

      <div className="form-field">
        <label htmlFor="name">Ім'я</label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={50}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(formik.touched.name && formik.errors.name)}
          aria-describedby="name-error"
        />
        {formik.touched.name && formik.errors.name && (
          <span id="name-error" className="form-error" role="alert">
            {formik.errors.name}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
          aria-describedby="email-error"
        />
        {formik.touched.email && formik.errors.email && (
          <span id="email-error" className="form-error" role="alert">
            {formik.errors.email}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(formik.touched.password && formik.errors.password)}
          aria-describedby="password-error"
        />
        {formik.touched.password && formik.errors.password && (
          <span id="password-error" className="form-error" role="alert">
            {formik.errors.password}
          </span>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        Зареєструватися
      </button>

      {submittedData && (
        <p className="form-success" role="status">
          Дані збережено: {submittedData.name} ({submittedData.email})
        </p>
      )}
    </form>
  )
}