import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'
import FormContext from './components/contexts/FormContext'
import AuthenticationContext from './components/contexts/AuthenticationContext'
import LoaderContext from './components/contexts/LoaderContext'
import ThemeContext from './components/contexts/ThemeContext'

function App() {
  return (
    <div className="App">
      <ThemeContext>
      <LoaderContext>
      <ToggleModalContext>
      <AuthenticationContext>
      <FormContext>
        {/* Header */}
        <Header/>
        {/* Page content */}
        <PageContent />
        {/* Page footer */}
      </FormContext>
      </AuthenticationContext>
      </ToggleModalContext>
      </LoaderContext>
      </ThemeContext>
    </div>
  )
}

export default App