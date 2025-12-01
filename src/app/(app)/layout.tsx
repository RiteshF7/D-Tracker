import { Navigation } from "@/components/layout/Navigation";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="container mx-auto px-4 py-6 max-w-lg pb-28">
                {children}
            </main>
            <Navigation />
        </>
    );
}
