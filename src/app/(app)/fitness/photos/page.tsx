import { ProgressGallery } from "@/components/fitness/ProgressGallery";

export default function PhotosPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-pink-500">Progress Photos</h1>
            <ProgressGallery />
        </div>
    );
}
