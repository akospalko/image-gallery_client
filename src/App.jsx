import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'
import FormContext from './components/contexts/FormContext'
import AuthenticationContext from './components/contexts/AuthenticationContext'
import LoaderContext from './components/contexts/LoaderContext'
import DataContext from './components/contexts/DataContext'
import ThemeContext from './components/contexts/ThemeContext'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ThemeContext>
      <LoaderContext>
      <ToggleModalContext>
      <AuthenticationContext>
      <DataContext>
      <FormContext>
        {/* Header */}
        <Header/>
        {/* Page content */}
        <PageContent />
        {/* TODO: Page footer */}
        {/* toast like status messages */}
        <ToastContainer
          position="bottom-center"
          autoClose={ 4000 } 
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </FormContext>
      </DataContext>
      </AuthenticationContext>
      </ToggleModalContext>
      </LoaderContext>
      </ThemeContext>
    </div>
  )
}

export default App