"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Bed,
  Building,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Flame,
  Home,
  MapPin,
  MessageSquare,
  Navigation,
  Power,
  Refrigerator,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Tv,
  Users,
  Utensils,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-toastify";
import { getProperties } from "@/api/properties.api";
import { PropertyCard } from "@/components/room/property-card";
import { RoomBookingCard } from "@/components/room/room-booking-card";
import { RoomGallery } from "@/components/room/room-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PropertyDetails, Room } from "@/interfaces";

const PropertyMap = dynamic(() => import("@/components/room/property-map"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/7] w-full rounded-2xl bg-muted/40 animate-pulse flex flex-col items-center justify-center text-muted-foreground text-xs gap-2">
      <MapPin className="h-6 w-6 text-indigo-500 animate-bounce" />
      <span>Loading Interactive Map...</span>
    </div>
  ),
});

// Amenity Icon Mapper
const getAmenityIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("wifi") || lower.includes("internet")) return Wifi;
  if (lower.includes("ac") || lower.includes("air condition")) return Wind;
  if (lower.includes("bath") || lower.includes("attached")) return Bath;
  if (lower.includes("kitchen") || lower.includes("cook")) return Utensils;
  if (
    lower.includes("generator") ||
    lower.includes("electricity") ||
    lower.includes("power")
  )
    return Power;
  if (lower.includes("gas") || lower.includes("cylinder")) return Flame;
  if (lower.includes("fridge") || lower.includes("refrigerator"))
    return Refrigerator;
  if (lower.includes("tv") || lower.includes("television")) return Tv;
  if (
    lower.includes("security") ||
    lower.includes("cctv") ||
    lower.includes("guard")
  )
    return ShieldCheck;
  return Sparkles;
};

interface RoomDetailsContentProps {
  property: PropertyDetails;
  initialRoomId?: string;
}

