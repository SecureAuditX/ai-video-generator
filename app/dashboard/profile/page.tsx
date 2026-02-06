"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, User, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user: clerkUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/user/profile");
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        name: data.name || "",
                        email: data.email || clerkUser?.primaryEmailAddress?.emailAddress || ""
                    });
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (clerkUser) {
            fetchProfile();
        } else {
            // If API fetch hasn't happened or failed initially, populate from Clerk
            setFormData(prev => ({
                ...prev,
                 email: ""
            }));
        }
    }, [clerkUser]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.name })
            });

            if (!res.ok) throw new Error("Failed to update profile");

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    }

    return (
        <div className="container mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Public Profile</h1>
                <p className="text-muted-foreground mt-1">Manage how you appear to others.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                        <CardDescription>Your profile picture.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Avatar className="h-32 w-32 border-4 border-card shadow-xl">
                            <AvatarImage src={clerkUser?.imageUrl} />
                            <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                                {formData.name?.[0]?.toUpperCase() || <User />}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground text-center">
                            Managed by your authentication provider.
                        </p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                     <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={formData.email} disabled className="bg-muted text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Contact support to change your email.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                placeholder="Your Name"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                             {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                             Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
