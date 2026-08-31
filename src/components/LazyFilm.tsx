import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster: string
  label: string
}

/**
 * Muted looping film that does not touch the MP4 until near the viewport.
 * Poster is a lazy `<img>` (not the video `poster` attr) so off-screen
 * inserts do not download stills or bytes on first paint.
 */
export function LazyFilm({ src, poster, label }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || reduceMotion) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setLoad(true)
      },
      { rootMargin: '80px 0px', threshold: 0.01 },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !load) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [load])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {load && !reduceMotion ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
        />
      ) : null}
    </div>
  )
}
