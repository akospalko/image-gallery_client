import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'
import FormContext from './components/contexts/FormContext'
import AuthenticationContext from './components/contexts/AuthenticationContext'

function App() {
  return (
    <div className="App">
      <ToggleModalContext>
      <AuthenticationContext>
      <FormContext>
        {/* Header */}
        <Header />
        {/* Page content */}
        <PageContent />
        {/* Page footer */}
      </FormContext>
      </AuthenticationContext>
      </ToggleModalContext>
    </div>
  )
}

export default App