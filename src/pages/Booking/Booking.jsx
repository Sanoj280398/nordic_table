import Hero from '../../components/Hero/Hero.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import BookingForm from './BookingForm.jsx'
import { openingHours, contact } from '../../data/info.js'
import headerBg from '../../assets/images/headerbg.png'
import './Booking.scss'

// "Tirsdag – torsdag kl. 17–22. ... Mandag lukket." – åbne dage først
const hoursText = [
  ...openingHours.filter((h) => h.open !== null).map((h) => `${h.days} kl. ${h.open}–${h.close}.`),
  ...openingHours.filter((h) => h.open === null).map((h) => `${h.days} lukket.`),
].join(' ')

export default function Booking() {
  return (
    <>
      <Hero small eyebrow="Reservationer" title="Book dit bord" image={headerBg}>
        <p>Vi glæder os til at modtage dig. Book dit bord nedenfor, og vi sørger for resten.</p>
      </Hero>

      <div className="booking">
        <section className="booking__intro" aria-labelledby="info-heading">
          <p className="eyebrow">Gæstfrihed</p>
          <h2 id="info-heading">Velkomst fra højre ben</h2>
          <hr />
          <p className="booking__lead">
            Vi ønsker at give dig og dine gæster den bedst mulige oplevelse.
            Her er hvad du skal vide inden dit besøg.
          </p>

          <ul className="info-cards">
            <li className="info-card">
              <Icon name="cutlery" size={28} />
              <div>
                <h3>Bordstørrelse</h3>
                <p>Vi tager imod selskaber fra 1 til 12 personer. Kontakt os direkte for større selskaber.</p>
              </div>
            </li>
            <li className="info-card">
              <Icon name="clock" size={28} />
              <div>
                <h3>Åbningstider</h3>
                <p>{hoursText}</p>
              </div>
            </li>
            <li className="info-card">
              <Icon name="phone" size={28} filled />
              <div>
                <h3>Kontakt</h3>
                <p>
                  Ring på <a href={`tel:${contact.phone.replaceAll(' ', '')}`}>{contact.phone}</a> eller
                  skriv til <a href={`mailto:${contact.email}`}>{contact.email}</a> ved spørgsmål.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <BookingForm />
      </div>
    </>
  )
}
