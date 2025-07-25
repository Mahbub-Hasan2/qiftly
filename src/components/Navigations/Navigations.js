'use client';

import Navbar from "./Navbar";

export default function Navigations({menuItems}) {
    return (
        <div>
            <Navbar menuItems={menuItems}/>
        </div>
    )
}