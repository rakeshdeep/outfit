import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full bg-white p-4 shadow-lg">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-900 font-bold text-2xl mb-4 md:mb-0">
                    <Link href={"/"} className="hover:text-gray-600 transition-colors">
                        OutFit
                    </Link>
                </div>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                    <li>
                        <Link href={"/chat"} 
                            className="text-gray-700 hover:text-gray-900 transition-colors">
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link href={"/features"} 
                            className="text-gray-700 hover:text-gray-900 transition-colors">
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href={"/contact"} 
                            className="text-gray-700 hover:text-gray-900 transition-colors">
                            Contact
                        </Link>
                    </li>
                </ul>
                <div>
                    <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center capitalize">
                        p
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;