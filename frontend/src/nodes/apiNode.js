// apiNode.js
// New custom node for API requests

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
    const config = {
        title: 'API',
        className: 'api-node',
        fields: [
            {
                name: 'method',
                label: 'Method',
                type: 'select',
                defaultValue: 'GET',
                options: [
                    { value: 'GET', label: 'GET' },
                    { value: 'POST', label: 'POST' },
                    { value: 'PUT', label: 'PUT' },
                    { value: 'DELETE', label: 'DELETE' }
                ]
            },
            {
                name: 'url',
                label: 'URL',
                type: 'text',
                defaultValue: '',
                placeholder: 'https://api.example.com/endpoint'
            }
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-body`,
                style: { top: '33%' }
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-headers`,
                style: { top: '66%' }
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-response`
            }
        ]
    };

    return <BaseNode id={id} data={data} config={config} />;
};
