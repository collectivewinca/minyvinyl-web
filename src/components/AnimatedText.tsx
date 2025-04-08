import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const rotations = [
  { ry: 270, a: 0.5 },
  { ry: 0, a: 0.85 },
  { ry: 90, a: 0.4 },
  { ry: 180, a: 0.0 }
];

const NUM_CLONES = 19;

export function AnimatedText() {
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trayRef.current) return;

    // Set initial face positions
    gsap.set(".face", {
      z: 200,
      rotateY: (i) => rotations[i % rotations.length].ry,
      transformOrigin: "50% 50% -201px"
    });

    // Create animations for each die
    for (let i = 0; i < NUM_CLONES; i++) {
      const die = document.querySelectorAll('.die')[i];
      const cube = die.querySelector('.cube');
      if (!cube) continue;

      // Limit faces to match rotations array length
      const faces = Array.from(cube.querySelectorAll('.face')).slice(0, rotations.length);

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'power3.inOut', duration: 1 }
      })
        .fromTo(cube, {
          rotateY: -90
        }, {
          rotateY: 90,
          ease: 'power1.inOut',
          duration: 2
        })
        .fromTo(faces, {
          color: (j) => `hsl(${(i / NUM_CLONES * 75 + 130)}, 67%, ${100 * rotations[j % rotations.length].a}%)`
        }, {
          color: (j) => `hsl(${(i / NUM_CLONES * 75 + 130)}, 67%, ${100 * rotations[(j + 1) % rotations.length].a}%)`
        }, 0)
        .to(faces, {
          color: (j) => `hsl(${(i / NUM_CLONES * 75 + 130)}, 67%, ${100 * rotations[(j + 2) % rotations.length].a}%)`
        }, 1)
        .progress(i / NUM_CLONES);
    }

    // Create tray animations
    gsap.timeline()
      .from('.tray', { yPercent: -3, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: -1 }, 0)
      .fromTo('.tray', 
        { rotate: -15 },
        { rotate: 15, duration: 4, ease: 'power1.inOut', yoyo: true, repeat: -1 }, 0)
      .from('.die', { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: 'power1.in' } }, 0)
      .to('.tray', { scale: 1.2, duration: 2, ease: 'power3.inOut', yoyo: true, repeat: -1 }, 0);

    // Handle resize
    const handleResize = () => {
      const h = NUM_CLONES * 56;
      gsap.set('.tray', { height: h });
      gsap.set('.pov', { scale: window.innerHeight / h });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pov">
      <div className="tray" ref={trayRef}>
        {[...Array(NUM_CLONES)].map((_, index) => (
          <div key={index} className="die">
            <div className="cube">
              <div className="face text-[60px] tracking-tight">MINY</div>
              <div className="face text-[58px] tracking-tight">MIXTAPES</div>
              <div className="face text-[55px] tracking-tight">MUSIC</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}