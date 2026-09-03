import { useState, useEffect, useRef, useCallback } from 'react';

export function useMusic(musicUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    // Validate music URL first
    if (!musicUrl || musicUrl.trim() === '') {
      console.error('❌ No music URL provided or empty URL');
      setAudioError('No music URL provided');
      return;
    }

    // Only create audio instance once and when we have a valid URL
    if (!audioRef.current) {
      console.log('🎵 Creating audio instance with URL:', musicUrl);
      
      const audio = new Audio();
      audio.volume = 1; // Maximum volume as per requirements
      audio.loop = true;
      audio.preload = 'auto';
      
      // Log full URL for debugging
      const fullUrl = musicUrl.startsWith('http') ? musicUrl : window.location.origin + musicUrl;
      console.log('🎵 Full audio URL:', fullUrl);
      
      audio.src = musicUrl;
      console.log('🎵 Audio src set to:', audio.src);

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
        
        // Error codes:
        // 1 = MEDIA_ERR_ABORTED - The user canceled the audio
        // 2 = MEDIA_ERR_NETWORK - A network error occurred
        // 3 = MEDIA_ERR_DECODE - An error occurred while decoding
        // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED - Audio not supported or src empty
        
        let errorMsg = 'Unknown error';
        if (audio.error) {
          switch(audio.error.code) {
            case 1: errorMsg = 'Loading aborted'; break;
            case 2: errorMsg = 'Network error'; break;
            case 3: errorMsg = 'Decoding error'; break;
            case 4: errorMsg = 'Source not supported or empty'; break;
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

      // Try to load the audio
      console.log('🎵 Calling audio.load()...');
      audio.load();

      audioRef.current = audio;
      console.log('🎵 Audio instance created and stored in ref');
    }

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        console.log('🧹 Cleaning up audio');
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [musicUrl]);

  const play = useCallback(async () => {
    if (!audioRef.current) {
      console.error('❌ Audio ref not available');
      return Promise.reject('Audio ref not available');
    }

    try {
      console.log('🎵 Attempting to play audio...');
      console.log('Audio ready state:', audioRef.current.readyState);
      console.log('Audio src:', audioRef.current.src);
      
      // If not ready, wait a bit
      if (!isReady && audioRef.current.readyState < 3) {
        console.log('⏳ Waiting for audio to be ready...');
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      await audioRef.current.play();
      console.log('✅ Audio playing successfully');
      setIsPlaying(true);
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Error playing audio:', error);
      return Promise.reject(error);
    }
  }, [isReady]);

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

  return {
    play,
    pause,
    toggle,
    isPlaying,
    isReady,
    error: audioError,
  };
}
