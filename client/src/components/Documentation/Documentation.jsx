import React, { useState } from 'react';
import srsPdf from '../../assets/BEELABMANUAL.pdf'; // Path to the SRS PDF
import documentationPdf from '../../assets/BEELABMANUAL.pdf'; // Path to the Documentation PDF
import '../../styles/Documentation.css';

function Documentation() {
    const [selectedOption, setSelectedOption] = useState('srs');

    const renderForm = () => {
        let pdfSrc = selectedOption === 'srs' ? srsPdf : documentationPdf;

        return (
            <div className="fade-in">
                <iframe src={pdfSrc} className="doc-pdf" title={selectedOption}></iframe>
            </div>
        );
    };

    return (
        <div className="doc-container">
            <div className="doc-option-section">
                <ul>
                    <li
                        className={selectedOption === 'srs' ? 'active' : ''}
                        onClick={() => setSelectedOption('srs')}
                    >
                        SRS
                    </li>
                    <li
                        className={selectedOption === 'documentation' ? 'active' : ''}
                        onClick={() => setSelectedOption('documentation')}
                    >
                        Documentation
                    </li>
                </ul>
            </div>
            <div className="doc-section">{renderForm()}</div>
        </div>
    );
}

export default Documentation;
