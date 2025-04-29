import { AnimatedText } from './AnimatedText';

export function Home() {
  return (
    <div className=" bg-black flex flex-col">
      <AnimatedText />
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]">
        <a 
          href="https://minyfy.minyvinyl.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-amber-400 hover:text-amber-300 transition-colors text-base md:text-lg"
        >
          Claim a MINY
        </a>
      </footer>
    </div>
  );
}