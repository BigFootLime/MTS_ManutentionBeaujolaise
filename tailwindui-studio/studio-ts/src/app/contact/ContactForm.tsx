'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { sendMail } from '../../services/mails.service'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <div className="group relative">
      <input
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
        {...props}
      />
      <label className="absolute left-6 top-1/2 -mt-3 text-neutral-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold">
        {label}
      </label>
    </div>
  )
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    setSuccess(false)
    setError(false)

    try {
      const response = await sendMail(data)
      if (response.status === 200) {
        setSuccess(true)
        reset()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold">Envoyez-nous un message</h2>
        <div className="space-y-6">
          <TextInput
            label="Nom"
            {...register('name', { required: 'Le nom est requis' })}
          />
          <TextInput
            label="Email"
            type="email"
            {...register('email', { required: 'L’email est requis' })}
          />
          <TextInput label="Société" {...register('company')} />
          <TextInput label="Téléphone" {...register('phone')} />
          <TextInput
            label="Message"
            {...register('message', { required: 'Un message est requis' })}
          />
        </div>
        <Button type="submit" className="mt-6" disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
        {success && (
          <p className="mt-4 text-green-500">Message envoyé avec succès !</p>
        )}
        {error && (
          <p className="mt-4 text-red-500">
            Erreur lors de l’envoi du message.
          </p>
        )}
      </form>
    </FadeIn>
  )
}
