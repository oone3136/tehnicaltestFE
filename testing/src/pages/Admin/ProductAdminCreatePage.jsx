import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { useNavigate } from "react-router-dom";
import { findAllKategori } from "../../services/KategoriService";
import { createProduk } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProductAdminCreatePage = () => {
    const [product, setProduct] = useState({
        id: null,
        nama: "",
        category: {
            id: null
        },
        description: "",
        qty: 0
    });
    const [kategoris, setKategoris] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadKategori = async () => {
            try {
                const response = await findAllKategori();
                setKategoris(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadKategori();

        setLoading(false);

    }, []);

    const saveProduk = async () => {
        try {
            setSubmited(true);
            const response = await createProduk(product);
            const _produk = response.data;
            navigate(`/admin/produk/detail/${_produk.id}`, {
                replace: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <MainPage>
            {loading ?
                <ProgressBar mode="indeterminate" className="my-progress-bar" /> :
                <div className="main-content">
                    <div className="content">
                        <div className="content-inner">
                            <div className="content-header">
                                <h2>Tambah Produk</h2>
                            </div>
                            <div className="content-body">
                                <div className="content-form shadow-1">
                                    <div className="flex">
                                        <div className="flex-grow-1">
                                            <div className="p-fluid mb-4">
                                                <div className="p-filed mb-3">
                                                    <label htmlFor="nama" className="form-label">Nama</label>
                                                    <InputText value={product.nama}
                                                        placeholder="Ketik nama produk"
                                                        id="nama"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || '';
                                                            setProduct(prevState => ({ ...prevState, nama: val }));
                                                        }}
                                                    />
                                                    {submited && !product.nama && <span className="p-error">Nama produk tidak boleh kosong</span>}
                                                </div>
                                                <div className="p-field mb-3">
                                                    <label htmlFor="category" className="form-label">Category</label>
                                                    <Dropdown optionLabel="nama"
                                                        optionValue="id"
                                                        id="categori"
                                                        value={product.category.id}
                                                        options={kategoris}
                                                        placeholder="Pilih kategory"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || null;
                                                            setProduct(prevState => ({ ...prevState, category: { id: val } }));
                                                        }}
                                                    />
                                                    {submited && !product.category.id && <span className="p-error">Kategori produk harus dipilih</span>}
                                                </div>
                                                <div className="p-filed mb-3">
                                                    <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                                                    <InputText value={product.description}
                                                        placeholder="Ketik deskripsi produk"
                                                        id="deskription"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || '';
                                                            setProduct(prevState => ({ ...prevState, description: val }));
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-filed mb-3">
                                                    <label htmlFor="qty" className="form-label">Quantity</label>
                                                    <InputText value={product.qty}
                                                        placeholder="Ketik quantity produk"
                                                        id="qty"
                                                        onChange={(e) => {
                                                            const val = (e.target && parseInt(e.target.value)) || 0;
                                                            setProduct(prevState => ({ ...prevState, qty: val }));
                                                        }}
                                                    />
                                                    {submited && !product.qty && <span className="p-error">quantity produk tidak boleh kosong</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <Button label="Simpan"
                                                    icon="pi pi-check"
                                                    onClick={saveProduk}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </MainPage>
    )
}

export default ProductAdminCreatePage;
