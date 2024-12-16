import {useFilter} from "../../context/FilterContext.tsx";
import {useEffect, useState} from "react";
import {Tally3} from "lucide-react";
import BookCard from "../bookCard/BookCard.tsx";
import axios from 'axios'

const MainContent = () => {
    const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter();


    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const itemsPerPage: number = 12;

    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`

        if (keyword) {
            url = `https://dummyjson.com/products/search?q=${keyword}`
        }

        axios.get(url).then(res => {
            setProducts(res.data.products)
        }).catch(error => {
            console.log(error)
        })


    }, [keyword, currentPage])

    const getFiltersProducts = () => {
        let filteredProducts = products

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
        }

        if (minPrice !== undefined) {
            console.log(minPrice)
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
        }

        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        switch (filter) {
            case "cheap" :
                return filteredProducts.sort((a, b) => a.price - b.price);
            case "expensive":
                return filteredProducts.sort((a, b) => b.price - a.price);
            case "popular":
                return filteredProducts.sort((a, b) => b.rating - a.rating);
            default:
                return filteredProducts;
        }
    }

    const filteredProducts = getFiltersProducts()

    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage)
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    const getPaginationButtons = () => {
        const buttons: number[] = [];

        let startPage = Math.max(1, currentPage - 2)
        let endPage = Math.min(totalPages, currentPage + 2)

        if (currentPage - 2 < 1) {
            endPage = Math.min(totalPages, endPage + (2 - currentPage - 1))
        }
        if (currentPage + 2 > totalPages) {
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage))
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page)
        }

        return buttons;
    }

    return <>
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className={"relative my-5"}>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={"border px-4 py-2 rounded-full flex items-center"}>
                            <Tally3 className={"mr-2"}></Tally3>

                            {filter === 'all' ? "Filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>
                        {dropdownOpen && (
                            <div className={"absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40"}>
                                <button onClick={() => setFilter('all')}
                                        className={"block px-4 py-2 w-full text-left hover:bg-gray-200"}>All
                                </button>

                                <button onClick={() => setFilter('cheap')}
                                        className={"block px-4 py-2 w-full text-left hover:bg-gray-200"}>Cheap
                                </button>

                                <button onClick={() => setFilter('expensive')}
                                        className={"block px-4 py-2 w-full text-left hover:bg-gray-200"}>Expensive
                                </button>

                                <button onClick={() => setFilter('popular')}
                                        className={"block px-4 py-2 w-full text-left hover:bg-gray-200"}>Popular
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-col-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {/* Book card */}
                    {filteredProducts.map((product) => {
                        return <BookCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.thumbnail}
                            price={product.price}
                        />
                    })}
                </div>


                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                    {/*previous*/}
                    <button onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={"border px-4 py-2 mx-2 rounded-full capitalize disabled:text-gray-400"}>previous
                    </button>

                    {/* 1,2,3,4 */}
                    <div className="flex flex-wrap justify-center items-center">
                        {/* pagination */}
                        {getPaginationButtons().map(page =>
                            <button
                                className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}
                                key={page} onClick={() => setCurrentPage(page)}>{page}</button>)
                        }
                    </div>


                    {/*next*/}
                    <button onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={"border px-4 py-2 mx-2 rounded-full capitalize disabled:text-gray-400"}>next
                    </button>
                </div>


            </div>
        </section>
    </>
}

export default MainContent;