"use client";
import Image from "next/image";
import { Footer } from "@/components/footer";

export default function AboutUs() {
  return (
    <main>
      <section id="about" className="w-full py-20 bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-primary">
            About Us
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
            Welcome to Olshani Properties — Where Nairobi’s skyline meets your dream home
          </p>

          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            At Olshani Properties, we believe that a home is more than four walls — it’s where you breathe,
            unwind, and live your best story. We specialize in curating premium living spaces in Nairobi’s most
            sought-after neighborhoods, delivering not just apartments, but elevated lifestyles infused with comfort,
            style, and unmatched convenience.
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-semibold text-primary">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              What started as a vision to redefine urban living in Nairobi quickly grew into a mission: build elegant,
              modern residences that reflect the aspirations of today’s homeowners. We noticed a gap — many new
              developments promised luxury, but few delivered on both design and genuine living experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              So we set out to change that. With careful planning, contemporary design, and a deep understanding of what
              modern Nairobi residents crave, we craft developments with meaning. Each project — from studios to
              4-bedroom apartments with DSQ — reflects our commitment to quality and lifestyle-focused living.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-semibold text-primary">What Sets Us Apart</h3>
            <ul className="list-inside space-y-3 text-muted-foreground">
              <li className="pl-4 border-l border-primary">

              </li>
              <li className="pl-4 border-l border-primary">
                Diverse Options — from cozy 1-bedroom units to spacious 4-bedroom + DSQ apartments.
              </li>
              <li className="pl-4 border-l border-primary">
                Transparency & Trust — clear pricing, visible amenities, and honest availability.
              </li>
              <li className="pl-4 border-l border-primary">
                Rooted in Nairobi — developments chosen for convenience, connectivity, and comfort.
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-2xl font-semibold text-primary">Who We Are</h3>
            <p className="text-muted-foreground leading-relaxed">
              We’re a passionate team of real-estate professionals, architects, and lifestyle enthusiasts — united by a
              simple goal: create homes that welcome you, inspire you, and grow with you.
            </p>
          </div>

          {/* <div className="space-y-6 mb-12">
            <h3 className="text-2xl font-semibold text-primary">Meet the Team</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <article className="flex flex-col items-center text-center p-4 bg-card rounded-lg">
                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden bg-muted">
                  <Image src="/team/alice.jpg" alt="Irene" width={112} height={112} className="object-cover" />
                </div>
                <h4 className="font-semibold text-primary">Irene Ndegwa</h4>
                <p className="text-sm text-muted-foreground">Founder & Head of Development</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Leads design and delivery across projects with a focus on quality and resident experience.
                </p>
              </article>

              <article className="flex flex-col items-center text-center p-4 bg-card rounded-lg">
                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden bg-muted">
                  <Image src="/team/john.jpg" alt="John Otieno" width={112} height={112} className="object-cover" />
                </div>
                <h4 className="font-semibold text-primary">John Otieno</h4>
                <p className="text-sm text-muted-foreground">Technical Director</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Oversees construction, engineering and ensures projects meet safety and performance standards.
                </p>
              </article>

              <article className="flex flex-col items-center text-center p-4 bg-card rounded-lg">
                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden bg-muted">
                  <Image src="/team/rita.jpg" alt="Rita Kamau" width={112} height={112} className="object-cover" />
                </div>
                <h4 className="font-semibold text-primary">Rita Kamau</h4>
                <p className="text-sm text-muted-foreground">Head of Sales & Customer Relations</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Manages client relationships, sales and post-sale support to ensure a smooth customer journey.
                </p>
              </article>
            </div>
          </div> */}

          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-semibold text-primary">Our Promise</h3>
            <p className="text-muted-foreground leading-relaxed">
              Whether you’re hunting for your first home or upgrading to a luxury apartment, we promise a seamless
              experience, transparent information, and a living space designed to elevate your everyday life.
            </p>

            <p className="mt-4 text-muted-foreground">
              Ready to discover your luxury lifestyle? Browse our projects, pick your favorite, or get in touch — we’re
              here to help you find a home that feels just right.
            </p>

            <div className="mt-6 text-sm text-muted-foreground">
              <div>
                Contact us: <a href="tel:0702168686" className="text-primary">0702 168 686</a> |{" "}
                <a href="mailto:info@olshaniproperties.co.ke" className="text-primary">info@olshaniproperties.co.ke</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}