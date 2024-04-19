import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../store/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.isAuthenticated);

    if(auth) {
        navigate('/overview');
    }

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginAsync(formData));
            navigate("/overview");
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-16">
            <div className="relative rounded-xl bg-white flex justify-center items-center max-w-5xl">
                <div className="flex flex-col space-y-8 py-8 flex-1 px-16 min-h-full bg-darkRed border-y-[10px] border-darkRed">
                    <h1 className="text-4xl text-white font-bold self-start">Log In</h1>
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter your username" 
                            className="border border-bg-gray-500 rounded-md px-8 py-6"
                            value={formData.username} 
                            onChange={handleInputChange}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            className="border border-bg-gray-500 rounded-md px-8 py-6"
                            value={formData.password} 
                            onChange={handleInputChange}
                        />
                        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:justify-end">
                            <button 
                                type="submit" 
                                className="text-lg text-softRed font-semibold px-12 py-4 bg-white rounded-md md:py-5 md:px-12"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
