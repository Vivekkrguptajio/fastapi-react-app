// textNode.js
// Enhanced with dynamic sizing and variable detection

import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useReactFlow, useUpdateNodeInternals } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const { deleteElements } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{ variableName }})
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }

    // Only update if variables actually changed to avoid unnecessary re-renders
    const isDifferent =
      matches.length !== variables.length ||
      matches.some((v, i) => v !== variables[i]);

    if (isDifferent) {
      setVariables(matches);
    }
  }, [currText, variables]);

  // Update node internals when variables change or text changes (resizing)
  useEffect(() => {
    // Use setTimeout to skip a frame and wait for CSS/DOM layout updates
    const timer = setTimeout(() => {
      updateNodeInternals(id);
    }, 0);
    return () => clearTimeout(timer);
  }, [variables, currText, id, updateNodeInternals]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleTextChange = (e) => {
    if (isLocked) return; // Don't allow changes if locked
    setCurrText(e.target.value);
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    if (isLocked) {
      alert('Node is locked! Unlock it first to delete.');
      return;
    }
    deleteElements({ nodes: [{ id }] });
  };

  const handleLockToggle = (evt) => {
    evt.stopPropagation();
    setIsLocked(!isLocked);
  };

  return (
    <div className="base-node text-node" style={{
      minWidth: 200,
      width: 'auto',
      minHeight: 100,
      height: 'auto'
    }}>
      {/* Dynamic handles for variables */}
      {variables.map((varName, index) => (
        <Handle
          key={`var-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            background: '#6366f1'
          }}
        />
      ))}

      {/* Node header with delete and lock buttons */}
      <div className="node-header">
        <span className="node-title">Text</span>
        <div className="node-buttons">
          <button
            className={`node-lock-btn nodrag ${isLocked ? 'locked' : ''}`}
            onClick={handleLockToggle}
            title={isLocked ? "Unlock node" : "Lock node"}
          >
            {isLocked ? '🔒' : '🔓'}
          </button>
          <button
            className="node-delete-btn nodrag"
            onClick={handleDelete}
            title="Delete node"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Node content */}
      <div className="node-content">
        <div className="node-field">
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Type specific text or use {{variable}}..."
            className="nodrag text-node-active"
            rows={1}
            disabled={isLocked}
            style={{
              minHeight: '60px',
              resize: 'none',
              overflow: 'hidden',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.5'
            }}
          />
        </div>
        {variables.length > 0 && (
          <div className="variables-container">
            {variables.map(v => (
              <span key={v} className="variable-badge">{v}</span>
            ))}
          </div>
        )}
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
