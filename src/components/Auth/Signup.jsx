/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { auth } from "../../firebase";

/**
 * Signup component for user registration.
 * Allows users to sign up using email and password or with Google authentication.
 */
const Signup = () => {
    const navigate = useNavigate(); // Hook to navigate between pages
    const { control, handleSubmit, formState: { errors }, getValues } = useForm({ // React Hook Form for form validation
        mode: 'onTouched', // Validation mode: triggers validation on blur
    });

    /**
     * Handles form submission for user registration.
     * @param {Object} data - User registration data.
     * @param {Object} e - Event object.
     */
    const onSubmit = async (data, e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const register = await createUserWithEmailAndPassword(auth, data.email, data.password); // Create user with email and password
            if (register) {
                navigate("/signin"); // Redirect to sign-in page after successful registration
            }
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    /**
     * Handles Google sign-in authentication.
     */
    const handleGoogleSignIn = () => {
        const auth = getAuth(); // Firebase authentication instance
        const provider = new GoogleAuthProvider(); // Google authentication provider

        // Add the prompt option to force account picker
        provider.setCustomParameters({ prompt: 'select_account' }); // Force account selection

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result); // Get user credential from result
                const user = result.user; // Get user information
                navigate('/'); // Redirect to home page after successful sign-in
            })
            .catch((error) => {
                const errorCode = error.code; // Error code from Google sign-in
                const errorMessage = error.message; // Error message from Google sign-in
            });
    };

    return (
        <div className="bg-gray-100 h-screen px-3 ">
        <div>
          {/* Amazon Logo */}
                <Link to={"/"} className="flex justify-center active:transform active:scale-90">
                    <img width={100} height={100} src="./lo.png" alt="./amazon-logo" />
                </Link>

                <form onSubmit={handleSubmit(onSubmit)} className="mb-2 bg-white rounded shadow-md w-fit sm:w-[540px] mx-auto px-8 pb-5">
                    <div className="py-5">
                        <Typography variant="h4" color="blue-gray">
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Nice to meet you! Enter your details to register.
                        </Typography>
                    </div>
                    <div className="mb-1 flex flex-col gap-3">
                        <Controller
                            name="Username"
                            rules={{
                                required: "Username is Required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters long",
                                }
                            }}
                            control={control}
                            render={({ field }) => <Input {...field} label="Username" error={Boolean(errors?.Username?.message)} />}
                        />
                        {errors?.Username?.message && (<span className="error-text">{errors?.Username?.message}</span>)}
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
                        {errors?.email?.message && (<span className="error-text">{errors?.email?.message}</span>)}
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
                        {errors?.password?.message && (<span className="error-text">{errors?.password?.message}</span>)}
                        <Controller
                            name="confirmpassword"
                            rules={{
                                required: "Confirm Password is Required",
                                validate: (value) => value === getValues("password") || "Passwords do not match"
                            }}
                            control={control}
                            render={({ field }) => <Input type="password" {...field} label="Confirm Password" error={Boolean(errors?.confirmpassword?.message)} />}
                        />
                        {errors?.confirmpassword?.message && (<span className="error-text">{errors?.confirmpassword?.message}</span>)}
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button onClick={onSubmit} type="submit" className="bg-gray-500 py-3 px-6 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue mt-2 flex justify-center" fullWidth>
                        Create your Amazon account
                    </Button>
                    <div className="flex justify-center items-center mt-4">
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
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to={"/signin"} className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </div>
        </div>
    );
};

export default Signup;
