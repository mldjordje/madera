import FaqItem from "@components/faq/FaqItem";

const FaqGrid = ({ items, categoryKey }) => {
  return (
    <>
      <div className="col-lg-6">
        <ul className="sb-faq">
            {items.slice(0, items.length/2).map((item, key) => (
                <FaqItem item={item} key={key} categoryKey={categoryKey} />
            ))}
        </ul>
      </div>
      <div className="col-lg-6">
        <ul className="sb-faq">
            {items.slice(items.length/2, items.length).map((item, key) => (
                <FaqItem item={item} key={key} categoryKey={categoryKey} />
            ))}
        </ul>
      </div>
    </>
  );
};
export default FaqGrid;