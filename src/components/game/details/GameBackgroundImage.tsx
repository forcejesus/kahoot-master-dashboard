
import { Kahoot } from "@/types/game-details";

interface GameBackgroundImageProps {
  jeu: Kahoot;
}

export function GameBackgroundImage({ jeu }: GameBackgroundImageProps) {
  return (
    <div className="absolute inset-0 h-[400px] overflow-hidden">
      {jeu.image ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ 
              backgroundImage: `url(http://kahoot.nos-apps.com/${jeu.image})`,
              filter: 'blur(2px)',
              transform: 'scale(1.1)' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50 z-1" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-50" />
      )}
    </div>
  );
}
