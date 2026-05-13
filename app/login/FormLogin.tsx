'use client'

import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export const FormLogin = () => {
    const router = useRouter();
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })
    const [formError, setFormError] = useState("");
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email: formValue.email,
            password: formValue.password,
            redirect: false,
        });

        // In v5 usa callbackUrl invece di status
        if (result?.error) {
            setFormError(result.error ?? "Authentication failed");
        } else {
            router.push("/");
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        });
    }
    console.log(formValue);
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <p>{formError}</p>
                <input name="email" type="text" placeholder="Email" onChange={onChange} value={formValue.email} />
                <input name="password" type="password" placeholder="" onChange={onChange} value={formValue.password} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}