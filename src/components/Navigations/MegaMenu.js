export default function MegaMenu() {
    return (
        <div className="relative ">
            <div className="flex mx-auto max-w-7xl ">
                <ul className="flex space-x-6">
                    <li className="group py-4">
                        <div className="group hover:text-orange-300 flex gap-1 poppins-bold justify-items-center cursor-pointer">
                            <span className="text-gray-700 group-hover:text-orange-300 text-sm font-medium">Shop</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="transition-transform duration-700 group-hover:rotate-[180deg] group-hover:text-orange-300 mt-1 size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {/* ✅ Mega Menu: Full Screen Width */}
                        <div className="absolute left-0 top-full w-screen z-50 hidden group-hover:block bg-white shadow-lg">
                            {/* ✅ Content centered inside */}
                            <div className="max-w-7xl mx-auto flex flex-wrap gap-10 p-6">
                                {/* Example Column */}
                                <div>
                                    <span className="font-semibold mb-2">Mugs</span>
                                    <ul className="space-y-1">
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Funny Mugs</a></li>
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Islamic Mugs</a></li>
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Custom Design</a></li>
                                    </ul>
                                </div>

                                {/* Add more columns as needed */}
                                <div>
                                    <h4 className="font-semibold mb-2">Cups</h4>
                                    <ul className="space-y-1">
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Ceramic Cups</a></li>
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Glass Cups</a></li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Gift Boxes</h4>
                                    <ul className="space-y-1">
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Anniversary</a></li>
                                        <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Birthday</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="group py-4">
                        <div className="flex gap-1 poppins-bold justify-items-center">
                            <span className="text-sm font-medium">Shop</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-primary mt-1 size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </li>
                    <li className="group py-4">
                        <div className="flex gap-1 poppins-bold justify-items-center">
                            <span className="text-sm font-medium">Shop</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-primary mt-1 size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
