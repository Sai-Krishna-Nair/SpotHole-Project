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
                    <div className='pop-up-box'>
                        <button className='close-button' onClick={closePopup}>X</button>

                        <div className='flex-container'>
                            <div>
                                <img
                                    src={fileURL}
                                    alt="Uploaded File"
                                    style={{ width: '350px' }}
                                />
                            </div>

                            <div >
                                <p className='pop-up-text'>Result: </p>
                                <p className='pop-up-text'>Enter location of pothole</p>
                                <input className='pop-up-text input-loc' type="text" />
                                <br />
                                <br />
                                <p className='pop-up-text'>Describe the pothole</p>
                                <textarea className='pop-up-text input-desc'></textarea>
                            </div>
                        </div>

                        <button className='upload-button' onClick={()=>{alert("Report has been sent!\nView it in history"); closePopup();}}>Report</button>
                        
                    </div>

                    <div className='pop-up-bg'/>
                </div>
            )}
        </div>
    );
}
