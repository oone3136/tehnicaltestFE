import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { useNavigate, useParams } from "react-router-dom";
import { findAllKategori } from "../../services/KategoriService";
import { findProdukById } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProductAdminEditPage = () => {

    const [produk, setProduk] = useState({
        id: '',
        nama: '',
        description: '',
        qty: '',
        category: ''
    });
    const [kategoris, setKategoris] = useState([]);
    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

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

        const loadProduk = async () => {
            try {
                const response = await findProdukById(id);
                const _produk = response.data;
                setProduk(_produk);
            } catch (error) {
                console.error(error);
            }
        }

        loadProduk();
        // eslint-disable-next-line
    }, [id]);

    const saveProduk = async () => {
        try {
            setSubmited(true);
            if(produk && produk.id) {
                // const response = await updateProduk(produk);
                const _produk = produk.id; 
                console.log("ini adalah {}"+produk);
                navigate(`/admin/product/detail/${_produk}`, { 
                replace: true
            });
            }else {
                console.error("Produk atau ID produk tidak valid.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <MainPage>
            <ProgressBar mode="indeterminate" className="my-progress-bar" />
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Edit Produk</h2>
                        </div>
                        <div className="content-body">
                            <div className="content-form shadow-1">
                                <div className="flex">
                                    <div className="flex-grow-1">
                                        <div className="p-fluid mb-4">

                                            <div className="p-filed mb-3">
                                                <label htmlFor="nama" className="form-label">Nama</label>
                                                <InputText value={produk.nama}
                                                    placeholder="Ketik nama produk"
                                                    id="nama"
                                                    onChange={(e) => {
                                                        const val = (e.target && e.target.value) || '';
                                                        const _produk = { ...produk };
                                                        _produk.nama = val;
                                                        setProduk(_produk);
                                                    }}
                                                />
                                                {submited && !produk.nama && <span className="p-error">Nama produk tidak boleh kosong</span>}
                                            </div>

                                            <div className="p-field mb-3">
                                                <label htmlFor="kategori" className="form-label">Kategori</label>
                                                <Dropdown optionLabel="nama"
                                                    optionValue="id"
                                                    id="kategori"
                                                    value={produk.category}
                                                    options={kategoris}
                                                    placeholder="Pilih kategori"
                                                    onChange={(e) => {
                                                        const val = (e.target && e.target.value) || null;
                                                        const _produk = { ...produk };
                                                        _produk.category = val;
                                                        setProduk(_produk);
                                                    }}
                                                />
                                                {submited && !produk.category && <span className="p-error">Kategori produk harus dipilih</span>}
                                            </div>

                                            <div className="p-filed mb-3">
                                                <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                                                <InputText value={produk.description}
                                                    placeholder="Ketik deskripsi produk"
                                                    id="deskripsi"
                                                    onChange={(e) => {
                                                        const val = (e.target && e.target.value) || '';
                                                        const _produk = { ...produk };
                                                        _produk.description = val;
                                                        setProduk(_produk);
                                                    }}
                                                />
                                                 {submited && !produk.description && <span className="p-error">Deskripsi produk tidak boleh kosong</span>}
                                            </div>

                                            <div className="p-filed mb-3">
                                                <label htmlFor="stok" className="form-label">Stok</label>
                                                <InputText value={produk.qty}
                                                    placeholder="Ketik stok produk"
                                                    id="stok"
                                                    onChange={(e) => {
                                                        const val = (e.target && e.target.value) || '';
                                                        const _produk = { ...produk };
                                                        _produk.qty = val;
                                                        setProduk(_produk);
                                                    }}
                                                />
                                                {submited && !produk.qty && <span className="p-error">Stok produk tidak boleh kosong</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <Button label="Simpan" onClick={saveProduk} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainPage>
    )
}

export default ProductAdminEditPage;
