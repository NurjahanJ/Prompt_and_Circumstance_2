import React, { useState } from 'react';
import { usePromptLogger } from '../hooks/usePromptLogger';

/**
 * Example component showing how to use the usePromptLogger hook
 * This demonstrates how the hook can be used in any component
 */
const PromptLoggerExample = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const { logPrompt, isLogging, logError, logSuccess, clearLogError, clearLogSuccess } = usePromptLogger();
  const [logStatus, setLogStatus] = useState('');

  const handleLogPrompt = async () => {
    if (!prompt || !response) {
      setLogStatus('Please enter both prompt and response');
      return;
    }

    // Clear previous status
    setLogStatus('Logging...');
    clearLogError();
    clearLogSuccess();

    // Log the prompt and response
    const result = await logPrompt(prompt, response);
    
    if (result.success) {
      setLogStatus('Successfully logged to Supabase!');
      // Clear the form after successful logging
      setPrompt('');
      setResponse('');
    } else {
      setLogStatus(`Error: ${result.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm max-w-md mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">Prompt Logger Example</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="Enter a prompt"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Response:</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="Enter a response"
        />
      </div>
      
      <button
        onClick={handleLogPrompt}
        disabled={isLogging}
        className={`w-full py-2 px-4 rounded-md ${
          isLogging 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLogging ? 'Logging...' : 'Log to Supabase'}
      </button>
      
      {logStatus && (
        <div className={`mt-4 p-2 rounded-md ${
          logStatus.includes('Error') 
            ? 'bg-red-100 text-red-800' 
            : logStatus === 'Logging...'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
        }`}>
          {logStatus}
        </div>
      )}
    </div>
  );
};

export default PromptLoggerExample;
