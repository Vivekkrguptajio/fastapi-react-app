// inputNode.js
// Refactored to use BaseNode abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    className: 'input-node',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-value`
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
