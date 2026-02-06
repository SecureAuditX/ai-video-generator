"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Sparkles, CreditCard, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function UpgradePage() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Billing Form State
  const [step, setStep] = useState<'pricing' | 'checkout'>('pricing');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for hobbyists and beginners.",
      price: isYearly ? 9 : 12,
      features: ["10 AI Videos/month", "Standard HD Quality", "Basic Support", "Watermarked"],
      popular: false
    },
    {
      name: "Pro",
      description: "For creators who want to go viral.",
      price: isYearly ? 29 : 39,
      features: ["Unlimited AI Videos", "4K Ultra HD", "Priority Support", "No Watermark", "Custom Branding"],
      popular: true
    },
    {
      name: "Business",
      description: "Scale your content production.",
      price: isYearly ? 99 : 129,
      features: ["Everything in Pro", "Team Collaboration", "API Access", "Dedicated Manager", "Analytics Pro"],
      popular: false
    }
  ];

  const handleSelectPlan = (planName: string) => {
      setSelectedPlan(planName);
      setStep('checkout');
  };

  const handlePayment = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);
      
      // Simulate Payment Processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsProcessing(false);
      setIsSuccess(true);
  };

  if (isSuccess) {
      return (
          <div className="container mx-auto flex items-center justify-center min-h-[60vh] animate-in zoom-in duration-500">
              <Card className="max-w-md w-full text-center p-8 bg-gradient-to-b from-card to-primary/5 border-primary/20 shadow-2xl">
                  <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                      <ShieldCheck className="h-12 w-12" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground mb-8">
                      You have successfully upgraded to the <span className="font-bold text-primary">{selectedPlan}</span> plan. Your new features are active immediately.
                  </p>
                  <Button className="w-full h-12 text-lg" onClick={() => window.location.href = '/dashboard'}>
                      Go to Dashboard
                  </Button>
              </Card>
          </div>
      );
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 animate-in fade-in duration-500 mb-20">
      
      {step === 'pricing' && (
          <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Upgrade your Workflow</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Choose the plan that fits your video production needs. Cancel anytime.
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4">
                    <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
                    <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                    <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Yearly <span className="text-green-500 font-bold ml-1">(-20%)</span></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <motion.div key={plan.name} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <Card className={`relative flex flex-col h-full ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border shadow-md'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full text-center shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    className="w-full h-12 text-base font-semibold" 
                                    variant={plan.popular ? "default" : "outline"}
                                    onClick={() => handleSelectPlan(plan.name)}
                                >
                                    {plan.popular ? <><Sparkles className="mr-2 h-4 w-4" /> Get {plan.name}</> : `Choose ${plan.name}`}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
          </div>
      )}

      {step === 'checkout' && (
          <div className="max-w-2xl mx-auto">
              <Button variant="ghost" className="mb-6 hover:bg-transparent pl-0" onClick={() => setStep('pricing')}>
                  ← Back to Plans
              </Button>
              
              <Card className="shadow-2xl border-primary/20 overflow-hidden">
                   {isProcessing && (
                       <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                           <Loader2 className="h-16 w-16 text-primary animate-spin" />
                           <h3 className="text-xl font-bold animate-pulse">Processing Payment...</h3>
                           <p className="text-muted-foreground">Please do not close this window.</p>
                       </div>
                   )}
                   
                   <CardHeader className="bg-muted/30 pb-8 border-b">
                       <div className="flex justify-between items-center">
                           <div>
                               <CardTitle>Checkout</CardTitle>
                               <CardDescription>Enter your billing details to secure your {selectedPlan} plan.</CardDescription>
                           </div>
                           <div className="text-right">
                               <div className="text-2xl font-bold text-primary">${plans.find(p => p.name === selectedPlan)?.price}</div>
                               <div className="text-xs text-muted-foreground">per month</div>
                           </div>
                       </div>
                   </CardHeader>
                   <CardContent className="pt-8 space-y-6">
                       <div className="grid gap-4">
                           <div className="space-y-2">
                               <Label htmlFor="name">Full Name</Label>
                               <Input id="name" placeholder="John Doe" required />
                           </div>
                           <div className="space-y-2">
                               <Label htmlFor="card">Card Number</Label>
                               <div className="relative">
                                   <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                   <Input id="card" placeholder="0000 0000 0000 0000" className="pl-10" required />
                               </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                   <Label htmlFor="expiry">Expiry Date</Label>
                                   <Input id="expiry" placeholder="MM/YY" required />
                               </div>
                               <div className="space-y-2">
                                   <Label htmlFor="cvc">CVC</Label>
                                   <Input id="cvc" placeholder="123" required />
                               </div>
                           </div>
                       </div>
                       
                       <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 text-sm text-blue-700 dark:text-blue-300">
                           <ShieldCheck className="h-5 w-5 shrink-0" />
                           <p>Your payment information is encrypted and secure. We never store your credit card details.</p>
                       </div>
                   </CardContent>
                   <CardFooter className="bg-muted/30 p-6 pt-6 border-t">
                       <Button className="w-full h-12 text-lg shadow-xl shadow-primary/20" onClick={handlePayment}>
                           Pay Now
                       </Button>
                   </CardFooter>
              </Card>
          </div>
      )}
    </div>
  );
}
