// draggableNode.js

export const DraggableNode = ({ type, label, onDragStart: onDragStartProp, onDragEnd: onDragEndProp }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';

    // Call external handler if provided
    if (onDragStartProp) {
      onDragStartProp();
    }
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';

    // Call external handler if provided
    if (onDragEndProp) {
      onDragEndProp();
    }
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
