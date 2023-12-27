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

const Recipe = () => {
    const [token, setToken] = useState<string>("");
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }, [token])

    const fetchRecipes = async () => {
        setLoading(true);
        const { success, data, error, message, loading } = await APIHandler("GET", `${ROUTES.RECIPE.GETALL}?page=${page}&limit=${limit}&search=${search}`);
        setLoading(loading);
        if (success) {
            setRecipes(data.data);
        } else {
            console.log(error, message);
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
            <Banner />
            {loading ? <div className="flex justify-center items-center h-96">
                <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            </div> :
                <section className='grid grid-cols-1 place-items-center items-center sm:grid-cols-2 gap-x-8 gap-y-16 p-8 lg:grid-cols-3 xl:grid-cols-4'>
                    {recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)}
                </section>
            }

            <Modal open={loginModalOpen} setOpen={() => setLoginModalOpen(false)} children={isLogin ? <RecipeForm /> : <Auth />} />
        </main>
    )
}

export default Recipe