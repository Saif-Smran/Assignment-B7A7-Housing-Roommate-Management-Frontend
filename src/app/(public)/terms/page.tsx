import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Privacy | UrbanMatch" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Legal
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold">
          Terms & Privacy
        </h1>
      </div>
      <section className="space-y-6 text-sm leading-7 text-muted-foreground">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Using UrbanMatch
          </h2>
          <p>
            UrbanMatch helps tenants discover housing, request viewings, submit
            applications, and manage tenancy activities. Listing information
            should be verified before any payment or commitment.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Accounts and payments
          </h2>
          <p>
            Keep account details accurate and never share your password. Payment
            records are processed through the configured payment provider and
            should be reviewed before confirmation.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Privacy
          </h2>
          <p>
            We use account, listing, application, and payment information to
            provide the platform services. We do not ask users to submit
            sensitive credentials through public forms.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Support
          </h2>
          <p>
            For questions about an account or listing, contact the support team
            through the Contact page.
          </p>
        </div>
      </section>
    </main>
  );
}
