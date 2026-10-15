"use client";

import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HOME_FAQS = [
  {
    id: "h1",
    question: "How does roommate compatibility matching work?",
    answer:
      "UrbanMatch compares your daily routines (sleep schedules, wake-up times), cleanliness expectations, guest rules, study habits, and budget preferences to calculate a compatibility score, helping you pair with like-minded flatmates before signing a lease.",
  },
  {
    id: "h2",
    question: "Can I schedule an in-person or virtual property viewing first?",
    answer:
      "Yes! On every listing, you can submit a viewing request with your preferred date and time slot. The verified property owner confirms the appointment directly through the platform.",
  },
  {
    id: "h3",
    question: "How are payments handled securely with Stripe?",
    answer:
      "Once your room application is approved by the owner, payment is processed securely via Stripe. Your security deposit and rent are tracked transparently with instant digital receipts generated in your dashboard.",
  },
  {
    id: "h4",
    question: "Are there any hidden broker or agent fees?",
    answer:
      "None at all. UrbanMatch operates on a direct owner-to-tenant model. You will never pay broker percentages, middleman cuts, or secret agency commissions.",
  },
  {
    id: "h5",
    question: "How do maintenance and repair tickets work after moving in?",
    answer:
      "Tenants can submit maintenance requests (plumbing, electrical, appliance fixes) directly from their dashboard with photos and priority tags. Property owners receive instant notifications and track resolution progress.",
  },
];

export function HomeFaqSection() {
  const [openId, setOpenId] = React.useState<string | null>("h1");

  return (
    <section className="py-20 bg-muted/20 border-t border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
          >
            <HelpCircle className="h-3.5 w-3.5 mr-1" />
            Common Questions
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Got questions about finding a room, roommate matching, or listing
            your property? We've got answers.
          </p>
        </div>

        <div className="space-y-3">
          {HOME_FAQS.map((faq) => (
            <AccordionItem
              key={faq.id}
              title={faq.question}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </AccordionItem>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full gap-2 text-xs font-medium border-border"
          >
            <Link href="/faq">
              View All 16+ Help & FAQ Topics
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
