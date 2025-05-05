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
import atelierMB from '@/images/chariots/ImgAtelierMB.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

const clients = [
  ['Christophe THOMASSONI', ImgBoss],
  ['Thibaud CHAUDY', logoFamilyFund],
  ['Marcelin', logoUnseal],
]

function Clients() {
  return (
    <div>
    </div>
    // <div className="mt-24 rounded-4xl bg-[#0000f1] py-20 sm:mt-32 sm:py-32 lg:mt-56">
    //   <Container>
    //     <FadeIn className="flex items-center gap-x-8">
    //       {/* <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
    //         Voici notre équipe chez Manutention Beaujolaise
    //       </h2> */}
    //       <div className="h-px flex-auto bg-neutral-400" />
    //     </FadeIn>
    //     <FadeInStagger faster>
    //       <ul
    //         role="list"
    //         className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
    //       >
    //         {/* {clients.map(([client, profilePic]) => (
    //           <li key={client} className="flex flex-col items-center">
    //             <FadeIn>
    //               <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-white">
    //                 <Image
    //                   src={profilePic}
    //                   alt={client}
    //                   className="h-full w-full object-cover"
    //                   unoptimized
    //                 />
    //               </div>
    //             </FadeIn>
    //             <p className="mt-4 text-center text-white">{client}</p>
    //           </li>
    //         ))} */}
    //       </ul>
    //     </FadeInStagger>
    //   </Container>
    // </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Texte à gauche (ou en haut sur mobile) */}
        <div className="lg:w-1/2">
          <SectionIntro
            title="Notre entreprise, au coeur du Beaujolais"
            className="text-[#0000f1]"
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
            </p>
          </SectionIntro>
        </div>

        {/* Image à droite (ou en bas sur mobile) */}
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <Image
            src={atelierMB} // Ensure the path is correct for next/image
            alt="Notre entreprise à Blacé"
            width={800} // Replace with the actual width of the image
            height={600} // Replace with the actual height of the image
            className="w-full h-auto object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </Container>

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
          nos clients.
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
              Grâce à nos deux véhicules atelier tout
              équipés, nous intervenons en général dans les 24 heures pour
              les révisions, diagnostics, dépannage hydraulique ou électrique,
              remplacement de pneus, batteries, etc.
            </ListItem>
            <ListItem title="Rénovation et vente de matériel d’occasion">
              Un atelier dédié nous permet d’effectuer des rénovations
              importantes, comme les rénovations de moteurs ou de mât...
            </ListItem>
            <ListItem title="Vente de pièces détachées">
              Nous proposons la vente de pièces
              détachées et accessoires pour chariots élévateurs gerbeurs et
              transpalettes.
            </ListItem>
            <ListItem title="Livraison et transport">
              Notre camion poids lourd et notre remorque 1.5t abaissable nous permettent la
              livraison de nos matériels et équipements.
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
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Left Section: Texts stacked vertically */}
          <div className="flex flex-col gap-16 max-w-3xl lg:w-1/2">
            <FadeIn>
              <h1 className="font-display text-5xl font-medium tracking-tight text-[#0000f1] [text-wrap:balance] sm:text-7xl">
                2005-2025.
              </h1>
              <p className="mt-6 text-xl text-neutral-500">
                Après 20 ans d’existence, le spécialiste du gerbeur d’occasion devient <br />
                <span className="font-semibold text-[#0000f1]">MANUTENTION BEAUJOLAISE SAS</span>.
                <br />
                Thibaud Chaudy rejoint Christophe Thomassoni. C’est l’association de
                l’expérience et du dynamisme à votre service.
              </p>
            </FadeIn>

            <FadeIn>
              <h1 className="font-display text-4xl font-medium tracking-tight text-[#0000f1] [text-wrap:balance] sm:text-5xl">
                2 Activités principales.
              </h1>
              <p className="mt-6 text-xl text-neutral-500">
                <span className="font-semibold text-[#0000f1]">La vente d&apos;occasion</span> <br />
                Nous possédons un stock de gerbeurs et chariot élévateurs
                occasion pour satisfaire vos diverses demandes.
              </p>
              <p className="mt-6 text-xl text-neutral-500">
                <span className="font-semibold text-[#0000f1]">La réparation toutes marques </span> <br />
                Nous intervenons chez vous pour réparer tout type de chariot
                industriel et de magasinage dans les 24h.
              </p>
            </FadeIn>
          </div>

          {/* Right Section: Image stays the same */}
          <FadeIn className="mt-12 w-full lg:mt-0 lg:w-[45rem] lg:flex-none ">
            {/* Image simple sur mobile */}
            <div className="block lg:hidden mx-auto max-w-[90%]">
              <Image
                src={chariot4}
                alt="Chariot élévateur"
                className="rounded-xl object-contain w-full h-auto"
                width={600}
                height={600}
              />
            </div>

            {/* StylizedImage sur desktop */}
            <div className="hidden lg:block">
              <StylizedImage
                src={chariot4}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="ml-auto lg:translate-x-20"
              />
            </div>
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
