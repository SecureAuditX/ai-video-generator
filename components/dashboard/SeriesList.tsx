"use client";

import { useState } from "react";
import { SeriesCard } from "./SeriesCard";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface SeriesListProps {
    initialSeries: any[];
}

export function SeriesList({ initialSeries }: SeriesListProps) {
    const [series, setSeries] = useState(initialSeries);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/video-series/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("Failed to delete series");

            setSeries(prev => prev.filter(s => s.id !== id));
            toast.success("Series deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting series");
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/video-series/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            setSeries(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
            toast.success(`Series ${newStatus === 'paused' ? 'paused' : 'resumed'}`);
        } catch (error) {
            console.error(error);
            toast.error("Error updating status");
        }
    };

    if (!series || series.length === 0) {
        return (
            <div className="bg-white border-2 border-dashed rounded-2xl p-8 text-center space-y-3">
                <div className="bg-gray-50 h-12 w-12 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Video size={24} />
                </div>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                    No available series yet.
                </p>
                <Button asChild variant="link" size="sm" className="text-primary p-0">
                    <Link href="/dashboard/create">Start creating now</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {series.map((item) => (
                <SeriesCard 
                    key={item.id} 
                    series={item} 
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </div>
    );
}
