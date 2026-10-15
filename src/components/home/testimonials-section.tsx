import { CheckCircle2, Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Farhana Kabir",
    role: "Software QA Engineer",
    location: "Banani, Dhaka",
    initials: "FK",
    avatarBg: "from-pink-500 to-rose-600",
    quote:
      "As a working woman moving to Dhaka, safety was my highest priority. UrbanMatch's verified landlord badge gave me total confidence. I moved into a clean, furnished 3-bed flat in Banani with two verified female flatmates within 48 hours!",
    rating: 5,
    tag: "Verified Tenant",
  },
  {
    name: "Engr. Rafiqul Islam",
    role: "Property Owner (3 Buildings)",
    location: "Dhanmondi, Dhaka",
    initials: "RI",
    avatarBg: "from-indigo-600 to-blue-700",
    quote:
      "Managing 12 individual room leases used to take all my weekends. With UrbanMatch, tenant NIDs are verified, monthly rent comes straight through Stripe test checkout, and maintenance requests are organized neatly in my dashboard.",
    rating: 5,
    tag: "Verified Property Owner",
  },
  {
    name: "Tanvir Ahmed",
    role: "Undergraduate Student (NSU)",
    location: "Bashundhara R/A, Dhaka",
    initials: "TA",
    avatarBg: "from-amber-500 to-orange-600",
    quote:
      "Splitting rent for a master bedroom with an attached balcony saved me 50% compared to living alone in a studio. The roommate compatibility questionnaire matched me with a fellow quiet engineering student. Couldn't ask for better!",
    rating: 5,
    tag: "Verified Roommate",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Real Community Stories</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Trusted by Renters & Landlords
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover how thousands of tenants and property owners in Bangladesh
            rely on UrbanMatch for hassle-free living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="relative rounded-3xl border border-border/60 bg-card p-7 space-y-5 hover:border-indigo-500/40 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-muted-foreground/30" />
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div
                  className={`h-10 w-10 rounded-2xl bg-gradient-to-tr ${t.avatarBg} text-white font-heading font-bold text-xs flex items-center justify-center shadow-md`}
                >
                  {t.initials}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                  <span className="inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {t.tag}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
