import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background">
      <form className="flex flex-col gap-6 bg-white dark:bg-[#18181b] shadow-lg rounded-lg p-8 w-full max-w-sm border border-black/[.08] dark:border-white/[.145]">
        <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded border border-black/[.08] dark:border-white/[.145] px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
            placeholder="you@example.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Password
          <input
            type="password"
            name="password"
            required
            className="rounded border border-black/[.08] dark:border-white/[.145] px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-foreground text-background font-semibold py-2 mt-2 hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
}