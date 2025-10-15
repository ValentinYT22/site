import { useState, useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Library } from './pages/Library';
import { Videos } from './pages/Videos';
import { PlayerBar } from './components/PlayerBar';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Home as HomeIcon, Search as SearchIcon, Library as LibraryIcon, Video as VideoIcon } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [tracks, setTracks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const audioControls = useAudioPlayer([]);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Seed tracks and videos if not already done
        await axios.post(`${API}/tracks/seed`);
        await axios.post(`${API}/videos/seed`);
        
        // Fetch all tracks
        const response = await axios.get(`${API}/tracks`);
        setTracks(response.data);
        audioControls.setQueue(response.data);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initApp();
  }, []);

  const handlePlayTrack = (index) => {
    audioControls.playTrack(index);
  };

  const handleRefreshTracks = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="App dark min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <nav className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] sticky top-0 z-30" data-testid="main-nav">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <Link to="/" className="text-2xl font-heading font-bold tracking-tight" data-testid="nav-logo">
                    AdamMM
                  </Link>
                  <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" asChild data-testid="nav-home">
                      <Link to="/">
                        <HomeIcon className="h-5 w-5 mr-2" />
                        Acasă
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild data-testid="nav-search">
                      <Link to="/search">
                        <SearchIcon className="h-5 w-5 mr-2" />
                        Căutare
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild data-testid="nav-videos">
                      <Link to="/videos">
                        <VideoIcon className="h-5 w-5 mr-2" />
                        Videoclipuri
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild data-testid="nav-library">
                      <Link to="/library">
                        <LibraryIcon className="h-5 w-5 mr-2" />
                        Bibliotecă
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onPlayTrack={handlePlayTrack}
                    onRefreshTracks={refreshKey}
                  />
                }
              />
              <Route path="/search" element={<Search onPlayTrack={handlePlayTrack} />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/library" element={<Library onPlayTrack={handlePlayTrack} />} />
            </Routes>
          </main>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-20 inset-x-0 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] z-30" data-testid="mobile-nav">
            <div className="flex items-center justify-around h-16 px-4">
              <Button variant="ghost" size="icon" asChild data-testid="mobile-nav-home">
                <Link to="/">
                  <HomeIcon className="h-6 w-6" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="mobile-nav-search">
                <Link to="/search">
                  <SearchIcon className="h-6 w-6" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="mobile-nav-videos">
                <Link to="/videos">
                  <VideoIcon className="h-6 w-6" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="mobile-nav-library">
                <Link to="/library">
                  <LibraryIcon className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Player Bar */}
          <PlayerBar
            controls={audioControls}
            onFavoriteToggle={handleRefreshTracks}
          />
        </div>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
