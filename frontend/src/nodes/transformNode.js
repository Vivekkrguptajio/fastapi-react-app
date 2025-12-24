// transformNode.js
// New custom node for data transformation

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const config = {
        title: 'Transform',
        className: 'transform-node',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: 'map',
                options: [
                    { value: 'map', label: 'Map' },
                    { value: 'filter', label: 'Filter' },
                    { value: 'reduce', label: 'Reduce' },
                    { value: 'sort', label: 'Sort' }
                ]
            },
            {
                name: 'expression',
                label: 'Expression',
                type: 'text',
                defaultValue: '',
                placeholder: 'x => x * 2'
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
                id: `${id}-output`
            }
        ]
    };

    return <BaseNode id={id} data={data} config={config} />;
};
