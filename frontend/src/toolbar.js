// toolbar.js
// Styled toolbar with all node types

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = ({ onNodeDragStart, onNodeDragEnd }) => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <h2 className="toolbar-title">Pipeline Builder</h2>
                <p className="toolbar-subtitle">Drag nodes to the canvas</p>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Core Nodes</h3>
                <div className="nodes-grid">
                    <DraggableNode type='customInput' label='Input' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='customOutput' label='Output' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='llm' label='LLM' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='text' label='Text' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Custom Nodes</h3>
                <div className="nodes-grid">
                    <DraggableNode type='api' label='API' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='database' label='Database' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='transform' label='Transform' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='conditional' label='Conditional' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                    <DraggableNode type='loop' label='Loop' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} />
                </div>
            </div>
        </div>
    );
};
