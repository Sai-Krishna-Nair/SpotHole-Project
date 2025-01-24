import React from 'react'
import Features from './Features.jsx';
import { NavLink } from 'react-router-dom';
import '../../styles/About.css'
import image from '../../assets/pothole.jpg'

const Stat = ({ value, label }) => (
    <div className="stat">
        <h3>{value}</h3>
        <p>{label}</p>
    </div>
)

const AboutImage = () => (
    <div className="about-image">
        <img src={image} alt="Road maintenance" />
    </div>
)

export default function About() {
    return (
        <section className="about" id="about">
            <div className="about-content">
                <h2>About SpotHole</h2>
                <div className="about-box">
                    <div className="about-text">
                        <p>SpotHole is revolutionizing road maintenance through cutting-edge AI technology. Our system provides real-time pothole detection and analysis, helping cities maintain safer roads for everyone.<br/> For more visit our <NavLink to='/documentation' id='about-text-1'>documentation</NavLink></p>
                        <div className="stats">
                            <Stat value="95%" label="Detection Accuracy" />
                            <Stat value="6000+" label="Images Trained" />
                            <Stat value="1M+" label="Potholes Detected" />
                        </div>
                    </div>
                    <AboutImage />
                </div>
            </div>
            <Features />
        </section>
    )
}