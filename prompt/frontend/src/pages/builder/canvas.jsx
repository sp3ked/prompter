import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import { Plus, Save, Settings, Trash } from 'lucide-react';
import { nodeTypes } from './nodes';
import './builder.css';

const Canvas = () => {
    const { projectName } = useParams();
    const navigate = useNavigate();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const reactFlowWrapper = useRef(null);

    // Load saved project data
    useEffect(() => {
        const loadProject = () => {
            try {
                const savedProject = localStorage.getItem(`flow-project-${projectName}`);
                if (savedProject) {
                    const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedProject);
                    setNodes(savedNodes);
                    setEdges(savedEdges);
                } else {
                    // If no saved project, initialize with default node
                    const initialNode = {
                        id: '1',
                        type: 'promptNode',
                        position: { x: 250, y: 100 },
                        data: { 
                            label: 'Prompt Node',
                            input: '',
                            output: ''
                        }
                    };
                    setNodes([initialNode]);
                }
            } catch (error) {
                console.error('Error loading project:', error);
            }
        };

        if (projectName) {
            loadProject();
        }
    }, [projectName, setNodes, setEdges]);

    // Auto-save functionality
    const saveProject = useCallback(() => {
        if (!projectName) return;
        
        setIsSaving(true);
        try {
            const projectData = {
                nodes,
                edges,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem(`flow-project-${projectName}`, JSON.stringify(projectData));
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setTimeout(() => setIsSaving(false), 800); // Keep indicator visible briefly
        }
    }, [projectName, nodes, edges]);

    // Auto-save when nodes or edges change
    useEffect(() => {
        const saveTimeout = setTimeout(() => {
            saveProject();
        }, 1000);

        return () => clearTimeout(saveTimeout);
    }, [nodes, edges, saveProject]);

    // Handle data flow between nodes
    const handleDataFlow = useCallback(async (sourceNode, targetNode) => {
        if (sourceNode.data.output) {
            const updatedTargetNode = {
                ...targetNode,
                data: { ...targetNode.data, input: sourceNode.data.output }
            };
            setNodes(nds => nds.map(node => 
                node.id === targetNode.id ? updatedTargetNode : node
            ));
        }
    }, [setNodes]);

    // Connection handling
    const onConnect = useCallback((params) => {
        setEdges(eds => addEdge(params, eds));
        const sourceNode = nodes.find(n => n.id === params.source);
        const targetNode = nodes.find(n => n.id === params.target);
        if (sourceNode && targetNode) {
            handleDataFlow(sourceNode, targetNode);
        }
    }, [nodes, handleDataFlow, setEdges]);

    // Context menu handlers
    const onNodeContextMenu = useCallback((event, node) => {
        event.preventDefault();
        const bounds = reactFlowWrapper.current?.getBoundingClientRect();
        setContextMenu({
            x: event.clientX - (bounds?.left || 0),
            y: event.clientY - (bounds?.top || 0),
            nodeId: node.id
        });
    }, []);

    const onPaneContextMenu = useCallback((event) => {
        event.preventDefault();
        const bounds = reactFlowWrapper.current?.getBoundingClientRect();
        const position = {
            x: event.clientX - (bounds?.left || 0),
            y: event.clientY - (bounds?.top || 0)
        };
        
        setContextMenu({
            x: position.x,
            y: position.y,
            isPane: true
        });
    }, []);

    const onPaneClick = useCallback(() => {
        setContextMenu(null);
        setIsDropdownOpen(false);
    }, []);

    // Node manipulation
    const addNode = useCallback((type, position) => {
        const newNode = {
            id: (nodes.length + 1).toString(),
            type,
            position: position || {
                x: Math.random() * window.innerWidth * 0.6,
                y: Math.random() * window.innerHeight * 0.6
            },
            data: {
                label: `${type.replace('Node', '')} ${nodes.length + 1}`,
                input: '',
                output: ''
            }
        };
        
        setNodes(nds => [...nds, newNode]);
        setIsDropdownOpen(false);
        setContextMenu(null);
    }, [nodes, setNodes]);

    const deleteNode = useCallback((nodeId) => {
        setNodes(nds => nds.filter(node => node.id !== nodeId));
        setEdges(eds => eds.filter(edge => 
            edge.source !== nodeId && edge.target !== nodeId
        ));
        setContextMenu(null);
    }, [setNodes, setEdges]);

    const onNodeDoubleClick = useCallback((event, node) => {
        const newLabel = prompt('Enter new name:', node.data.label);
        if (newLabel) {
            setNodes(nds => nds.map(n => 
                n.id === node.id 
                    ? { ...n, data: { ...n.data, label: newLabel } }
                    : n
            ));
        }
    }, [setNodes]);

    const renderContextMenu = () => {
        if (!contextMenu) return null;

        return (
            <div 
                className="context-menu"
                style={{
                    top: contextMenu.y,
                    left: contextMenu.x,
                }}
            >
                {contextMenu.nodeId ? (
                    // Node context menu
                    <button 
                        className="context-menu-item delete"
                        onClick={() => deleteNode(contextMenu.nodeId)}
                    >
                        <Trash size={16} />
                        Delete Node
                    </button>
                ) : (
                    // Pane context menu (for creating new nodes)
                    <>
                        <button 
                            className="context-menu-item"
                            onClick={() => addNode('promptNode', contextMenu)}
                        >
                            Add Prompt Node
                        </button>
                        <button 
                            className="context-menu-item"
                            onClick={() => addNode('llmNode', contextMenu)}
                        >
                            Add LLM Node
                        </button>
                        <button 
                            className="context-menu-item"
                            onClick={() => addNode('fileNode', contextMenu)}
                        >
                            Add File Node
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <div ref={reactFlowWrapper} className="canvas-container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeContextMenu={onNodeContextMenu}
                onPaneContextMenu={onPaneContextMenu}
                onNodeDoubleClick={onNodeDoubleClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>

            {/* Toolbar */}
            <div className="toolbar">
                <div className="relative">
                    <button 
                        className="toolbar-button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        title="Add Node"
                    >
                        <Plus size={24} />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <div className="py-1">
                                <button 
                                    className="context-menu-item"
                                    onClick={() => addNode('promptNode')}
                                >
                                    Add Prompt Node
                                </button>
                                <button 
                                    className="context-menu-item"
                                    onClick={() => addNode('llmNode')}
                                >
                                    Add LLM Node
                                </button>
                                <button 
                                    className="context-menu-item"
                                    onClick={() => addNode('fileNode')}
                                >
                                    Add File Node
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    className="toolbar-button"
                    onClick={saveProject}
                    title="Save Project"
                >
                    <Save size={24} />
                    {isSaving && <span className="saving-indicator" />}
                </button>

                <div className="project-name">
                    {projectName}
                </div>
            </div>

            {/* Context Menu */}
            {renderContextMenu()}
        </div>
    );
};

export default Canvas;