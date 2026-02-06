"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Download, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const currentPlan = "Pro Plan";
  const billingCycle = "Monthly";
  const nextBillingDate = "March 6, 2026";
  const amount = "$29.00";
  
  const usage = {
    videosGenerated: 12,
    videoLimit: 50,
    storageUsed: "2.4 GB",
    storageLimit: "10 GB"
  };

  const invoices = [
    { id: "INV-001", date: "Feb 6, 2026", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Jan 6, 2026", amount: "$29.00", status: "Paid" },
    { id: "INV-003", date: "Dec 6, 2025", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="container mx-auto max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and billing details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Current Plan Card */}
        <Card className="md:col-span-2 shadow-md border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">Current Subscription</CardTitle>
                        <CardDescription>You are currently on the <span className="font-semibold text-primary">{currentPlan}</span></CardDescription>
                    </div>
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <div className="text-2xl font-bold">{amount}<span className="text-sm font-normal text-muted-foreground">/{billingCycle.toLowerCase()}</span></div>
                    </div>
                    <div className="space-y-1">
                         <span className="text-sm text-muted-foreground">Next Billing Date</span>
                         <div className="font-medium flex items-center gap-2">
                             {nextBillingDate}
                             <AlertCircle className="h-4 w-4 text-muted-foreground" />
                         </div>
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                        <span>Video Generations</span>
                        <span className="text-muted-foreground">{usage.videosGenerated} / {usage.videoLimit}</span>
                    </div>
                    <Progress value={(usage.videosGenerated / usage.videoLimit) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">You have used {Math.round((usage.videosGenerated / usage.videoLimit) * 100)}% of your monthly videos.</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button variant="default" asChild>
                    <Link href="/dashboard/upgrade">Upgrade Plan</Link>
                </Button>
                <Button variant="outline" className="opacity-80">Cancel Subscription</Button>
            </CardFooter>
        </Card>

        {/* Payment Method */}
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 p-3 border rounded-lg bg-card/50">
                        <div className="h-10 w-14 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                             {/* Valid Mastercard Icon would generally be an image, using CreditCard for now */}
                             <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">•••• •••• •••• 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/28</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full text-primary">Update Payment Method</Button>
                </CardFooter>
            </Card>

            <Card className="bg-primary text-primary-foreground shadow-lg border-none">
                <CardHeader>
                    <CardTitle className="text-lg">Need more power?</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Get unlimited videos and 4K export with Enterprise.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="secondary" size="sm" className="w-full font-bold">Contact Sales</Button>
                </CardFooter>
            </Card>
        </div>
      </div>

      {/* Invoice History */}
      <Card className="shadow-sm">
          <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="rounded-md border">
                 <div className="grid grid-cols-4 p-4 bg-muted/50 font-medium text-sm text-muted-foreground">
                     <div>Invoice ID</div>
                     <div>Date</div>
                     <div>Amount</div>
                     <div className="text-right">Action</div>
                 </div>
                 {invoices.map((inv) => (
                     <div key={inv.id} className="grid grid-cols-4 p-4 text-sm border-t items-center hover:bg-muted/20 transition-colors">
                         <div className="font-medium">{inv.id}</div>
                         <div className="text-muted-foreground">{inv.date}</div>
                         <div>{inv.amount}</div>
                         <div className="flex justify-end">
                             <Button variant="ghost" size="sm" className="h-8 gap-2">
                                 <Download className="h-3.5 w-3.5" />
                                 <span className="hidden sm:inline">Download</span>
                             </Button>
                         </div>
                     </div>
                 ))}
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
