import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Play, Heart, Plus } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Home = ({ onPlayTrack, onRefreshTracks }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTracks = async () => {
    try {
      const response = await axios.get(`${API}/tracks`);
      setTracks(response.data);
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
      toast.error('Nu s-au putut încărca piesele');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  useEffect(() => {
    if (onRefreshTracks) {
      fetchTracks();
    }
  }, [onRefreshTracks]);

  const handleFavorite = async (trackId) => {
    try {
      await axios.post(`${API}/favorites/toggle`, { trackId });
      fetchTracks();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error('Eroare la salvarea favoritului');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" data-testid="home-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="w-full aspect-square rounded-lg mb-3" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-32" data-testid="home-page">
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-xl p-8 sm:p-12 bg-gradient-to-br from-[#0B0C0E] via-[#0E1016] to-[#0B0C0E]">
          <img
            src="https://valentinyt22.github.io/site/Euyt.jpg"
            alt="AdamMM"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4" data-testid="hero-title">
              AdamMM
            </h1>
            <p className="text-foreground/70 mb-6 max-w-md">
              Descoperă muzica autentică românească. {tracks.length} piese disponibile.
            </p>
            <Button
              size="lg"
              onClick={() => onPlayTrack(0)}
              className="[box-shadow:var(--btn-shadow)] transition-[background-color,box-shadow] duration-150 hover:scale-105"
              data-testid="hero-play-button"
            >
              <Play className="mr-2 h-5 w-5" />
              Ascultă acum
            </Button>
          </div>
        </div>
      </section>

      <section data-testid="tracks-section">
        <h2 className="text-base sm:text-lg font-semibold text-foreground/90 mb-4">
          Toate piesele
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tracks.map((track, index) => (
            <Card
              key={track.id}
              className="group p-4 transition-colors duration-150 hover:bg-white/5 cursor-pointer"
              data-testid={`track-card-${index}`}
            >
              <div className="relative mb-3">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    onClick={() => onPlayTrack(index)}
                    className="[box-shadow:var(--btn-shadow)]"
                    data-testid={`play-track-${index}`}
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(track.id);
                    }}
                    data-testid={`favorite-track-${index}`}
                  >
                    <Heart className={`h-5 w-5 ${track.liked ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                </div>
              </div>
              <p className="truncate text-sm font-medium mb-1" data-testid={`track-title-${index}`}>
                {track.title}
              </p>
              <p className="truncate text-xs text-foreground/70" data-testid={`track-artist-${index}`}>
                {track.artist}
              </p>
              <p className="text-xs text-foreground/50 mt-1">
                {formatDuration(track.duration)}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
