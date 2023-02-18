import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'
import FormContext from './components/contexts/FormContext'

function App() {
  return (
    <div className="App">
      <ToggleModalContext>
      <FormContext>
          {/* Header */}
          <Header />
          {/* Page content */}
          <PageContent />
          {/* Page footer */}
      </FormContext>
      </ToggleModalContext>
    </div>
  )
}

export default App