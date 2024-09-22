import "../styles/About.css";
import Chef1 from "../assets/chef1.jpg";
import Chef2 from "../assets/chef2.jpg";

function About() {
  return (
    <div className="about-container">
      <div id="content">
        <h1 className="about-title">About Us</h1>
        <p>
          Little Lemon began as a small, family-run café in 2018, nestled in a charming neighborhood with a passion for fresh, zesty flavors. Founded by two brothers who shared a love for Mediterranean cuisine, the restaurant quickly gained popularity for its unique twist on classic dishes, infused with the vibrant taste of lemons. What started as a humble café soon expanded into a full-fledged restaurant chain, known for its commitment to quality ingredients and healthy, flavorful meals. With a vision to offer a refreshing dining experience, Little Lemon has grown steadily, continuing to delight customers with its blend of bold flavors, warm hospitality, and innovative dishes that celebrate the zest for life.
        </p>
      </div>
      <div id="chefs-images">
        <img className="chef-image" src={Chef1} alt="2 chefs cooking" />
        <img className="chef-image" src={Chef2} alt="1 chef cooking" />
      </div>
    </div>
  );
}

export default About;