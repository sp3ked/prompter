import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useParams, Navigate } from 'react-router-dom';
import Canvas from './canvas';
import 'reactflow/dist/style.css';
import './builder.css';

const Builder = () => {
    const { projectName } = useParams();

    if (!projectName) {
        return <Navigate to="/dash" replace />;
    }

    return (
        <div className="builder-container">
            <ReactFlowProvider>
                <Canvas />
            </ReactFlowProvider>
        </div>
    );
};

export default Builder;