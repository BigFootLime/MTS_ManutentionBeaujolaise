'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { GridList, GridListItem } from '@/components/GridList'
import { GetPicture } from '../../services/files.service'
import {
  getProducts,
  Product as ServiceProduct,
} from '../../services/products.service'
import { Button } from '@/components/Button'

interface Product extends ServiceProduct {
  srcURL?: string | null
  images: { primary: boolean; fileId: string }[]
}

interface ProductSectionProps {
  product: Product
  onDetailsClick: (product: Product) => void
}

function ProductSection({ product, onDetailsClick }: ProductSectionProps) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div
        className="
          rounded-2xl border border-neutral-200 p-5 lg:p-8
          shadow-sm hover:shadow-lg transition-shadow
          bg-white lg:flex lg:items-center lg:gap-x-10
        "
      >
        <div className="flex justify-center lg:justify-start lg:flex-none">
          <img
            src={product.srcURL || '/Main.svg'}
            alt={product.name}
            className="
              h-auto w-full max-w-[36rem] rounded-xl object-contain
              transition-transform duration-200 group-hover/section:scale-[1.01]
            "
          />
        </div>

        <div className="mt-8 lg:mt-0 lg:flex-1">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950">
              {product.name}
            </h2>
            {product.availability?.toLowerCase() === 'disponible' && (
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                Disponible
              </span>
            )}
          </div>

          <p className="mt-4 text-base text-neutral-600">{product.comment}</p>

          <p className="mt-3 text-xl font-bold text-neutral-900">{product.priceHT} €</p>

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={() => onDetailsClick(product)}>Plus de détails</Button>
          </div>
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

  // Track object URLs to revoke later
  const urlsRef = useRef<string[]>([])

  useEffect(() => {
    fetchImages()
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u))
      urlsRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchImages() {
    const promises = product.images.map(async (image) => {
      try {
        const response = await GetPicture(image.fileId)
        if (response instanceof Blob) {
          const url = URL.createObjectURL(response)
          urlsRef.current.push(url)
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
        .sort((a, b) => (a.primary ? -1 : b.primary ? 1 : 0)),
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg sm:max-w-3xl bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-[80vh]">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold text-center">
          {product.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.length > 0 ? (
            images.map((image) => (
              <img
                key={image._id}
                src={image.imageSrc}
                alt={product.name}
                className="w-full h-auto rounded-md shadow-md object-contain"
              />
            ))
          ) : (
            <p className="text-center text-neutral-600">
              Aucune image disponible pour ce produit.
            </p>
          )}
        </div>

        <div className="mt-6 text-sm sm:text-base space-y-2">
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Modèle:</strong> {product.model}</p>
          <p><strong>État:</strong> {product.condition}</p>
          <p><strong>Année:</strong> {product.year}</p>
          <p><strong>Heures:</strong> {product.hours}</p>
          <p><strong>Capacité de levage:</strong> {product.liftingCapacity}</p>
          <p><strong>Hauteur de levage:</strong> {product.liftingHeight}</p>
          <p><strong>Type de pneus:</strong> {product.tireType}</p>
          <p><strong>Disponibilité:</strong> {product.availability}</p>
          <p><strong>Commentaire:</strong> {product.comment}</p>
        </div>

        <div className="sticky bottom-0 bg-white pt-4 pb-2">
          <button
            className="w-full py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- helpers to sort newest-first ---------------------------------

function tsFromMaybeObjectId(id?: unknown) {
  if (typeof id !== 'string' || id.length < 8) return 0
  const hex = id.slice(0, 8)
  if (!/^[a-f0-9]{8}$/i.test(hex)) return 0
  try {
    return parseInt(hex, 16) * 1000 // ms
  } catch {
    return 0
  }
}

function getProductTime(p: any) {
  const d =
    p?.createdAt ??
    p?.creationDate ??
    p?.creation_date ??
    p?.updatedAt ??
    p?.modification_date
  const byDate = d ? new Date(d).getTime() : 0
  if (byDate) return byDate
  return tsFromMaybeObjectId(p?._id) || 0
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Keep track of created object URLs to clean up on unmount
  const listUrlsRef = useRef<string[]>([])

  // Scroll hint (shows once if multiple products)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    fetchData()
    const onScroll = () => setShowHint(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    const timer = setTimeout(() => setShowHint(false), 3500)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
      listUrlsRef.current.forEach((u) => URL.revokeObjectURL(u))
      listUrlsRef.current = []
    }
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      const data = await getProducts()

      const filteredData = (data as ServiceProduct[]).filter(
        (product) => product.condition === 'Neuf',
      )

      const extendedData: Product[] = filteredData.map((product) => ({
        ...product,
        images: product.images || [],
        srcURL: null,
      }))

      await fetchImages(extendedData)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
      setLoading(false)
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
              blob && blob instanceof Blob ? URL.createObjectURL(blob) : null
            if (updatedProduct.srcURL) listUrlsRef.current.push(updatedProduct.srcURL)
          } catch (error) {
            console.error(`Error fetching image for product ${product._id}:`, error)
            updatedProduct.srcURL = null
          }
        } else {
          updatedProduct.srcURL = null
        }

        return updatedProduct
      }),
    )

    // newest first
    const anyHasTime = productsWithImages.some((p) => getProductTime(p))
    const ordered = anyHasTime
      ? [...productsWithImages].sort((a, b) => getProductTime(b) - getProductTime(a))
      : [...productsWithImages].reverse()

    setProducts(ordered)

    // Show a small scroll cue if there are multiple items
    setShowHint(ordered.length > 1)
    setLoading(false)
  }

  const LoadingView = useMemo(
    () => (
      <div
        className="flex flex-col items-center justify-center py-24"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="h-14 w-14 rounded-full border-4 border-neutral-200 border-t-neutral-900 animate-spin" />
        <p className="mt-4 text-neutral-700 font-medium">Chargement des produits…</p>
      </div>
    ),
    [],
  )

  return (
    <>
      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <PageIntro eyebrow="Nos Produits" title="Découvrez nos solutions de manutention">
        <p>
        
        </p>
      </PageIntro>

      <div className="mt-24 sm:mt-32 lg:mt-40">
        {loading ? (
          <div className="min-h-[30vh]">{LoadingView}</div>
        ) : products.length > 0 ? (
          <div className="space-y-16 sm:space-y-24 lg:space-y-28">
            {products.map((product, idx) => (
              <div key={product._id}>
                {idx > 0 && (
                  <div className="relative my-8">
                    <div className="h-px w-full bg-neutral-200" />
                  </div>
                )}
                <ProductSection product={product} onDetailsClick={setSelectedProduct} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-600">
            Aucun produit disponible pour le moment.
          </p>
        )}
      </div>

      {/* Scroll hint */}
      {showHint && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className="rounded-full bg-neutral-900/90 text-white px-4 py-2 text-sm shadow-lg animate-bounce">
            Faites défiler pour voir les autres ↓
          </div>
        </div>
      )}

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
