export default function Navbar() {
  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center border-b">

      <h1 className="text-2xl font-extrabold text-orange-500">
        What2Cook
      </h1>

      <div className="flex gap-8 text-gray-600 font-medium">
        <span className="cursor-pointer hover:text-orange-500 transition">Search</span>
        <span className="cursor-pointer hover:text-orange-500 transition">Favorites</span>
        <span className="cursor-pointer hover:text-orange-500 transition">Profile</span>
      </div>

    </nav>
  );
}