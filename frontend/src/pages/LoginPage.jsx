import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
    const {login , isLoggingIn} = useAuthStore();
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const handleFormData = (e) =>{
        setFormData(pre => ({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        login(formData);
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4 ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          LogIn
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:right-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleFormData}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:right-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            LogIn
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have account ?{" "}
          <Link
            to={"/signup"}
            className="text-indigo-600 hover:underline font-medium"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
