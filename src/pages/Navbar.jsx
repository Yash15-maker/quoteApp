export default function Navbar() {
    const token = localStorage.getItem('tokenLogin')
    const handleLogout = () => {
        localStorage.clear('tokenLogin')
        localStorage.clear('media')
        window.location.reload()
    }
    return (
        <nav className="flex justify-between py-3.5 px-2 bg-gray-400 static"><span className="text-gray-700 font-bold text-xl my-auto">Quotes</span>
            {token && <button className="bg-pink-400 px-2.5 py-2 rounded-xl text-white" onClick={handleLogout}>Sign out</button>}
        </nav>
    )
}
