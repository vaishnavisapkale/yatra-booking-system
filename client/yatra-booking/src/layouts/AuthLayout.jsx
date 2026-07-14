import templeImg from "../assets/Login.jpg";
import { Landmark } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* HERO */}
      <div className="relative hidden w-1/2 md:flex">
        <img src={templeImg} alt="Vaishno Devi Shrine" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/85 via-primary-800/75 to-primary-900/90" />

        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent-400/60 bg-white/10">
            <Landmark className="h-6 w-6 text-accent-400" />
          </div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-accent-400">Welcome to</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-white">
            Shri Mata Vaishno Devi
            <br />
            Shrine Board
          </h1>
          <div className="mt-5 h-px w-14 bg-accent-500" />
          <p className="mt-5 max-w-sm text-sm text-white/70">
            Online portal for booking accommodation, battery car and ropeway
            services for your pilgrimage.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="flex w-full items-center justify-center bg-surface-muted px-4 py-12 md:w-1/2">
        <div className="w-full max-w-sm border border-gray-200 border-t-4 border-t-primary-600 bg-surface p-8 shadow-card">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
