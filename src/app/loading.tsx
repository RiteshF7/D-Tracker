export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
        </div>
    );
}
