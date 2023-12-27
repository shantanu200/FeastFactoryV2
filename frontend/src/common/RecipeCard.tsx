import HeroImage from "../assets/hero.jpg";
import { IRecipe } from "../interface/IRecipe";
import Button from "./Button";

interface RecipeCardProps {
    recipe: IRecipe
}
const RecipeCard = (props: RecipeCardProps) => {
    const { recipe } = props;
    return (
        <article className="flex flex-col items-start min-h-1/2 h-full justify-between">
            <div className="relative w-full">
                <img
                    src={recipe.images[0]}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl ">
                <div className="mt-8 flex items-center gap-2 text-xs">

                    <time dateTime={""} className="text-gray-500">
                        {""}
                    </time>
                    <div className="flex items-center flex-wrap gap-2">
                        <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                            <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx={3} cy={3} r={3} />
                            </svg>
                            {recipe.user?.username}
                        </span>
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
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
                        <a href={`/recipe/${recipe._id}`}>
                            <span className="absolute inset-0" />
                            {recipe.name}
                        </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{recipe.description}</p>
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

    )
}

export default RecipeCard