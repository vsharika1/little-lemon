import "../styles/Testimonials.css"
import TestimonialCard from "./TestimonialCard.jsx"
import User1 from "../assets/user1.jpg"
import User2 from "../assets/user2.jpg"
import User3 from "../assets/user3.jpg"
import User4 from "../assets/user4.jpg"

function Testimonials() {
  return (
    <div id="testimonials-container">
      <div id="testimonials-header">
        <h1>Testimonials</h1>
      </div>
      <div id="testimonial-cards">
        <TestimonialCard
          image={User1}
          username="Rebecca Miller"
          review="This place is amazing! The food was delicious and the service was outstanding."
          rating={5}
        />
        <TestimonialCard
          image={User2}
          username="Jane Smith"
          review="I love the ambiance here. The menu is diverse, and everything I tried was great."
          rating={4}
        />
        <TestimonialCard
          image={User3}
          username="Michael Brown"
          review="The flavors were incredible, but the wait time was a bit long."
          rating={3}
        />
        <TestimonialCard
          image={User4}
          username="Alice Johnson"
          review="A good spot for a casual dinner. The food was solid, but not exceptional."
          rating={4}
        />
      </div>
    </div>
  );
}

export default Testimonials;