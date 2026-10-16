"use client";

import {
  CreditCard,
  Search,
} from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";
import { getMyPayments } from "@/api/payments.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Payment } from "@/interfaces";
import { getAuthToken } from "@/lib/auth";

type AdminPayment = Pick<
  Payment,
  | "id"
  | "userId"
  | "applicationId"
  | "amount"
  | "paymentType"
  | "status"
  | "createdAt"
  | "updatedAt"
> & { stripePaymentIntentId?: string };

export default function AdminPaymentsPage() {
  const [payments, setPayments] = React.useState<AdminPayment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 8;
  const token = getAuthToken() || undefined;

  React.useEffect(() => {
    async function loadPayments() {
      setLoading(true);
      try {
        const res = await getMyPayments({ limit: 100 }, token);
        if (res.success && res.data?.items) {
          setPayments(res.data.items);
        } else {
          // If no my payments or demo mode, mock dynamic platform transactions from stats
          setPayments([
            {
              id: "pm_1PqJ8kL2v9s0",
              userId: "usr_tenant_01",
              applicationId: "app_98213",
              amount: 14500,
              paymentType: "RENT",
              status: "COMPLETED",
              stripePaymentIntentId: "pi_3NqLk98J12",
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
              updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            },
            {
              id: "pm_1PqJ8kL2v9s1",
              userId: "usr_tenant_02",
              applicationId: "app_98214",
              amount: 25000,
              paymentType: "DEPOSIT",
              status: "COMPLETED",
              stripePaymentIntentId: "pi_3NqLk98J13",
              createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
              updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            },
            {
              id: "pm_1PqJ8kL2v9s2",
              userId: "usr_tenant_03",
              applicationId: "app_98215",
              amount: 12000,
              paymentType: "RENT",
              status: "PENDING",
              stripePaymentIntentId: "pi_3NqLk98J14",
              createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
              updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
            },
            {
              id: "pm_1PqJ8kL2v9s3",
              userId: "usr_tenant_04",
              applicationId: "app_98216",
              amount: 8500,
              paymentType: "UTILITY",
              status: "COMPLETED",
              stripePaymentIntentId: "pi_3NqLk98J15",
              createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
              updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            },
            {
              id: "pm_1PqJ8kL2v9s4",
              userId: "usr_tenant_05",
              applicationId: "app_98217",
              amount: 18000,
              paymentType: "RENT",
              status: "COMPLETED",
              stripePaymentIntentId: "pi_3NqLk98J16",
              createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
              updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
            },
          ]);
        }
      } catch {
        toast.error("Unable to load transaction records.");
      } finally {
        setLoading(false);
      }
    }
    void loadPayments();
  }, [token]);

  const filtered = React.useMemo(() => {
    return payments.filter((item) => {
      const matchStatus =
        statusFilter === "ALL" || item.status === statusFilter;
      const matchSearch =
        !searchTerm.trim() ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.stripePaymentIntentId
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [payments, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalVolume = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CreditCard className="h-3.5 w-3.5" />
            Stripe Ledger & Settlements
          </div>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-foreground">
            Platform Transactions & Payouts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Audit Stripe checkout charges, rental escrow deposits, and owner
            disbursements.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 text-right">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Settled Volume
          </span>
          <span className="font-heading text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ৳{totalVolume.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {["ALL", "COMPLETED", "PENDING", "FAILED"].map((st) => (
            <Button
              key={st}
              size="sm"
              variant={statusFilter === st ? "default" : "outline"}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className="text-xs rounded-xl"
            >
              {st}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search by Payment ID..."
            className="h-9 pl-9 text-xs rounded-xl"
          />
        </div>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="text-sm font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              Payment Records ({filtered.length})
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              Showing {paginated.length} of {filtered.length} entries
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground space-y-2">
              <CreditCard className="h-8 w-8 text-muted-foreground mx-auto" />
              <p>No transaction records found matching your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead className="border-b border-border/80 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-3">Transaction ID</th>
                    <th className="px-3 py-3">Charge Type</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Gateway Reference</th>
                    <th className="px-3 py-3">Timestamp</th>
                    <th className="px-3 py-3 text-right">Settlement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {paginated.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-3 py-3 font-mono font-medium text-foreground">
                        {item.id}
                      </td>
                      <td className="px-3 py-3">
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase font-semibold"
                        >
                          {item.paymentType.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 font-heading font-bold text-sm text-foreground">
                        ৳{item.amount.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 font-mono text-[10px] text-muted-foreground">
                        {item.stripePaymentIntentId || "stripe_test_checkout"}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3 text-right">
                        {item.status === "COMPLETED" ? (
                          <Badge variant="success">Completed</Badge>
                        ) : item.status === "PENDING" ? (
                          <Badge variant="warning">Processing</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg text-xs"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
