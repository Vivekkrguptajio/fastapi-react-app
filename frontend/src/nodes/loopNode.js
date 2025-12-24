// loopNode.js
// New custom node for iteration

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LoopNode = ({ id, data }) => {
    const config = {
        title: 'Loop',
        className: 'loop-node',
        fields: [
            {
                name: 'loopType',
                label: 'Type',
                type: 'select',
                defaultValue: 'forEach',
                options: [
                    { value: 'forEach', label: 'For Each' },
                    { value: 'while', label: 'While' },
                    { value: 'until', label: 'Until' }
                ]
            },
            {
                name: 'maxIterations',
                label: 'Max Iterations',
                type: 'text',
                defaultValue: '100',
                placeholder: '100'
            }
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-array`,
                style: { top: '33%' }
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-body`,
                style: { top: '66%' }
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-output`
            }
        ]
    };

    return <BaseNode id={id} data={data} config={config} />;
};
