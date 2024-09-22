import "../styles/Highlights.css"
import HighlightsCard from "./HighlightsCard";
import LemonGrilledChicken from "../assets/lemon-grilled-chicken.webp"
import ShrimpAvacadoSalad from "../assets/shrimp-avacado-salad.jpg"
import LemonRicottaPasta from "../assets/lemon-ricotta-pasta.jpg"

function Highlights() {
    return (
        <div id="highlights-container">
            <div id="highlights-header">
                <h2 className="highlights-title">Today's Specials</h2>
                <button id="view-menu-button" className="button-primary">View Menu</button>
            </div>
            <div id="highlights-cards">
                <HighlightsCard 
                    image={LemonGrilledChicken} 
                    name={"Zesty Lemon Herb Grilled Chicken"} 
                    description={"A perfectly grilled chicken breast marinated in fresh lemon juice, olive oil, and a blend of Mediterranean herbs, served with a side of roasted vegetables and garlic-infused couscous."} 
                    price={"$14.99"} 
                />
                <HighlightsCard 
                    image={ShrimpAvacadoSalad} 
                    name={"Citrus Shrimp Avocado Salad"} 
                    description={"A refreshing salad of juicy shrimp tossed in a tangy lemon vinaigrette, paired with ripe avocado, mixed greens, cherry tomatoes, and quinoa, topped with a light drizzle of balsamic glaze."} 
                    price={"$12.99"} 
                />
                <HighlightsCard 
                    image={LemonRicottaPasta} 
                    name={"Lemon Ricotta Pasta with Spinach"} 
                    description={"Al dente pasta tossed in a creamy lemon ricotta sauce, sautéed spinach, and a sprinkle of Parmesan cheese, finished with fresh lemon zest for a bright and flavorful finish."} 
                    price={"$11.49"} 
                />
            </div>
        </div>
    );
}

export default Highlights;