import { useState, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile, start with toolbar hidden to show canvas
      if (mobile && isToolbarVisible) {
        setIsToolbarVisible(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  const handleNodeDragStart = () => {
    if (isMobile) {
      setTimeout(() => {
        setIsToolbarVisible(false);
      }, 0);
    }
  };

  const handleNodeDragEnd = () => {
    if (isMobile) {
      setTimeout(() => {
        setIsToolbarVisible(true);
      }, 0);
    }
  };

  return (
    <div className={`app-container ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Left Sidebar */}
      <div className={`left-sidebar ${isToolbarVisible ? 'visible' : 'hidden'}`}>
        <PipelineToolbar
          onNodeDragStart={handleNodeDragStart}
          onNodeDragEnd={handleNodeDragEnd}
        />
        <SubmitButton />
      </div>

      {/* Right Canvas */}
      <div className="right-canvas">
        <PipelineUI />
      </div>

      {/* Mobile Toggle Button (FAB) */}
      {isMobile && (
        <button
          className="toolbar-toggle-fab"
          onClick={toggleToolbar}
          aria-label={isToolbarVisible ? 'Hide toolbar' : 'Show toolbar'}
        >
          {isToolbarVisible ? '✕' : '☰'}
        </button>
      )}
    </div>
  );
}

export default App;
