const ReviewItem = ({ item, index, marginBottom }) => {
  const stars = [ '', '', '', '', '' ];
    
  return (
    <>   
      <div className={`sb-review-card sb-mb-${marginBottom}`}>
        <div className="sb-review-header sb-mb-15">
            <h4 className="sb-mb-10">{item.title}</h4>
            <ul className="sb-stars">
                {stars.slice(0, item.rating).map((star_item, star_key) => (
                <li key={`testimonial-item-${index}-rating-star-${star_key}`}><i className="fas fa-star"></i></li>
                ))}
            </ul>
        </div>
        <p className="sb-text sb-mb-15">{item.text}</p>
        <div className="sb-author-frame">
            <div className="sb-avatar-frame">
                <img src={item.image} alt={item.name} />
            </div>
            <h4>{item.name}</h4>
        </div>
      </div>
    </>
  );
};
export default ReviewItem;
