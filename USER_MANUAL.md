# VectorShift Pipeline Builder - User Manual

## 🚀 Getting Started

Open your browser and go to: **http://localhost:3000**

You'll see two main areas:
- **Left Sidebar:** All available nodes and submit button
- **Right Canvas:** Workspace to build your pipeline

---

## 📦 Available Nodes

### Core Nodes
1. **Input** 🟢 - Starting point of your pipeline
2. **Output** 🔴 - Ending point of your pipeline
3. **LLM** 🟣 - Language model processing
4. **Text** 🌸 - Text with variable support

### Custom Nodes
5. **API** 🟠 - Make HTTP requests
6. **Database** 🔵 - Run database queries
7. **Transform** 🟣 - Transform data
8. **Conditional** 🟡 - If/else branching
9. **Loop** 🟢 - Iterate over data

---

## 🎯 How to Build a Pipeline

### Step 1: Add Nodes

1. Find a node in the left sidebar
2. **Drag** it with your mouse
3. **Drop** it on the right canvas
4. The node appears on the canvas!

### Step 2: Configure Nodes

Click on any node to edit its fields:

- **Input Node:** Set name and type (Text/File)
- **Output Node:** Set name and type (Text/Image)
- **LLM Node:** Choose model (GPT-4, Claude, etc.)
- **Text Node:** Enter text with variables
- **API Node:** Set method and URL
- **Database Node:** Write your query
- **Transform Node:** Define transformation
- **Conditional Node:** Set condition
- **Loop Node:** Configure iteration

### Step 3: Connect Nodes

1. Click on a **circle (handle)** on the right side of a node
2. Drag to a **circle on the left side** of another node
3. Release to create a connection
4. You'll see an animated line connecting them!

**Connection Rules:**
- Right handles (source) → Left handles (target)
- Data flows from left to right

---

## ⭐ Special Feature: Text Node Variables

The Text node supports **dynamic variables**!

### How to Use:

1. Add a Text node to canvas
2. Type: `Hello {{ name }}, you are {{ age }} years old`
3. **Magic!** Two input handles appear automatically:
   - One for `name`
   - One for `age`

### Variable Syntax:
- Use double curly brackets: `{{ variableName }}`
- Valid names: letters, numbers, underscore
- Spaces allowed: `{{ my_variable }}`

### Example:
```
Text: "Welcome {{ user }}, your score is {{ score }}"
Result: Creates 2 input handles on the left
```

Now you can connect other nodes to these handles!

---

## 🔗 Example Pipelines

### Example 1: Simple Flow
```
Input → Text → Output
```

### Example 2: LLM Processing
```
Input → LLM → Output
```

### Example 3: Text with Variables
```
Input (name) ──┐
               ├─→ Text ("Hello {{ name }}, {{ age }}") → Output
Input (age) ───┘
```

### Example 4: Conditional Logic
```
Input → Conditional
         ├─ True → Output (success)
         └─ False → Output (error)
```

---

## 🚀 Submit Your Pipeline

### When your pipeline is ready:

1. Click the **Submit Pipeline** button at the bottom of sidebar
2. Button shows loading animation
3. Backend analyzes your pipeline
4. Alert shows results:

```
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Number of Nodes: 5
🔗 Number of Edges: 4
✅ Is DAG: Yes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### What is DAG?

**DAG = Directed Acyclic Graph**

- ✅ **Yes** = Valid pipeline, no circular loops
- ❌ **No** = Invalid pipeline, has circular dependency

---

## 🎨 Canvas Controls

### Zoom Controls (Bottom Right)
- ➕ **Plus** - Zoom in
- ➖ **Minus** - Zoom out
- 🔄 **Fit View** - See entire pipeline

### MiniMap (Bottom Right Corner)
- Small overview of your entire pipeline
- Helps navigate large pipelines
- Click to jump to different areas

### Mouse Controls
- **Drag canvas** - Move around
- **Scroll wheel** - Zoom in/out
- **Click node** - Select it
- **Delete key** - Remove selected node/edge

---

## 💡 Tips & Best Practices

### 1. Organize Your Pipeline
- Place Input nodes on the left
- Place Output nodes on the right
- Keep flow left-to-right

### 2. Use Variables Wisely
- Text node variables are powerful
- Combine multiple inputs into one text

### 3. Avoid Cycles
- Don't create circular connections
- Example: A → B → C → A ❌
- Keep it linear: A → B → C ✅

### 4. Color Coding
- Each node type has a unique color
- Easy to identify at a glance

---

## ❌ Common Mistakes

### 1. Circular Connections
```
❌ Wrong: A → B → C → A (creates cycle)
✅ Right: A → B → C
```

### 2. Wrong Handle Types
```
❌ Wrong: Output → Output (same type)
✅ Right: Output → Input
```

### 3. Variable Syntax Errors
```
❌ Wrong: {name} or {{name}}
✅ Right: {{ name }}
```

---

## 🆘 Troubleshooting

### Backend Error?
**Error:** "Failed to submit pipeline"

**Solution:** Make sure backend is running
```bash
cd backend
python -m uvicorn main:app --reload
```

### Frontend Not Loading?
**Solution:** Make sure frontend is running
```bash
cd frontend
npm start
```
Then open: http://localhost:3000

### Nodes Won't Connect?
**Solution:**
- Connect right handle → left handle
- Can't connect same type handles
- Make sure handles are compatible

---

## 🎯 Quick Start Tutorial

**Build your first pipeline in 2 minutes:**

1. Drag **Input** node to canvas
2. Drag **Text** node next to it
3. In Text node, type: `Hello {{ user }}`
4. Drag **Output** node to the right
5. **Connect them:**
   - Input right handle → Text left handle (user)
   - Text right handle → Output left handle
6. Click **Submit Pipeline**
7. See the results! ✅

**Expected Result:**
```
Nodes: 3
Edges: 2
Is DAG: Yes
```

---

## 📊 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Delete | Remove selected node/edge |
| Ctrl + Scroll | Zoom in/out |
| Mouse Drag | Move canvas |
| Shift + Drag | Select multiple nodes |

---

## 🎉 You're Ready!

Start building amazing pipelines! Experiment with different nodes and connections.

**Need Help?** Check the examples above or try the quick start tutorial!

---

## 📝 Summary

1. **Add nodes** - Drag from sidebar
2. **Configure** - Edit node fields
3. **Connect** - Drag from right to left handles
4. **Submit** - Click button to validate
5. **Check results** - See if it's a valid DAG

Happy pipeline building! 🚀
