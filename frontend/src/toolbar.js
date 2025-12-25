// toolbar.js
// Styled toolbar with all node types

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './toolbar.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    addNode: state.addNode,
    getNodeID: state.getNodeID,
    restorePipeline: state.restorePipeline,
    layoutNodes: state.layoutNodes,
});

export const PipelineToolbar = ({ onNodeDragStart, onNodeDragEnd }) => {
    const { nodes, edges, addNode, getNodeID, restorePipeline, layoutNodes } = useStore(selector, shallow);

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

    const handleSavePipeline = () => {
        const pipelineData = { nodes, edges };
        const blob = new Blob([JSON.stringify(pipelineData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'pipeline.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleLoadPipeline = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const pipelineData = JSON.parse(e.target.result);
                if (pipelineData.nodes && pipelineData.edges) {
                    restorePipeline(pipelineData.nodes, pipelineData.edges);
                } else {
                    alert('Invalid pipeline file');
                }
            } catch (error) {
                console.error('Error parsing pipeline file:', error);
                alert('Error loading pipeline file');
            }
        };
        reader.readAsText(file);

        // Reset input so same file can be selected again
        event.target.value = '';
    };

    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <h2 className="toolbar-title">Pipeline Builder</h2>
                <p className="toolbar-subtitle">Drag nodes to the canvas</p>

                {/* Visual Controls */}
                <div className="toolbar-buttons">
                    <button className="toolbar-btn" onClick={() => layoutNodes('TB')}>Auto Layout</button>
                    <button className="toolbar-btn" onClick={() => useStore.temporal.getState().undo()}>Undo</button>
                    <button className="toolbar-btn" onClick={() => useStore.temporal.getState().redo()}>Redo</button>
                </div>

                {/* File Controls */}
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button className="toolbar-btn" onClick={handleSavePipeline}>Save JSON</button>
                    <label className="toolbar-btn" style={{ textAlign: 'center' }}>
                        Load JSON
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleLoadPipeline}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
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
