// conditionalNode.js
// New custom node for conditional logic

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
    const config = {
        title: 'Conditional',
        className: 'conditional-node',
        fields: [
            {
                name: 'condition',
                label: 'Condition',
                type: 'text',
                defaultValue: '',
                placeholder: 'value > 10'
            }
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input`
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-true`,
                style: { top: '33%' }
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-false`,
                style: { top: '66%' }
            }
        ]
    };

    return <BaseNode id={id} data={data} config={config} />;
};
