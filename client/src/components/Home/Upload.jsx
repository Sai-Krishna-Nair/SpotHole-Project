import React, { useRef, useState } from 'react'
import '../../styles/Upload.css'


export default function Upload() {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [fileURL, setFileURL] = useState('');
    const [fileType, setFileType] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileType(file.type);
            const fileURL = URL.createObjectURL(file);
            setFileURL(fileURL);
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div id="demo" className="demo-container">
            <div className="demo-inner">
                <div className="text-center">
                    <p className="demo-subtitle">
                        See it in Action
                    </p>
                </div>

                <div className="demo-box">
                    <div className="demo-space">
                        <div className="upload-box">
                            <div className="upload-content">
                                <span className="upload-icon">Upload</span>
                                <p className="upload-text">
                                    Drag and drop an image or video, or click to upload
                                </p>
                                <button className="upload-button" onClick={handleButtonClick}>
                                    Upload File
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {fileName && <p className="file-name">Selected file: {fileName}</p>}
                            </div>

                            <div className="file-preview">
                                {fileType.startsWith('image') && (
                                    <img
                                        src={fileURL}
                                        alt="Uploaded File"
                                        style={{ width: '200px', marginTop: '10px' }}
                                    />
                                )}
                                <br />
                                {fileName && (
                                    <button className="upload-button" onClick={() => setIsPopupVisible(true)}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditionally render the Popup based on state */}
            {isPopupVisible && (
                <div>
                    <div 
                        style={{
                            padding: '20px',
                            border: '1px solid black',
                            backgroundColor: 'lightgray',
                            position: 'fixed',
                            top: '500px',
                            left: '800px',
                            //transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                            alignContent: 'center'
                        }}
                    >
                        <p>This is a pop-up window!</p>
                        <button className='upload-button' onClick={closePopup}>Close</button>
                    </div>

                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999,
                            alignContent: 'center'
                        }}
                        onClick={closePopup}
                    />
                </div>
            )}
        </div>
    );
}
