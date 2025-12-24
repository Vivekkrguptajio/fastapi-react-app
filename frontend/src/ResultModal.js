// ResultModal.js
// Custom modal to display pipeline results

import './ResultModal.css';

export const ResultModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const { num_nodes, num_edges, is_dag, isEmpty, error } = data;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <h2>Pipeline Analysis Results</h2>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {isEmpty ? (
                        <div className="empty-message">
                            <span className="empty-icon">📭</span>
                            <h3>Canvas is Empty!</h3>
                            <p>Please add some nodes to the canvas before submitting.</p>
                            <div className="empty-hint">
                                💡 Drag nodes from the left sidebar to get started
                            </div>
                        </div>
                    ) : error ? (
                        <div className="error-message">
                            <span className="error-icon">❌</span>
                            <h3>Submission Failed</h3>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="result-item">
                                <span className="result-icon">📊</span>
                                <div className="result-info">
                                    <span className="result-label">Number of Nodes</span>
                                    <span className="result-value">{num_nodes}</span>
                                </div>
                            </div>

                            <div className="result-item">
                                <span className="result-icon">🔗</span>
                                <div className="result-info">
                                    <span className="result-label">Number of Edges</span>
                                    <span className="result-value">{num_edges}</span>
                                </div>
                            </div>

                            <div className="result-item">
                                <span className="result-icon">{is_dag ? '✅' : '❌'}</span>
                                <div className="result-info">
                                    <span className="result-label">Is Valid DAG</span>
                                    <span className={`result-value ${is_dag ? 'success' : 'error'}`}>
                                        {is_dag ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            {!is_dag && (
                                <div className="warning-message">
                                    ⚠️ Your pipeline contains circular dependencies. Please remove cycles.
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="modal-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
