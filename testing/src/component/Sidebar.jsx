import React from "react";

import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useAuth } from "../auth/useAuth";

const Sidebar = () => {
    const { signout, user } = useAuth();

    const userMenus = [
        {
            label: "Dashboard",
            template: (item, options) => {
                return (
                    <Link to="/user/dashboard" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Sign Out",
            command: () => signout()
        }
    ]

    const adminMenus = [
        {
            label: "Dashboard",
            template: (item, options) => {
                return (
                    <Link to="/admin/dashboard" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Kategori",
            template: (item, options) => {
                return (
                    <Link to="/admin/kategori" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Produk",
            template: (item, options) => {
                return (
                    <Link to="/admin/product" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Sign Out",
            command: () => signout()
        }
    ]

    return (
        <div className="sidebar">
            <Menu model={user.role === "admin" ? adminMenus : userMenus} />
        </div>
    )
}

export default Sidebar;