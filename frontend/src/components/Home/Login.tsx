import { Formik } from 'formik'
import TextField from '../../common/TextField'
import Button from '../../common/Button'
import { ValidationSchemaLogin } from '../../validation/Validator';
import { APIHandler } from '../../server/API';
import ROUTES from '../../server/Routes';
import { useState } from 'react';
import Modal from '../../common/Modal';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
    setIsLogin: (isLogin: boolean) => void;
}

const Login = (props: Props) => {
    const { setIsLogin } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    return (
        <section className='w-full'>
            <div>
                <h1 className='text-2xl font-bold'>Sign In</h1>
                <p className='my-2 text-sm'>Create Account? <span className='text-indigo-600 cursor-pointer' onClick={() => setIsLogin(false)}>Sign Up</span></p>
            </div>
            <Formik initialValues={{
                username: "",
                password: "",
            }}
                validationSchema={ValidationSchemaLogin}
                onSubmit={async (values) => {
                    setLoading(true);
                    const { success, loading, error, message, data } = await APIHandler("POST", ROUTES.USER.LOGIN, values);
                    setLoading(loading);

                    if (success) {
                        setTimeout(() => {
                            setLoading(true);
                            localStorage.setItem("token", String(data?.data?.accessToken));
                            window.location.href = "/recipe";
                        }, 1000);
                        setLoading(false)
                    } else {
                        console.log(error, message);
                        setLoading(false);
                        setError(true)
                        setErrorText(String(error));
                    }
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <section className='my-4'>
                        <TextField type='text' label='Username' name='username' value={values.username} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.username} />
                        <TextField type='password' label='Password' name='password' value={values.password} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.password} />
                        <Button loading={loading} text='Submit' width='w-full' handleFuction={handleSubmit} />
                        <p className='my-4 text-xs text-center text-gray-400'>By signing up, you agree to maintain account security, use our services responsibly, provide accurate info, and accept our Privacy Policy and terms updates.</p>
                    </section>
                )}
            </Formik>
            {
                errorText && <Modal open={error} setOpen={() => { setError(false) }} children={<div className="w-full p-4 rounded-md bg-red-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XMarkIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{errorText}</p>
                        </div>
                    </div>
                </div>} />
            }
        </section>
    )
}

export default Login