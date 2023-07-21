import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'
import FormContext from './components/contexts/FormContext'
import AuthenticationContext from './components/contexts/AuthenticationContext'
import LoaderContext from './components/contexts/LoaderContext'
import DataContext from './components/contexts/DataContext'
import ThemeContext from './components/contexts/ThemeContext'
import StatusContext from './components/contexts/StatusContext'
function App() {
  return (
    <div className="App">
      <ThemeContext>
      <StatusContext>
      <LoaderContext>
      <ToggleModalContext>
      <AuthenticationContext>
      <DataContext>
      <FormContext>
        <Header/>
        <PageContent />
      </FormContext>
      </DataContext>
      </AuthenticationContext>
      </ToggleModalContext>
      </LoaderContext>
      </StatusContext>
      </ThemeContext>
    </div>
  )
}

export default App