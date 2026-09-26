import { useEffect } from 'react'

/**
 * Scroll-reveal system (no dependencies).
 *
 * Mark up your JSX with data attributes:
 *   data-reveal="left | right | up | down | zoom"   -> animate this element
 *   data-reveal-split                               -> 1st child from LEFT, 2nd from RIGHT, at the same time
 *   data-reveal-stagger                             -> children fade up one after another
 *   data-reveal-delay="200"                         -> optional extra delay in ms
 *
 * Call useReveal() once in App. It also works with hash routing:
 * a MutationObserver picks up elements of every newly rendered page.
 */

const DIRS = ['left', 'right', 'up', 'down', 'zoom']

function setup(el, dir, delay = 0) {
  // React StrictMode mounts effects twice in development. Keep returning an
  // already prepared element so the second observer can still watch it.
  if (el.dataset.rvReady) return el.classList.contains('rv-in') ? null : el
  el.dataset.rvReady = '1'
  el.classList.add('rv', `rv-${dir}`)
  el.style.setProperty('--rv-delay', `${delay}ms`)
  return el
}

function collect(root) {
  const targets = []

  // Existing page components automatically participate without needing every
  // section rewritten with data attributes.
  const splitSelectors = [
    '.intro-grid', '.legacy-grid', '.message-grid', '.campus-split',
    '.contact-grid', '.admissions-layout', '.cta-wrap'
  ]
  splitSelectors.forEach((selector) => root.querySelectorAll(selector).forEach((parent) => {
    ;[...parent.children].forEach((child, i) => {
      targets.push(setup(child, 'left', i * 70))
    })
  }))

  const staggerSelectors = [
    '.branches-grid', '.program-grid', '.events-grid', '.facility-grid',
    '.why-grid', '.feature-grid', '.ecosystem-grid', '.info-grid', '.gallery-grid',
    '.mission-grid'
  ]
  staggerSelectors.forEach((selector) => root.querySelectorAll(selector).forEach((parent) => {
    ;[...parent.children].forEach((child, i) => targets.push(setup(child, 'left', i * 90)))
  }))

  root.querySelectorAll('[data-reveal]').forEach((el) => {
    const dir = DIRS.includes(el.dataset.reveal) ? el.dataset.reveal : 'up'
    const delay = Number(el.dataset.revealDelay || 0)
    targets.push(setup(el, dir, delay))
  })

  root.querySelectorAll('[data-reveal-split]').forEach((parent) => {
    ;[...parent.children].forEach((child, i) => {
      const dir = i === 0 ? 'left' : i === 1 ? 'right' : 'up'
      targets.push(setup(child, dir, i > 1 ? (i - 2) * 100 : 0))
    })
  })

  root.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
    ;[...parent.children].forEach((child, i) => {
      targets.push(setup(child, 'up', i * 90))
    })
  })

  return targets.filter(Boolean)
}

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rv-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    const scan = () => collect(document).forEach((el) => io.observe(el))
    scan()

    const rootEl = document.getElementById('root')
    let raf = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(scan)
    })
    mo.observe(rootEl, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])
}

/** Counts highlighted numeric values from zero when they enter the viewport. */
export function useCountUp() {
  useEffect(() => {
    const frames = new Set()
    const prepare = (el) => {
      if (el.dataset.countTarget) return el.dataset.countDone ? null : el
      const match = el.textContent.trim().match(/^(\D*)(\d+)(.*)$/)
      if (!match) return null
      const [, prefix, digits, suffix] = match
      el.dataset.countPrefix = prefix
      el.dataset.countTarget = digits
      el.dataset.countSuffix = suffix
      el.dataset.countDigits = String(digits).length
      return el
    }

    const count = (el) => {
      const target = Number(el.dataset.countTarget)
      const digits = Number(el.dataset.countDigits)
      const start = performance.now()
      const duration = Math.min(1800, Math.max(850, target * 1.1))
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        const value = Math.round(target * eased)
        el.textContent = `${el.dataset.countPrefix}${String(value).padStart(digits, '0')}${el.dataset.countSuffix}`
        if (progress < 1) {
          const frame = requestAnimationFrame(tick)
          frames.add(frame)
        } else {
          el.dataset.countDone = '1'
        }
      }
      const frame = requestAnimationFrame(tick)
      frames.add(frame)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        count(entry.target)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.5 })

    const selectors = '.stats b, .years b, .intake b, .feature-top span, .why-grid b, .journey li > b'
    const scan = () => document.querySelectorAll(selectors).forEach((el) => {
      const target = prepare(el)
      if (target) observer.observe(target)
    })
    scan()

    const root = document.getElementById('root')
    const mutationObserver = new MutationObserver(scan)
    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      frames.forEach(cancelAnimationFrame)
    }
  }, [])
}

/** Optional component form: <Reveal from="left" delay={100}>...</Reveal> */
export function Reveal({ from = 'up', delay = 0, as: Tag = 'div', children, ...rest }) {
  return (
    <Tag data-reveal={from} data-reveal-delay={delay} {...rest}>
      {children}
    </Tag>
  )
}

/** Image with a name/caption that slides up on hover (always visible on touch devices). */
export function ImageCard({ src, alt = '', title, subtitle, className = '' }) {
  return (
    <figure className={`img-card ${className}`} tabIndex={0}>
      <img src={src} alt={alt || title} loading="lazy" />
      <figcaption>
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </figcaption>
    </figure>
  )
}
