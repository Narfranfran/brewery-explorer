// components/layout/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-base-200">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Brewery Explorer 🍻
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
