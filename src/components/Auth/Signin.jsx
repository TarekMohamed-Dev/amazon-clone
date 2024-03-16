/* eslint-disable no-unused-vars */
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";


const Signin = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
    })

    const onSubmit = async (data, e) => {
        e.preventDefault()
        try {
            const login = await signInWithEmailAndPassword(auth, data.email, data.password);
            if (login) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error signing in:", error.message);
        }
    };

    const handleGoogleSignIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        // Add the prompt option to force account picker
        provider.setCustomParameters({ prompt: 'select_account' });

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <div className="bg-gray-100 h-screen px-3 ">
            <div>
                <Link to={"/"} className="flex justify-center active:transform active:scale-90">
                    <img width={100} height={100} src="./lo.png" alt="./amazon-logo" />
                </Link>

                <form onSubmit={handleSubmit(onSubmit)} className=" mb-2  bg-white rounded shadow-md px-8 pb-6 w-fit sm:w-[540px] mx-auto">
                    <div className="py-5">
                        <Typography variant="h4" color="blue-gray" >
                            Sign In
                        </Typography>
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Controller
                            name="email"
                            rules={{
                                required: "Email is Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                }
                            }}
                            control={control}
                            render={({ field }) => <Input {...field} label="Your Email" error={Boolean(errors?.email?.message)} />}
                        />
                        {
                            errors?.email?.message && (<span className="error-text">{errors?.email?.message}</span>)
                        }
                        <Controller
                            name="password"
                            rules={{
                                required: "Password is Required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                validate: (value) => {
                                    const hasUppercase = /[A-Z]/.test(value);
                                    const hasLowercase = /[a-z]/.test(value);
                                    const hasDigit = /\d/.test(value);
                                    const hasSpecialChar = /[!@#$%^&*]/.test(value);

                                    return (
                                        hasUppercase &&
                                        hasLowercase &&
                                        hasDigit &&
                                        hasSpecialChar ||
                                        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)"
                                    );
                                },
                            }}
                            control={control}
                            render={({ field }) => <Input type="password" {...field} label="Password" error={Boolean(errors?.password?.message)} />}
                        />
                        {
                            errors?.password?.message && (<span className="error-text">{errors?.password?.message}</span>)
                        }
                    </div>
                    <Button onClick={onSubmit} type="submit" className="mt-5 button text-black" fullWidth>
                        sign in
                    </Button>
                    <Typography className="text-sm mt-4 text-center text-gray-500">
                        Don’t have an account? <Link to={"/signup"} className=" text-black hover:text-gray-600">Sign Up</Link>
                    </Typography>

                    <div className="flex justify-center items-center mt-3">
                        <Button
                            onClick={handleGoogleSignIn}
                            size="sm"
                            variant="outlined"
                            color="blue-gray"
                            className="flex items-center gap-3"
                        >
                            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                            Continue with Google
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
