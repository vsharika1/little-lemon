import "../styles/HighlightsCard.css"

function HighlightsCard(props) {
    return (
        <div className="highlights-card">
            <img className="highlights-card-image" src={props.image} alt={props.name} />
            <div className="highlights-card-content">
                <h3 className="highlights-card-title">{props.name}</h3>
                <p className="highlights-card-description">{props.description}</p>
                <p className="highlights-card-price">{props.price}</p>
            </div>
        </div>
    );
}

export default HighlightsCard;