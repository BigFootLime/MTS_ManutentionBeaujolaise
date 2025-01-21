'use client'

import { useEffect, useState } from 'react'
import { ContactSection } from '@/components/ContactSection'
import Image from 'next/image'
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
  srcURL?: string | null // URL for the image, added dynamically
  images: { primary: boolean; fileId: string }[]
}

interface ProductSectionProps {
  product: Product
  onDetailsClick: (product: Product) => void
}

function ProductSection({ product, onDetailsClick }: ProductSectionProps) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <Image
              src={product.srcURL || '/Main.svg'}
              alt={product.name}
              className="h-auto w-full max-w-full rounded-xl lg:max-w-[35rem] lg:justify-end lg:group-even/section:justify-start"
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
            <Button onClick={() => onDetailsClick(product)} className="mt-8">
              Plus de détails
            </Button>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function ProductDetailsDialog({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [images, setImages] = useState<
    { _id: string; imageSrc: string; primary: boolean }[]
  >([])

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const promises = product.images.map(async (image) => {
      try {
        const response = await GetPicture(image.fileId)
        if (response instanceof Blob) {
          const url = URL.createObjectURL(response)
          return {
            _id: image.fileId,
            imageSrc: url,
            primary: image.primary,
          }
        }
        return null
      } catch (error) {
        console.error('Erreur lors de la récupération des images :', error)
        return null
      }
    })
    const fetchedImages = await Promise.all(promises)
    setImages(
      fetchedImages
        .filter(
          (
            image,
          ): image is { _id: string; imageSrc: string; primary: boolean } =>
            image !== null,
        )
        .sort((a, b) => {
          if (a.primary) return -1
          if (b.primary) return 1
          return 0
        }),
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-2 top-2 text-xl font-bold text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="mb-4 text-2xl font-bold">{product.name}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.length > 0 ? (
            images.map((image) => (
              <img
                key={image._id}
                src={image.imageSrc}
                alt={product.name}
                className="h-auto max-h-48 w-full rounded-md object-cover shadow-md"
              />
            ))
          ) : (
            <p className="col-span-full text-neutral-600">
              No images available for this product.
            </p>
          )}
        </div>
        <div className="mt-6 space-y-2">
          <p>
            <strong>Type:</strong> {product.type}
          </p>
          <p>
            <strong>Model:</strong> {product.model}
          </p>
          <p>
            <strong>Condition:</strong> {product.condition}
          </p>
          <p>
            <strong>Year:</strong> {product.year}
          </p>
          <p>
            <strong>Hours:</strong> {product.hours}
          </p>
          <p>
            <strong>Lifting Capacity:</strong> {product.liftingCapacity}
          </p>
          <p>
            <strong>Lifting Height:</strong> {product.liftingHeight}
          </p>
          <p>
            <strong>Tire Type:</strong> {product.tireType}
          </p>
          <p>
            <strong>Availability:</strong> {product.availability}
          </p>
          <p>
            <strong>Comment:</strong> {product.comment}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const data = await getProducts() // Fetch products from the service
      const filteredData = data.filter(
        (product: ServiceProduct) => product.condition === 'Occasion',
      )

      const extendedData: Product[] = filteredData.map((product) => ({
        ...product,
        images: product.images || [], // Ensure `images` is always defined
        srcURL: null, // Initialize `srcURL` property
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
            updatedProduct.srcURL =
              blob && blob instanceof Blob ? URL.createObjectURL(blob) : null // Explicitly set null for invalid blobs
          } catch (error) {
            console.error(
              `Error fetching image for product ${product._id}:`,
              error,
            )
            updatedProduct.srcURL = null
          }
        } else {
          updatedProduct.srcURL = null
        }

        return updatedProduct
      }),
    )

    setProducts(productsWithImages)
    setLoading(false)
  }

  return (
    <>
      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

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
            <ProductSection
              key={product._id}
              product={product}
              onDetailsClick={setSelectedProduct}
            />
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
