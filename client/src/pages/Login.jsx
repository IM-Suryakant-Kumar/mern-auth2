import { useState } from "react"
import { login, logout, register, useAuth } from "../contexts/authContext"

const Login = () => {
    const { state, dispatch } = useAuth()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(dispatch, {email: formData.email, password: formData.password})
        // await register(dispatch, {name: formData.name, email: formData.email, password: formData.password})
    }


    return (
    <div>
        {state.user 
            ? <button onClick={() => logout(dispatch)}>Logout</button> 
            : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name} 
                        onChange={handleChange}
                    />
                    
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                    />
                    
                    <label htmlFor="password">password: </label>
                    <input
                        id="password"
                        name="password"
                        value={formData.password} 
                        onChange={handleChange}
                    />

                    <button type="submit">Login</button>
                    
                </form>
            )
        }
    </div>
    )
}

export default Login