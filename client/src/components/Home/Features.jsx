import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Features.css';

export default function Features() {
    const FeatureCard = ({ iconClass, title, description }) => (
        <div className="feature-card">
            <div className="feature-icon">
                <i className={iconClass}></i>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );

    return (
        <section className="features" id="features">
            <h2>Our Features</h2>
            <div className="features-grid">
                <FeatureCard
                    iconClass="fas fa-camera"
                    title="Real-time Detection"
                    description="Algorithms for instant pothole detection"
                />
                <FeatureCard
                    iconClass="fas fa-map-marked-alt"
                    title="Trained on variety of dataset"
                    description="Contains pothole image datasets from India, Japan and Czech"
                />
                
                <FeatureCard
                    iconClass="fas fa-camera"
                    title="Satisfactory Accuracy"
                    description="Accurately identifies the existence of the pothole"
                />
                <FeatureCard
                    iconClass="fas fa-map-marked-alt"
                    title="Integration ready"
                    description="Outputs can be fed into navigation systems or reported to local authorities"
                />
            
            </div>
        </section>
    );
}