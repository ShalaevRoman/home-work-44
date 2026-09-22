# Домашнє завдання 44 — Форми з валідацією

Дві незалежні веб-форми з валідацією введених даних:

- **Реєстрація** — [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) (поля: ім'я, email, пароль)
- **Контакти** — [React Hook Form](https://react-hook-form.com/) з вбудованою валідацією (поля: ім'я, email, телефон, дата народження)

Обидві форми показують повідомлення про помилки поряд з полями, підтримують ARIA-атрибути (`aria-invalid`, `aria-describedby`) та після успішної відправки зберігають дані в локальному стані компонента.

## Технології

- React 19 + TypeScript
- Vite
- Formik + Yup
- React Hook Form

## Встановлення та запуск

```bash
npm install
npm run dev
```

Проєкт буде доступний на `http://localhost:5173`.

### Збірка

```bash
npm run build
npm run preview
```

## Посилання на проект

Демо: https://home-work-44-two.vercel.app
GitHub: https://github.com/ShalaevRoman/home-work-44