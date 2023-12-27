import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IUser } from "../interface/IUser";
import { APIHandler } from "../server/API";
import { IRecipe } from "../interface/IRecipe";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../common/Modal";
import RecipeForm from "../components/Recipe/RecipeForm";

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
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div>
                    <h1 className="text-5xl font-bold">{userDetails?.name}</h1>
                    <p className="my-2">@{userDetails?.username}</p>
                </div>
                <div className="my-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">User Dashboard</h3>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                            <dt className="truncate text-sm font-medium text-gray-500">Recipe Shared</dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{userDetails?.recipes?.length}</dd>
                        </div>
                    </dl>
                </div>
                <div className="mx-auto max-w-2xl text-center my-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the {userDetails?.name}</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={posts[0].datetime} className="text-gray-500">
                                        {posts[0].date}
                                    </time>
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
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={`/recipe/${post._id}`}>
                                            <span className="absolute inset-0" />
                                            {post.name}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>

                                </div>
                                <div className="flex gap-4 my-4 justify-end">
                                    <PencilIcon className="w-4 h-4 text-indigo-700 cursor-pointer" onClick={() => { setCurrentEditIndex(String(post._id)); setOpen(true); }} />
                                    <TrashIcon className="w-4 h-4 text-red-700 cursor-pointer" onClick={() => { setCurrentEditIndex(String(post._id)); setOpen(true); }} />
                                </div>
                                {/* <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src={""} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
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
        </div>
    )
}
