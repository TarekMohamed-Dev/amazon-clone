import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };
  const register = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailWarning('Enter a valid email or mobile phone number.');
      return;
    }

    if (password.length < 8) {
      setPasswordWarning('Password must be at least 8 characters long.');
      return;
    }

    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password);
      if (authUser) {
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handelEmailChange = (e) => { 

    const newEmail = e.target.value;
    setEmail(newEmail)

  }

 const handlePasswordChange = (e) => {
  const newPassword = e.target.value;
  setPassword(newPassword);



  if (newPassword.length < 8 ) {
    setPasswordWarning('Password must be at least 8 characters long');
  } else {
    setPasswordWarning('');
  }
};

  return (
    <div className='bg-gray-100 h-screen flex items-center  flex-col'>
      <Link to={"/"}>
        <img
          src="/logo-login.png"
          alt="logo"
          width={200}
          height={40}
          className="cursor-pointer active:transform active:scale-90"
        />
      </Link>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="email"
              id="username"
              name="username"
              value={email}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={handelEmailChange}
              required
            />
            {emailWarning && (
              <p className="text-red-500 text-sm">{emailWarning}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={handlePasswordChange}
              required
            />
            {passwordWarning && (
              <p className="text-red-500 text-sm">{passwordWarning}</p>
            )}
          </div>

          <button
            onClick={signIn}
            type="submit"
            className="bg-yellow-500 text-black py-2 w-full rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline-blue flex mx-auto justify-center"
          >
            Login
          </button>
          <p>By signing in, you agree to Amazon's <a href="#" className="text-blue-500 hover:text-blue-700">Conditions of Use</a> and <a href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</a>.</p>
          <button
            className='bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue mx-auto my-2 flex'
            onClick={register}
          >
            Create your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
