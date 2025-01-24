import React from 'react';
import '../../styles/Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>AI-Powered Road Safety</h1>
                <div className="logo-content">
                    <span id="logo-content-text">
                        An innovative solution for safer roads. We leverage AI to detect potholes,
                        enhance maintenance, and ensure smoother journeys.
                    </span>
                </div>
            </div>
        </section>
    );
}