import type { Metadata } from "next";

import { FormLogin } from "@/app/login/FormLogin";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Login() {
  return (
    <div>
      <FormLogin />
    </div>
  );
}
