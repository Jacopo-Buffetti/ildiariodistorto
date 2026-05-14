"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const FormLogin = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: formValue.email,
      password: formValue.password,
      callbackUrl: "/area-riservata",
      redirect: false,
    });

    if (!result) {
      setFormError("Authentication failed");
    } else if (result.error || !result.ok) {
      setFormError(result.error ?? "Authentication failed");
    } else {
      router.replace("/area-riservata");
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 py-12 px-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <span className="mb-2 text-xl font-semibold tracking-wide text-zinc-800">
            AREA RISERVATA
          </span>
          <span className="text-zinc-500 text-sm">Accedi per continuare</span>
        </div>
        <form className="space-y-5" onSubmit={onSubmit}>
          {formError && (
            <p className="text-sm text-red-600 text-center">{formError}</p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
              onChange={onChange}
              value={formValue.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
              onChange={onChange}
              value={formValue.password}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-zinc-800 py-2 text-white font-semibold hover:bg-zinc-700 transition"
          >
            Accedi
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-xs text-zinc-500 hover:underline">
            Password dimenticata?
          </a>
        </div>
      </div>
    </main>
  );
};
