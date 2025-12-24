// outputNode.js
// Refactored to use BaseNode abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    className: 'output-node',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-value`
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
