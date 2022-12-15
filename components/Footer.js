import Link from "next/link";

export default function Footer() {
    return (
        <footer className="sticky bottom-0 bg-white p-5 w-full">
            {/* standard practice in NextJs seems to use Link instead of button */}
            <Link href={'/'}>Home</Link>
            <Link href={'/checkout'}>Cart 0</Link>
        </footer>
    );
}