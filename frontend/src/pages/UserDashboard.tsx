import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IUser } from "../interface/IUser";
import { APIHandler } from "../server/API";
import { IRecipe } from "../interface/IRecipe";
import { ExclamationTriangleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../common/Modal";
import RecipeForm from "../components/Recipe/RecipeForm";
import { Dialog } from "@headlessui/react";

const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
]


export default function UserDashboard() {
    const location = useLocation();
    const _id = location.pathname.split("/")[2];

    const [userDetails, setUserDetails] = useState<IUser>();
    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);
    const [currentEditIndex, setCurrentEditIndex] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [deleteID, setDeleteID] = useState<string>("");
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const cancelButtonRef = useRef(null)
    useEffect(() => {
        const getUserDetails = async () => {
            if (_id) {
                const { success, data, error, message } = await APIHandler("GET", `/user/${_id}`);

                if (success) {
                    console.log(data.data);
                    setUserDetails(data.data);
                } else {
                    console.log(error, message);
                }
            } else {
                const { success, data, error, message, loading } = await APIHandler("GET", `/user`);

                if (success) {
                    console.log(data.data);
                    setUserDetails(data.data);
                    setIsLoggedInUser(true);
                } else {
                    console.log(error, message);
                }
            }

        }
        getUserDetails();
    }, [_id]);
    return (
        <div className="py-16 bg-white">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div>
                    <h1 className="text-5xl font-bold">{userDetails?.name}</h1>
                    <p className="my-2">@{userDetails?.username}</p>
                </div>
                <div className="my-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">User Dashboard</h3>
                    <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
                        <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Recipe Shared</dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{userDetails?.recipes?.length}</dd>
                        </div>
                    </dl>
                </div>
                <div className="max-w-2xl mx-auto my-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the {userDetails?.name}</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>
                <div className="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {userDetails?.recipes && userDetails?.recipes.map((post: IRecipe, index) => (
                        <article key={index} className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src={post.images[0]}
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="flex items-center mt-8 text-xs gap-x-4">
                                    {/* <time dateTime={posts[0].datetime} className="text-gray-500">
                                        {posts[0].date}
                                    </time> */}
                                    <div className="flex flex-wrap gap-2">
                                        {post.ingredients.slice(0, 3).map((ingredient, index) => (
                                            <a
                                                key={index}
                                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                            >
                                                {ingredient}
                                            </a>
                                        ))}
                                    </div>

                                </div>
                                <div className="relative group">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={`/recipe/${post._id}`}>
                                            <span className="absolute inset-0" />
                                            {post.name}
                                        </a>
                                    </h3>
                                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{post.description}</p>

                                </div>
                                {!_id && <div className="flex justify-end gap-4 my-4">
                                    <PencilIcon className="w-4 h-4 text-indigo-700 cursor-pointer" onClick={() => { setCurrentEditIndex(String(post._id)); setOpen(true); }} />
                                    <TrashIcon className="w-4 h-4 text-red-700 cursor-pointer" onClick={() => { setDeleteID(String(post._id)); setDeleteOpen(true) }} />
                                </div>}
                                {/* <div className="relative flex items-center mt-8 gap-x-4">
                                    <img src={""} alt="" className="w-10 h-10 bg-gray-100 rounded-full" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a href={post.author.href}>
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                    </div>
                                </div> */}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <Modal open={open} setOpen={() => { setOpen(false) }} children={<RecipeForm recipeId={currentEditIndex} />} />
            <Modal open={deleteOpen} setOpen={() => setDeleteOpen(false)} children={
                <div>
                    <div className="sm:flex sm:items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Delete Recipe
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete your recipe? All of your data will be permanently removed
                                    from our servers forever. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={async () => {
                                const { success, data, error, message } = await APIHandler("DELETE", `/recipe/${deleteID}`);
                                if (success) {
                                    window.location.reload();
                                } else {
                                    console.log(error, message);
                                }
                            }}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => {
                                setDeleteOpen(false);
                                setDeleteID("");
                            }}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            } />
        </div>
    )
}
