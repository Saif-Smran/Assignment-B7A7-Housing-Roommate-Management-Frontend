"use client";

import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Filter,
  Search,
  XCircle,
} from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";
import { getApplications } from "@/api/applications.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Application, ApplicationStatus } from "@/interfaces";
import { getAuthToken } from "@/lib/auth";

const statusList: Array<"ALL" | ApplicationStatus> = [
  "ALL",
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<
    (typeof statusList)[number]
  >("ALL");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 8;
  const token = getAuthToken() || undefined;

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getApplications({ limit: 100 }, token);
        if (res.success && res.data?.items) {
          setApplications(res.data.items);
        } else {
          toast.error(res.message || "Unable to load applications.");
        }
      } catch (err) {
        toast.error("Failed to connect to application records.");
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, [token]);

  const filtered = React.useMemo(() => {
    return applications.filter((app) => {
      const matchStatus =
        statusFilter === "ALL" || app.status === statusFilter;
      const matchSearch =
        !searchTerm.trim() ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tenantId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.message &&
          app.message.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchStatus && matchSearch;
    });
  }, [applications, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "APPROVED":
        return <Badge variant="success">Approved</Badge>;
      case "PENDING":
        return <Badge variant="warning">Pending Review</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Cancelled</Badge>;
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <ClipboardList className="h-3.5 w-3.5" />
          System Applications
        </div>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-foreground">
          Tenant Booking Applications
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review, filter, and audit all tenancy booking requests submitted
          across properties.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {statusList.map((st) => (
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
            placeholder="Search by ID or message..."
            className="h-9 pl-9 text-xs rounded-xl"
          />
        </div>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="text-sm font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-indigo-600" />
              All System Applications ({filtered.length})
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
              <ClipboardList className="h-8 w-8 text-muted-foreground mx-auto" />
              <p>No applications match the selected status or search query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="border-b border-border/80 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-3">Application ID</th>
                    <th className="px-3 py-3">Room Target</th>
                    <th className="px-3 py-3">Move-In Date</th>
                    <th className="px-3 py-3">Tenant Statement</th>
                    <th className="px-3 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {paginated.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-3 py-3 font-mono text-[11px] font-medium text-foreground">
                        {app.id.slice(0, 12)}...
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-semibold text-foreground">
                          Room #{app.roomId.slice(0, 8)}
                        </span>
                        <span className="block text-[10px] text-muted-foreground">
                          Tenant: {app.tenantId.slice(0, 8)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-indigo-500" />
                          <span>
                            {new Date(app.moveInDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 max-w-[240px]">
                        <p className="truncate text-muted-foreground">
                          {app.message || "Standard application request"}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-right">
                        {getStatusBadge(app.status)}
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
