import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const FileNode = ({ data }) => {
    const [fileContent, setFileContent] = useState('');

    const handleFileUpload = useCallback((evt) => {
        const file = evt.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            setFileContent(content);
            data.output = content; // Update output for connected nodes
        };

        reader.readAsText(file);
    }, [data]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
            <div className="font-bold text-sm mb-2">{data.label}</div>
            
            <input
                type="file"
                onChange={handleFileUpload}
                className="mb-2"
                accept=".txt,.md,.json,.csv"
            />

            {fileContent && (
                <div className="mt-2">
                    <div className="text-sm mb-2">File Content:</div>
                    <div className="p-2 bg-gray-50 rounded-md text-sm max-h-[200px] overflow-auto">
                        {fileContent}
                    </div>
                </div>
            )}

            <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-blue-500" />
        </div>
    );
};

export default FileNode;