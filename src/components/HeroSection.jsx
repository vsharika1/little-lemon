import "../styles/HeroSection.css"
import restaurantImg from "../assets/restaurant-inside.jpg"

function HeroSection() {
    return (
        <div id="main-container-hero">
            <div id="content">
                <h1>Little Lemon</h1>
                <h3>Chicago</h3>
                <p>Little Lemon is a vibrant and contemporary restaurant chain offering a fresh take on dining with a focus on zesty, flavorful dishes. Inspired by the lively essence of lemons, our menu blends bold flavors and healthy ingredients, bringing a refreshing twist to classic and modern cuisine.</p>
            </div>
            <div id="image">
                <img src={restaurantImg} alt="Restaurant setting" />
            </div>
        </div>
    );
}

export default HeroSection;