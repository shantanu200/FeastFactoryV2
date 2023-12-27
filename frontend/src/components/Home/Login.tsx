import { Formik } from 'formik'
import TextField from '../../common/TextField'
import Button from '../../common/Button'
import { ValidationSchemaLogin } from '../../validation/Validator';
import { APIHandler } from '../../server/API';
import ROUTES from '../../server/Routes';
import { useState } from 'react';

interface Props {
    setIsLogin: (isLogin: boolean) => void;
}

const Login = (props: Props) => {
    const { setIsLogin } = props;
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <section>
            <div>
                <h1 className='text-2xl font-bold'>Sign In</h1>
                <p className='text-sm my-2'>Create Account? <span className='text-indigo-600 cursor-pointer' onClick={() => setIsLogin(false)}>Sign Up</span></p>
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
                        localStorage.setItem("token", String(data?.data?.accessToken));
                        window.location.href = "/recipe";
                    } else {
                        setLoading(false);
                        console.log(error);
                    }
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <section className='my-4'>
                        <TextField type='text' label='Username' name='username' value={values.username} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.username} />
                        <TextField type='password' label='Password' name='password' value={values.password} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.password} />
                        <Button loading={loading} text='Submit' width='w-full' handleFuction={handleSubmit} />
                        <p className='text-xs text-gray-400 text-center my-4'>By signing up, you agree to maintain account security, use our services responsibly, provide accurate info, and accept our Privacy Policy and terms updates.</p>
                    </section>
                )}
            </Formik>
        </section>
    )
}

export default Login