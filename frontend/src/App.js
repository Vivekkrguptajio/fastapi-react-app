import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <PipelineToolbar />
        <SubmitButton />
      </div>

      {/* Right Canvas */}
      <div className="right-canvas">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
