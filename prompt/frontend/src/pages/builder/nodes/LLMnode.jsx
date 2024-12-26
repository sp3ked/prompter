import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import axios from 'axios';

const LLMNode = ({ data }) => {
    const [output, setOutput] = useState(data.output || '');
    const [isProcessing, setIsProcessing] = useState(false);
    const [model, setModel] = useState('gpt-3.5-turbo');

    const handleProcess = async () => {
        if (!data.input) return;
        
        setIsProcessing(true);
        try {
            const response = await axios.post('http://localhost:8080/api/generate', {
                prompt: data.input,
                model: model
            });
            
            const result = response.data.result;
            setOutput(result);
            data.output = result;
        } catch (error) {
            console.error('Processing error:', error);
            setOutput('Error processing request');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
            <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-blue-500" />
            
            <div className="font-bold text-sm mb-2">{data.label}</div>
            
            <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 mb-2 border rounded-md text-sm"
            >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
            </select>

            <div className="text-sm mb-2">Input:</div>
            <div className="p-2 bg-gray-50 rounded-md mb-2 text-sm min-h-[60px]">
                {data.input || 'Waiting for input...'}
            </div>

            <button
                onClick={handleProcess}
                disabled={isProcessing || !data.input}
                className="w-full bg-blue-500 text-white p-2 rounded-md mb-2 disabled:bg-gray-300"
            >
                {isProcessing ? 'Processing...' : 'Generate'}
            </button>

            {output && (
                <>
                    <div className="text-sm mb-2">Output:</div>
                    <div className="p-2 bg-gray-50 rounded-md text-sm">
                        {output}
                    </div>
                </>
            )}

            <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-blue-500" />
        </div>
    );
};

export default LLMNode;