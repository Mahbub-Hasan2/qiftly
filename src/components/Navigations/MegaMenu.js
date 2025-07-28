import Link from "next/link";
import GroupedMenu from "./GroupedMenu";

export default function MegaMenu({ menuItems }) {
    function getCollectionPath(url) {
        const match = url.match(/(\/collections\/[^\/?#]+)/);
        return match ? match[1] : null;
    }
    return (
        <div className="relative ">
            <div className="flex mx-auto max-w-7xl ">
                <ul className="flex space-x-6">
                    {menuItems.map((menu, index) => (
                        <li key={index} className="group py-4">
                            <div className="group hover:text-orange-300 flex gap-1 poppins-bold justify-items-center cursor-pointer">


                                {
                                    menu.children && menu.children.length > 0 ? (
                                        <>
                                            <span className="text-gray-700 group-hover:text-orange-300 text-sm font-medium">{menu.label}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="transition-transform duration-700 group-hover:rotate-180 group-hover:text-orange-300 mt-[2px] size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </>
                                    ) : (
                                        (() => {
                                            const path = getCollectionPath(menu.url);
                                            return path ? (
                                                <Link
                                                    href={path}
                                                    className="text-gray-700 group-hover:text-orange-300 text-sm font-medium"
                                                >
                                                    {menu.label}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-700 text-sm font-medium">{menu.label}</span>
                                            );
                                        })()
                                    )
                                }


                            </div>
                            {/* ✅ Mega Menu: Full Screen Width */}
                            {menu.children && menu.children.length > 0 && (
                                <div className="absolute left-0 top-full w-screen z-50 hidden group-hover:block bg-white shadow-lg">
                                    {/* ✅ Content centered inside */}

                                    <GroupedMenu menu={menu} />
                                </div>
                            )}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
