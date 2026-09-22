import type { FC } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ContactFormValues } from '../types/models'

const phonePattern = /^\+?\d{10,13}$/

export const ContactForm: FC = () => {
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ mode: 'onBlur' })

  const onSubmit = (data: ContactFormValues) => {
    setSubmittedData(data)
    reset()
  }

  return (
    <form className="app-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2>Контакти (React Hook Form)</h2>

      <div className="form-field">
        <label htmlFor="contact-name">Ім'я</label>
        <input
          id="contact-name"
          type="text"
          maxLength={50}
          aria-invalid={Boolean(errors.name)}
          aria-describedby="contact-name-error"
          {...register('name', {
            required: "Ім'я обов'язкове",
            minLength: { value: 2, message: "Ім'я має містити щонайменше 2 символи" },
            maxLength: { value: 50, message: "Ім'я має містити не більше 50 символів" },
          })}
        />
        {errors.name && (
          <span id="contact-name-error" className="form-error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby="contact-email-error"
          {...register('email', {
            required: "Email обов'язковий",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некоректний формат email' },
          })}
        />
        {errors.email && (
          <span id="contact-email-error" className="form-error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-phone">Телефон</label>
        <input
          id="contact-phone"
          type="tel"
          placeholder="+380991234567"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby="contact-phone-error"
          {...register('phone', {
            required: "Телефон обов'язковий",
            pattern: { value: phonePattern, message: 'Формат: +380991234567 (10-13 цифр)' },
          })}
        />
        {errors.phone && (
          <span id="contact-phone-error" className="form-error" role="alert">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-birth-date">Дата народження</label>
        <input
          id="contact-birth-date"
          type="date"
          aria-invalid={Boolean(errors.birthDate)}
          aria-describedby="contact-birth-date-error"
          {...register('birthDate', {
            required: "Дата народження обов'язкова",
            validate: (value) =>
              new Date(value) <= new Date() || 'Дата народження не може бути в майбутньому',
          })}
        />
        {errors.birthDate && (
          <span id="contact-birth-date-error" className="form-error" role="alert">
            {errors.birthDate.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Надіслати
      </button>

      {submittedData && (
        <p className="form-success" role="status">
          Дані збережено: {submittedData.name}, {submittedData.phone}
        </p>
      )}
    </form>
  )
}