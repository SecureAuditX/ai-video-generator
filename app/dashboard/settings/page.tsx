"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Lock, User, Save, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useUser, useClerk } from "@clerk/nextjs";

export default function SettingsPage() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock State
  const [settings, setSettings] = useState({
      language: "English",
      theme: "dark",
      marketingEmails: true,
      securityAlerts: true
  });

  const handleSave = async () => {
      setIsLoading(true);
      // Simulate API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ideally here we would update a 'user_settings' table in Supabase
      // const { error } = await supabase.from('user_settings').upsert({ user_id: user.id, ...settings });
      
      setIsLoading(false);
      toast.success("Settings saved successfully");
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and application settings.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-8 w-full justify-start h-12 bg-transparent border-b rounded-none p-0 space-x-6">
           <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base">General</TabsTrigger>
           <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base">Notifications</TabsTrigger>
           <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance & Language</CardTitle>
                    <CardDescription>Customize how Zynova looks and feels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label>Language</Label>
                        <Select defaultValue={settings.language} onValueChange={(val) => setSettings({...settings, language: val})}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Spanish">Spanish</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">This will handle the default language for your video scripts.</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                {settings.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </div>
                            <div>
                                <h4 className="font-medium">Dark Mode</h4>
                                <p className="text-sm text-muted-foreground">Adjust the appearance of the dashboard.</p>
                            </div>
                        </div>
                        <Switch 
                            checked={settings.theme === 'dark'} 
                            onCheckedChange={(c) => setSettings({...settings, theme: c ? 'dark' : 'light'})} 
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                        {isLoading ? "Saving..." : <><Save className="h-4 w-4" /> Save Changes</>}
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Choose what updates you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about new features and promotions.</p>
                        </div>
                        <Switch 
                            checked={settings.marketingEmails}
                            onCheckedChange={(c) => setSettings({...settings, marketingEmails: c})}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Security Alerts</Label>
                            <p className="text-sm text-muted-foreground">Get notified about sign-ins and password changes.</p>
                        </div>
                        <Switch 
                             checked={settings.securityAlerts}
                             onCheckedChange={(c) => setSettings({...settings, securityAlerts: c})}
                             disabled // Force enabled usually
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} disabled={isLoading} variant="outline">Save Preferences</Button>
                </CardFooter>
            </Card>
        </TabsContent>

        {/* Security */}
         <TabsContent value="security" className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input value={user?.primaryEmailAddress?.emailAddress || ''} disabled className="bg-muted" />
                    </div>
                    
                    <div className="pt-4 border-t">
                        <h4 className="font-medium mb-4">Password Reset</h4>
                        <Button variant="outline" onClick={() => openUserProfile({ routing: 'hash' })} className="gap-2 w-full sm:w-auto">
                            <Lock className="h-4 w-4" />
                            Change Password via Clerk
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                            Since you are logged in via a secure provider, password management is handled safely by our authentication partner.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions for your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
