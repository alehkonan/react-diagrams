import 'reactflow/dist/style.css';
import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
  OnConnect,
  Position,
  MarkerType,
  ControlButton,
} from 'reactflow';
import styles from './styles.module.css';

const initialNodes: Node<{ label: string }>[] = [
  {
    id: '1',
    position: { x: 100, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
    sourcePosition: Position.Right,
    zIndex: 1,
  },
  {
    id: '2',
    position: { x: 500, y: 10 },
    data: { label: 'Node 2' },
    type: 'output',
    targetPosition: Position.Left,
  },
  {
    id: '3',
    position: { x: 0, y: 50 },
    data: { label: 'Node 3' },
    type: 'default',
    parentNode: '1',
    draggable: false,
    connectable: false,
    deletable: true,
    className: styles.node,
  },
];

const initialEdges: Edge<{ data: string }>[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: false,
    label: 'connection',
    labelShowBg: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'black',
    },
    className: styles.edge,
    data: {
      data: 'data',
    },
  },
];

export const ReactFlowTab = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback<OnConnect>(
    (con) => setEdges((allEdges) => addEdge(con, allEdges)),
    [setEdges]
  );

  const addNewNode = () =>
    setNodes((prev) => [
      ...prev,
      {
        id: `${Number(prev.at(-1)?.id) + 1 || 1}`,
        position: { x: 0, y: 0 },
        data: { label: `Node ${Number(prev.at(-1)?.id) + 1 || 1}` },
      },
    ]);

  return (
    <div className={styles.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode="Delete"
      >
        <Controls className={styles.controls}>
          <ControlButton className={styles.controlButton} onClick={addNewNode}>
            Add new element
          </ControlButton>
        </Controls>
        <Panel position="top-right" className={styles.panel}>
          This is custom panel
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  );
};
