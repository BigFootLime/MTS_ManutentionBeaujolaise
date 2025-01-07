import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import ContactForm from './ContactForm'
import ContactDetails from './ContactDetails'

export const metadata: Metadata = {
  title: 'Contactez-nous - Manutention Beaujolaise',
  description:
    'Besoin d’une solution de manutention ? Contactez-nous dès aujourd’hui pour discuter de vos projets.',
}

export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Contactez-nous"
        title="Discutons de vos besoins en manutention"
      >
        <p>
          Nous sommes là pour vous accompagner dans vos projets de manutention
          et de logistique.
        </p>
      </PageIntro>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
