// Year-round trend concepts (from the studio's trend research). Illustrated in CSS,
// paired with a stock photo where one fits. Tags drive the filter tabs.
const dots = (c, s = 10, p = 38, off = '0 0') => `radial-gradient(circle, ${c} 0 ${p}%, transparent ${p + 2}%) ${off} / ${s}px ${s}px`

export const TREND_TABS = [
  { id: 'trending', name: 'Trending now' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'occasion', name: 'Special occasion' },
]

export const TRENDS = [
  { id: 'cherry', name: 'Cherry Blossom', text: 'Sakura pink, tiny painted blossoms, Japanese-soft.', tags: ['trending', 'minimal'], tone: ['#ffe3ec', '#ffb7cf'],
    design: { bg: `${dots('#ff8fb8', 16, 22, '4px 6px')}, ${dots('#fff', 16, 10, '4px 6px')}, #ffe3ec`, motif: 'daisy', ink: '#ffb7cf', dot: '#ff6f9f', size: 40, y: 40 } },
  { id: 'mermaid', name: 'Mermaid Glow', text: 'Pearly shell chrome with an ocean shimmer.', tags: ['trending', 'luxury'], tone: ['#dff6f4', '#9ad7e6'],
    design: { bg: `${dots('#ffffff', 6, 44, '2px 2px')}, ${dots('#b9a7ff', 9, 34)}, #a6e3e9` } },
  { id: 'coquette', name: 'Coquette Dream', text: 'Satin bows, lace and baby pink.', tags: ['trending', 'occasion'], tone: ['#fff0f5', '#ffc6d9'],
    design: { bg: `radial-gradient(120% 26% at 50% 0%, #ffc6d9 0 62%, transparent 63%), #fff4f8`, motif: 'bow', ink: '#ff8fb8', size: 56 } },
  { id: 'aura', name: 'Aura Nails', text: 'Soft blurred color halos, dreamy and glowy.', tags: ['trending'], tone: ['#f1e6ff', '#ffc4e1'],
    design: { bg: `radial-gradient(42% 30% at 50% 58%, #c79bff 0 100%, transparent 101%), ${dots('#ff9ad3', 8, 40)}, #fde8f5` } },
  { id: 'cateye', name: 'Velvet Cat-Eye', text: 'Magnetic shimmer that moves like velvet.', tags: ['luxury', 'occasion'], tone: ['#2a1238', '#7b4bb3'],
    design: { bg: `${dots('#c9b2ff', 5, 40, '1px 1px')}, #3a1450`, band: '#d8c6ff' } },
  { id: 'tropical', name: 'Tropical Paradise', text: 'Pineapple, cherry and watermelon, poolside-ready.', tags: ['trending'], tone: ['#fff6cf', '#ffb36b'],
    design: { bg: `radial-gradient(circle at 50% 58%, #fffbe0 0 7%, transparent 8%), radial-gradient(circle at 50% 58%, transparent 0 36%, #7ed957 37% 43%, transparent 44%), radial-gradient(circle at 50% 58%, transparent 0 43%, #ff9f43 44%), repeating-conic-gradient(from 0deg at 50% 58%, #ffe14d 0 26deg, #fffbe0 26deg 30deg)` } },
  { id: 'ocean', name: 'Ocean Breeze', text: 'Wave lines, seashell white and deep sea blue.', tags: ['minimal'], tone: ['#e3f4ff', '#8cc8f0'],
    design: { bg: 'repeating-radial-gradient(circle at 50% 120%, #8cc8f0 0 7px, #ffffff 7px 11px, #2a63d4 11px 14px, #ffffff 14px 19px)' } },
  { id: 'midnight', name: 'Midnight Glam', text: 'Black and gold for after-dark parties.', tags: ['luxury', 'occasion'], tone: ['#1b1620', '#c9a75d'],
    design: { bg: `radial-gradient(120% 28% at 50% 0%, #d8b23c 0 62%, transparent 63%), ${dots('#d8b23c', 7, 18)}, #141016` } },
  { id: 'clean', name: 'Clean Girl', text: 'Milky nude, short and glossy. Goes with everything.', tags: ['minimal', 'trending'], tone: ['#f7eee8', '#e3c9b8'],
    design: { bg: `${dots('#f1dccf', 9, 24)}, #f4e2d7` } },
  { id: 'butter', name: 'Butter Bloom', text: 'Butter yellow with sweet little flowers.', tags: ['trending', 'minimal'], tone: ['#fff6cf', '#ffe48a'],
    design: { bg: '#fff1a8', motif: 'daisy', ink: '#ffffff', dot: '#ffb81c', size: 46 } },
  { id: 'garden', name: '3D Flower Garden', text: 'Sculpted gel petals that pop off the nail.', tags: ['luxury', 'occasion'], tone: ['#eef8ec', '#ffc2d6'],
    design: { bg: `${french('#ffd6e4', 22)}, #f2fbf0`, motif: 'daisy', ink: '#ffb7cf', dot: '#ffd23f', size: 60, y: 56 } },
  { id: 'celestial', name: 'Celestial Night', text: 'Moons, stars and silver chrome on midnight blue.', tags: ['luxury', 'trending'], tone: ['#141a3a', '#8ea2ff'],
    design: { bg: `${dots('#ffffff', 11, 10, '3px 5px')}, ${dots('#c7d2ff', 17, 7, '9px 2px')}, #1b2453`, motif: 'star', ink: '#e9ecff', size: 34, y: 40 } },
]
function french(c, depth = 34) { return `radial-gradient(120% ${depth}% at 50% 0%, ${c} 0 62%, transparent 63%)` }

// Backdrop mood per seasonal issue
export const MOODS = {
  signature: 'Romantic Satin', valentine: 'Romantic Satin', prom: 'Romantic Satin', spring: 'Pastel Garden',
  summer: 'Ocean Escape', fall: 'Autumn Glow', thanksgiving: 'Autumn Glow', halloween: 'Velvet Noir',
  winter: 'Winter Champagne', christmas: 'Winter Champagne',
}
