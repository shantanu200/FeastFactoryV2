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
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    isError?: boolean;
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    ref?: React.RefObject<HTMLInputElement>;
}

export default function TextField(props: InputProps) {
    const { label, error, handleBlur, handleChange, value, type, name, placeholder, handleKeyDown, ref } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className='mt-4'>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type={type === "password" ? showPassword ? "text" : "password" : type}
                    name={name}
                    ref={ref}
                    id="email"
                    value={value}
                    className={`block w-full rounded-md border-0 py-1.5 pr-10 ${error && "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"} ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
                    placeholder={placeholder}
                    aria-invalid="true"
                    aria-describedby="email-error"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                {
                    error &&
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                }
                {
                    type === "password" && !error &&
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        {showPassword ?
                            <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" onClick={() => setShowPassword(false)} /> :
                            <EyeSlashIcon className="h-5 w-5 text-gray-500" aria-hidden="true" onClick={() => setShowPassword(true)} />}
                    </div>
                }
            </div>
            {
                error && <p className="mt-2 text-sm text-red-600" id="email-error">{error}</p>
            }
        </div>
    )
}
