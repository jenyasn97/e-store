import Button from "../Button";
import "./BannersSection.scss";

const banners = [
  {
    title: "Popular Products",
    titleAccent: "",
    text: "iPad combines a magnificent 10.2-inch Retina display...",
    img: "/images/popular-products.svg",
    class: "--white",
    imageClass: "--popular-products",
  },
  {
    title: "Ipad Pro",
    titleAccent: "Pro",
    text: "iPad combines a magnificent 10.2-inch Retina display...",
    img: "/images/ipad-pro-39abee.png",
    class: "--light",
    imageClass: "--ipad-pro",
  },
  {
    title: "Samsung Galaxy",
    titleAccent: "Galaxy",
    text: "iPad combines a magnificent 10.2-inch Retina display...",
    img: "/images/samsung-galaxy-7d019b.png",
    class: "--gray",
    imageClass: "--samsung-galaxy",
  },
  {
    title: "Macbook Pro",
    titleAccent: "Pro",
    text: "iPad combines a magnificent 10.2-inch Retina display...",
    img: "/images/macbook-pro-42fce2.png",
    class: "--dark",
    imageClass: "--macbook-pro",
  },
];

export default function BannersSection() {
  return (
    <section className="banners-section">
      {banners.map((b) => (
        <article key={b.title} className={`banners-section__item banners-section__item${b.class}`}>
          <div className={`banners-section__image banners-section__image${b.imageClass}`}>
            <img src={b.img} alt={b.title} />
          </div>
          <div className="banners-section__content">
            <h3
              className={`banners-section__title ${
                b.class === "--dark" ? "banners-section__title--white" : ""
              }`}>
              {b.titleAccent ? (
                <>
                  {b.title.replace(b.titleAccent, "")}
                  <span className="banners-section__title-accent">{b.titleAccent}</span>
                </>
              ) : (
                b.title
              )}
            </h3>
            <p className="banners-section__text">{b.text}</p>
            <Button variant={b.class === "--dark" ? "white-stroke" : "black-stroke"} to="/catalog">
              Shop Now
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
}
