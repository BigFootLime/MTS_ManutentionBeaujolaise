'use client'

import { useEffect, useState } from 'react'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Button } from '@/components/Button'
import { StylizedImage } from '@/components/StylizedImage'
import { GridList, GridListItem } from '@/components/GridList'
import { getProducts } from '../../utils/CallApi'

export const metadata = {
  title: 'Vente de Gerbeurs et Chariots Élévateurs',
  description:
    'Découvrez notre sélection de gerbeurs et de chariots élévateurs pour vos besoins de manutention.',
}

function ProductSection({ product }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              src={
                product.images.length > 0
                  ? product.images[0].fileId
                  : '/placeholder.jpg'
              } // Use a placeholder image if none are provided
              alt={product.name || 'Produit'}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {product.name || 'Nom non disponible'}
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              {product.comment || 'Pas de description disponible.'}
            </p>
            <p className="mt-2 text-lg font-bold text-neutral-800">
              {product.priceHT
                ? `${product.priceHT} € HT`
                : 'Prix non disponible'}
            </p>
            <ul className="mt-4 text-sm text-neutral-600">
              <li>Marque : {product.brand || 'Non spécifiée'}</li>
              <li>Année : {product.year || 'Non spécifiée'}</li>
              <li>Type : {product.type || 'Non spécifié'}</li>
              <li>
                Capacité de levage :{' '}
                {product.liftingCapacity || 'Non spécifiée'}
              </li>
              <li>
                Hauteur de levage : {product.liftingHeight || 'Non spécifiée'}
              </li>
              <li>Mât : {product.mastType || 'Non spécifié'}</li>
              <li>État : {product.condition || 'Non spécifié'}</li>
              <li>Disponibilité : {product.availability || 'Non spécifiée'}</li>
            </ul>
            <Button href={`/product/${product._id}`} className="mt-8">
              Plus de détails
            </Button>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts()
        const data = await response.json()
        console.log('Fetched products:', data)

        // Handle cases where data is a single object or an array
        if (Array.isArray(data)) {
          setProducts(data) // API returned an array of products
        } else if (data && typeof data === 'object') {
          setProducts([data]) // API returned a single product
        } else {
          setProducts([]) // API returned unexpected data
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <PageIntro
        eyebrow="Nos Produits"
        title="Découvrez nos solutions de manutention"
      >
        <p>
          Manutention Beaujolaise vous propose une sélection de gerbeurs et de
          chariots élévateurs adaptés aux professionnels, que ce soit pour le
          secteur viticole, industriel ou artisanal.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <>
            {console.log('Products state:', products)}
            {products.length > 0 ? (
              products.map((product) => (
                <ProductSection key={product._id} product={product} />
              ))
            ) : (
              <p>Aucun produit disponible pour le moment.</p>
            )}
          </>
        )}
      </div>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <GridList>
          <GridListItem title="Qualité Garantie">
            Tous nos équipements sont sélectionnés pour leur durabilité et leur
            performance.
          </GridListItem>
          <GridListItem title="Service Après-Vente">
            Nous assurons le suivi et l'entretien de votre matériel pour une
            utilisation sans souci.
          </GridListItem>
          <GridListItem title="Livraison Rapide">
            Grâce à notre camion poids lourd, nous livrons dans les meilleurs
            délais.
          </GridListItem>
        </GridList>
      </Container>

      <ContactSection />
    </>
  )
}
