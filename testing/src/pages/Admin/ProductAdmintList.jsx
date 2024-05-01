import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { findAllProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import MainPage from "../../component/MainPage";

const ProdukAdminList = () => {

    const [product, setProduct] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [totalRecords, setTotalRecords] = useState(0);

    const handleChangePageSize = (newPageSize) => {
        setPageSize(newPageSize);
        setOffset(0);
    };

    useEffect(() => {
        const load = async () => {
            try {
                const response = await findAllProduk(search, pageSize, offset);
                setProduct(response.data);
                setTotalRecords(response.data.totalDataResult);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        load();
    }, [search, pageSize, offset]);

    const namaBodyTemplate = (row) => {
        return (
            <Link to={`/admin/product/detail/${row.id}`}
                className="cell-link">
                {row.nama}
            </Link>
        )
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setOffset(0);
    };

    const handleNextPage = () => {
    //     const totalPages = Math.ceil(totalRecords / pageSize);
        const nextPageOffset = offset + 1;
        if (nextPageOffset < totalRecords) {
            setOffset(nextPageOffset);
            console.log("dipencet");
        }
    };
    
    const handlePrevPage = () => {
        const prevPageOffset = offset - 1;
        if (prevPageOffset >= 0) {
            setOffset(prevPageOffset);
        }
    };

    return (
        <MainPage>
            <div className="main-content">
            <div className="content">
                <div className="content-inner">
                    <div className="content-header flex justify-between items-center">
                        <h2 className="text-xl font-bold">Stok Gudang</h2>
                        <div>
                            <Link to="/admin/produk/create" className="text-blue-500 hover:underline">
                                <Button label="Tambah" />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleSearchSubmit} className="flex">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search..."
                                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                            />
                        </form>
                    </div>
                </div>
                <div className="content-body">
                    <div className="content-data shadow-md">
                    <DataTable value={product.items} className="min-w-[50rem]">
                        <Column field="nama" header="Nama Produk" body={namaBodyTemplate}  />
                        <Column field="category.nama" header="Categories" />
                        <Column field="qty" header="Stok" style={{ width: "50px" }} cellStyle={{ padding: '10px' }} />
                    </DataTable>

                    </div>
                    <div className="flex items-center mt-4">
                        <Button onClick={handlePrevPage} disabled={offset === 0} className="border border-gray-300 rounded px-4 py-1 mr-2">Previous</Button>
                        <Button onClick={handleNextPage} className="border border-gray-300 rounded px-4 py-1">Next</Button>
                        <select
                            value={pageSize}
                            onChange={(e) => handleChangePageSize(e.target.value)}
                            className="ml-4 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                        >
                            <option value="5">5</option>
                            {/* <option value="10">10</option>
                            <option value="20">20</option> */}
                        </select>
                    </div>
                </div>
            </div>
        </div>

        </MainPage>
    )

}

export default ProdukAdminList;