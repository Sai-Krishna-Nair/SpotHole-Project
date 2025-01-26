import React, { useRef, useState } from 'react'
import '../../styles/Upload.css'

export default function Upload() {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [fileURL, setFileURL] = useState('');
    const [fileType, setFileType] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [result, setResult] = useState(null); // To store prediction result
    const [predictionProbability, setPredictionProbability] = useState(null); // To store probability
    const [potholeDetected, setPotholeDetected] = useState(false); // To check detection status
    const [location, setLocation] = useState(''); // Location input
    const [description, setDescription] = useState(''); // Description input

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setFileName(file.name);
    //         setFileType(file.type);
    //         const fileURL = URL.createObjectURL(file);
    //         setFileURL(fileURL);
    //     }
    // };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileType(file.type);

            // Convert the file to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileURL(reader.result); // This will be the Base64 string
            };
            reader.readAsDataURL(file); // This reads the file as a Data URL (Base64 encoded)
        }
    };


    const handleSubmit = async () => {
        if (!fileInputRef.current.files[0]) return;

        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);

        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log("Prediction result from FastAPI:", data); // Debugging log
            setResult(data.predicted_label ? 'Pothole detected!' : 'No pothole detected.');
            setPredictionProbability(data.probability); // Store probability if returned
            setPotholeDetected(data.predicted_label === 1); // Update detection status
            setIsPopupVisible(true);
        } catch (error) {
            console.error('Error while predicting:', error);
        }
    };





    const handleReportSubmit = async () => {
        const token = sessionStorage.getItem("token");  // Retrieve the token from sessionStorage

        if (!token) {
            alert("No token found. Please login.");
            return;
        }

        const reportData = {
            image: fileURL,
            result,
            probability: predictionProbability,
            location,
            description,
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/profile/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Include the token in the headers
                },
                body: JSON.stringify(reportData),
            });

            if (response.ok) {
                setIsPopupVisible(false);
                // alert('Report has been sent!\nView it in history.');
                setLocation('');  // Clear the location
                setDescription('');  // Clear the description
            } else {
                console.error('Failed to submit report.');
            }
        } catch (error) {
            console.error('Error while submitting report:', error);
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
                                    <button className="upload-button" onClick={handleSubmit}>
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
                                <span className={potholeDetected ? "result-success" : "result-fail"}>Result : {result}</span>
                                {potholeDetected && (
                                    <>
                                        {/* Display the prediction probability if available */}
                                        {predictionProbability !== null && (
                                            <p className='pop-up-text'>Prediction Probability: {predictionProbability}%</p>
                                        )}
                                        <p className='pop-up-text'>Enter location of pothole</p>
                                        <input
                                            className='pop-up-text input-loc'
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                        <br />
                                        <br />
                                        <p className='pop-up-text'>Describe the pothole</p>
                                        <textarea
                                            className='pop-up-text input-desc'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <br />
                                    </>
                                )}
                            </div>
                        </div>

                        {potholeDetected && (
                            <button className='upload-button' onClick={handleReportSubmit}>Report</button>
                        )}
                    </div>

                    <div className='pop-up-bg'/>
                </div>
            )}
        </div>
    );
}
