import React from "react";
// import TeamCard from "../Team/TeamCard";
import "../../styles/TeamSection.css";
import boi from "../../assets/boypic.jpg";
import girl from "../../assets/girlpic.jpg";

function TeamSection() {
    const Member = ({image,name, description, iconClass1, iconClass2, iconClass3 }) => (
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
                            image={boi}
                            name="Ehsaas Nahata"
                            description="Advanced AI algorithms for instant pothole detection"
                            iconClass1="fa-brands fa-twitter icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={boi}
                            name="Aditya Vidiyala"
                            description="Precise location tracking and mapping of road conditions"
                            iconClass1="fa-brands fa-twitter icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={boi}
                            name="Kanduri Adithya"
                            description="Comprehensive data analysis and reporting"
                            iconClass1="fa-brands fa-twitter icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={boi}
                            name="Udit Kandi"
                            description="Advanced AI algorithms for instant pothole detection"
                            iconClass1="fa-brands fa-twitter icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={boi}
                            name="T Sai Krishna"
                            description="Precise location tracking and mapping of road conditions"
                            iconClass1="fa-brands fa-twitter icon"
                            iconClass2="fa-brands fa-github icon"
                            iconClass3="fa-brands fa-linkedin icon"
                        />
                        <Member
                            image={girl}
                            name="Nigama Reddy V"
                            description="Comprehensive data analysis and reporting"
                            iconClass1="fa-brands fa-twitter icon"
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
