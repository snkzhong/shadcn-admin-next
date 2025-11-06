"use client";

import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

// Define pricing plan type
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: "month" | "year";
  features: boolean[];
  isPopular?: boolean;
  ctaText: string;
  badgeText?: string;
}

// Define feature type
interface Feature {
  id: string;
  name: string;
}

export default function PricingPage() {
  // Toggle monthly/yearly billing
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");
  // Track selected plan for animation
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Features list - 20 items
  const features: Feature[] = [
    { id: "f1", name: "Up to 5 projects" },
    { id: "f2", name: "Up to 10 team members" },
    { id: "f3", name: "Basic analytics reports" },
    { id: "f4", name: "24/7 email support" },
    { id: "f5", name: "10GB storage space" },
    { id: "f6", name: "Custom branding" },
    { id: "f7", name: "API access" },
    { id: "f8", name: "Advanced security features" },
    { id: "f9", name: "Priority customer support" },
    { id: "f10", name: "Unlimited projects" },
    { id: "f11", name: "Unlimited team members" },
    { id: "f12", name: "Advanced analytics dashboard" },
    { id: "f13", name: "Real-time collaboration tools" },
    { id: "f14", name: "100GB storage space" },
    { id: "f15", name: "Custom workflows" },
    { id: "f16", name: "Dedicated account manager" },
    { id: "f17", name: "SLA guarantees" },
    { id: "f18", name: "Third-party integrations" },
    { id: "f19", name: "Data export functionality" },
    { id: "f20", name: "Access to training courses" },
  ];

  // Pricing plans data
  const pricingPlans: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for individuals and small projects",
      price: billingPeriod === "month" ? 9 : 90,
      period: billingPeriod,
      features: [
        true,   // f1
        true,   // f2
        true,   // f3
        true,   // f4
        true,   // f5
        false,  // f6
        false,  // f7
        false,  // f8
        false,  // f9
        false,  // f10
        false,  // f11
        false,  // f12
        false,  // f13
        false,  // f14
        false,  // f15
        false,  // f16
        false,  // f17
        false,  // f18
        false,  // f19
        false,  // f20
      ],
      ctaText: "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Ideal for growing teams",
      price: billingPeriod === "month" ? 24 : 240,
      period: billingPeriod,
      features: [
        true,   // f1
        true,   // f2
        true,   // f3
        true,   // f4
        true,   // f5
        true,   // f6
        true,   // f7
        true,   // f8
        true,   // f9
        false,  // f10
        false,  // f11
        true,   // f12
        true,   // f13
        false,  // f14
        false,  // f15
        false,  // f16
        false,  // f17
        true,   // f18
        true,   // f19
        false,  // f20
      ],
      isPopular: true,
      ctaText: "Recommended",
      badgeText: "Most Popular",
    },
    {
      id: "business",
      name: "Business",
      description: "For established companies and large teams",
      price: billingPeriod === "month" ? 49 : 490,
      period: billingPeriod,
      features: [
        true,   // f1
        true,   // f2
        true,   // f3
        true,   // f4
        true,   // f5
        true,   // f6
        true,   // f7
        true,   // f8
        true,   // f9
        true,   // f10
        true,   // f11
        true,   // f12
        true,   // f13
        true,   // f14
        true,   // f15
        false,  // f16
        true,   // f17
        true,   // f18
        true,   // f19
        true,   // f20
      ],
      ctaText: "Contact Sales",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: billingPeriod === "month" ? 99 : 990,
      period: billingPeriod,
      features: [
        true,   // f1
        true,   // f2
        true,   // f3
        true,   // f4
        true,   // f5
        true,   // f6
        true,   // f7
        true,   // f8
        true,   // f9
        true,   // f10
        true,   // f11
        true,   // f12
        true,   // f13
        true,   // f14
        true,   // f15
        true,   // f16
        true,   // f17
        true,   // f18
        true,   // f19
        true,   // f20
      ],
      ctaText: "Request Demo",
      badgeText: "Fully Custom",
    },
  ];

  // Toggle billing period
  const toggleBillingPeriod = () => {
    setBillingPeriod(prev => prev === "month" ? "year" : "month");
  };

  // Handle plan selection with animation
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Reset selection after animation completes
    setTimeout(() => setSelectedPlan(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Choose the plan that works best for you. Upgrade or downgrade anytime. All plans include a 14-day free trial.
          </p>
          
          {/* Billing period toggle */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Label 
              htmlFor="billing-period" 
              className={`text-sm font-medium transition-colors ${billingPeriod === "month" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Monthly
            </Label>
            <Switch
              id="billing-period"
              checked={billingPeriod === "year"}
              onCheckedChange={toggleBillingPeriod}
              className="data-[state=checked]:bg-indigo-600 transition-colors"
            />
            <Label 
              htmlFor="billing-period" 
              className={`text-sm font-medium transition-colors ${billingPeriod === "year" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Annual <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Save 10%</span>
            </Label>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.isPopular 
                  ? "border-indigo-500 shadow-md dark:border-indigo-400" 
                  : "border-slate-200 dark:border-slate-700"
              } ${selectedPlan === plan.id ? "animate-pulse ring-2 ring-indigo-500 dark:ring-indigo-400 scale-105 z-20" : ""}`}
            >
              {/* Popular badge */}
              {plan.badgeText && (
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold ${
                  plan.isPopular 
                    ? "bg-indigo-600 text-white" 
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                }`}>
                  {plan.badgeText}
                  {plan.isPopular && <Star className="inline-block w-3 h-3 ml-1" />}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                  {plan.description}
                </p>
                
                {/* Price information */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    /{plan.period}
                  </span>
                </div>
                
                {/* CTA Button with selection animation trigger */}
                <Button 
                  className={`w-full mb-6 transition-all duration-300 ${
                    plan.isPopular 
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md" 
                      : "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 hover:shadow-sm"
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.ctaText}
                </Button>
                
                <Separator className="my-6" />
                
                {/* Features list */}
                <ul className="space-y-3">
                  {plan.features.map((included, index) => (
                    <li key={features[index].id} className="flex items-start">
                      <div className={`mt-0.5 flex-shrink-0 transition-colors ${
                        included 
                          ? "text-green-500 dark:text-green-400" 
                          : "text-slate-300 dark:text-slate-600"
                      }`}>
                        {included ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <X className="h-5 w-5" />
                        )}
                      </div>
                      <span className={`ml-3 text-sm transition-colors ${
                        included 
                          ? "text-slate-700 dark:text-slate-300" 
                          : "text-slate-400 dark:text-slate-500"
                      }`}>
                        {features[index].name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Features comparison table - responsive */}
        <div className="mt-20 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Features
                  </th>
                  {pricingPlans.map((plan) => (
                    <th 
                      key={plan.id} 
                      scope="col" 
                      className={`px-6 py-4 text-center text-xs font-medium transition-colors ${
                        plan.isPopular 
                          ? "text-indigo-600 dark:text-indigo-400" 
                          : "text-slate-500 dark:text-slate-400"
                      } uppercase tracking-wider`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                {features.map((feature, featureIndex) => (
                  <tr 
                    key={feature.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      {feature.name}
                    </td>
                    {pricingPlans.map((plan, planIndex) => (
                      <td 
                        key={plan.id} 
                        className="px-6 py-4 whitespace-nowrap text-center"
                      >
                        <div className={`inline-flex items-center justify-center transition-all duration-200 ${
                          plan.features[featureIndex] 
                            ? "text-green-500 dark:text-green-400 scale-100 hover:scale-110" 
                            : "text-slate-300 dark:text-slate-600"
                        }`}>
                          {plan.features[featureIndex] ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I choose the right plan?",
                answer: "Our Basic plan is perfect for individuals and small projects, Pro works well for growing teams, Business suits established companies, and Enterprise offers fully custom solutions for large organizations. Choose based on your team size, project count, and required features."
              },
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the end of your current billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "All plans come with a 14-day free trial where you can experience all features with no credit card required. After your trial ends, you can choose to continue or cancel."
              },
              {
                question: "How does billing work?",
                answer: "You can choose between monthly or annual billing. Annual billing comes with a 10% discount. We accept credit cards, debit cards, and bank transfers."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px]"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="max-w-2xl mx-auto text-indigo-100 mb-8">
            Choose your plan and start your 14-day free trial, no credit card required.
          </p>
          <Button 
            className="bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            onClick={() => setSelectedPlan("pro")} // Default to popular plan
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
}