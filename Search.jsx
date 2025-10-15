import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Play, Heart } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Search = ({ onPlayTrack }) => {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(`${API}/tracks`);
        setTracks(response.data);
        setFilteredTracks(response.data);
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
        toast.error('Nu s-au putut încărca piesele');
      }
    };
    fetchTracks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter((track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filtered);
    }
  }, [searchQuery, tracks]);

  const handleFavorite = async (trackId) => {
    try {
      await axios.post(`${API}/favorites/toggle`, { trackId });
      const response = await axios.get(`${API}/tracks`);
      setTracks(response.data);
      setFilteredTracks(response.data);
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-32" data-testid="search-page">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
        Caută piese
      </h1>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Caută după titlu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-2xl"
          data-testid="search-input"
        />
      </div>

      {filteredTracks.length === 0 ? (
        <div className="text-center py-12" data-testid="search-empty">
          <p className="text-foreground/70">Nu s-au găsit piese.</p>
        </div>
      ) : (
        <div className="space-y-2" data-testid="search-results">
          {filteredTracks.map((track, index) => (
            <Card
              key={track.id}
              className="p-4 flex items-center gap-4 transition-colors duration-150 hover:bg-white/5"
              data-testid={`search-result-${index}`}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="size-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" data-testid={`result-title-${index}`}>
                  {track.title}
                </p>
                <p className="text-sm text-foreground/70 truncate">{track.artist}</p>
                <p className="text-xs text-foreground/50">{formatDuration(track.duration)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleFavorite(track.id)}
                  data-testid={`result-favorite-${index}`}
                >
                  <Heart className={`h-5 w-5 ${track.liked ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button
                  size="icon"
                  onClick={() => {
                    const trackIndex = tracks.findIndex((t) => t.id === track.id);
                    onPlayTrack(trackIndex);
                  }}
                  data-testid={`result-play-${index}`}
                >
                  <Play className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
