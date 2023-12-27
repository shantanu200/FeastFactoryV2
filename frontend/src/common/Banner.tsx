import { useEffect, useState } from "react";


interface IProps {
    setModalOpen: (open: boolean) => void;
}

export default function Banner(props: IProps) {
    const { setModalOpen } = props;
    const [token, setToken] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }, []);
    return (
        <div className="bg-indigo-100">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Got a delicious recipe to share?
                    <br />
                    We'd love to feature it on our site!
                </h2>
                <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                    <a
                        onClick={() => setModalOpen(true)}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Post a Recipe
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Explore Recipes <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
