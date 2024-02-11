import { titleFont } from "@/config/fonts";

export default function Home() {
    return (
        <main>
            <h1>Home</h1>
            <h1 className={`${titleFont.className} font-bold`}>Hello world!</h1>
        </main>
    );
}
