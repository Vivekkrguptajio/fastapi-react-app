from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for frontend communication (local development only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse pipeline and return analysis:
    - Number of nodes
    - Number of edges
    - Whether it forms a DAG (Directed Acyclic Graph)
    """
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a DAG using DFS
    is_dag = check_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph forms a Directed Acyclic Graph (DAG)
    using depth-first search to detect cycles.
    """
    # Build adjacency list
    graph = {node['id']: [] for node in nodes}
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            graph[source].append(target)
    
    # Track visited nodes and recursion stack
    visited = set()
    rec_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        """DFS to detect cycle"""
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # Check all neighbors
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Found a back edge (cycle)
                return True
        
        rec_stack.remove(node_id)
        return False
    
    # Check each node
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if has_cycle(node_id):
                return False  # Cycle found, not a DAG
    
    return True  # No cycles, it's a DAG
