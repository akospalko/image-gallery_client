import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'
import FormContext from './components/contexts/FormContext'
import AuthenticationContext from './components/contexts/AuthenticationContext'
import LoaderContext from './components/contexts/LoaderContext'

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App