import { useState, useEffect, useRef, useCallback } from 'react';

export function useMusic(musicUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const urlRef = useRef<string | undefined>(musicUrl);

  // Update URL ref when it changes
  useEffect(() => {
    urlRef.current = musicUrl;
  }, [musicUrl]);

  // DON'T create audio until play() is called (requires user interaction)
  const createAudio = useCallback(() => {
    if (audioRef.current || !urlRef.current) return audioRef.current;

    console.log('🎵 Creating audio instance (on user interaction):', urlRef.current);
    
    const audio = document.createElement('audio');
    audio.volume = 1;
    audio.loop = true;
    audio.preload = 'auto';
    audio.src = urlRef.current;
    
    console.log('🎵 Audio src set to:', audio.src);
    console.log('🎵 Can play audio/mpeg:', audio.canPlayType('audio/mpeg'));

    audio.addEventListener('loadstart', () => {
      console.log('🎵 Load started');
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('✅ Audio ready to play');
      setIsReady(true);
      setAudioError(null);
    });

    audio.addEventListener('loadeddata', () => {
      console.log('✅ Audio data loaded');
    });

    audio.addEventListener('loadedmetadata', () => {
      console.log('✅ Audio metadata loaded, duration:', audio.duration);
    });

    audio.addEventListener('error', (e) => {
      console.error('❌ Audio error:', e);
      console.error('Audio src:', audio.src);
      console.error('Audio error code:', audio.error?.code);
      console.error('Audio error message:', audio.error?.message);
      console.error('Audio network state:', audio.networkState);
      console.error('Audio ready state:', audio.readyState);
      
      let errorMsg = 'Unknown error';
      if (audio.error) {
        switch(audio.error.code) {
          case 1: errorMsg = 'Loading aborted'; break;
          case 2: errorMsg = 'Network error'; break;
          case 3: errorMsg = 'Decoding error - file may be corrupted'; break;
          case 4: errorMsg = 'Source not supported - codec issue'; break;
        }
      }
      
      setAudioError(errorMsg);
      setIsReady(false);
    });

    audio.addEventListener('playing', () => {
      console.log('✅ Audio is playing');
      setIsPlaying(true);
    });

    audio.addEventListener('pause', () => {
      console.log('⏸️ Audio paused');
      setIsPlaying(false);
    });

    try {
      audio.load();
      console.log('🎵 Audio load() called');
    } catch (err) {
      console.error('❌ Error calling load():', err);
    }

    audioRef.current = audio;
    return audio;
  }, []);

  const play = useCallback(async () => {
    // Create audio on first play (requires user interaction)
    const audio = createAudio();
    
    if (!audio) {
      console.error('❌ Failed to create audio');
      return Promise.reject('Failed to create audio');
    }

    try {
      console.log('🎵 Attempting to play audio...');
      console.log('Audio ready state:', audio.readyState);
      console.log('Audio src:', audio.src);
      
      // Wait a bit if not ready
      if (audio.readyState < 2) {
        console.log('⏳ Waiting for audio to be ready...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      await audio.play();
      console.log('✅ Audio playing successfully');
      setIsPlaying(true);
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Error playing audio:', error);
      return Promise.reject(error);
    }
  }, [createAudio]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    console.log('⏸️ Pausing audio');
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        console.log('🧹 Cleaning up audio on unmount');
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  return {
    play,
    pause,
    toggle,
    isPlaying,
    isReady,
    error: audioError,
  };
}
