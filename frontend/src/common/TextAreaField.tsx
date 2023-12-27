/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    isError?: boolean;
}

export default function TextFieldArea(props: InputProps) {
    const { label, error, handleBlur, handleChange, value, type, name, placeholder } = props;

    return (
        <div className='mt-4'>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <textarea
                    name={name}
                    value={value}
                    className={`block w-full rounded-md border-0 py-1.5 pr-10 ${error && "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"} ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
                    placeholder={placeholder}
                    aria-invalid="true"
                    aria-describedby="email-error"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {
                    error &&
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                }

            </div>
            {
                error && <p className="mt-2 text-sm text-red-600" id="email-error">{error}</p>
            }
        </div>
    )
}