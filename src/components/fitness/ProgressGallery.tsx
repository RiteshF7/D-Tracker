"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Upload, Trash2, Loader2 } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";

export function ProgressGallery() {
    const { user } = useAuth();
    const [photos, setPhotos] = useState<{ url: string; name: string }[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            fetchPhotos();
        }
    }, [user]);

    const fetchPhotos = async () => {
        if (!user) return;
        const listRef = ref(storage, `fitness/photos/${user.uid}`);
        try {
            const res = await listAll(listRef);
            const urls = await Promise.all(
                res.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return { url, name: item.name };
                })
            );
            setPhotos(urls);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !user) return;

        setIsUploading(true);
        const file = e.target.files[0];
        const storageRef = ref(storage, `fitness/photos/${user.uid}/${Date.now()}_${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            await fetchPhotos();
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (photoName: string) => {
        if (!user || !confirm("Are you sure you want to delete this photo?")) return;

        const photoRef = ref(storage, `fitness/photos/${user.uid}/${photoName}`);
        try {
            await deleteObject(photoRef);
            setPhotos(photos.filter((p) => p.name !== photoName));
        } catch (error) {
            console.error("Error deleting photo:", error);
            alert("Failed to delete photo");
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="glass-card p-8 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group"
            >
                <div className="p-4 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
                    {isUploading ? (
                        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
                    ) : (
                        <Camera className="w-8 h-8 text-pink-500" />
                    )}
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg">Upload Progress Photo</h3>
                    <p className="text-sm text-muted-foreground">Tap to select an image</p>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
                {photos.map((photo) => (
                    <div key={photo.name} className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                        <img
                            src={photo.url}
                            alt="Progress"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => handleDelete(photo.name)}
                                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
