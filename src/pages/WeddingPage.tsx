import { useState, useEffect, useMemo } from 'react';
import { useWedding } from '../hooks/useWedding';
import { useMusic } from '../hooks/useMusic';
import Opening from '../components/Opening/Opening';
import Hero from '../components/Hero/Hero';
import Story from '../sections/Story/Story';
import Gallery from '../sections/Gallery/Gallery';
import AnimeTransition from '../sections/Anime/AnimeTransition';
import VideoSection from '../sections/Video/VideoSection';
import WeddingDetails from '../sections/WeddingDetails/WeddingDetails';
import Countdown from '../components/Countdown/Countdown';
import Locations from '../components/Locations/Locations';
import Finale from '../sections/Finale/Finale';

export default function WeddingPage() {
  const [showOpening, setShowOpening] = useState(true);
  
  // Get wedding data
  const { data } = useWedding('pham-hoa-tuan-anh');
  
  // Music hook - ALWAYS use fallback path to ensure audio loads
  const musicUrl = '/audio/audio_doanket.mp3';
  
  const { play, pause, isReady, error: audioError } = useMusic(musicUrl);
  
  // More debug info
  console.log('🎵 Audio ready:', isReady);
  console.log('🎵 Audio error:', audioError);

  // Get photos by section
  const storyPhotos = useMemo(
    () => data.photos.filter((p) => p.section === 'story'),
    [data.photos]
  );

  const galleryPhotos = useMemo(
    () => data.photos.filter((p) => p.section === 'gallery'),
    [data.photos]
  );

  const animePhotos = useMemo(
    () => data.photos.filter((p) => p.section === 'anime'),
    [data.photos]
  );

  const finalePhotos = useMemo(
    () => data.photos.filter((p) => p.section === 'finale'),
    [data.photos]
  );

  // Get hero image (first opening photo or first story photo)
  const heroImage = useMemo(() => {
    const openingPhotos = data.photos.filter((p) => p.section === 'opening');
    return openingPhotos[0]?.image_url || storyPhotos[0]?.image_url || '/wedding-img/anh1.jpg';
  }, [data.photos, storyPhotos]);

  const handleOpenInvitation = () => {
    console.log('🎬 Opening invitation...');
    
    // Play music immediately (browser requires user interaction)
    console.log('🎵 Attempting to play music...');
    play().catch(err => {
      console.error('❌ Music play failed:', err);
      // Retry after a short delay if failed
      setTimeout(() => {
        play().catch(e => console.error('❌ Retry failed:', e));
      }, 500);
    });

    // Hide opening after transition
    setTimeout(() => {
      setShowOpening(false);
    }, 1500);
  };

  // Fade out music (for finale)
  const handleMusicFadeOut = () => {
    // Gradually reduce volume then pause
    // Note: Since we need volume = 1, we'll just pause
    setTimeout(() => {
      pause();
    }, 2000);
  };

  // Prevent scroll when opening is shown
  useEffect(() => {
    if (showOpening) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showOpening]);

  return (
    <>
      {/* Opening screen */}
      {showOpening && (
        <Opening
          groomName={data.wedding.groom_name}
          brideName={data.wedding.bride_name}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Music player - removed as per requirements */}

      {/* Main content - only render after opening */}
      {!showOpening && (
        <div className="min-h-screen bg-black">
          {/* Hero section */}
          <Hero
            groomName={data.wedding.groom_name}
            brideName={data.wedding.bride_name}
            ceremonyDate={data.wedding.ceremony_date_solar}
            ceremonyTime={data.wedding.ceremony_time}
            heroImageUrl={heroImage}
          />

          {/* Story section */}
          <Story photos={storyPhotos} storyText={data.wedding.story_text} />

          {/* Gallery section */}
          <Gallery photos={galleryPhotos} />

          {/* Anime transition */}
          <AnimeTransition photos={animePhotos} />

          {/* Video section */}
          <VideoSection videos={data.videos} />

          {/* Wedding Details */}
          <WeddingDetails wedding={data.wedding} />

          {/* Countdown */}
          <Countdown
            targetDate={data.wedding.party_date}
            targetTime={data.wedding.party_time}
          />

          {/* Locations */}
          <Locations locations={data.locations} />

          {/* Finale */}
          <Finale
            photos={finalePhotos}
            wedding={data.wedding}
            onMusicFadeOut={handleMusicFadeOut}
          />
        </div>
      )}
    </>
  );
}
