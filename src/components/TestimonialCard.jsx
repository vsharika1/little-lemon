import "../styles/TestimonialCard.css";

function TestimonialCard(props) {
    // Function to generate star rating dynamically
    const renderStars = (rating) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="star filled">★</span>); // Filled star
            } else {
                stars.push(<span key={i} className="star">☆</span>); // Empty star
            }
        }
        return stars;
    };

    return (
        <div className="testimonial-card">
            <div className="testimonial-card-header">
                <img className="user-image" src={props.image} alt={props.username} />
                <p className="username">{props.username}</p>
            </div>
            <div className="testimonial-card-content">
                <div className="star-rating">
                    {renderStars(props.rating)}
                </div>
                <p className="review">{props.review}</p>
            </div>
        </div>
    );
}

export default TestimonialCard;