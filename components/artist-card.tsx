import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, CheckCircle, Instagram, Twitter, Facebook, Globe } from "lucide-react"
import type { Artist } from "@/lib/artists-organizers-data"

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group hover:border-haaafla-emerald/30 hover:-translate-y-1">
      <div className="relative">
        <img
          src={artist.image || "/placeholder.svg"}
          alt={artist.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-haaafla-magenta/90 text-white hover:bg-haaafla-magenta">{artist.genre[0]}</Badge>
          {artist.verified && (
            <Badge className="bg-haaafla-teal/90 text-white hover:bg-haaafla-teal flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        {artist.featured && (
          <Badge className="absolute top-3 right-3 bg-haaafla-golden/90 text-black hover:bg-haaafla-golden">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-haaafla-emerald transition-colors duration-300">
          {artist.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{artist.bio}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-teal transition-colors duration-300">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{artist.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-orange transition-colors duration-300">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{artist.followers.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-golden transition-colors duration-300">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{artist.upcomingEvents} upcoming events</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {artist.genre.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {artist.socialMedia.instagram && (
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-haaafla-magenta">
                <Instagram className="h-4 w-4" />
              </Button>
            )}
            {artist.socialMedia.twitter && (
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-haaafla-teal">
                <Twitter className="h-4 w-4" />
              </Button>
            )}
            {artist.socialMedia.facebook && (
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-haaafla-emerald">
                <Facebook className="h-4 w-4" />
              </Button>
            )}
            {artist.socialMedia.website && (
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-haaafla-golden">
                <Globe className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            size="sm"
            className="bg-haaafla-emerald hover:bg-haaafla-emerald/90 text-white group-hover:shadow-lg group-hover:shadow-haaafla-emerald/25 transition-all duration-300"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
