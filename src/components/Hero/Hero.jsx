import './Hero.scss'

// Genbruges som sidetoppen på alle sider (billede + overskrift).
// imageDesktop er valgfri – uden den bruges samme billede på alle skærme.
// small = lavere top til undersider.
export default function Hero({ eyebrow, title, image, imageDesktop = image, small = false, children }) {
  return (
    <section
      className={`hero ${small ? 'hero--small' : ''}`}
      style={{ '--hero-img': `url(${image})`, '--hero-img-desktop': `url(${imageDesktop})` }}
    >
      <div className="hero__content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
