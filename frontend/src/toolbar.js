// toolbar.js
// Styled toolbar with all node types

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <h2 className="toolbar-title">Pipeline Builder</h2>
                <p className="toolbar-subtitle">Drag nodes to the canvas</p>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Core Nodes</h3>
                <div className="nodes-grid">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='text' label='Text' />
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Custom Nodes</h3>
                <div className="nodes-grid">
                    <DraggableNode type='api' label='API' />
                    <DraggableNode type='database' label='Database' />
                    <DraggableNode type='transform' label='Transform' />
                    <DraggableNode type='conditional' label='Conditional' />
                    <DraggableNode type='loop' label='Loop' />
                </div>
            </div>
        </div>
    );
};
