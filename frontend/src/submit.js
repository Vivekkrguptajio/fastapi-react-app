// submit.js
// Submit button with modal popup integration

import { useState } from 'react';
import { useStore } from './store';
import { ResultModal } from './ResultModal';
import { API_URL } from './config';
import './submit.css';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        // Check if pipeline is empty
        if (nodes.length === 0) {
            setResultData({
                num_nodes: 0,
                num_edges: 0,
                is_dag: true,
                isEmpty: true
            });
            setIsModalOpen(true);
            return;
        }

        try {
            setIsLoading(true);

            // Send pipeline data to backend
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();

            setIsLoading(false);
            setResultData(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setIsLoading(false);

            // Show error in modal
            setResultData({
                num_nodes: 0,
                num_edges: 0,
                is_dag: false,
                error: `Failed to submit pipeline. Make sure the backend is running on ${API_URL}`
            });
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setResultData(null);
    };

    return (
        <>
            <div className="submit-container">
                <button
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type="button"
                >
                    <span className="button-text">
                        {isLoading ? 'Analyzing' : 'Submit Pipeline'}
                    </span>
                    <span className="button-icon">🚀</span>
                </button>
            </div>

            {resultData && (
                <ResultModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    data={resultData}
                />
            )}
        </>
    );
};
