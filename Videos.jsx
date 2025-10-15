import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Play } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API}/videos`);
        setVideos(response.data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        toast.error('Nu s-au putut încărca videoclipurile');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" data-testid="videos-page">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          Videoclipuri
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="w-full aspect-video rounded-lg mb-3" />
              <Skeleton className="h-4 w-3/4 mb-2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-32" data-testid="videos-page">
      <section className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-2">
          Videoclipuri
        </h1>
        <p className="text-foreground/70">
          Vizionează cele mai noi videoclipuri de la AdamMM
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="videos-grid">
        {videos.map((video, index) => (
          <Card
            key={video.id}
            className="group p-0 overflow-hidden transition-colors duration-150 hover:bg-white/5 cursor-pointer"
            onClick={() => setSelectedVideo(video)}
            data-testid={`video-card-${index}`}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                <div className="bg-primary rounded-full p-4" data-testid={`play-video-${index}`}>
                  <Play className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium truncate" data-testid={`video-title-${index}`}>
                {video.title}
              </p>
              <p className="text-sm text-foreground/70">AdamMM</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0" data-testid="video-dialog">
          {selectedVideo && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
                data-testid="video-iframe"
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
