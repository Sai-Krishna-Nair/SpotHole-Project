import React from "react";
import "../../styles/History.css";
import image from'../../assets/pothole.jpg'
export default function History() {
    const UploadCard = ({ img, result, dateTime }) => {
        return (
            <div className="upload-card">
                <div className="upload-image">
                    <img src={img} alt="Upload preview" />
                </div>
                <div className="upload-details">
                    <p><strong>Result:</strong> {result}</p>
                    <p><strong>Date & Time:</strong> {dateTime}</p>
                    <p><strong>Date & Time:</strong> {dateTime}</p>
                    <p><strong>Date & Time:</strong> {dateTime}</p>
                    <p><strong>Date & Time:</strong> {dateTime}</p>
                </div>
            </div>
        );
    };
    // Sample data for uploads
    const uploads = [
        { id: 1, img: "image1.jpg", result: "Detected", dateTime: "2025-01-21 14:28" },
        { id: 2, img: "image2.jpg", result: "No Pothole", dateTime: "2025-01-20 13:45" },
        { id: 3, img: "image3.jpg", result: "Detected", dateTime: "2025-01-19 12:10" },
    ];

    return (
        <div className="recent-uploads">
            <h2>Reported Potholes</h2>
            <div className="uploads-container">
                {uploads.map((upload) => (
                    <UploadCard
                        key={upload.id}
                        img={image}
                        result={upload.result}
                        dateTime={upload.dateTime}
                    />
                ))}
            </div>
        </div>
    );
};

