// databaseNode.js
// New custom node for database operations

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
    const config = {
        title: 'Database',
        className: 'database-node',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: 'SELECT',
                options: [
                    { value: 'SELECT', label: 'SELECT' },
                    { value: 'INSERT', label: 'INSERT' },
                    { value: 'UPDATE', label: 'UPDATE' },
                    { value: 'DELETE', label: 'DELETE' }
                ]
            },
            {
                name: 'query',
                label: 'Query',
                type: 'textarea',
                defaultValue: '',
                placeholder: 'SELECT * FROM table',
                rows: 2
            }
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-params`
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-result`
            }
        ]
    };

    return <BaseNode id={id} data={data} config={config} />;
};
