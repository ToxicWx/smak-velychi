import './about-gallery.css'

function AboutGallery({ data }) {
  return (
    <section className="about-gallery">
      <h2 className="about-gallery__title">{data.title}</h2>
      <p className="about-gallery__text">{data.text}</p>

      <div className="about-gallery__grid">
        {data.items.map((item) => {
          if (item.type === 'video') {
            return (
              <video
                key={item.id}
                className={`about-gallery__media ${item.wide ? 'about-gallery__media--wide' : ''}`}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )
          }

          return (
            <img
              key={item.id}
              className={`about-gallery__media ${item.wide ? 'about-gallery__media--wide' : ''}`}
              src={item.src}
              alt={item.alt}
            />
          )
        })}
      </div>
    </section>
  )
}

export default AboutGallery