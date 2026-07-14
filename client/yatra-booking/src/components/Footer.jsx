function Footer() {
  return (
    <footer className="w-full border-t-2 border-accent-500 bg-primary-700 py-4">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-white/80 sm:px-8">
        © {new Date().getFullYear()} Shri Mata Vaishno Devi Shrine Board. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
