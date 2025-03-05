import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoFamilyFund from '@/images/team/benjamin-russel.jpg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import ImgBoss from '@/images/team/benjamin-russel.jpg'
import logoUnseal from '@/images/team/benjamin-russel.jpg'
import imageLaptop from '@/images/laptop.jpg'
import chariot1 from '@/images/chariots/imgChariot1.jpg'
import chariot2 from '@/images/chariots/imgChariot2.jpg'
import chariot3 from '@/images/chariots/imgChariot3.jpg'
import chariot4 from '@/images/chariots/imgChariot4.jpg'
import chariot5 from '@/images/chariots/imgChariot5.jpg'
import chariot6 from '@/images/chariots/imgChariot6.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

const clients = [
  ['Christophe THOMASSONI', ImgBoss],
  ['Thibaud CHAUDY', logoFamilyFund],
  ['Marcelin', logoUnseal],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-[#0000f1] py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          {/* <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Voici notre équipe chez Manutention Beaujolaise
          </h2> */}
          <div className="h-px flex-auto bg-neutral-400" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {/* {clients.map(([client, profilePic]) => (
              <li key={client} className="flex flex-col items-center">
                <FadeIn>
                  <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-white">
                    <Image
                      src={profilePic}
                      alt={client}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                </FadeIn>
                <p className="mt-4 text-center text-white">{client}</p>
              </li>
            ))} */}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Notre entreprise, au coeur du Beaujolais"
        className="mt-24 text-[#0000f1] sm:mt-32 lg:mt-40"
      >
        <p>
          L&apos;entreprise Manutention Beaujolaise a été créée en 2005 par
          Christophe Thomassoni, fort d’une expérience de plus de 30 ans dans la
          réparation des engins de manutention. Implantée au cœur des vignes du
          Beaujolais, à Blacé, en région Rhône-Alpes, notre entreprise connaît
          parfaitement les besoins spécifiques en manutention du milieu
          viticole, mais aussi ceux de l&apos;industrie, de
          l&apos;agroalimentaire et de l’artisanat. <br />
          <br />
          Avec une équipe composée de deux techniciens et d’une secrétaire
          comptable assistante de direction, nous mettons à disposition de nos
          clients notre expertise et notre savoir-faire accumulés depuis 1990.
          Nos activités principales incluent le dépannage et l’entretien de
          chariots élévateurs toutes marques, gerbeurs et transpalettes, avec un
          rayon d’intervention d’environ 50 km autour de notre atelier pour
          garantir une réactivité optimale.
        </p>
      </SectionIntro>
      {/* <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container> */}
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Nous sommes spécialisés dans le dépannage, l’entretien, et la rénovation d’engins de manutention."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Nous mettons un point d’honneur à répondre aux besoins spécifiques de
          nos clients, qu’ils soient issus du milieu viticole, de l’industrie,
          ou de l’artisanat.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={chariot2}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Dépannage rapide">
              Grâce à nos deux véhicules atelier tout équipés, nous intervenons
              en général dans les 24 heures pour les révisions, diagnostics,
              dépannage hydraulique ou électrique, remplacement de pneus,
              batteries, etc.
            </ListItem>
            <ListItem title="Rénovation et vente de matériel d’occasion">
              Un atelier dédié nous permet d’effectuer des rénovations
              importantes, comme le remplacement de joints de culasse ou la
              réparation de moteurs complets.
            </ListItem>
            <ListItem title="Vente de pièces détachées">
              Nous proposons une large gamme de pièces détachées et accessoires,
              adaptés à tous types d’équipements.
            </ListItem>
            <ListItem title="Livraison et transport">
              Notre camion poids lourd et remorque abaissable permettent une
              livraison efficace de matériels et équipements.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'We are a development studio working at the intersection of design and technology.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section: Title and Paragraph */}
          <FadeIn className="max-w-3xl lg:w-1/2">
            <h1 className="font-display text-5xl font-medium tracking-tight text-[#0000f1] [text-wrap:balance] sm:text-7xl">
              Une expertise depuis 2005.
            </h1>
            <p className="mt-6 text-xl text-neutral-500">
              Vente en ligne de matériel de manutention et de stockage pour les
              professionnels et les particuliers, nous mettons plus de 30 ans
              d&apos;experience à votre service.
            </p>
          </FadeIn>

          {/* Right Section: StylizedImage */}
          <FadeIn className="mt-12 w-[33.75rem] flex-none lg:mt-0 lg:w-[45rem]">
            <StylizedImage
              src={chariot4}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end"
            />
          </FadeIn>
        </div>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        Des gars super sympa, matériel en très bon état, propre, rangé. Je
        recommande
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
