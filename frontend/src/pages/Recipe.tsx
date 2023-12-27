import React, { useEffect, useState } from 'react'
import Banner from '../common/Banner'
import Navbar from '../common/Navbar'
import RecipeCard from '../common/RecipeCard'
import Auth from '../components/Home/Auth'
import Modal from '../common/Modal'
import { IRecipe } from '../interface/IRecipe'
import { APIHandler } from '../server/API'
import ROUTES from '../server/Routes'
import RecipeForm from '../components/Recipe/RecipeForm'
import { debounce } from 'lodash'
import NotFound from "../assets/data.svg";

const Recipe = () => {
    const [token, setToken] = useState<string>("");
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const fetchRecipes = async () => {
        setLoading(true);
        const { success, data, error, message, loading } = await APIHandler("GET", `/recipe/posts?search=${search}`);
        setLoading(loading);
        if (success) {
            setRecipes(data.data);
        } else {
            setLoading(false);
            console.log(error, message);
            setRecipes([]);
        }
    }
    const debounceSearch = debounce(fetchRecipes, 500);
    useEffect(() => {
        debounceSearch();
        return () => {
            debounceSearch.cancel();
        }
    }, [search, page, limit]);

    return (
        <main className='w-full h-full min-h-screen'>
            <Navbar setSearch={setSearch} setModalOpen={setLoginModalOpen} />
            <Banner setModalOpen={setLoginModalOpen} />
            {loading ? <div className="flex items-center justify-center h-96">
                <svg className="w-20 h-20 mr-3 -ml-1 text-indigo-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            </div> :
                recipes.length > 0 ?
                    <section className='grid items-center grid-cols-1 p-8 place-items-center sm:grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-3 xl:grid-cols-4'>
                        {recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)}
                    </section>
                    :
                    <div className='flex flex-col items-center justify-center w-full my-16'>
                        <img src={NotFound} className='xl:w-1/5' />
                        <h1 className='my-4 text-2xl font-bold'>Recipes Not Found</h1>
                    </div>

            }

            <Modal open={loginModalOpen} setOpen={() => setLoginModalOpen(false)} children={localStorage.getItem("token") ? <RecipeForm /> : <Auth />} />
        </main>
    )
}

export default Recipe