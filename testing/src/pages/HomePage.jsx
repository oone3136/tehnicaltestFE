import React, { useEffect, useState } from "react";
import { Header } from "../component/Header";
import { findAllProduk } from "../services/ProdukService";
import ProductTable from "./ProductTable";
import { Button } from "primereact/button";

const HomePage = () => {
    const [product, setProduct] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlOffset = parseInt(urlParams.get('offset')) || 0;
        setOffset(urlOffset);
    }, []);

    const handleChangePageSize = (newPageSize) => {
        setPageSize(newPageSize);
        setOffset(0);
    };

    useEffect(() => {
        const load = async () => {
            try {
                const response = await findAllProduk(search, pageSize, offset);
                setProduct(response.data.items);
                setTotalRecords(response.data.totalDataResult);
            } catch (error) {
                console.error(error);
            }
        };

        load();
    }, [search, pageSize, offset]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setOffset(0);
    };

    const handleNextPage = () => {
        const nextPageOffset = offset + 1;
        console.log(nextPageOffset);
        if (nextPageOffset < totalRecords) {
            setOffset(nextPageOffset);
            console.log(nextPageOffset);
        }
    };
    
    const handlePrevPage = () => {
        const prevPageOffset = offset - 1;
        if (prevPageOffset >= 0) {
            setOffset(prevPageOffset);
        }
    };
    

    return (
        <>
            <Header />
            <div class="flex justify-center">
                <div>
                    <div>
                        <h2>Stok Gudang</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSearchSubmit} className="mt-4">
                        <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500" />
                    </form>
                    </div>
                    <div className="datatabel">
                        <ProductTable products={product} />
                        <Button onClick={handlePrevPage} className="border border-gray-300 rounded px-4 py-1 mr-2">Previous</Button>
                        <Button onClick={handleNextPage} className="border border-gray-300 rounded px-4 py-1">Next</Button>
                        <select value={pageSize} onChange={(e) => handleChangePageSize(e.target.value)} class="ml-4 border border-gray-300 rounded px-2 py-1 focus:outline-none">
                            <option value="5">5</option>
                            {/* <option value="10">10</option>
                            <option value="20">20</option> */}
                        </select>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
};

export default HomePage;
