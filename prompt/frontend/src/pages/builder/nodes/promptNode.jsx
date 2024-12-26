import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const PromptNode = ({ data }) => {
    const [prompt, setPrompt] = useState(data.input || '');

    const handleChange = useCallback((evt) => {
        const value = evt.target.value;
        setPrompt(value);
        data.output = value; // Update output for connected nodes
    }, [data]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
            <div className="font-bold text-sm mb-2">{data.label}</div>
            <textarea
                value={prompt}
                onChange={handleChange}
                className="w-full h-32 p-2 border rounded-md resize-none text-sm"
                placeholder="Enter your prompt..."
            />
            <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-blue-500" />
        </div>
    );
};

export default PromptNode;