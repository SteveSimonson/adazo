import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { whySeo } from '../lib/seoData'
import { BRAND } from '../data/brand'

export function Why() {
  return (
    <div>
      <Seo {...whySeo()} />
      <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#3d2a1f] via-[#6b4a38] to-[#1a1210]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full pb-14 pt-28">
          <p className="label-micro !text-gold mb-3">{BRAND.mark}</p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-white max-w-2xl leading-tight">
            The founding legend
          </h1>
          <p className="mt-4 text-white/80 max-w-xl font-light text-lg italic">
            {BRAND.mottoIt}
          </p>
          <p className="mt-2 text-gold/90 text-sm tracking-wide">
            {BRAND.mottoEn}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-bamboo mb-8">
          Chapter one · The alchemist’s atelier
        </p>
        <p className="text-ink-soft italic leading-relaxed mb-10 border-l-2 border-gold/50 pl-5">
          As it has been told, in the Brianza hills north of Milan, for three
          hundred years.
        </p>

        <div className="space-y-8 text-lg text-ink-soft font-light leading-[1.75]">
          <p>
            In the summer of {BRAND.founded}, in a stone house at the edge of a
            hill town between Milan and the lake, a young woman named{' '}
            <strong className="text-ink font-medium">{BRAND.founder}</strong>{' '}
            kept a small room off her family’s kitchen where she mixed oils.
          </p>
          <p>
            The town knew her as a maker of remedies — lavender for sleepless
            children, calendula for a husband’s burned hand, rosewater for the
            parish priest’s headaches. This was ordinary work for a woman of her
            station. What made the room behind the kitchen different was that
            Ada did not mix for cure. She mixed for beauty, and she did it in
            secret, because in {BRAND.founded} there was no respectable word yet
            for what she was doing.
          </p>
          <p>
            The legend says it began the night before her cousin Elisabetta’s
            wedding.
          </p>
          <p>
            Elisabetta had spent the day weeping — not from joy, but from the
            particular grief of a plain girl watching herself in a borrowed
            mirror, certain the morning would arrive and find her unchanged. Ada
            took her cousin’s face in her hands the way she’d seen her own
            grandmother do, and told her something that would outlive both of
            them:
          </p>
          <blockquote className="my-10 py-8 px-6 sm:px-10 rounded-2xl border border-line bg-cream text-center">
            <p className="font-display text-2xl sm:text-3xl text-ink font-semibold italic leading-snug">
              “{BRAND.mottoIt}”
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-bamboo font-semibold">
              {BRAND.mottoEn}
            </p>
          </blockquote>
          <p>
            Then she went to her room off the kitchen and, by lamplight, built a
            balm meant for exactly one purpose: to make a nervous girl believe,
            for one morning, that she had always been beautiful. Olive oil
            pressed from her own family’s trees. Orris root, dried since spring.
            Bergamot rind, bitter and bright. A crushed thread of rose that had
            bloomed against the church wall. She warmed it slowly, the way you’d
            coax something shy into the open, and she gave it to Elisabetta
            before dawn.
          </p>
          <p>
            What happened at that wedding is the part the family still argues
            about. What’s certain is that within the year, women were arriving
            at Ada’s door who had no remedy to seek — only a face they wanted to
            meet differently. She began keeping a ledger, not of sales, but of
            formulas: what she’d used, for whom, and why. Bound in dark leather,
            it became known simply as{' '}
            <em className="text-ink not-italic font-medium">il libro</em> — the
            book — and it would be added to by daughters and grand-daughters for
            the next three centuries. Nothing in it was ever published.
            Everything in it was eventually inherited.
          </p>
          <p>
            It was Ada’s own name, shortened by neighbors the way small towns
            shorten everything, that gave the house its mark.{' '}
            <em className="text-ink">Ada-zo</em> — “Ada’s,” in the clipped
            dialect of the hills — became, over generations, simply{' '}
            <strong className="text-ink font-medium">Adazo</strong>. The family
            adopted a small emblem for the book’s cover not long after: a sun
            resting low over an olive branch, the two shapes together forming
            the rough outline of an <strong className="text-ink">A</strong>. It
            has marked every formula since.
          </p>
          <p>
            By the time Ada was an old woman, she had stopped mixing balms for
            weddings and started mixing them for something closer to inheritance
            — a mother would come not for herself, but to learn, so that one day
            she could stand where Ada stood and hand something down instead of
            merely applying it. This was the true founding act of the house: not
            a product, but a transmission. Adazo was never meant to be bought
            once. It was meant to be <em className="text-ink">passed on</em>.
          </p>
          <p>
            Three hundred years later, the room off the kitchen is gone, the
            hill town has grown into something closer to a suburb of Milan, and
            Ada Zoppi exists mostly as a name in a book no camera has ever
            photographed in full. But the sun-and-olive mark still opens every
            formula. The motto is still whispered. And somewhere in every Adazo
            selection is the same original instruction Ada gave her cousin
            before a wedding three centuries ago: not to look different — to
            finally recognize the face that was always there.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-moss text-paper p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            The house today
          </p>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold leading-snug">
            {BRAND.promise}
          </p>
          <p className="mt-4 text-paper/80 font-light leading-relaxed">
            We curate what belongs on the vanity and in the gift box — prestige
            beauty, fragrance, gold, the bag that finishes the room. Discover
            here. Complete your purchase on Amazon.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-10">
          <Link to="/shop" className="btn-primary">
            Enter the house <ArrowRight className="size-4" />
          </Link>
          <Link to="/quiz" className="btn-secondary">
            Find your persona
          </Link>
        </div>
      </article>
    </div>
  )
}
