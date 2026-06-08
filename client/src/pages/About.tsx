import { Landmark, BookOpen, HandHelping } from "lucide-react";
import { aboutInfo } from "@/lib/data";
import { Helmet } from "react-helmet";
import nagaHistoryImg from "@assets/NagaHistory_1772604544742.jpeg";
import nagaFounderImg from "@assets/NagaFounder_1772605121075.jpeg";
import nagaStaffImg from "@assets/WhatsApp_Image_2026-03-03_at_9.23.26_AM_(1)_1772605139373.jpeg";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Naga Chamundeshwari Devasthana</title>
        <meta
          name="description"
          content="Learn about the rich history and spiritual significance of the Naga Chamundeshwari Devasthana."
        />
      </Helmet>

      <section className="pt-8 pb-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="section-title">About The Devasthana</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Discover the rich history and spiritual significance of the Naga
              Chamundeshwari Devasthana, a sacred place of worship for
              generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-cinzel font-semibold text-maroon mb-4">
                {aboutInfo.title}
              </h2>
              {aboutInfo.history.map((paragraph, index) => (
                <p key={index} className="text-dark mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <img
                src={nagaHistoryImg}
                alt="Temple Historical Image"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">
                {aboutInfo.features[0].title}
              </h3>
              <p className="text-dark">{aboutInfo.features[0].description}</p>
            </div>

            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                <Landmark size={24} />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">
                {aboutInfo.features[1].title}
              </h3>
              <p className="text-dark">{aboutInfo.features[1].description}</p>
            </div>

            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                <HandHelping size={24} />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">
                {aboutInfo.features[2].title}
              </h3>
              <p className="text-dark">{aboutInfo.features[2].description}</p>
            </div>
          </div>

          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-cinzel font-semibold text-maroon">
                Devasthana Architecture
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <img
                  src={nagaFounderImg}
                  alt="Temple Founder"
                  className="w-full rounded-lg shadow-xl"
                  style={{ height: "600px", objectFit: "cover" }}
                />
                <img
                  src={nagaStaffImg}
                  alt="Sacred Staff"
                  className="w-full rounded-lg shadow-xl"
                  style={{ height: "600px", objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="text-dark mb-4">
                  For generations, the family actively participated in both
                  religious and social service activities. Alongside
                  agriculture, they dedicated themselves to supporting the
                  village through charitable initiatives, community programs,
                  and the preservation of cultural traditions.
                </p>
                <p className="text-dark mb-4">
                  One of the notable traditions in Puttenahalli was the annual
                  Banni Tree Branch Cutting Ceremony conducted during
                  Vijayadashami, a significant celebration during the Navaratri
                  festival. This sacred event was closely associated with the
                  worship of Lord Anjaneya Swamy and reflected the village's
                  rich spiritual heritage.
                </p>
                <p className="text-dark mb-4">
                  The vision of establishing Sri Naga Chamundeshwari Temple was
                  inspired by a deep devotion to Goddess Chamundeshwari and Lord
                  Naga Devatha. The founders wished to create a sacred place
                  where devotees could worship and seek divine blessings.
                  Historical accounts mention that even during the Mysore
                  Maharaja's era, special religious ceremonies and cultural
                  traditions honoring Naga Devatha and Chamundeshwari were
                  observed in this region.
                </p>
                <p className="text-dark mb-4">
                  The temple's founder envisioned more than a place of worship.
                  He believed that spirituality should go hand in hand with
                  social responsibility. His dream was to establish institutions
                  that would provide education, food, healthcare, and support to
                  the underprivileged in the name of the Divine Mother.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Devasthana Legends</h2>
            <div className="section-divider"></div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">
              The Divine Vision
            </h3>
            <p className="text-dark mb-4">
              Carrying forward this noble vision, Sri Narendra Swamy established
              and continues to manage the Sri Naga Chamundeshwari Temple Trust
              and the Sri Shakti Naga Kshetra Medical and Education Trust.
              Through these organizations, numerous social welfare initiatives
              have been undertaken for the benefit of society.
            </p>
            <p className="text-dark mb-4">
              Today, the temple serves not only as a spiritual center but also
              as a hub for community development. The Trust actively supports
              the education of deserving students from economically
              disadvantaged backgrounds, assists families with healthcare needs,
              and promotes various charitable activities. Many beneficiaries of
              these programs have successfully pursued higher education,
              including degrees in engineering, law, and other professional
              fields, enabling them to build successful careers and contribute
              positively to society.
            </p>
            <p className="text-dark">
              As part of its future vision, the Trust plans to construct a
              community hall adjacent to the temple. This facility will serve as
              a venue for religious, cultural, educational, and social
              activities, further strengthening community bonds and continuing
              the legacy of service established by the temple's founders.
            </p>
            <p className="text-dark mt-4">
              Sri Naga Chamundeshwari Temple remains a living testament to
              devotion, service, education, and social upliftment—preserving the
              rich heritage of Puttenahalli while inspiring future generations
              to uphold the values of faith and humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">
                The Sacred Spring
              </h3>
              <p className="text-dark">
                Behind the main temple is a sacred spring known as "Amrita
                Kundam" (Nectar Pond). Legend has it that this spring appeared
                When the goddess struck the ground with her trident to provide
                Water for her thirsty devotees. The water from this spring is
                believed to have healing properties, and many devotees take it
                home in small containers for its purported medicinal benefits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">
                The Annual Miracle
              </h3>
              <p className="text-dark">
                Every year during the annual temple festival, a remarkable
                phenomenon occurs. As the first rays of the rising sun enter the
                temple on the main festival day, they illuminate the face of the
                Goddess for exactly three minutes. This precise architectural
                alignment happens only on this particular day and is considered
                a divine blessing by devotees who gather in large numbers to
                Witness this auspicious event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
