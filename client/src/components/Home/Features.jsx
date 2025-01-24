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
                    description="Advanced AI algorithms for instant pothole detection"
                />
                <FeatureCard
                    iconClass="fas fa-map-marked-alt"
                    title="GPS Mapping"
                    description="Precise location tracking and mapping of road conditions"
                />
                <FeatureCard
                    iconClass="fas fa-chart-line"
                    title="Analytics"
                    description="Comprehensive data analysis and reporting"
                />
                <FeatureCard
                    iconClass="fas fa-camera"
                    title="Real-time Detection"
                    description="Advanced AI algorithms for instant pothole detection"
                />
                <FeatureCard
                    iconClass="fas fa-map-marked-alt"
                    title="GPS Mapping"
                    description="Precise location tracking and mapping of road conditions"
                />
                <FeatureCard
                    iconClass="fas fa-chart-line"
                    title="Analytics"
                    description="Comprehensive data analysis and reporting"
                />
            </div>
        </section>
    );
}