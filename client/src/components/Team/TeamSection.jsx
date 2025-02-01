import React from "react";
// import TeamCard from "../Team/TeamCard";
import "../../styles/TeamSection.css";
import boi from "../../assets/boypic.jpg";
import girl from "../../assets/girlpic.jpg";

function TeamSection() {
    const Member = ({image,name, description,iconClass2,iconClassRef2, iconClass3,iconClassRef3}) => (
        <div className="member-card">
            <div className="member-image">
                <img src={image} alt="image" />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="member-icon">
                <a href={iconClassRef2} target="_blank"><i className={iconClass2}></i></a>
                <a href={iconClassRef3} target="_blank"><i className={iconClass3}></i></a>
            </div>
        </div>
    );
    return (
        <>
            <section>
                <div className="members" id="members">
                    <h2>Our Team</h2>
                    <div className="members-grid">
                        <Member
                            image={boi}
                            name="Ehsaas Nahata"
                            description="245523748018"
                            iconClass2="fa-brands fa-github icon"
                            iconClassRef2= {"https://github.com/EhsaasN"}
                            iconClass3="fa-brands fa-linkedin icon"
                            iconClassRef3= {"linkedin.com/in/ehsaas-nahata-836544347"}
                        />
                        <Member
                            image={boi}
                            name="Aditya Vidiyala"
                            description="245523748065"
                            iconClass2="fa-brands fa-github icon"
                            iconClassRef2= {"https://github.com/adityavidiyala"}
                            iconClass3="fa-brands fa-linkedin icon"
                            iconClassRef3= {"https://www.linkedin.com/in/aditya-vidiyala-45686628b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}
                        />
                        <Member
                            image={boi}
                            name="Kanduri Adithya"
                            description="245523748091"
                            iconClass2="fa-brands fa-github icon"
                            iconClassRef2= {"https://github.com/kadithya-16"}
                            iconClass3="fa-brands fa-linkedin icon"
                            iconClassRef3= {"https://www.linkedin.com/in/adithya-kanduri-997547330"}
                        />
                        <Member
                            image={boi}
                            name="Udit Kandi"
                            description="245523748122"
                            iconClass2="fa-brands fa-github icon"
                            iconClassRef2= {""}
                            iconClass3="fa-brands fa-linkedin icon"
                            iconClassRef3= {""}
                        />
                        <Member
                            image={boi}
                            name="T Sai Krishna"
                            description="245523748121"
                            iconClass2="fa-brands fa-github icon"
                            iconClassRef2= {"https://github.com/Sai-Krishna-Nair"}
                            iconClass3="fa-brands fa-linkedin icon"
                            iconClassRef3= {"https://www.linkedin.com/in/sai-krishna-nair-2b4501306"}
                        />
                        <Member
                            image={girl}
                            name="Nigama Reddy V"
                            description="245523748124"
                            iconClass2="fa-brands fa-github icon"
                            iconClassRef2= {"https://github.com/Nigama-Reddy-V"}
                            iconClass3="fa-brands fa-linkedin icon"
                            iconClassRef3= {"linkedin.com/in/nigama-reddy-887496300"}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default TeamSection;
