// llmNode.js
// Refactored to use BaseNode abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    className: 'llm-node',
    fields: [
      {
        name: 'modelName',
        label: 'Model',
        type: 'select',
        defaultValue: 'GPT-4',
        options: [
          { value: 'GPT-4', label: 'GPT-4' },
          { value: 'GPT-3.5', label: 'GPT-3.5' },
          { value: 'Claude', label: 'Claude' },
          { value: 'Llama', label: 'Llama' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: '33%' }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
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