export function RoomDetailsContent({
  property,
  initialRoomId,
}: RoomDetailsContentProps) {
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(() => {
    if (initialRoomId && property.rooms) {
      return (
        property.rooms.find((r) => r.id === initialRoomId) ||
        property.rooms[0] ||
        null
      );
    }
    return property.rooms?.[0] || null;
  });

  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const availableRoomsCount =
    property.rooms?.filter((r) => r.isAvailable).length || 0;
  const totalRoomsCount = property.rooms?.length || 0;

  const [relatedProperties, setRelatedProperties] = React.useState<
    PropertyDetails[]
  >([]);
  const [reviews, setReviews] = React.useState([
    {
      id: "r1",
      author: "Tanvir Ahmed",
      role: "Verified Tenant (6 months)",
      date: "2 weeks ago",
      rating: 5,
      comment:
        "Extremely clean apartment with fast WiFi and uninterrupted electricity. The owner was cooperative and returned the deposit on time without any hassle.",
    },
    {
      id: "r2",
      author: "Samira Khan",
      role: "Verified Resident",
      date: "1 month ago",
      rating: 5,
      comment:
        "The neighborhood is very peaceful and safe for students and working professionals. Attached bath and gas pipeline are great perks.",
    },
    {
      id: "r3",
      author: "Rakib Hassan",
      role: "Flatmate",
      date: "2 months ago",
      rating: 4,
      comment:
        "Great location close to bus stops and grocery stores. High-speed internet is reliable for remote work.",
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = React.useState("");
  const [newReviewRating, setNewReviewRating] = React.useState(5);
  const [newReviewComment, setNewReviewComment] = React.useState("");
  const [submittingReview, setSubmittingReview] = React.useState(false);

  React.useEffect(() => {
    async function loadRelated() {
      try {
        const res = await getProperties({ limit: 4, city: property.city });
        if (res.success && res.data?.items) {
          setRelatedProperties(
            res.data.items.filter((p) => p.id !== property.id).slice(0, 3),
          );
        }
      } catch (err) {
        console.error("Failed to load related properties", err);
      }
    }
    void loadRelated();
  }, [property.id, property.city]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error("Please enter your name and review comment.");
      return;
    }
    setSubmittingReview(true);
    setTimeout(() => {
      setReviews((prev) => [
        {
          id: `rev-${Date.now()}`,
          author: newReviewAuthor.trim(),
          role: "Verified Resident",
          date: "Just now",
          rating: newReviewRating,
          comment: newReviewComment.trim(),
        },
        ...prev,
      ]);
      setNewReviewAuthor("");
      setNewReviewComment("");
      setSubmittingReview(false);
      toast.success("Thank you! Your verified review has been published.");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation & Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/properties"
              className="hover:text-foreground transition-colors"
            >
              Rooms & Properties
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {property.city}
            </span>
            <ChevronRight className="h-3 w-3 hidden sm:inline" />
            <span className="text-muted-foreground truncate max-w-[220px] hidden sm:inline">
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs gap-1.5 rounded-xl text-muted-foreground hover:text-foreground"
            >
              <Link href="/properties">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Listings
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-xs gap-1.5 rounded-xl border-border/80"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Property Header Banner */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-indigo-600 text-white font-medium text-xs px-2.5 py-0.5">
              {property.propertyType}
            </Badge>
            {availableRoomsCount > 0 ? (
              <Badge variant="success" className="text-xs">
                {availableRoomsCount} of {totalRoomsCount} Rooms Available
              </Badge>
            ) : (
              <Badge variant="warning" className="text-xs">
                Fully Occupied
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
              Verified Listing
            </Badge>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
              {property.address}, {property.city}
              {property.state ? `, ${property.state}` : ""}, {property.country}
              {property.zipCode ? ` - ${property.zipCode}` : ""}
            </span>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Gallery, Details, Rooms, Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <RoomGallery
              images={property.images}
              title={property.title}
              propertyType={property.propertyType}
              isAvailable={availableRoomsCount > 0}
            />

            {/* Quick Specs Highlight Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-border/70 bg-card p-4 text-center space-y-1">
                <Bed className="h-5 w-5 text-indigo-500 mx-auto" />
                <span className="text-[11px] text-muted-foreground block">
                  Total Units
                </span>
                <span className="font-heading font-bold text-base text-foreground">
                  {totalRoomsCount} {totalRoomsCount === 1 ? "Room" : "Rooms"}
                </span>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-4 text-center space-y-1">
                <Users className="h-5 w-5 text-purple-500 mx-auto" />
                <span className="text-[11px] text-muted-foreground block">
                  Capacity
                </span>
                <span className="font-heading font-bold text-base text-foreground">
                  {selectedRoom?.capacity || 1} Person/Unit
                </span>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-4 text-center space-y-1">
                <Shield className="h-5 w-5 text-emerald-500 mx-auto" />
                <span className="text-[11px] text-muted-foreground block">
                  Security
                </span>
                <span className="font-heading font-bold text-base text-foreground">
                  24/7 Verified
                </span>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-4 text-center space-y-1">
                <Zap className="h-5 w-5 text-amber-500 mx-auto" />
                <span className="text-[11px] text-muted-foreground block">
                  Utility Sharing
                </span>
                <span className="font-heading font-bold text-base text-foreground">
                  Fair Split
                </span>
              </div>
            </div>

            {/* Property Description */}
            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-6">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                About This Property
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                {property.description ? (
                  property.description
                    .split("\n\n")
                    .map((para) => <p key={para.slice(0, 30)}>{para}</p>)
                ) : (
                  <p>
                    A premium, comfortable residential space offering modern
                    urban living with all essential utilities, clean
                    surroundings, and secure gated access. Ideal for working
                    professionals, students, and roommates seeking peace of
                    mind.
                  </p>
                )}
              </div>
            </div>

            {/* Individual Room Units Breakdown Section */}
            {property.rooms && property.rooms.length > 0 && (
              <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                      <Bed className="h-5 w-5 text-indigo-500" />
                      Available Room Units ({property.rooms.length})
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Select a room unit to view individual pricing and details
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  {property.rooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <button
                        type="button"
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`text-left cursor-pointer rounded-xl border p-4 transition-all ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-500/5 ring-2 ring-indigo-500/20 shadow-md"
                            : "border-border/70 bg-muted/20 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-heading font-bold text-sm text-foreground block">
                              {room.roomNumber
                                ? `Unit #${room.roomNumber} - `
                                : ""}
                              {room.roomType}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Capacity: {room.capacity} Person(s)
                            </span>
                          </div>
                          <Badge
                            variant={
                              room.isAvailable ? "success" : "destructive"
                            }
                            className="text-[10px]"
                          >
                            {room.isAvailable ? "Available" : "Occupied"}
                          </Badge>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50 flex items-baseline justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-muted-foreground block">
                              Monthly Rent
                            </span>
                            <span className="font-heading font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                              ৳{room.rentAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-muted-foreground block">
                              Security Deposit
                            </span>
                            <span className="font-semibold text-foreground">
                              ৳
                              {room.securityDeposit?.toLocaleString() ||
                                "1 Mo. Rent"}
                            </span>
                          </div>
                        </div>

                        {room.description && (
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-1">
                            {room.description}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-6">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Amenities & Features
              </h2>

              {property.amenities && property.amenities.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {property.amenities.map((amenity) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-semibold text-foreground">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    "High-speed WiFi",
                    "Attached Bath",
                    "Generator Backup",
                    "Gas Connection",
                    "24/7 Security CCTV",
                    "Spacious Balcony",
                  ].map((item) => {
                    const Icon = getAmenityIcon(item);
                    return (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-semibold text-foreground">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* House Rules & Community Guidelines */}
            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-6">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-500" />
                House Rules & Policies
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5 rounded-xl bg-muted/30 p-3 border border-border/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Minimum Lease Duration
                    </span>
                    <span className="text-muted-foreground">
                      Standard 6-month agreement with 1-month advance notice.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-muted/30 p-3 border border-border/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Quiet Hours
                    </span>
                    <span className="text-muted-foreground">
                      11:00 PM – 7:00 AM to respect working roommates and
                      neighbors.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-muted/30 p-3 border border-border/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Visitor Policy
                    </span>
                    <span className="text-muted-foreground">
                      Guests welcome during daytime; overnight guests by mutual
                      agreement.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-muted/30 p-3 border border-border/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Smoking & Pets
                    </span>
                    <span className="text-muted-foreground">
                      Designated smoking zones only. Please check with landlord
                      for pets.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Leaflet Location & Neighborhood Map */}
            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-indigo-500" />
                    Location & Neighborhood Map
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Interactive geographic overview of {property.city} and
                    surrounding transit
                  </p>
                </div>
              </div>

              <PropertyMap
                title={property.title}
                address={property.address}
                city={property.city}
                propertyType={property.propertyType}
              />
            </div>

            {/* Reviews & Ratings Section */}
            <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="space-y-1">
                  <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    Tenant Reviews & Community Ratings
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Honest feedback from verified residents and previous
                    roommates
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full w-fit">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-sm">4.9</span>
                  <span className="text-xs text-muted-foreground">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>

              {/* Rating Criteria Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1">
                  <span className="text-[11px] text-muted-foreground block">
                    Cleanliness
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      4.9 / 5
                    </span>
                    <ThumbsUp className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[98%]" />
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1">
                  <span className="text-[11px] text-muted-foreground block">
                    Communication
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      5.0 / 5
                    </span>
                    <ThumbsUp className="h-3.5 w-3.5 text-indigo-500" />
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[100%]" />
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1">
                  <span className="text-[11px] text-muted-foreground block">
                    Security & Quiet
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      4.8 / 5
                    </span>
                    <ShieldCheck className="h-3.5 w-3.5 text-purple-500" />
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[96%]" />
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1">
                  <span className="text-[11px] text-muted-foreground block">
                    Rent Value
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      4.9 / 5
                    </span>
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[98%]" />
                  </div>
                </div>
              </div>

              {/* Review Items List */}
              <div className="space-y-4 pt-2">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-border/60 bg-card/60 space-y-2 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <span className="font-heading font-semibold text-xs text-foreground block">
                            {rev.author}
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                            {rev.role} · {rev.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={`star-${rev.id}-${i + 1}`}
                            className={`h-3 w-3 ${
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted/60"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Add Review Form */}
              <form
                onSubmit={handleReviewSubmit}
                className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-heading font-semibold text-xs text-foreground">
                    Leave a Resident Review
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-muted-foreground mr-1">
                      Your Rating:
                    </span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-0.5 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            star <= newReviewRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="Your Full Name (e.g. Asif Karim)"
                    className="h-9 px-3 text-xs rounded-lg border border-border bg-background text-foreground"
                    disabled={submittingReview}
                  />
                  <input
                    type="text"
                    value={property.title}
                    readOnly
                    className="h-9 px-3 text-xs rounded-lg border border-border/60 bg-muted/40 text-muted-foreground truncate"
                  />
                </div>

                <textarea
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details about utilities, quiet hours, room cleanliness, and neighborhood safety..."
                  rows={3}
                  className="w-full p-3 text-xs rounded-lg border border-border bg-background text-foreground resize-none"
                  disabled={submittingReview}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={submittingReview}
                    className="text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Booking & Landlord Widget */}
          <div className="lg:col-span-1">
            <RoomBookingCard
              property={property}
              selectedRoom={selectedRoom}
              onSelectRoom={(r) => setSelectedRoom(r)}
            />
          </div>
        </div>

        {/* Related Accommodations Section (3 Columns Desktop) */}
        <section className="pt-12 border-t border-border/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Nearby & Comparable</span>
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                Similar Properties in {property.city}
              </h2>
              <p className="text-xs text-muted-foreground">
                Explore other verified flats and shared rooms within your
                preferred area
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs rounded-xl self-start sm:self-auto"
            >
              <Link
                href={`/properties?city=${encodeURIComponent(property.city)}`}
              >
                View More in {property.city}
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {relatedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProp) => (
                <PropertyCard key={relatedProp.id} property={relatedProp} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center bg-card/40 space-y-3">
              <Building className="h-8 w-8 text-indigo-500 mx-auto" />
              <p className="text-sm font-semibold text-foreground">
                Looking for more rooms in {property.city}?
              </p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Explore our full catalog to find student dorms, single private
                studios, and shared apartments.
              </p>
              <Button
                asChild
                size="sm"
                className="rounded-xl bg-indigo-600 text-white"
              >
                <Link href="/properties">Browse All Properties</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
