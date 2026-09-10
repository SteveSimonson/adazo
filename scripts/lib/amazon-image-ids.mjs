/**
 * Amazon CDN image helpers shared by catalog QC and image refresh.
 */

/** Image IDs known to belong to unrelated kitchen/home SKUs (never beauty). */
export const BANNED_AMAZON_IMAGE_IDS = new Set([
  // Amazon Basics silicone baking mats (B0725GYNG6) — was assigned to Revlon
  '81IC5+bWDgL',
  '81BVzWv5SRL',
  '91BDA74jfLL',
])

/**
 * Locked primary /images/I/{id} stems after visual + Amazon colorImages QC.
 * Refresh must not silently replace these with unrelated art.
 */
export const LOCKED_PRIMARY_IMAGE_IDS = {
  'revlon-one-step-volumizer-plus': '61SrWfdHa1L',
  'neutrogena-hydro-boost-water-gel': '61fhuufzENL',
}

export function amazonImageId(url) {
  if (!url) return null
  const m = String(url).match(/\/images\/I\/([^./]+)/i)
  return m ? m[1] : null
}

export function upgradeAmazonImage(url) {
  if (!url) return null
  let u = String(url).replace(/^http:\/\//i, 'https://').replace(/\\u002F/g, '/')
  if (
    !/media-amazon\.com\/images\/I\//i.test(u) &&
    !/ssl-images-amazon\.com\/images\/I\//i.test(u)
  ) {
    return null
  }
  return u
    .replace(/\._AC_UL\d+[^.]*/i, '._AC_SL1000_')
    .replace(/\._AC_UX\d+[^.]*/i, '._AC_SL1000_')
    .replace(/\._AC_UY\d+[^.]*/i, '._AC_SL1000_')
    .replace(/\._AC_SL\d+_/i, '._AC_SL1000_')
    .replace(/\._SL\d+_/i, '._AC_SL1000_')
    .replace(/\._SX\d+_/i, '._SL1000_')
    .replace(/\._SY\d+_/i, '._SL1000_')
}

/**
 * Prefer the product's own colorImages gallery — not every hiRes URL on the
 * Amazon PDP (related items / ads historically crossed Revlon ↔ kitchen art).
 */
export function extractColorImages(html) {
  const images = []
  const push = (raw) => {
    const u = upgradeAmazonImage(raw)
    if (u && !images.includes(u) && !BANNED_AMAZON_IMAGE_IDS.has(amazonImageId(u))) {
      images.push(u)
    }
  }

  const block = html.match(
    /colorImages'\s*:\s*\{\s*'initial'\s*:\s*A\.\$\.parseJSON\('(\[[\s\S]*?\])'\)/,
  )
  if (block) {
    const raw = block[1].replace(/\\u002F/g, '/')
    try {
      const arr = JSON.parse(raw)
      for (const item of arr || []) {
        if (item?.hiRes) push(item.hiRes)
        else if (item?.large) push(item.large)
      }
    } catch {
      for (const m of raw.matchAll(
        /"hiRes"\s*:\s*"(https:\\?\/\\?\/[^"]+)"/g,
      )) {
        push(m[1].replace(/\\\//g, '/'))
      }
    }
  }

  const landing = html.match(/data-old-hires="(https:\/\/[^"]+)"/)
  if (landing) {
    const u = upgradeAmazonImage(landing[1])
    if (u && !BANNED_AMAZON_IMAGE_IDS.has(amazonImageId(u)) && !images.includes(u)) {
      images.unshift(u)
    }
  }

  return images.slice(0, 6)
}

export function isBannedImageUrl(url) {
  const id = amazonImageId(url)
  return Boolean(id && BANNED_AMAZON_IMAGE_IDS.has(id))
}
