'use client'

import { useEffect, useState } from 'react'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { GridList, GridListItem } from '@/components/GridList'
import { GetPicture } from '../../services/files.service'
import { getProducts } from '../../services/products.service'
import { Button } from '@/components/Button'

// export const metadata = {
//   title: 'Vente de Gerbeurs et Chariots Élévateurs',
//   description:
//     'Découvrez notre sélection de gerbeurs et de chariots élévateurs pour vos besoins de manutention.',
// }

function ProductSection({ product }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              src={product.srcURL}
              alt={product.name}
              width={1}
              height={1}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {product.name}
            </h2>
            <p className="mt-6 text-base text-neutral-600">
              {product.description}
            </p>
            <p className="mt-2 text-lg font-bold text-neutral-800">
              {product.priceHT} €
            </p>
            <Button href={`/product/details`} className="mt-8">
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
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const response = await getProducts()
      if (response.status === 200) {
        const data = await response.json()
        fetchImages(data)
        // setProducts(data);
      } else {
        console.log(response)
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchImages(data) {
    const products = [...data]
    // On boucle sur les produits
    const promisesProduct = products.map(async (product) => {
      const newProduct = { ...product }
      if (product.images.find((image) => image.primary)?.fileId === undefined) {
        return newProduct
      }
      // On récupère la première image du produit
      const response = await GetPicture(
        product.images.find((image) => image.primary).fileId,
      )
      // On crée une URL pour l'image
      const url = URL.createObjectURL(response.data)
      // On met à jour l'URL de l'image
      newProduct.srcURL = url
      // On retourne le produit
      return newProduct
    })
    // On attend que toutes les images de tous les produits soient récupérées
    const products2 = await Promise.all(promisesProduct)
    // On met à jour le loading
    setLoading(false)
    // On met à jour les produits
    setProducts(products2)
  }

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
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductSection key={product._id} product={product} />
          ))
        ) : (
          <p>Aucun produit disponible pour le moment.</p>
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
