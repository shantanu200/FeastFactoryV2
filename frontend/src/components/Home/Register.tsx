import { Formik } from 'formik';
import React, { useState } from 'react'
import TextField from '../../common/TextField';
import Button from '../../common/Button';
import { APIHandler } from '../../server/API';
import ROUTES from '../../server/Routes';
import Modal from '../../common/Modal';
import { ValidationSchemaRegister } from '../../validation/Validator';
import { CheckCircleIcon } from '@heroicons/react/24/outline';


interface Props {
    setIsLogin: (isLogin: boolean) => void;
}

const Register = (props: Props) => {
    const { setIsLogin } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    return (
        <section>
            <div>
                <h1 className='text-2xl font-bold'>Sign Up</h1>
                <p className='text-sm my-2'>Already Have an Account? <span className='text-indigo-600 cursor-pointer' onClick={() => setIsLogin(true)}>Sign In</span></p>
            </div>
            <Formik initialValues={{
                name: "",
                username: "",
                password: "",
            }}
                validationSchema={ValidationSchemaRegister}
                onSubmit={async (values) => {
                    setLoading(true);
                    const { success, loading, data, message, error } = await APIHandler("POST", ROUTES.USER.CREATE, values);
                    setLoading(loading);
                    if (success) {
                        setIsLogin(true);
                    } else {
                        setError(true);
                        setErrorText(String(error));
                        setLoading(false);
                    }
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                    <section className='my-4'>
                        <TextField type='text' label='Name' name='name' value={values.name} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.name} />
                        <TextField type='text' label='Username' name='username' value={values.username} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.username} />
                        <TextField type='password' label='Password' name='password' value={values.password} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.password} />
                        <Button text='Submit' width='w-full' loading={loading} handleFuction={handleSubmit} />
                        <p className='text-xs text-gray-400 text-center my-4'>By signing up, you agree to maintain account security, use our services responsibly, provide accurate info, and accept our Privacy Policy and terms updates.</p>
                    </section>
                )}
            </Formik>
            <Modal open={error} setOpen={() => setError(false)} children={
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{errorText}</p>
                        </div>
                    </div>
                </div>
            } />
        </section>
    )
}

export default Register