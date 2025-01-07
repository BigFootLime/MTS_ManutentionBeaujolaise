'use client'

import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import Link from 'next/link'

export default function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="text-lg font-semibold">Nos bureaux</h2>
      <p className="mt-6 text-base text-neutral-600">
        Retrouvez-nous sur place pour échanger sur vos projets de manutention.
      </p>
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Email
        </h2>
        <Link
          href="mailto:contact@manutention-beaujolaise.com"
          className="text-neutral-600 hover:text-neutral-950"
        >
          contact@manutention-beaujolaise.com
        </Link>
      </Border>
    </FadeIn>
  )
}
