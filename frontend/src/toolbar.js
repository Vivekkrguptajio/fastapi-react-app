// toolbar.js
// Styled toolbar with all node types

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './toolbar.css';

const selector = (state) => ({
    addNode: state.addNode,
    getNodeID: state.getNodeID,
});

export const PipelineToolbar = ({ onNodeDragStart, onNodeDragEnd }) => {
    const { addNode, getNodeID } = useStore(selector, shallow);

    const handleNodeClick = (type) => {
        // Create new node data
        const nodeID = getNodeID(type);
        const newNode = {
            id: nodeID,
            type,
            position: {
                x: window.innerWidth / 2 - 100 + (Math.random() * 50), // Random offset to prevent overlap
                y: window.innerHeight / 2 - 50 + (Math.random() * 50)
            },
            data: { id: nodeID, nodeType: `${type}` },
        };

        addNode(newNode);

        // On mobile, hide sidebar so user can see the new node
        if (window.innerWidth <= 768 && onNodeDragStart) {
            onNodeDragStart(); // Re-use this handler to hide sidebar
        }
    };

    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <h2 className="toolbar-title">Pipeline Builder</h2>
                <p className="toolbar-subtitle">Drag nodes to the canvas</p>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Core Nodes</h3>
                <div className="nodes-grid">
                    <DraggableNode type='customInput' label='Input' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='customOutput' label='Output' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='llm' label='LLM' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='text' label='Text' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                </div>
            </div>

            <div className="toolbar-section">
                <h3 className="section-title">Custom Nodes</h3>
                <div className="nodes-grid">
                    <DraggableNode type='api' label='API' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='database' label='Database' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='transform' label='Transform' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='conditional' label='Conditional' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                    <DraggableNode type='loop' label='Loop' onDragStart={onNodeDragStart} onDragEnd={onNodeDragEnd} onClick={handleNodeClick} />
                </div>
            </div>
        </div>
    );
};
