import React, {useEffect} from 'react';

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isVisible, onClose, children }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [onClose]);


  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };



  if (!isVisible) return null;

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="overlay-div">
        <button className="close-button" onClick={onClose}>
            <span className="material-symbols-outlined">
                close
            </span>
        </button>
        <div className="overlay-content-inner">
        {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;