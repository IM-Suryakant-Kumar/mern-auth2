import './App.css'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from './pages/Login'
 
const App = () => {
    return (
        <div>
            <Login />
            <ToastContainer autoClose={1000} pauseOnFocusLoss={false} />
        </div>
    )
}

export default App
