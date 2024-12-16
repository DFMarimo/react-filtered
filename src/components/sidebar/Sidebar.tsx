import {useEffect, useState} from "react";
import {useFilter} from "../../context/FilterContext.tsx";
import * as React from "react";

interface Product {
    category: string
}

interface FetchResponse {
    products: Product[],
}


const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
    } = useFilter();


    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple", "watch", "Fashion", "trend", "Shoes", "Shirt", "pans"
    ]);
    useEffect(() => {
        const fetchCategories = async (): Promise<void> => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data: FetchResponse = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)))
                setCategories(uniqueCategories);

            } catch (error) {
                console.log('Error fetching products :', error);
            }
        }

        fetchCategories();
    }, []);

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    }
    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    }

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category);
    }

    const handleResetFilters = () => {
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setSelectedCategory('')
        setSearchQuery('')
        setKeyword('');
    }


    return <>
        <div className={"w-64 p-5 h-screen"}>
            <h1 className={"text-2xl font-bold mb-10 mt-4 capitalize"}>react store</h1>

            <section>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type={"text"}
                       placeholder={"search productPage"} className={"border-2 rounded px-2 sm:mb-0"}/>

                <div className="flex justify-center items-center">
                    <input value={minPrice ?? ''} onChange={handleMinPriceChange}
                           type={"text"} className={"border-2 mr-2 px-5 py-3 mb-3 w-full"} placeholder={"Min"}/>
                    <input value={maxPrice ?? ''} onChange={handleMaxPriceChange}
                           type={"text"} className={"border-2 mr-2 px-5 py-3 mb-3 w-full"} placeholder={"Max"}/>
                </div>

                {/* categories sections */}
                <section>
                    <div className={"mb-5"}>
                        <h2 className="text-xl font-smibold mb-3 capitalize">Categories</h2>
                    </div>

                    {categories.map((category, index) => (
                        <label key={index} className={"block mb-2"}>
                            <input name={"category"}
                                   value={category}
                                   type={"radio"}
                                   onChange={() => handleRadioChangeCategories(category)}
                                   checked={selectedCategory === category}
                                   className={"mr-2  w-[16px] h-[16px]"}/>{category.toUpperCase()}
                        </label>
                    ))}
                </section>

                {/* keywords sections */}
                <section>
                    <div className={"mb-5"}>
                        <h2 className="text-xl font-smibold mb-3 capitalize">keywords</h2>
                    </div>

                    {keywords.map((keyword, index) => (
                        <button key={index} onClick={() => setKeyword(keyword)}
                                className={"block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"}>
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </section>

                <button className={"w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 capitalize"}
                        onClick={() => {
                            handleResetFilters()
                        }}>
                    reset filters
                </button>

            </section>
        </div>
    </>
}
export default Sidebar