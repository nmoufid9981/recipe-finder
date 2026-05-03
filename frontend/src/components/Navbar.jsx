export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-orange-500">
        What2Cook
      </h1>

      {/* Menu */}
      <div className="flex gap-6 text-gray-600 font-medium">
        <span className="cursor-pointer hover:text-black">Search</span>
        <span className="cursor-pointer hover:text-black">Favorites</span>
        <span className="cursor-pointer hover:text-black">Profile</span>
      </div>

    </nav>
  );
}