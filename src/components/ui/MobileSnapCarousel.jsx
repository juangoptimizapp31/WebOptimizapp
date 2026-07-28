import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export const MobileSnapCarousel = ({
  children,
  ariaLabel = 'Carrusel',
  showArrows = true,
  showDots = true,
  className = '',
  cardClassName = '',
  trackClassName = '',
  activeIndex,
  onActiveIndexChange
}) => {
  const trackRef = useRef(null);
  const [internalActive, setInternalActive] = useState(0);
  
  const active = activeIndex !== undefined ? activeIndex : internalActive;
  const count = React.Children.count(children);

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackLeft = track.getBoundingClientRect().left;

    const cardsNodes = Array.from(track.children);
    let closestIndex = 0;
    let minDistance = Infinity;

    cardsNodes.forEach((node, index) => {
      // Find distance of node left edge to track left edge
      const nodeLeft = node.getBoundingClientRect().left;
      const distance = Math.abs(nodeLeft - trackLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== active) {
      if (onActiveIndexChange) {
        onActiveIndexChange(closestIndex);
      } else {
        setInternalActive(closestIndex);
      }
    }
  }, [active, onActiveIndexChange]);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      let frameId;
      let isThrottled = false;
      const onScroll = () => {
        if (!isThrottled) {
          frameId = window.requestAnimationFrame(() => {
            handleScroll();
            isThrottled = false;
          });
          isThrottled = true;
        }
      };
      track.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        track.removeEventListener('scroll', onScroll);
        if (frameId) window.cancelAnimationFrame(frameId);
      };
    }
  }, [handleScroll]);

  // PRIMERA TARJETA SIEMPRE COMPLETA
  useEffect(() => {
    let frameId;
    frameId = requestAnimationFrame(() => {
      if (trackRef.current) {
        trackRef.current.scrollLeft = 0;
      }
    });
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []); // Run only once on mount

  const scrollToCard = (index, smooth = true) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cardsNodes = Array.from(track.children);
    if (cardsNodes[index]) {
      const node = cardsNodes[index];
      track.scrollTo({
        left: node.offsetLeft - track.offsetLeft,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  return (
    <div className={`relative w-full max-w-full overflow-visible box-border min-w-0 ${className}`} aria-label={ariaLabel}>
      <style dangerouslySetInnerHTML={{__html: `
        .mobile-snap-track {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          gap: 14px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          overscroll-behavior-x: contain;
          padding: 8px 20px 18px 0;
          margin: 0;
          box-sizing: border-box;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .mobile-snap-track::-webkit-scrollbar {
          display: none;
        }
        .mobile-snap-card {
          flex: 0 0 calc(100% - 34px);
          width: calc(100% - 34px);
          max-width: calc(100% - 34px);
          min-width: 0;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          box-sizing: border-box;
          position: relative;
          margin: 0;
          transform: none !important;
          left: 0;
        }
        .mobile-snap-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          width: 100%;
          margin-top: 14px;
          position: relative;
          z-index: 5;
        }
      `}} />
      <div 
        ref={trackRef}
        className={`mobile-snap-track ${trackClassName}`}
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className={`mobile-snap-card ${cardClassName}`}>
            {child}
          </div>
        ))}
      </div>

      {(showArrows || showDots) && (
        <div className="mobile-snap-controls">
          {showArrows && (
            <button
              onClick={() => scrollToCard(active - 1)}
              disabled={active === 0}
              aria-label="Tarjeta anterior"
              className="w-[44px] h-[44px] flex-shrink-0 rounded-full border border-[rgba(75,130,201,0.4)] bg-[#0b1f3b] text-[#66b7ff] flex items-center justify-center disabled:opacity-40 hover:bg-[#143564] hover:text-white transition-all disabled:cursor-not-allowed z-10 relative"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {showDots && (
            <div className="flex gap-[8px] shrink-0" role="tablist">
              {Array.from({ length: count }).map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === active}
                  aria-label={`Ir a tarjeta ${idx + 1}`}
                  onClick={() => scrollToCard(idx)}
                  className={`transition-all duration-300 ${
                    idx === active 
                      ? 'w-[24px] h-[8px] rounded-[4px] bg-[#2e8cff] shadow-[0_0_8px_rgba(46,140,255,0.6)]' 
                      : 'w-[8px] h-[8px] rounded-full bg-[#476288] hover:bg-[#66b7ff]'
                  }`}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button
              onClick={() => scrollToCard(active + 1)}
              disabled={active === count - 1}
              aria-label="Tarjeta siguiente"
              className="w-[44px] h-[44px] flex-shrink-0 rounded-full border border-[rgba(75,130,201,0.4)] bg-[#0b1f3b] text-[#66b7ff] flex items-center justify-center disabled:opacity-40 hover:bg-[#143564] hover:text-white transition-all disabled:cursor-not-allowed z-10 relative"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
