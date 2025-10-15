import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Play, Heart, Plus, List } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Library = ({ onPlayTrack }) => {
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${API}/favorites`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${API}/playlists`);
      setPlaylists(response.data);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      toast.error('Introdu un nume pentru playlist');
      return;
    }

    try {
      await axios.post(`${API}/playlists`, { name: newPlaylistName });
      setNewPlaylistName('');
      setIsDialogOpen(false);
      fetchPlaylists();
      toast.success('Playlist creat cu succes!');
    } catch (error) {
      console.error('Failed to create playlist:', error);
      toast.error('Eroare la crearea playlist-ului');
    }
  };

  const handleFavorite = async (trackId) => {
    try {
      await axios.post(`${API}/favorites/toggle`, { trackId });
      fetchFavorites();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error('Eroare la actualizarea favoritului');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-32" data-testid="library-page">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
        Biblioteca ta
      </h1>

      <Tabs defaultValue="favorites" className="w-full" data-testid="library-tabs">
        <TabsList className="mb-6">
          <TabsTrigger value="favorites" data-testid="favorites-tab">
            <Heart className="h-4 w-4 mr-2" />
            Favorite
          </TabsTrigger>
          <TabsTrigger value="playlists" data-testid="playlists-tab">
            <List className="h-4 w-4 mr-2" />
            Playlisturi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" data-testid="favorites-content">
          {favorites.length === 0 ? (
            <Card className="p-12 text-center" data-testid="favorites-empty">
              <Heart className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
              <p className="text-foreground/70 mb-4">Nu ai favorite încă</p>
              <p className="text-sm text-foreground/50">
                Apasă pe inimă pentru a salva piesele preferate
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {favorites.map((track, index) => (
                <Card
                  key={track.id}
                  className="p-4 flex items-center gap-4 transition-colors duration-150 hover:bg-white/5"
                  data-testid={`favorite-track-${index}`}
                >
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="size-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-sm text-foreground/70 truncate">{track.artist}</p>
                    <p className="text-xs text-foreground/50">{formatDuration(track.duration)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleFavorite(track.id)}
                      data-testid={`remove-favorite-${index}`}
                    >
                      <Heart className="h-5 w-5 fill-primary text-primary" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => onPlayTrack(index)}
                      data-testid={`play-favorite-${index}`}
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" data-testid="playlists-content">
          <div className="mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="[box-shadow:var(--btn-shadow)]"
                  data-testid="create-playlist-button"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Creează playlist
                </Button>
              </DialogTrigger>
              <DialogContent data-testid="create-playlist-dialog">
                <DialogHeader>
                  <DialogTitle>Playlist nou</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Nume playlist"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                    data-testid="playlist-name-input"
                  />
                  <Button
                    onClick={handleCreatePlaylist}
                    className="w-full"
                    data-testid="submit-playlist-button"
                  >
                    Creează
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {playlists.length === 0 ? (
            <Card className="p-12 text-center" data-testid="playlists-empty">
              <List className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
              <p className="text-foreground/70 mb-4">Nu ai playlisturi încă</p>
              <p className="text-sm text-foreground/50">
                Creează un playlist pentru a organiza piesele tale
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {playlists.map((playlist, index) => (
                <Card
                  key={playlist.id}
                  className="p-4 transition-colors duration-150 hover:bg-white/5 cursor-pointer"
                  data-testid={`playlist-card-${index}`}
                >
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full aspect-square rounded-lg object-cover mb-3"
                  />
                  <p className="font-medium truncate" data-testid={`playlist-name-${index}`}>
                    {playlist.name}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {playlist.tracks.length} piese
                  </p>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
