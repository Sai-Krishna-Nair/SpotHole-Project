import React, { useEffect, useState } from "react";
import "../../styles/History.css";
import image from '../../assets/pothole.jpg';

export default function History() {
    const [uploads, setUploads] = useState([]); // State to store fetched uploads
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch data from the backend
    const fetchHistory = async () => {
        const token = sessionStorage.getItem("token"); // Retrieve the token from sessionStorage

        if (!token) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/profile/history", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the headers
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUploads(data); // Update state with the fetched history
            } else {
                setError("Failed to fetch history.");
            }
        } catch (err) {
            console.error("Error while fetching history:", err);
            setError("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Format timestamp to "dd/mm/yy at hh:mm"
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} at ${hours}:${minutes}`;
    };

    // Fetch history on component mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const UploadCard = ({ img, result, dateTime, probability, address, description }) => {
        return (
            <div className="upload-card">
                <div className="upload-image">
                    <img src={img || image} alt="Upload preview" />
                </div>
                <div className="upload-details">
                    <p><strong>Result:</strong> {result}</p>
                    <p><strong>Date & Time:</strong> {dateTime}</p>
                    <p><strong>Probability:</strong> {(probability * 100).toFixed(2)}%</p>
                    <p><strong>Location:</strong> {address}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
                {/*<button onClick={() => deleteUpload(id)} className="delete-button">*/}
                {/*    Delete*/}
                {/*</button>*/}
            </div>
        );
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="recent-uploads">
            <h2>Reported Potholes</h2>
            <div className="uploads-container">
                {uploads.length > 0 ? (
                    uploads.map((upload, index) => (
                        <UploadCard
                            key={index}
                            img={upload.image} // Use the stored image URL
                            result={upload.prediction}
                            dateTime={formatDateTime(upload.timestamp)} // Format the timestamp
                            probability={upload.probability}
                            address={upload.address}
                            description={upload.description}
                        />
                    ))
                ) : (
                    <p>No potholes reported yet.</p>
                )}
            </div>
        </div>
    );
}












































// import React, { useEffect, useState } from "react";
// import "../../styles/History.css";
// import image from '../../assets/pothole.jpg';
//
// export default function History() {
//     const [uploads, setUploads] = useState([]); // State to store fetched uploads
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state
//
//     // Function to fetch data from the backend
//     const fetchHistory = async () => {
//         const token = sessionStorage.getItem("token"); // Retrieve the token from sessionStorage
//
//         if (!token) {
//             setError("User not logged in.");
//             setLoading(false);
//             return;
//         }
//
//         try {
//             const response = await fetch("http://localhost:3000/api/v1/profile/history", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // Include the token in the headers
//                 }
//             });
//
//             if (response.ok) {
//                 const data = await response.json();
//                 setUploads(data); // Update state with the fetched history
//             } else {
//                 setError("Failed to fetch history.");
//             }
//         } catch (err) {
//             console.error("Error while fetching history:", err);
//             setError("An error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // Format timestamp to "dd/mm/yy at hh:mm"
//     const formatDateTime = (timestamp) => {
//         const date = new Date(timestamp);
//         const day = String(date.getDate()).padStart(2, "0");
//         const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//         const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
//         const hours = String(date.getHours()).padStart(2, "0");
//         const minutes = String(date.getMinutes()).padStart(2, "0");
//
//         return `${day}/${month}/${year} at ${hours}:${minutes}`;
//     };
//
//     // // Function to handle delete request
//     // const deleteUpload = async (id) => {
//     //     const token = sessionStorage.getItem("token");
//     //
//     //     if (!token) {
//     //         setError("User not logged in.");
//     //         return;
//     //     }
//     //
//     //     try {
//     //         const response = await fetch(`http://localhost:3000/api/v1/profile/history/${id}`, {
//     //             method: "DELETE",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 "Authorization": `Bearer ${token}`, // Include the token in the headers
//     //             },
//     //         });
//     //
//     //         if (response.ok) {
//     //             // Remove the deleted item from the state
//     //             setUploads(uploads.filter((upload) => upload._id !== id));
//     //         } else {
//     //             setError("Failed to delete upload.");
//     //         }
//     //     } catch (err) {
//     //         console.error("Error while deleting upload:", err);
//     //         setError("An error occurred.");
//     //     }
//     // };
//
//
//     // Function to handle delete request
//     const deleteUpload = async (id) => {
//         const token = sessionStorage.getItem("token");
//
//         if (!token) {
//             setError("User not logged in.");
//             return;
//         }
//
//         try {
//             const response = await fetch(`http://localhost:3000/api/v1/profile/history/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`, // Include the token in the headers
//                 },
//             });
//
//             if (response.ok) {
//                 // Update state with the new uploads list, ensuring we only remove the deleted upload
//                 setUploads((prevUploads) =>
//                     prevUploads.filter((upload) => upload._id !== id)
//                 );
//             } else {
//                 const result = await response.json();
//                 setError(result.message || "Failed to delete upload.");
//             }
//         } catch (err) {
//             console.error("Error while deleting upload:", err);
//             setError("An error occurred.");
//         }
//     };
//
//
//     // Fetch history on component mount
//     useEffect(() => {
//         fetchHistory();
//     }, []);
//
//     const UploadCard = ({ id, img, result, dateTime, probability, address, description }) => {
//         return (
//             <div className="upload-card">
//                 <div className="upload-image">
//                     <img src={img || image} alt="Upload preview" />
//                 </div>
//                 <div className="upload-details">
//                     <p><strong>Result:</strong> {result}</p>
//                     <p><strong>Date & Time:</strong> {dateTime}</p>
//                     <p><strong>Probability:</strong> {(probability * 100).toFixed(2)}%</p>
//                     <p><strong>Location:</strong> {address}</p>
//                     <p><strong>Description:</strong> {description}</p>
//                 </div>
//                 <button onClick={() => deleteUpload(id)} className="delete-button">
//                     Delete
//                 </button>
//             </div>
//         );
//     };
//
//     if (loading) {
//         return <p>Loading...</p>;
//     }
//
//     if (error) {
//         return <p className="error-message">{error}</p>;
//     }
//
//     return (
//         <div className="recent-uploads">
//             <h2>Reported Potholes</h2>
//             <div className="uploads-container">
//                 {uploads.length > 0 ? (
//                     uploads.map((upload) => (
//                         <UploadCard
//                             key={upload._id} // Use the _id as the key for React to manage the list efficiently
//                             id={upload._id} // Pass the id to the delete function
//                             img={upload.image} // Use the stored image URL
//                             result={upload.prediction}
//                             dateTime={formatDateTime(upload.timestamp)} // Format the timestamp
//                             probability={upload.probability}
//                             address={upload.address}
//                             description={upload.description}
//                         />
//                     ))
//                 ) : (
//                     <p>No potholes reported yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }
