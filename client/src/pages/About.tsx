import { Landmark, BookOpen, HandHelping } from "lucide-react";
import { aboutInfo } from "@/lib/data";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Naga Chamundeshwari Devasthana</title>
        <meta name="description" content="Learn about the rich history and spiritual significance of the Naga Chamundeshwari Devasthana." />
      </Helmet>
      
      <section className="pt-8 pb-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="section-title">About The Devasthana</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Discover the rich history and spiritual significance of the Naga Chamundeshwari Devasthana, 
              a sacred place of worship for generations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-cinzel font-semibold text-maroon mb-4">{aboutInfo.title}</h2>
              {aboutInfo.history.map((paragraph, index) => (
                <p key={index} className="text-dark mb-4">{paragraph}</p>
              ))}
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1618546420826-f1310de4e9fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
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
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">{aboutInfo.features[0].title}</h3>
              <p className="text-dark">{aboutInfo.features[0].description}</p>
            </div>
            
            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                <Landmark size={24} />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">{aboutInfo.features[1].title}</h3>
              <p className="text-dark">{aboutInfo.features[1].description}</p>
            </div>
            
            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                <HandHelping size={24} />
              </div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">{aboutInfo.features[2].title}</h3>
              <p className="text-dark">{aboutInfo.features[2].description}</p>
            </div>
          </div>
          
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-cinzel font-semibold text-maroon">Devasthana Architecture</h2>
              <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1531061484401-e9bc0cddb228?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
                  alt="Devasthana Architecture" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              <div>
                <p className="text-dark mb-4">
                  The Naga Chamundeshwari Devasthana stands as a testament to ancient architectural brilliance. Built in the 
                  traditional Dravidian style with influences of Hoysala architecture, the temple features intricately 
                  carved pillars, majestic gopurams (temple towers), and detailed stone sculptures depicting various 
                  deities and mythological stories.
                </p>
                <p className="text-dark mb-4">
                  The main sanctum houses the divine idol of Goddess Chamundeshwari in her fierce form, adorned with 
                  exquisite jewels and decorations. The temple complex also includes smaller shrines dedicated to 
                  various deities, a spacious courtyard for religious gatherings, and a sacred pond.
                </p>
                <p className="text-dark">
                  Every element of the temple architecture follows ancient Vastu Shastra principles, creating a harmonious 
                  space that enhances spiritual energy and devotion. The temple's orientation, proportions, and artistic 
                  elements all contribute to its sacred atmosphere.
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
            <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">The Divine Vision</h3>
            <p className="text-dark mb-4">
              According to legend, in the 12th century, a local ruler named Raja Vikramaditya was once hunting in the 
              dense forest that once covered this area. Lost and exhausted, he rested under a banyan tree and fell asleep. 
              In his dream, Goddess Chamundeshwari appeared to him, instructing him to build a temple at that very spot.
            </p>
            <p className="text-dark mb-4">
              When the king woke up, he found a natural stone formation that resembled the divine form of the goddess. 
              Taking this as a divine sign, he immediately ordered the construction of a temple around this natural 
              formation. It is said that during the construction, many supernatural events occurred, confirming the 
              divine presence at the site.
            </p>
            <p className="text-dark">
              To this day, devotees believe that prayers offered at this temple with sincere devotion are answered, 
              particularly those related to overcoming obstacles and seeking protection from negative influences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">The Sacred Spring</h3>
              <p className="text-dark">
                Behind the main temple is a sacred spring known as "Amrita Kundam" (Nectar Pond). Legend has it that 
                this spring appeared when the goddess struck the ground with her trident to provide water for her thirsty 
                devotees. The water from this spring is believed to have healing properties, and many devotees take it 
                home in small containers for its purported medicinal benefits.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">The Annual Miracle</h3>
              <p className="text-dark">
                Every year during the annual temple festival, a remarkable phenomenon occurs. As the first rays of the 
                rising sun enter the temple on the main festival day, they illuminate the face of the goddess for exactly 
                three minutes. This precise architectural alignment happens only on this particular day and is considered 
                a divine blessing by devotees who gather in large numbers to witness this auspicious event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
