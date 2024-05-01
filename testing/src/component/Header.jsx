import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { APP_BASE_URL } from "../configs/constants";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";

export function Header({ children }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [email, setEmail] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");

    const [showSignup, setShowSignup] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const { signin } = useAuth();

    const isValidation = () => {
        return username.length > 0 && password.length > 0;
    };
    const isValidForm = () => {
        return (
            username.length > 0 &&
            password.length > 0 &&
            namaLengkap.length > 0 &&
            email.length > 0 &&
            nomorTelepon.length > 0
        );
    };

    const handleSubmitSigin = async (e) => {
        e.preventDefault();
        await signin(username, password);
        alert("login mu berhasil");
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${APP_BASE_URL}/auth/signup`, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password,
                    namaLengkap,
                    email,
                    nomorTelepon,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                setError(true);
                const data = await response.json();
                setErrorMessage(data.message);
                return;
            }
            const data = await response.json();
            console.log(data);
            navigate("/");
            alert(`selamat ${namaLengkap} data anda berhasil di simpan`);
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage(error.message);
        }
    };
    const toggleSignupPopup = () => {
        setShowSignup(!showSignup);
    };

    return (
        <div className="flex justify-end flex-col md:flex-row py-4 px-6 bg-gray-800 md:items-center">
        <h1 className="text-2x1 w-5/6 font-bold text-white">APP Test  </h1>
        <form onSubmit={handleSubmitSigin} className="flex flex-col md:flex-row md:items-center w-1/2 ">
            <InputText
                value={username}className="mr-2 mb-2 md:mr-5 md:mb-0 border-2 border-black"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                
            />
            <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mr-2 mb-2 md:mr-5 md:mb-0 border-2 border-black"
            />
            <Button
                type="submit"
                disabled={!isValidation()}
                className="rounded-full border-2 border-black"
            >
                Sign In
            </Button>
        </form>
        <Button onClick={toggleSignupPopup} className="flex flex-col ms-0 md:flex-row md:items-center mr-0 rounded-full border-2 border-black">Sign Up</Button>
        {showSignup && (
        <div className="absolute top-40 right-0 h-auto w-full flex justify-center items-center rounded-full">
            <div className="p-4 rounded-lg shadow-md">
                <h2 className="text-white-600 font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmitSignup}>
                    {error && (
                        <Message
                            severity="error"
                            text={errorMessage}
                            className="mb-4"
                        />
                    )}
                    <div className="mb-4 border-2 border-black-500/50">
                        <InputText
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full "
                            style={{ '::placeholder': { color: 'black' } }}
                        />
                    </div>
                    <div className="mb-4 border-2 border-black-500/50">
                        <Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full"
                            style={{ '::placeholder': { color: 'black' } }}
                        />
                    </div> 
                    <div className="mb-4 border-2 border-black-500/50">
                        <InputText
                            value={namaLengkap}
                            onChange={(e) => setNamaLengkap(e.target.value)}
                            placeholder="Nama Lengkap"
                            className="w-full"
                            style={{ '::placeholder': { color: 'black' } }}
                        />
                    </div>
                    <div className="mb-4 border-2 border-black-500/50">
                        <InputText
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full"
                            style={{ '::placeholder': { color: 'black' } }}
                        />
                    </div>
                    <div className="mb-4 border-2 border-black-500/50">
                        <InputText
                            value={nomorTelepon}
                            onChange={(e) => setNomorTelepon(e.target.value)}
                            placeholder="No Telphone"
                            className="w-full"
                            style={{ '::placeholder': { color: 'black' } }}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={!isValidForm()}
                        className="w-full"  style={{ color: 'black' }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Button
                onClick={toggleSignupPopup}
                className="mt-4 w-full" style={{ color: 'black' }}
            >
                Close
            </Button>
        </div>
    </div>
            )}
        </div>
    );
}
