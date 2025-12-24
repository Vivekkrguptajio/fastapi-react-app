// BaseNode.js
// Reusable base component for creating custom nodes

import { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

export const BaseNode = ({ id, data, config }) => {
    const { deleteElements } = useReactFlow();

    const {
        title,
        fields = [],
        handles = [],
        dynamicHandles = [],
        className = '',
        style = {}
    } = config;

    // Initialize state for all fields
    const [fieldValues, setFieldValues] = useState(() => {
        const initialValues = {};
        fields.forEach(field => {
            initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
        });
        return initialValues;
    });

    const [isLocked, setIsLocked] = useState(false);

    const handleFieldChange = (fieldName, value) => {
        if (isLocked) return; // Don't allow changes if locked
        setFieldValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
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

    const renderField = (field) => {
        const { name, label, type, options, placeholder, rows } = field;
        const value = fieldValues[name];

        switch (type) {
            case 'text':
                return (
                    <label key={name} className="node-field">
                        {label}:
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleFieldChange(name, e.target.value)}
                            placeholder={placeholder}
                            disabled={isLocked}
                            className="nodrag"
                        />
                    </label>
                );

            case 'select':
                return (
                    <label key={name} className="node-field">
                        {label}:
                        <select
                            value={value}
                            onChange={(e) => handleFieldChange(name, e.target.value)}
                            disabled={isLocked}
                            className="nodrag"
                        >
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </label>
                );

            case 'textarea':
                return (
                    <label key={name} className="node-field">
                        {label}:
                        <textarea
                            value={value}
                            onChange={(e) => handleFieldChange(name, e.target.value)}
                            placeholder={placeholder}
                            rows={rows || 3}
                            disabled={isLocked}
                            className="nodrag"
                        />
                    </label>
                );

            default:
                return null;
        }
    };

    const renderHandle = (handle, index) => {
        const {
            type,
            position,
            id: handleId,
            style: handleStyle = {}
        } = handle;

        return (
            <Handle
                key={`${type}-${position}-${index}`}
                type={type}
                position={position}
                id={handleId || `${id}-${type}-${index}`}
                style={handleStyle}
            />
        );
    };

    const defaultStyle = {
        minWidth: 200,
        minHeight: 80,
        ...style
    };

    return (
        <div className={`base-node ${className}`} style={defaultStyle}>
            {/* Render all handles */}
            {handles.map((handle, index) => renderHandle(handle, index))}
            {dynamicHandles.map((handle, index) => renderHandle(handle, index + handles.length))}

            {/* Node header with delete and lock buttons */}
            <div className="node-header">
                <span className="node-title">{title}</span>
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

            {/* Node fields */}
            <div className="node-content">
                {fields.map(field => renderField(field))}
            </div>
        </div>
    );
};
