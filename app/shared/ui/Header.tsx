export function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between gap-10 px-8 py-3 rounded-full bg-white/70 backdrop-blur-md shadow-md border border-gray-200">
        <div className="font-bold text-lg">
          Nano
        </div>

        <nav className="flex gap-6 text-sm font-medium">
          <a href="#section1" className="hover:text-blue-500">Section1</a>
          <a href="#section2" className="hover:text-blue-500">Section2</a>
          <a href="#section3" className="hover:text-blue-500">Section3</a>
          <a href="#section4" className="hover:text-blue-500">Section4</a>
          <a href="#section5" className="hover:text-blue-500">Section5</a>
        </nav>
      </div>
    </header>
  );
}