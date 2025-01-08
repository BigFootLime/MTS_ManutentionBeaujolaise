'use client'

import { useEffect, useState } from 'react'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { GridList, GridListItem } from '@/components/GridList'
import { GetPicture } from '../../services/files.service'
import {
  getProducts,
  Product as ServiceProduct,
} from '../../services/products.service'
import { Button } from '@/components/Button'

interface Product extends ServiceProduct {
  srcURL?: string // URL for the image, added dynamically
  images: { primary: boolean; fileId: string }[]
}

interface ProductSectionProps {
  product: Product
}

function ProductSection({ product }: ProductSectionProps) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              src={product.srcURL || '/Main.svg'}
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
            <p className="mt-6 text-base text-neutral-600">{product.comment}</p>
            <p className="mt-2 text-lg font-bold text-neutral-800">
              {product.priceHT} €
            </p>
            <Button href={`/product/details/${product._id}`} className="mt-8">
              Plus de détails
            </Button>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const data = await getProducts() // Fetch products from the service
      const extendedData: Product[] = data.map((product) => ({
        ...product,
        images: product.images || [], // Ensure `images` is always defined
        srcURL: undefined, // Initialize `srcURL` property
      }))
      fetchImages(extendedData) // Fetch images and update products
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  async function fetchImages(data: Product[]) {
    const productsWithImages = await Promise.all(
      data.map(async (product) => {
        const updatedProduct = { ...product }
        const primaryImage = product.images.find((image) => image.primary)

        if (primaryImage?.fileId) {
          try {
            const blob = await GetPicture(primaryImage.fileId)
            updatedProduct.srcURL = blob
              ? URL.createObjectURL(blob)
              : '/Main.svg'
          } catch (error) {
            console.error(
              `Error fetching image for product ${product._id}:`,
              error,
            )
            updatedProduct.srcURL = '/Main.svg'
          }
        } else {
          updatedProduct.srcURL = '/Main.svg'
        }

        return updatedProduct
      }),
    )

    setProducts(productsWithImages)
    setLoading(false)
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
            Nous assurons le suivi et l&apos;entretien de votre matériel pour
            une utilisation sans souci.
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
