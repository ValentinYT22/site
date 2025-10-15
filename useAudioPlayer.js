import { useEffect, useRef, useState, useCallback } from 'react';

export const useAudioPlayer = (initialQueue = []) => {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState(initialQueue);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState({
    playing: false,
    duration: 0,
    current: 0,
    volume: 0.8,
    loop: 'off',
    shuffle: false
  });

  const load = useCallback((i) => {
    const track = queue[i];
    if (!track) return;
    audioRef.current.src = track.src;
    audioRef.current.load();
    setIndex(i);
  }, [queue]);

  const play = useCallback(() => {
    audioRef.current.play();
    setState(s => ({ ...s, playing: true }));
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setState(s => ({ ...s, playing: false }));
  }, []);

  const seek = useCallback((t) => {
    audioRef.current.currentTime = t;
    setState(s => ({ ...s, current: t }));
  }, []);

  const setVolume = useCallback((v) => {
    audioRef.current.volume = v;
    setState(s => ({ ...s, volume: v }));
  }, []);

  const next = useCallback(() => {
    const n = (index + 1) % queue.length;
    load(n);
    setTimeout(() => play(), 100);
  }, [index, queue, load, play]);

  const prev = useCallback(() => {
    const p = (index - 1 + queue.length) % queue.length;
    load(p);
    setTimeout(() => play(), 100);
  }, [index, queue, load, play]);

  const playTrack = useCallback((trackIndex) => {
    load(trackIndex);
    setTimeout(() => play(), 100);
  }, [load, play]);

  useEffect(() => {
    if (queue.length > 0) load(0);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    const onLoaded = () => setState(s => ({ ...s, duration: a.duration || 0 }));
    const onTime = () => setState(s => ({ ...s, current: a.currentTime }));
    const onEnd = () => next();
    
    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    
    return () => {
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
    };
  }, [next]);

  const currentTrack = queue[index] || null;

  return {
    audioRef,
    queue,
    setQueue,
    index,
    state,
    currentTrack,
    load,
    play,
    pause,
    seek,
    setVolume,
    next,
    prev,
    playTrack
  };
};
