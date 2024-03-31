export default function MainHeader() {
    return (
        <header className="border-b p-6 bg-white flex flex-col gap-2 justify-center items-center relative z-50">
            <a className="font-display text-lg p-0 m-0" href="/">
                <img src="/masthead.png" alt="The Bulldog Bulletin" className="h-8"/>
            </a>
        </header>
    )
}