import { Formik } from "formik";
import React, { ReactComponentElement, useEffect, useRef, useState } from "react";
import TextField from "../../common/TextField";
import Button from "../../common/Button";
import { ValidationSchemaLogin, ValidationSchemaRecipe } from "../../validation/Validator";
import { APIHandler } from "../../server/API";
import TextFieldArea from "../../common/TextAreaField";
import ROUTES from "../../server/Routes";
import { IRecipe } from "../../interface/IRecipe";
import { PencilIcon } from "@heroicons/react/24/outline";
import { date } from "yup";
import { set } from "lodash";

interface IProps {
    nextStep?: () => void;
    data: IRecipe;
    setData: (data: any) => void;
    isEdit?: boolean;
}

const InstructionsMenu = (props: IProps) => {
    const { nextStep, data, setData, isEdit } = props;
    const [instructions, setInstructions] = useState<string[]>([]);
    const [instructionString, setInstructionString] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number>(-1);

    useEffect(() => {
        if (data?.instructions?.length > 0) {
            setInstructions(data?.instructions);
        }
    }, [data]);

    useEffect(() => {
        console.log("Current Data in instruction menu", data);
        setData({ instructions });
    }, [instructions]);




    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
        const { value } = e.currentTarget;
        if (editIndex !== -1 && e.key === "Enter" && value.length > 0) {
            const data = [...instructions];
            data[editIndex] = value;
            setInstructions(data);
            setInstructionString("");
            setEditIndex(-1);
        } else if (key === "Instructions" && value.length > 0 && e.key === "Enter" && editIndex === -1) {
            setInstructions((prev) => [...prev, value]);
            setInstructionString("");
        }
    }
    const handleDelete = (index: number) => {
        setInstructions((prev) => prev.filter((_, i) => i !== index));
    }
    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold'>Add Instructions</h1>
                <p className='my-2 text-sm'>Share your recipe in the form below!</p>
            </div>
            <TextField type='text' label='Recipe Instructions' name='instructions' value={instructionString} handleKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, "Instructions")} handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstructionString(e.target.value)} />
            <div className="flex flex-col gap-2 my-2">
                {instructions.map((instruction, index) => (
                    <span key={index} className="inline-flex items-center justify-between gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 text-justify">
                        {index + 1}. {instruction}
                        <div className="inline-flex items-center gap-2 ml-2">
                            <PencilIcon className="w-3 h-3 cursor-pointer" onClick={() => { setInstructionString(instruction); setEditIndex(index) }} />
                            <button onClick={() => handleDelete(index)} type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                                <span className="sr-only">Remove</span>
                                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                                    <path d="M4 4l6 6m0-6l-6 6" />
                                </svg>
                                <span className="absolute -inset-1" />
                            </button>
                        </div>
                    </span>
                ))}
            </div>
            <Button text={isEdit ? "Update" : "Submit"} width='w-full' handleFuction={nextStep} />
            <p className='my-4 text-xs text-center text-gray-400'>By signing up, you agree to maintain account security, use our services responsibly, provide accurate info, and accept our Privacy Policy and terms updates.</p>
        </div>
    )
}


const Details = (props: IProps) => {
    const { nextStep, data, setData } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        if (data?.ingredients?.length > 0) {
            setIngredients(data?.ingredients);
        }
    }, [data])


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
        let { value } = e.target as HTMLInputElement;

        if (key === "Ingredients" && value.length > 0 && e.key === "Enter") {
            const value = e.currentTarget.value;
            const data = value.trim().split(",");
            console.log("Ingredients", data);
            setIngredients((prev) => [...prev, ...data]);
            e.currentTarget.value = "";
        }

    }

    const handleDelete = (index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold'>Post Recipe</h1>
                <p className='my-2 text-sm'>Share your recipe in the form below!</p>
            </div>
            <Formik initialValues={{
                name: data?.name || "",
                description: data?.description || "",
            }}
                enableReinitialize
                validationSchema={ValidationSchemaRecipe}
                onSubmit={(values) => {
                    const tempData = {
                        name: values.name,
                        description: values.description,
                        ingredients
                    }
                    setData(tempData);
                    nextStep && nextStep();
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <>
                        <TextField type='text' label='Recipe Name' name='name' value={values.name} handleBlur={handleBlur} handleChange={handleChange} error={errors && errors.name} />
                        <TextFieldArea label="Recipe Description" name="description" value={values.description} handleBlur={handleBlur} handleChange={handleChange} error={errors.description} />
                        <TextField type='text' label='Ingredients' handleKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, "Ingredients")} />
                        <div className="flex flex-wrap gap-2 my-2">
                            {ingredients.map((ingredient, index) => (
                                <span key={index} className="inline-flex items-center gap-x-0.5 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                    {ingredient}
                                    <button onClick={() => handleDelete(index)} type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-yellow-600/20">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-yellow-800/50 group-hover:stroke-yellow-800/75">
                                            <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <Button text='Submit' width='w-full' handleFuction={handleSubmit} />
                        <p className='my-4 text-xs text-center text-gray-400'>By signing up, you agree to maintain account security, use our services responsibly, provide accurate info, and accept our Privacy Policy and terms updates.</p>
                    </>
                )}
            </Formik>
        </div >
    )
}

