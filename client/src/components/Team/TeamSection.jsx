import React from "react";
// import TeamCard from "../Team/TeamCard";
import "../../styles/TeamSection.css";
import img from "../../assets/pothole.jpg";

function TeamSection() {
    const Member = ({ image, name, description, iconClass1, iconClass2, iconClass3 }) => (
        <div className="member-card">
            <div className="member-image">
                <img src={image} alt="image" />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="member-icon">
                <a href="#" target="_blank"><i className={iconClass1}></i></a>
                <a href="#" target="_blank"><i className={iconClass2}></i></a>
                <a href="#" target="_blank"><i className={iconClass3}></i></a>
            </div>
        </div>
    );
    return (
        <>
            <section >
                <div className="members" id="members">
                    <h2>Our Team</h2>
                    <div className="members-grid">
                        <Member
                            image={img}
                            name="18"
                            description="Advanced AI algorithms for instant pothole detection"
                            iconClass1="fa-brands fa-instagram icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={img}
                            name="65"
                            description="Precise location tracking and mapping of road conditions"
                            iconClass1="fa-brands fa-instagram icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={img}
                            name="91"
                            description="Comprehensive data analysis and reporting"
                            iconClass1="fa-brands fa-instagram icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={img}
                            name="121"
                            description="Advanced AI algorithms for instant pothole detection"
                            iconClass1="fa-brands fa-instagram icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={img}
                            name="122"
                            description="Precise location tracking and mapping of road conditions"
                            iconClass1="fa-brands fa-instagram icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={img}
                            name="124"
                            description="Comprehensive data analysis and reporting"
                            iconClass1="fa-brands fa-instagram icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default TeamSection;
