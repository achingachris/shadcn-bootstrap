"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArtistCard } from "@/components/artist-card"
import { OrganizerCard } from "@/components/organizer-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  mockArtists,
  mockOrganizers,
  artistGenres,
  organizerTypes,
  organizerSpecialties,
} from "@/lib/artists-organizers-data"
import { Search, Music, Building } from "lucide-react"

export default function ArtistsOrganizersPage() {
  const [activeTab, setActiveTab] = useState("artists")
  const [searchTerm, setSearchTerm] = useState("")
  const [artistGenreFilter, setArtistGenreFilter] = useState("All")
  const [organizerTypeFilter, setOrganizerTypeFilter] = useState("All")
  const [organizerSpecialtyFilter, setOrganizerSpecialtyFilter] = useState("All")

  const filteredArtists = useMemo(() => {
    return mockArtists.filter((artist) => {
      const matchesSearch =
        searchTerm === "" ||
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genre.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesGenre = artistGenreFilter === "All" || artist.genre.includes(artistGenreFilter)

      return matchesSearch && matchesGenre
    })
  }, [searchTerm, artistGenreFilter])

  const filteredOrganizers = useMemo(() => {
    return mockOrganizers.filter((organizer) => {
      const matchesSearch =
        searchTerm === "" ||
        organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organizer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organizer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        organizer.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = organizerTypeFilter === "All" || organizer.type === organizerTypeFilter.toLowerCase()
      const matchesSpecialty =
        organizerSpecialtyFilter === "All" || organizer.specialties.includes(organizerSpecialtyFilter)

      return matchesSearch && matchesType && matchesSpecialty
    })
  }, [searchTerm, organizerTypeFilter, organizerSpecialtyFilter])

  const featuredArtists = filteredArtists.filter((artist) => artist.featured)
  const regularArtists = filteredArtists.filter((artist) => !artist.featured)
  const featuredOrganizers = filteredOrganizers.filter((organizer) => organizer.featured)
  const regularOrganizers = filteredOrganizers.filter((organizer) => !organizer.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold font-heading mb-4">Artists & Organizers</h1>
            <p className="text-xl text-muted-foreground">
              Discover talented artists and professional event organizers across East Africa. Connect with the creative
              minds behind amazing events.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Tab Navigation */}
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="artists" className="flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      Artists
                    </TabsTrigger>
                    <TabsTrigger value="organizers" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Organizers
                    </TabsTrigger>
                  </TabsList>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filters */}
                  <div className="space-y-4">
                    {activeTab === "artists" && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Genre</label>
                        <Select value={artistGenreFilter} onValueChange={setArtistGenreFilter}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {artistGenres.map((genre) => (
                              <SelectItem key={genre} value={genre}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {activeTab === "organizers" && (
                      <>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Type</label>
                          <Select value={organizerTypeFilter} onValueChange={setOrganizerTypeFilter}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {organizerTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Specialty</label>
                          <Select value={organizerSpecialtyFilter} onValueChange={setOrganizerSpecialtyFilter}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {organizerSpecialties.map((specialty) => (
                                <SelectItem key={specialty} value={specialty}>
                                  {specialty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {(searchTerm ||
                      artistGenreFilter !== "All" ||
                      organizerTypeFilter !== "All" ||
                      organizerSpecialtyFilter !== "All") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("")
                          setArtistGenreFilter("All")
                          setOrganizerTypeFilter("All")
                          setOrganizerSpecialtyFilter("All")
                        }}
                        className="w-full"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <TabsContent value="artists" className="mt-0">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">{filteredArtists.length} Artists Found</h2>
                    {(searchTerm || artistGenreFilter !== "All") && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Filtered by:</span>
                        {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
                        {artistGenreFilter !== "All" && <Badge variant="secondary">{artistGenreFilter}</Badge>}
                      </div>
                    )}
                  </div>

                  {/* Featured Artists */}
                  {featuredArtists.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                        <span className="text-primary">★</span>
                        Featured Artists
                      </h3>
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {featuredArtists.map((artist) => (
                          <ArtistCard key={artist.id} artist={artist} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Artists */}
                  {regularArtists.length > 0 && (
                    <div>
                      {featuredArtists.length > 0 && (
                        <h3 className="text-2xl font-bold font-heading mb-6">All Artists</h3>
                      )}
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {regularArtists.map((artist) => (
                          <ArtistCard key={artist.id} artist={artist} />
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredArtists.length === 0 && (
                    <div className="text-center py-12">
                      <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No artists found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="organizers" className="mt-0">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">{filteredOrganizers.length} Organizers Found</h2>
                    {(searchTerm || organizerTypeFilter !== "All" || organizerSpecialtyFilter !== "All") && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Filtered by:</span>
                        {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
                        {organizerTypeFilter !== "All" && <Badge variant="secondary">{organizerTypeFilter}</Badge>}
                        {organizerSpecialtyFilter !== "All" && (
                          <Badge variant="secondary">{organizerSpecialtyFilter}</Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Featured Organizers */}
                  {featuredOrganizers.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                        <span className="text-primary">★</span>
                        Featured Organizers
                      </h3>
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {featuredOrganizers.map((organizer) => (
                          <OrganizerCard key={organizer.id} organizer={organizer} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Organizers */}
                  {regularOrganizers.length > 0 && (
                    <div>
                      {featuredOrganizers.length > 0 && (
                        <h3 className="text-2xl font-bold font-heading mb-6">All Organizers</h3>
                      )}
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {regularOrganizers.map((organizer) => (
                          <OrganizerCard key={organizer.id} organizer={organizer} />
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredOrganizers.length === 0 && (
                    <div className="text-center py-12">
                      <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No organizers found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
