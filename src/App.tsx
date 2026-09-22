import { RegistrationForm } from './components/RegistrationForm'
import { ContactForm } from './components/ContactForm'
import './App.css'

function App() {
  return (
    <main id="center">
      <h1>Форми з валідацією</h1>
      <RegistrationForm />
      <ContactForm />
    </main>
  )
}

export default App