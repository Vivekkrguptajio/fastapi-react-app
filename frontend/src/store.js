// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';
import dagre from 'dagre';
import { temporal } from 'zundo';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 80;

export const useStore = create(temporal((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set((state) => {
      // 1. Add the new edge temporarily
      const newEdge = { ...connection, type: 'default', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } };
      const nextEdges = addEdge(newEdge, state.edges);

      // 2. Perform Cycle Detection
      const nodes = state.nodes;
      const edges = nextEdges;

      // Build Graph Adjacency List
      const adj = {};
      nodes.forEach(node => { adj[node.id] = []; });
      edges.forEach(edge => {
        if (adj[edge.source]) {
          adj[edge.source].push(edge.target);
        }
      });

      // DFS to find cycles
      const visited = new Set();
      const recStack = new Set();
      const cyclicNodes = new Set(); // Stores IDs of nodes involved in cycles

      const isCyclic = (nodeId, stack = []) => {
        visited.add(nodeId);
        recStack.add(nodeId);
        stack.push(nodeId);

        const neighbors = adj[nodeId] || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            if (isCyclic(neighbor, stack)) return true;
          } else if (recStack.has(neighbor)) {
            // Cycle detected!
            // Mark all nodes in the current stack segment [neighbor...nodeId] as cyclic
            let inCycle = false;
            for (const n of stack) {
              if (n === neighbor) inCycle = true;
              if (inCycle) cyclicNodes.add(n);
            }
            return true;
          }
        }

        recStack.delete(nodeId);
        stack.pop();
        return false;
      };

      nodes.forEach(node => {
        if (!visited.has(node.id)) {
          isCyclic(node.id);
        }
      });

      // 3. Update styling based on cycles
      const finalEdges = nextEdges.map(edge => {
        // If both source and target are part of a cycle, this edge MIGHT be part of it.
        // This is a rough heuristic. For perfect edge detection, we need to track specific edges in DFS.
        // Simplified implementation: cyclicNodes contains nodes in cycles.
        // If source and target are BOTH in cyclicNodes, we mark it red.
        // This might mark chords in the cycle as red too, which is acceptable for "danger" indication.
        const isCyclicEdge = cyclicNodes.has(edge.source) && cyclicNodes.has(edge.target);

        return {
          ...edge,
          style: {
            stroke: isCyclicEdge ? '#ef4444' : '#555', // Red if cyclic, dark grey otherwise
            strokeWidth: isCyclicEdge ? 3 : 2,
          },
          markerEnd: {
            type: MarkerType.Arrow,
            color: isCyclicEdge ? '#ef4444' : '#555',
            height: '20px',
            width: '20px'
          },
        };
      });

      return { edges: finalEdges };
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  restorePipeline: (nodes, edges) => {
    set({ nodes, edges });
  },
  layoutNodes: (direction = 'TB') => {
    const { nodes, edges } = get();
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = direction === 'LR' ? 'left' : 'top';
      node.sourcePosition = direction === 'LR' ? 'right' : 'bottom';

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    set({ nodes: layoutedNodes });
  },
})));
