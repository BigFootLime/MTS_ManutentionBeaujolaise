import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import imageChristopheThomassoni from '@/images/team/leonard-krasner.jpg'
import imageThibaudChaudy from '@/images/team/michael-foster.jpg'
import imageTechnicien1 from '@/images/team/blake-reid.jpg'
import imageTechnicien2 from '@/images/team/dries-vincent.jpg'
import imageSecretaireComptable from '@/images/team/chelsea-hagon.jpg'

import { loadArticles } from '@/lib/mdx'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-[#0000f1] py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Notre culture"
        title="Allier passion et engagement."
        invert
      >
        <p>
          Nous sommes une équipe unie partageant des valeurs communes pour
          offrir le meilleur à nos clients.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Engagement" invert>
            Notre équipe est dédiée à répondre aux besoins de nos clients avec
            réactivité et professionnalisme.
          </GridListItem>
          <GridListItem title="Confiance" invert>
            Nous établissons des relations solides et transparentes avec nos
            partenaires et collaborateurs.
          </GridListItem>
          <GridListItem title="Expertise" invert>
            Forts de plus de 30 ans d’expérience, nous mettons un savoir-faire
            éprouvé au service de nos clients.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Direction',
    people: [
      {
        name: 'Christophe Thomassoni',
        role: 'Fondateur / Président',
        image: { src: imageChristopheThomassoni },
      },
      {
        name: 'Thibaud Chaudy',
        role: 'Associé / Responsable Technique',
        image: { src: imageThibaudChaudy },
      },
    ],
  },
  {
    title: 'Équipe',
    people: [
      {
        name: 'Marcelin Thomassoni',
        role: 'Technicien de maintenance',
        image: { src: imageTechnicien1 },
      },

      {
        name: 'Secrétaire Comptable',
        role: 'Assistante de direction',
        image: { src: imageSecretaireComptable },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Qui sommes nous',
  description: 'Notre force réside dans notre expérience et notre proximité',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <>
      <PageIntro
        eyebrow="Qui sommes nous"
        title="Notre force réside dans notre expérience et notre proximité"
      >
        <p>
          Nous croyons fermement que notre force repose sur notre expérience
          et notre capacité à répondre aux demandesde nos clients etn vente occasion et reparations.

        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Manutention Beaujolaise, fondée en 2005 par Christophe Thomassoni,
            s’appuie sur plus de 30 ans d’expérience dans le domaine de la
            réparation et de l’entretien des engins de manutention. Depuis sa
            création, l’entreprise met un point d’honneur à offrir un service de
            proximité et une réactivité optimale à ses clients.
          </p>
          <p>
            Nous intervenons principalement dans le dépannage, l’entretien et la
            rénovation d’équipements tels que les chariots élévateurs,
            transpalettes et gerbeurs. Grâce à nos deux véhicules atelier tout
            équipés et à une équipe dévouée, nous nous engageons à intervenir
            dans les 24 heures pour assurer la continuité d’activité de nos
            clients, qu’ils soient issus du milieu viticole, industriel ou
            artisanal.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="2" label="Techniciens" />
          <StatListItem value="1" label="Secrétaire Comptable" />
          <StatListItem value="1" label="Président" />
        </StatList>
      </Container>

      <Culture />

      {/* <Team /> */}

      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      /> */}

      <ContactSection />
    </>
  )
}
