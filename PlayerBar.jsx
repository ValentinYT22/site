import { useMemo } from 'react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { SkipBack, Play, Pause, SkipForward, Heart } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const PlayerBar = ({ controls, onFavoriteToggle }) => {
  const { currentTrack, state } = controls;
  const progress = useMemo(() => [state.current], [state.current]);

  if (!currentTrack) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFavorite = async () => {
    try {
      await axios.post(`${API}/favorites/toggle`, { trackId: currentTrack.id });
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 bg-[hsl(var(--card))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card))]/80 border-t border-[hsl(var(--border))] z-40"
      data-testid="player-bar"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-20">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="size-12 rounded-md object-cover"
            data-testid="player-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" data-testid="player-track-title">
              {currentTrack.title}
            </p>
            <p className="truncate text-xs text-foreground/70" data-testid="player-track-artist">
              {currentTrack.artist}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleFavorite}
              data-testid="player-favorite-button"
              className="transition-colors duration-150"
            >
              <Heart className={`h-4 w-4 ${currentTrack.liked ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={controls.prev}
              data-testid="player-prev-button"
              className="transition-[background-color,box-shadow] duration-150"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              onClick={state.playing ? controls.pause : controls.play}
              data-testid="player-toggle-button"
              className="[box-shadow:var(--btn-shadow)] transition-[background-color,box-shadow] duration-150 hover:scale-105"
            >
              {state.playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={controls.next}
              data-testid="player-next-button"
              className="transition-[background-color,box-shadow] duration-150"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden lg:flex items-center gap-2 min-w-[100px]">
            <span className="text-xs text-foreground/70" data-testid="player-current-time">
              {formatTime(state.current)}
            </span>
            <span className="text-xs text-foreground/70">/</span>
            <span className="text-xs text-foreground/70" data-testid="player-duration">
              {formatTime(state.duration)}
            </span>
          </div>
        </div>

        <div className="pb-3 -mt-2">
          <Slider
            value={progress}
            max={state.duration || 100}
            step={1}
            onValueChange={(v) => controls.seek(v[0])}
            data-testid="player-seek-slider"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
