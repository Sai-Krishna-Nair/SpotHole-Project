import React from "react";
import TeamCard from "../Team/TeamCard";
import "../../styles/TeamSection.css";
import image from "../../assets/pothole.jpg";

function TeamSection() {
    const teamMembers = [
        {
            image: image,
            name: "Cara Shrivastava",
            title: "Content Strategist",
        },
        {
            image: image,
            name: "Chayto Nadin",
            title: "Designer",
        },
        {
            image: image,
            name: "Kerstin Thai",
            title: "UX Designer",
        },
        {
            image: image,
            name: "Karen Ireson",
            title: "Junior Strategist",
        },
        {
            image: image,
            name: "Ben Levitt",
            title: "Studio & Production Coordinator",
        },
        {
            image: image,
            name: "Ben Levitt",
            title: "Studio & Production Coordinator",
        },
    ];

    return (
        <section>
            <h2 className="team-title">Our Team</h2>
            <div className="team-body">
                <div className="team-content">
                    <p className="team-description">
                        Designers, developers, strategists, producers, specialists & storytellers.
                    </p>
                    <div className="team-section">
                        <div className="team-grid">
                            {teamMembers.map((member, index) => (
                                <TeamCard
                                    key={index}
                                    image={member.image}
                                    name={member.name}
                                    title={member.title}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TeamSection;
