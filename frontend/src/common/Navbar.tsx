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
import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Modal from './Modal'
import Auth from '../components/Home/Auth'
import { IUser } from '../interface/IUser'
import { APIHandler } from '../server/API'
import Button from './Button'

const userData = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Teams', href: '#', current: false },
    { name: 'Directory', href: '#', current: false },
]
const userNavigation = [
    { name: 'My Recipes', href: '/user' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface IProps {
    setModalOpen: (open: boolean) => void;
    setSearch?: (search: string) => void;
}

export default function Navbar(props: IProps) {
    const { setModalOpen } = props;
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const getUserDetails = async () => {
            const { success, data, error, loading, message } = await APIHandler("GET", "/user");
            if (success) {
                setUser(data.data);
            } else {
                console.error(error);
            }
        }
        if (localStorage.getItem("token") !== "") {
            console.log(localStorage.getItem("token"));
            setIsLogin(true);
            getUserDetails();
        }
    }, [])

    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({ open }) => (
                    <>
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                                    <div className="flex items-center flex-shrink-0">
                                        <a href="#">
                                            <img
                                                className="w-auto h-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Your Company"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6">
                                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                                        <div className="w-full">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    onChange={(e) => props.setSearch && props.setSearch(e.target.value)}
                                                    id="search"
                                                    name="search"
                                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                    placeholder="Search your favorite recipes or ingredients"
                                                    defaultValue={""}
                                                    key={"search"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button className="relative inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                                    <button
                                        type="button"
                                        className="relative flex-shrink-0 p-1 ml-5 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="w-6 h-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    {localStorage.getItem("token") ?
                                        <Menu as="div" className="relative flex-shrink-0 ml-5">
                                            <div>
                                                <Menu.Button className="relative flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="w-8 h-8 rounded-full" src={userData.imageUrl} alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    onClick={() => {
                                                                        if (item.name === "Sign out") {
                                                                            localStorage.removeItem("token");
                                                                            window.location.reload();
                                                                        } else {
                                                                            return;
                                                                        }
                                                                    }}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        :
                                        <a
                                            onClick={() => setModalOpen(true)}
                                            className="inline-flex items-center px-3 py-2 ml-6 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign In
                                        </a>}
                                    <a
                                        onClick={() => setModalOpen(true)}
                                        className="inline-flex items-center px-3 py-2 ml-6 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Post Recipe
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            {/* <div className="max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                                            'block rounded-md py-2 px-3 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div> */}
                            {
                                localStorage.getItem("token") ?
                                    <div className="pt-4 pb-3 border-t border-gray-200">
                                        <div className="flex items-center max-w-3xl px-4 mx-auto sm:px-6">
                                            <div className="flex-shrink-0">
                                                <img className="w-10 h-10 rounded-full" src={userData.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800">{user && user.name}</div>
                                                <div className="text-sm font-medium text-gray-500">{user && user.username}</div>
                                            </div>
                                            <button
                                                type="button"
                                                className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={() => setModalOpen(true)}
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="w-6 h-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <div className="max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4">
                                            {userNavigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => {
                                                        if (item.name === "Sign out") {
                                                            localStorage.removeItem("token");
                                                            window.location.reload();
                                                        } else {
                                                            return;
                                                        }
                                                    }}
                                                    className="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div> : <div className='px-4 pt-4 pb-3'>
                                        <Button text='Sign In' width='w-1/2' handleFuction={() => setModalOpen(true)} />
                                    </div>
                            }

                        </Popover.Panel>
                    </>
                )}
            </Popover >

        </>
    )
}
