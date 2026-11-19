// ─────────────────────────────────────────────────────────────
//  MEDIA — stock stand-ins. Replace with the salon's own photos,
//  videos and real social posts before going live.
//  Photos: Unsplash (Unsplash License). Videos: Pexels (Pexels License).
// ─────────────────────────────────────────────────────────────

const U = (id, w = 1600, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ''}`

export const PHOTOS = {
  studioWork: { id: '1632345031435-8727f6897d53', alt: 'A nail technician shaping a client’s nails at the studio table' },
  polishWall: { id: '1619607146034-5a05296c8f9a', alt: 'Rows of colorful gel polish bottles on gold shelves' },
  painting: { id: '1690749138086-7422f71dc159', alt: 'A technician painting a client’s nails with nude polish' },
  interior: { id: '1600948836101-f9ffda59d250', alt: 'Bright studio interior with round mirrors and black chairs' },
  tools: { id: '1775500835259-d3b3f6d6e2f2', alt: 'Manicure tools laid out on a soft white towel' },
  tortoise: { id: '1604654894610-df63bc536371', alt: 'Black and tortoiseshell almond nails with a gold ring' },
  chromeStiletto: { id: '1777287216954-2b4b22bb6bf2', alt: 'Metallic chrome stiletto nails with jeweled details' },
  navyGold: { id: '1754799670312-8e7da8e40ad7', alt: 'Navy, gold and white hand-painted nail art' },
  leopard: { id: '1777288390469-828f8816231c', alt: 'Leopard print and leaf nail art on a fur throw' },
  goldAlmond: { id: '1770210257340-dc2b0f44642a', alt: 'Almond-shaped golden glazed nails' },
  marble: { id: '1772322586785-3a34772cbc61', alt: 'Milky nails with purple and black marbled tips' },
  glitterFrench: { id: '1772322586754-34c9e6f5be6f', alt: 'French manicure with lilac glitter accents' },
  blueOmbre: { id: '1772322586702-73125782bd99', alt: 'Blue and white ombre French nails' },
  love: { id: '1519014816548-bf5fe059798b', alt: 'Red and blush nails hand-lettered with “love”' },
  sheerPink: { id: '1610992015762-45dca7fa3a85', alt: 'Sheer pink natural manicure' },
  flowerFrench: { id: '1762373349045-c2decd4ec3f3', alt: 'Classic French manicure holding a small wildflower' },
  pastelGlitter: { id: '1607779097040-26e80aa78e66', alt: 'Mauve, white and silver glitter nails on knit' },
  pearlArt: { id: '1769687209448-025548dfca8b', alt: 'Pale pink nails with pearl and gold accents holding eucalyptus' },
  mocha: { id: '1736434518489-0eb84070017f', alt: 'Mocha almond nails among orange marigolds' },
  abstract: { id: '1571290274554-6a2eaa771e5f', alt: 'Bright abstract multicolor nail art' },
  blushTip: { id: '1612887390768-fb02affea7a6', alt: 'Soft pink almond nails with micro French tips' },
  nude: { id: '1630843599725-32ead7671867', alt: 'Short nude manicure with a delicate gold ring' },
  aquaFrench: { id: '1758178309407-6562d1687b01', alt: 'Aqua French tips with a gold pendant necklace' },
}
export const photo = (key, w, h) => U(PHOTOS[key].id, w, h)

// Cover slideshow per issue (first is the lead image).
export const COVERS = {
  signature: ['pastelGlitter', 'studioWork', 'glitterFrench', 'polishWall'],
  valentine: ['love', 'blushTip', 'sheerPink', 'studioWork'],
  spring: ['flowerFrench', 'pearlArt', 'aquaFrench', 'polishWall'],
  prom: ['chromeStiletto', 'glitterFrench', 'pearlArt', 'nude'],
  summer: ['abstract', 'blueOmbre', 'aquaFrench', 'polishWall'],
  fall: ['tortoise', 'mocha', 'goldAlmond', 'leopard'],
  halloween: ['marble', 'leopard', 'tortoise', 'chromeStiletto'],
  thanksgiving: ['mocha', 'goldAlmond', 'tortoise', 'painting'],
  winter: ['blueOmbre', 'glitterFrench', 'nude', 'studioWork'],
  christmas: ['navyGold', 'chromeStiletto', 'love', 'polishWall'],
}

// Short promo line in the top bar, per issue.
export const OFFERS = {
  signature: 'Book online in under a minute — pick a time and we’ll hold your chair.',
  valentine: 'Galentine’s Duo: book two chairs side by side this February.',
  spring: 'Mommy & Me manis are back for Easter weekend.',
  prom: 'Prom & bridal parties: book 2+ weeks ahead and we’ll hold the whole row.',
  summer: 'Neon pedi season: pool-proof gel on toes all summer.',
  fall: 'Matte top coat on any set this fall — just ask.',
  halloween: 'Glow-in-the-dark top coat available on any set in October.',
  thanksgiving: 'Gold-foil accent nails for the long weekend.',
  winter: 'Paraffin hand warm-up with any mani this January.',
  christmas: 'Gift card duos available at the front desk.',
}

// Short salon tour clip (landscape) + poster.
export const TOUR = {
  src: 'https://videos.pexels.com/video-files/8023058/8023058-hd_1280_720_25fps.mp4',
  poster: 'studioWork',
  credit: 'Pexels video 8023058',
}

// Social accounts — replace handles/urls with the real ones.
export const SOCIALS = [
  { id: 'tiktok', name: 'TikTok', handle: '@petalandpolish', url: 'https://www.tiktok.com/' },
  { id: 'instagram', name: 'Instagram', handle: '@petalandpolish', url: 'https://www.instagram.com/' },
  { id: 'facebook', name: 'Facebook', handle: 'Petal & Polish', url: 'https://www.facebook.com/' },
  { id: 'youtube', name: 'YouTube', handle: '@petalandpolish', url: 'https://www.youtube.com/' },
]

// Reels. `embed` = the real post URL (TikTok video, Instagram reel, Facebook video/reel, YouTube short).
// When `embed` is empty the card plays the sample clip in `src`.
export const REELS = [
  { platform: 'tiktok', caption: 'Gel polish, start to finish', src: 'https://videos.pexels.com/video-files/7754407/7754407-hd_720_1280_30fps.mp4', poster: 'painting', embed: '' },
  { platform: 'instagram', caption: 'Color swatch day', src: 'https://videos.pexels.com/video-files/6767643/6767643-hd_720_1280_24fps.mp4', poster: 'abstract', embed: '' },
  { platform: 'youtube', caption: 'A calm manicure, no talking', src: 'https://videos.pexels.com/video-files/7754401/7754401-hd_720_1280_30fps.mp4', poster: 'studioWork', embed: '' },
  { platform: 'facebook', caption: 'Red polish, done right', src: 'https://videos.pexels.com/video-files/4783391/4783391-hd_1280_720_30fps.mp4', poster: 'love', embed: '' },
  { platform: 'tiktok', caption: 'Prep is everything', src: 'https://videos.pexels.com/video-files/7754856/7754856-hd_1280_720_30fps.mp4', poster: 'tools', embed: '' },
  { platform: 'instagram', caption: 'Fresh set, fresh week', src: 'https://videos.pexels.com/video-files/7338505/7338505-hd_1280_720_25fps.mp4', poster: 'pastelGlitter', embed: '' },
]

// Turn a real post URL into an embeddable player URL.
export function embedUrl(platform, url) {
  if (!url) return ''
  try {
    const u = new URL(url)
    if (platform === 'youtube') {
      const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.pathname.startsWith('/shorts/') ? u.pathname.split('/')[2] : u.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : ''
    }
    if (platform === 'tiktok') {
      const id = u.pathname.match(/video\/(\d+)/)?.[1]
      return id ? `https://www.tiktok.com/embed/v2/${id}` : ''
    }
    if (platform === 'instagram') {
      const m = u.pathname.match(/\/(reel|p)\/([^/]+)/)
      return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : ''
    }
    if (platform === 'facebook') {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`
    }
  } catch {}
  return ''
}

// Gallery ("Fresh sets") — swap for the salon's own work.
export const GALLERY = ['pastelGlitter', 'chromeStiletto', 'navyGold', 'blueOmbre', 'leopard', 'goldAlmond', 'love', 'marble', 'tortoise', 'pearlArt', 'flowerFrench', 'abstract', 'mocha', 'aquaFrench']

// Seasonal scene photos (Unsplash License) used as festive backdrops.
const SCENE = {
  signature: '1612328289561-0edd72aefc43',
  valentine: '1494972308805-463bc619d34e',
  spring: '1649802333576-5cde9b4e3815',
  prom: '1654699991520-aaaf4dd2608b',
  summer: '1545505567-7327366a634d',
  fall: '1760883956955-31d8adb4e6d9',
  halloween: '1477516561410-f0b5dd8319e4',
  thanksgiving: '1758521552558-5214b3a9aac0',
  winter: '1547754980-3df97fed72a8',
  christmas: '1767741857489-b28dcaa531a4',
}
export const sceneUrl = (id, w = 1920, h) => U(SCENE[id] || SCENE.signature, w, h)
export const SEASON_ART = Object.fromEntries(Object.keys(SCENE).map((k) => [k, sceneUrl(k)]))

// More licensed festive scenes per season for the moving photo strip (Unsplash License).
export const SCENE_SETS = {
  signature: ['1612328289561-0edd72aefc43', '1517331245290-8ab345b4265d', '1654699991520-aaaf4dd2608b'],
  valentine: ['1494972308805-463bc619d34e', '1612328289561-0edd72aefc43', '1517331245290-8ab345b4265d'],
  spring: ['1649802333576-5cde9b4e3815', '1573500883557-6049a3ab38b6', '1701663484459-ca8da4f9914f'],
  prom: ['1654699991520-aaaf4dd2608b', '1786118791837-1a2f74beabf6', '1595345705177-ffe090eb0784'],
  summer: ['1759676015346-a2ea5f4a3caa', '1545505567-7327366a634d', '1507525428034-b723cf961d3e', '1768205250679-37ce763e98c4', '1498931299472-f7a63a5a1cfa'],
  fall: ['1760883956955-31d8adb4e6d9', '1473343775075-61805b64e5d6', '1759892673516-0f18ae0be01c'],
  halloween: ['1477516561410-f0b5dd8319e4', '1762568639426-eca531913826', '1758521552558-5214b3a9aac0'],
  thanksgiving: ['1758521552558-5214b3a9aac0', '1760905066148-2f04b5c6c087', '1615731979436-b52a728a4d96', '1603528283899-d15c8832de80'],
  winter: ['1547754980-3df97fed72a8', '1478265409131-1f65c88f965c', '1768956463598-bd5113a1e4db'],
  christmas: ['1767741857489-b28dcaa531a4', '1512474932049-78ac69ede12c', '1513885251266-04dcfa26e979', '1768956463598-bd5113a1e4db'],
}
export const sceneById = (id, w = 600, h = 600) => U(id, w, h)
