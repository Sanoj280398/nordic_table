import './Hero.scss'

// Genbruges som sidetoppen på alle sider (billede + overskrift).
// home = forsidens store hero, small = lavere top til undersider.
export default function Hero({ eyebrow, title, image, home = false, small = false, children }) {
  return (
    <section
      className={`hero ${home ? 'hero--home' : ''} ${small ? 'hero--small' : ''}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero__content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
