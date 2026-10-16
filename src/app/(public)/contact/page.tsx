"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject is required"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();
    toast.success(
      "Your message has been received. Our team will respond soon.",
    );
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Support
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Contact UrbanMatch
        </h1>
        <p className="text-muted-foreground">
          Have a question about a listing, application, payment, or roommate
          matching? Send us a message.
        </p>
        <div className="space-y-3 pt-4 text-sm">
          <p className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-indigo-600" />{" "}
            support@urbanmatch-b7a6.app
          </p>
          <p className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-indigo-600" /> +880 1700 000000
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-indigo-600" /> Dhanmondi, Dhaka
            1205, Bangladesh
          </p>
        </div>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                id="contact-name"
                error={errors.name?.message}
              >
                <Input id="contact-name" {...register("name")} />
              </Field>
              <Field
                label="Email"
                id="contact-email"
                error={errors.email?.message}
              >
                <Input id="contact-email" type="email" {...register("email")} />
              </Field>
            </div>
            <Field
              label="Subject"
              id="contact-subject"
              error={errors.subject?.message}
            >
              <Input id="contact-subject" {...register("subject")} />
            </Field>
            <Field
              label="Message"
              id="contact-message"
              error={errors.message?.message}
            >
              <textarea
                id="contact-message"
                rows={6}
                {...register("message")}
                className="flex min-h-32 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Send className="mr-2 h-4 w-4" />{" "}
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1 text-sm">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
