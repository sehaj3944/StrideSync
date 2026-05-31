import { useEffect, useState } from 'react';

export default function GlowCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports hover (is desktop)
    const mediaQuery = window.matchMedia('(hover: hover)');
    setIsMobile(!mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, visible]);

  if (isMobile || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.06)_0%,rgba(0,255,209,0.01)_50%,transparent_100%)] blur-2xl transition-transform duration-300 ease-out md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  );
}