const PhotoGallery = (props: IProps) => {
    const { data, setData, isEdit } = props;
    const [images, setImages] = useState<FileList>();
    const [loading, setLoading] = useState<boolean>(false);
    console.log(data);
    useEffect(() => {
        setData({ images: ["https://res.cloudinary.com/dgrxzxtd8/image/upload/v1703621648/rkhc3dwnto3f9pm3rex4.jpg"] })
    }, []);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setImages(e.target.files!);
        //Write code to upload Multiple Images in one click on cloudinary
        const files = e.target.files!;
        const formData = new FormData();
        const links: string[] = [];
        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", "educatdo");
            const response = await fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/image/upload", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            links.push(data.secure_url);
        }
        console.log(links);
        setData({ images: links });
        setLoading(false);
    }

    console.log(images);

    const handleServerRequest = async () => {
        if (isEdit) {
            const response = await APIHandler("PUT", `/recipe/${data?._id}`, data);
            if (response.success) {
                console.log("Response", response);
                window.location.href = "/user";
            } else {
                console.log("Error", response);
            }
        } else {
            const response = await APIHandler("POST", ROUTES.RECIPE.CREATE, data);

            if (response.success) {
                console.log("Response", response);
                window.location.href = "/recipe";
            } else {
                console.log("Error", response);
            }
        }

    }
    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold'>Upload Images</h1>
                <p className='my-2 text-sm'>Share your recipe in the form below!</p>
            </div>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={uploadImage} accept="image/x-png,image/gif,image/jpeg"  multiple />
                </label>
            </div>
            {/* <div>
                {images.length > 0 && <div className="flex flex-wrap gap-2 my-2">
                    {Array.from(images).map((image, index) => (
                        <span key={index} className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                            {image.name}
                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                                <span className="sr-only">Remove</span>
                                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                                    <path d="M4 4l6 6m0-6l-6 6" />
                                </svg>
                                <span className="absolute -inset-1" />
                            </button>
                        </span>
                    ))}
                </div>}
            </div> */}
            <Button loading={loading} text={isEdit ? "Update" : "Submit"} width='w-full' handleFuction={handleServerRequest} />
            <p className='my-4 text-xs text-center text-gray-400'>By signing up, you agree to maintain account security, use our services responsibly, provide accurate info, and accept our Privacy Policy and terms updates.</p>
        </div>
    )
}

interface IRecipeFormProps {
    recipeId?: string;
}


const RecipeForm: React.FC<IRecipeFormProps> = (props) => {
    const { recipeId } = props;
    const [step, setStep] = useState<number>(0);
    const [data, setData] = useState<IRecipe>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        const getRecipe = async () => {
            const { success, data, error, message } = await APIHandler("GET", `/recipe/${recipeId}`);

            if (success) {
                setData(data.data);
                setIsEdit(true);
            } else {
                console.log(error, message);
            }
        }
        if (recipeId && recipeId.length > 0) {
            getRecipe();
        }
    }, [recipeId])

    const nextStep = () => {
        setStep((prev) => prev + 1);
    }



    const updateData = (updatedData: IRecipe) => {
        setData(prevData => ({ ...prevData, ...updatedData }));
    }

    const components = [
        <Details data={data as IRecipe} setData={updateData} nextStep={nextStep} isEdit={isEdit} />,
        <InstructionsMenu data={data as IRecipe} setData={updateData} nextStep={nextStep} isEdit={isEdit} />,
        <PhotoGallery data={data as IRecipe} setData={updateData} isEdit={isEdit} />,
    ];


    return (
        <section>
            {components[step]}
        </section>
    )
}

export default RecipeForm
