import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="FRANCE" invert={invert}>
          1191A Route du Beaujolais
          <br />
          69460 Blacé, FRANCE{' '}
        </Office>
      </li>
      <li>
        <div className="rounded-lg">
          <iframe
            title="Google Maps"
            className="h-full w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.513929559104!2d4.693263315567194!3d46.01301307911446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4f4d5c0e0c0c1%3A0x1c5f6f5e3e0c1b5e!2s1191A%20Route%20du%20Beaujolais%2C%2069460%20Blac%C3%A9!5e0!3m2!1sfr!2sfr!4v1634374423352!5m2!1sfr!2sfr"
            loading="lazy"
          />
        </div>
      </li>
    </ul>
  )
}
