"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import FullPageLoader from "@/Components/FullPageLoader/FullPageLoader";

export const FormLogin = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: formValue.email,
        password: formValue.password,
        callbackUrl: "/area-riservata",
        redirect: false,
      });

      if (!result) {
        setFormError("Authentication failed");
        setSubmitting(false);
      } else if (result.error || !result.ok) {
        setFormError(result.error ?? "Authentication failed");
        setSubmitting(false);
      } else {
        // il loader resta visibile finché non si apre l'area riservata
        router.replace("/area-riservata");
      }
    } catch {
      setFormError("Errore di rete, riprova");
      setSubmitting(false);
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
      <FullPageLoader show={submitting} message="Accesso in corso" />
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
              required
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
              value={formValue.email}
              onChange={onChange}
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
              required
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
              value={formValue.password}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
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
