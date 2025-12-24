# VectorShift Pipeline Builder

A visual pipeline builder for creating and validating data processing workflows.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+

### Installation & Running

**1. Start Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Backend runs on: http://127.0.0.1:8000

**2. Start Frontend:**
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## 📖 Documentation

- **[User Manual](USER_MANUAL.md)** - Complete guide on how to use the application
- **[User Guide (Hindi)](brain/user_guide_hindi.md)** - Hindi language guide

## ✨ Features

### Part 1: Node Abstraction
- Reusable BaseNode component
- 9 different node types
- Easy to create new nodes

### Part 2: Modern UI
- Dark theme with gradients
- Left sidebar layout
- Responsive design
- Smooth animations

### Part 3: Enhanced Text Node
- Auto-resizing textarea
- Variable detection with `{{ variableName }}`
- Dynamic handle creation

### Part 4: Backend Integration
- Pipeline validation
- DAG (Directed Acyclic Graph) detection
- Real-time analysis

## 🎯 Available Nodes

### Core Nodes
- **Input** - Pipeline starting point
- **Output** - Pipeline ending point
- **LLM** - Language model processing
- **Text** - Text with variables

### Custom Nodes
- **API** - HTTP requests
- **Database** - Database queries
- **Transform** - Data transformation
- **Conditional** - If/else logic
- **Loop** - Iteration

## 🔧 How to Use

1. **Add Nodes:** Drag from left sidebar to canvas
2. **Configure:** Edit node fields
3. **Connect:** Drag from right handle to left handle
4. **Submit:** Click submit button to validate
5. **Results:** See pipeline analysis in alert

## 📊 Pipeline Validation

When you submit, the backend analyzes:
- **Number of Nodes** - Total nodes in pipeline
- **Number of Edges** - Total connections
- **Is DAG** - Whether pipeline is valid (no cycles)

## 🎨 UI Layout

```
┌─────────────┬──────────────────────────┐
│             │                          │
│   Sidebar   │        Canvas            │
│             │                          │
│   Nodes     │    Build Pipeline        │
│             │        Here              │
│   Submit    │                          │
│             │                          │
└─────────────┴──────────────────────────┘
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Flow 11
- Zustand (state management)

**Backend:**
- FastAPI
- Python 3.8+
- Pydantic

## 📝 Example Pipeline

```
Input → Text ("Hello {{ name }}") → Output
```

This creates a pipeline with:
- 3 nodes
- 2 edges
- Valid DAG

## 🆘 Troubleshooting

**Backend not running?**
```bash
cd backend
python -m uvicorn main:app --reload
```

**Frontend not loading?**
```bash
cd frontend
npm start
```

## 📄 License

This is a technical assessment project for VectorShift.

## 🎉 Credits

Built as part of VectorShift Frontend Technical Assessment.
