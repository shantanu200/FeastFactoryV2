import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    handleFuction?: () => void;
    loading?: boolean;
    width?: string;

}

const Button = (props: Props) => {
    const { handleFuction, text, loading, width } = props;
    return (
        <button
            type="button"
            className={`inline-flex mt-4 ${width ? width : ""} items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible: outline-2 focus-visible: outline-offset-2 focus-visible: outline-indigo -600`}
            onClick={handleFuction}
            disabled={loading}
        >
            {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            }
            {text}
        </button>
    )
}

export default Button