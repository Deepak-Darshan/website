import Tilt from "react-parallax-tilt";

const ProjectCard = ({ title, desc }) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      scale={1.05}
      tiltMaxAngleX={20}
      tiltMaxAngleY={20}
      className="tilt-card"
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
