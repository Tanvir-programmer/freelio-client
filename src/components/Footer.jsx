import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content border-t border-base-300 p-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding & Copyright Section */}
        <aside className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="bg-neutral text-neutral-content px-3 py-1 rounded-lg font-black text-xl tracking-tight">
              Free<span className="text-indigo-400">lio</span>
            </div>
          </div>
          <div className="text-sm opacity-70">
            <p>© {currentYear} Freelio Inc.</p>
            <p className="hidden sm:block">Built with precision.</p>
          </div>
        </aside>

        {/* Navigation Links (Optional but Recommended) */}
        <nav className="flex gap-6 text-sm font-medium opacity-80">
          <a className="link link-hover">Terms</a>
          <a className="link link-hover">Privacy</a>
          <a className="link link-hover">Contact</a>
        </nav>

        {/* Social Media Icons */}
        <nav className="grid grid-flow-col gap-5 items-center">
          <a
            href="#"
            className="transition-all duration-300 hover:text-indigo-600 hover:-translate-y-1"
            aria-label="X (Twitter)"
          >
            <img
              className="w-5 h-5 grayscale hover:grayscale-0 transition-all"
              src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
              alt="X"
            />
          </a>

          <a
            href="#"
            className="transition-all duration-300 hover:text-red-600 hover:-translate-y-1"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>

          <a
            href="#"
            className="transition-all duration-300 hover:text-blue-600 hover:-translate-y-1"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
