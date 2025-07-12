"use client";
import { useRouter } from "next/navigation"
import LinkButton  from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Zapier
        </div>
        <div className="flex">
            <div className="pr-4">
                <LinkButton href="/">Contact Sales</LinkButton>
            </div>
            <div className="pr-4">
                <LinkButton href="/login">Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>            
        </div>
    </div>
}

export default Appbar;