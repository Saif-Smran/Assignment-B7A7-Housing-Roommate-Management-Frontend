"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getOwnProfile, updateOwnProfile } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { User } from "@/interfaces";
import { getAuthToken } from "@/lib/auth";
import { type ProfileSchemaType, profileSchema } from "@/validation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "", phone: "" },
  });

  useEffect(() => {
    void getOwnProfile(getAuthToken() || undefined).then((response) => {
      if (response.success && response.data) {
        setUser(response.data);
        reset({
          fullName: response.data.fullName,
          phone: response.data.phone || "",
        });
      } else {
        toast.error(response.message || "Unable to load profile.");
      }
    });
  }, [reset]);

  const onSubmit = async (data: ProfileSchemaType) => {
    setSaving(true);
    const response = await updateOwnProfile(data, getAuthToken() || undefined);
    if (response.success && response.data) {
      setUser(response.data);
      toast.success("Profile updated successfully.");
    } else {
      toast.error(response.message || "Unable to update profile.");
    }
    setSaving(false);
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 px-4 pb-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Account
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">
          My profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Update the details associated with your UrbanMatch account.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-indigo-600" /> Profile details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!user ? (
            <div className="h-32 animate-pulse rounded-lg bg-muted" />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1 text-sm">
                <label htmlFor="profile-full-name" className="font-medium">
                  Full name
                </label>
                <Input id="profile-full-name" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-xs text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="profile-email" className="font-medium">
                  Email
                </label>
                <Input id="profile-email" value={user.email} disabled />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="profile-phone" className="font-medium">
                  Phone
                </label>
                <Input
                  id="profile-phone"
                  {...register("phone")}
                  placeholder="+880 1700 000000"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="mt-1 font-semibold">{user.role}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="mt-1 font-semibold">{user.email}</p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save changes
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
