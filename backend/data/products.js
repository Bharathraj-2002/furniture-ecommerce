// Product catalog for Nestly — every item is fictional but priced realistically.
// Images are pulled live from a free tag-based photo service (loremflickr.com),
// matched as closely as possible to each product's actual furniture type.
const img = (tag, lock) => `https://loremflickr.com/900/700/${tag}?lock=${lock}`;

export const categories = [
  { slug: "sofas", label: "Sofas & Couches", swatch: "#FF6B4A" },
  { slug: "chairs", label: "Chairs", swatch: "#F4B740" },
  { slug: "tables", label: "Tables", swatch: "#6B8F71" },
  { slug: "beds", label: "Beds", swatch: "#3D2B56" },
  { slug: "storage", label: "Storage", swatch: "#D46A8F" },
  { slug: "lighting", label: "Lighting", swatch: "#3E92CC" },
  { slug: "decor", label: "Decor", swatch: "#E07A5F" },
  { slug: "outdoor", label: "Outdoor", swatch: "#588157" },
];

export const products = [
  // ---------- Sofas ----------
  { id: "sof-01", name: "Marlow Curved Sofa", category: "sofas", price: 1299, originalPrice: 1599, material: "Boucle fabric", colors: ["#E8DDCB", "#8C7A6B", "#C9A66B"], rating: 4.8, reviews: 214, tag: "Bestseller", desc: "A gently curved silhouette wrapped in nubby boucle, built around a solid beech frame. Deep seats invite you to sink in and stay a while.", image: img("sofa", 1) },
  { id: "sof-02", name: "Haven 3-Seat Sectional", category: "sofas", price: 1899, material: "Woven linen", colors: ["#4A5859", "#D9C4A3"], rating: 4.6, reviews: 132, desc: "Modular sections you can rearrange as your room changes, finished in a woven linen blend that softens with every wash.", image: img("sectionalsofa", 2) },
  { id: "sof-03", name: "Pebble Loveseat", category: "sofas", price: 849, originalPrice: 999, material: "Velvet", colors: ["#7C4A6B", "#2B4159"], rating: 4.7, reviews: 88, tag: "New", desc: "A compact two-seater with a plush velvet finish and rounded bolster arms — big comfort in a small footprint.", image: img("loveseat", 3) },
  { id: "sof-04", name: "Dunwell Chesterfield", category: "sofas", price: 2199, material: "Top-grain leather", colors: ["#6B3F2A", "#2B2420"], rating: 4.9, reviews: 301, tag: "Editor's pick", desc: "Deep-buttoned tufting and rolled arms on full-grain leather that only gets better with age.", image: img("chesterfield", 4) },
  { id: "sof-05", name: "Linden Modular Sofa", category: "sofas", price: 1649, material: "Cotton-blend weave", colors: ["#588157", "#E8DDCB"], rating: 4.5, reviews: 61, tag: "New", desc: "Reconfigurable modules with deep box cushions — start with a loveseat, grow into an L-shape later.", image: img("modularsofa", 29) },
  { id: "sof-06", name: "Camden Sofa Bed", category: "sofas", price: 999, material: "Performance weave", colors: ["#3E92CC", "#2B2420"], rating: 4.3, reviews: 47, desc: "Folds flat in seconds for guests, folds back to a proper sofa the rest of the time.", image: img("sofabed", 30) },

  // ---------- Chairs ----------
  { id: "chr-01", name: "Nook Accent Chair", category: "chairs", price: 349, material: "Bouclé & oak", colors: ["#F4B740", "#3D2B56"], rating: 4.5, reviews: 176, desc: "A cocoon-shaped shell chair on tapered oak legs, sized to tuck into any reading corner.", image: img("accentchair", 5) },
  { id: "chr-02", name: "Arlo Dining Chair (Set of 2)", category: "chairs", price: 279, material: "Ash wood & rattan", colors: ["#C9A66B", "#3D2B56"], rating: 4.6, reviews: 143, desc: "Woven rattan backs paired with a solid ash frame — light enough to move, sturdy enough to last.", image: img("diningchair", 6) },
  { id: "chr-03", name: "Sway Rocking Chair", category: "chairs", price: 459, originalPrice: 549, material: "Walnut & canvas", colors: ["#6B3F2A", "#E8DDCB"], rating: 4.8, reviews: 97, tag: "New", desc: "A modern take on the classic rocker, with a gentle sway calibrated for long evenings.", image: img("rockingchair", 7) },
  { id: "chr-04", name: "Fold Lounge Recliner", category: "chairs", price: 699, material: "Performance fabric", colors: ["#588157", "#2B2420"], rating: 4.4, reviews: 64, desc: "A recliner that doesn't look like one — clean lines hide a smooth reclining mechanism.", image: img("reclinerchair", 8) },
  { id: "chr-05", name: "Milo Counter Stool (Set of 2)", category: "chairs", price: 219, material: "Powder-coated steel", colors: ["#FF6B4A", "#2B2420"], rating: 4.4, reviews: 58, desc: "A footrest ring and a slightly waterfall seat edge make these comfortable enough for long dinners.", image: img("barstool", 31) },
  { id: "chr-06", name: "Halden Lounge Chair", category: "chairs", price: 589, originalPrice: 679, material: "Leather & walnut", colors: ["#6B3F2A"], rating: 4.9, reviews: 122, tag: "Bestseller", desc: "A low-slung leather lounge chair with a matching ottoman sold separately — built for Sunday mornings.", image: img("loungechair", 32) },

  // ---------- Tables ----------
  { id: "tbl-01", name: "Alder Live-Edge Coffee Table", category: "tables", price: 599, material: "Solid walnut", colors: ["#6B3F2A"], rating: 4.9, reviews: 210, tag: "Bestseller", desc: "Each top is cut from a single walnut slab, so the grain — and the piece — is one of a kind.", image: img("coffeetable", 9) },
  { id: "tbl-02", name: "Bramble Dining Table", category: "tables", price: 1199, material: "Oak", colors: ["#C9A66B"], rating: 4.7, reviews: 118, desc: "Seats six comfortably. A wide breadboard edge keeps the top stable through seasons of humidity change.", image: img("diningtable", 10) },
  { id: "tbl-03", name: "Orbit Side Table", category: "tables", price: 189, originalPrice: 229, material: "Powder-coated steel", colors: ["#FF6B4A", "#3E92CC", "#2B2420"], rating: 4.5, reviews: 156, desc: "A circular top on a tripod steel base — light enough to carry from sofa to patio.", image: img("sidetable", 11) },
  { id: "tbl-04", name: "Studio Desk", category: "tables", price: 449, material: "Ash veneer", colors: ["#E8DDCB", "#2B2420"], rating: 4.6, reviews: 92, desc: "A slim writing desk with a built-in cable channel, sized for small apartments and home offices alike.", image: img("writingdesk", 12) },
  { id: "tbl-05", name: "Percy Console Table", category: "tables", price: 379, material: "Mango wood", colors: ["#C9A66B", "#2B2420"], rating: 4.5, reviews: 49, desc: "Slim enough for a hallway, sturdy enough to hold everything you drop on your way out the door.", image: img("consoletable", 33) },

  // ---------- Beds ----------
  { id: "bed-01", name: "Willow Upholstered Bed", category: "beds", price: 1099, material: "Linen-blend", colors: ["#D9C4A3", "#4A5859"], rating: 4.7, reviews: 189, tag: "Bestseller", desc: "A channel-tufted headboard you'll actually want to lean back against, on a low platform frame.", image: img("bedframe", 13) },
  { id: "bed-02", name: "Hollow Platform Bed", category: "beds", price: 899, material: "Solid oak", colors: ["#C9A66B"], rating: 4.5, reviews: 77, desc: "No box spring needed. Slatted oak base with a floating profile that opens up small bedrooms.", image: img("platformbed", 14) },
  { id: "bed-03", name: "Nest Canopy Bed", category: "beds", price: 1349, originalPrice: 1549, material: "Solid pine", colors: ["#E8DDCB"], rating: 4.8, reviews: 54, tag: "New", desc: "Four slim posts frame the bed without boxing in the room — drape it or leave it open.", image: img("canopybed", 15) },
  { id: "bed-04", name: "Reed Daybed", category: "beds", price: 749, material: "Rattan & pine", colors: ["#C9A66B", "#E8DDCB"], rating: 4.6, reviews: 41, desc: "A sofa by day, a proper guest bed by night — woven rattan sides on a solid pine frame.", image: img("daybed", 34) },

  // ---------- Storage ----------
  { id: "stg-01", name: "Harbor Bookshelf", category: "storage", price: 429, material: "Birch plywood", colors: ["#E8DDCB", "#2B2420"], rating: 4.6, reviews: 132, desc: "Asymmetric shelving that turns a bookcase into a display wall for the things you actually love.", image: img("bookshelf", 16) },
  { id: "stg-02", name: "Cove Sideboard", category: "storage", price: 749, material: "Walnut veneer", colors: ["#6B3F2A"], rating: 4.7, reviews: 101, tag: "Bestseller", desc: "Two sliding doors and adjustable interior shelves make this as practical as it is handsome.", image: img("sideboard", 17) },
  { id: "stg-03", name: "Fern 3-Drawer Dresser", category: "storage", price: 549, material: "Ash & brass", colors: ["#D9C4A3", "#F4B740"], rating: 4.5, reviews: 84, desc: "Brass pulls warm up a light ash body with soft-close drawers throughout.", image: img("dresser", 18) },
  { id: "stg-04", name: "Elm Wardrobe", category: "storage", price: 899, material: "Solid elm", colors: ["#6B3F2A", "#E8DDCB"], rating: 4.4, reviews: 39, desc: "A full hanging rail plus two shelves — enough structure to actually stay organized.", image: img("wardrobe", 35) },
  { id: "stg-05", name: "Pixel TV Console", category: "storage", price: 389, material: "Oak veneer", colors: ["#C9A66B", "#2B2420"], rating: 4.5, reviews: 67, desc: "Cable cutouts in the back and closed cabinets on both ends keep the media clutter out of sight.", image: img("tvstand", 36) },

  // ---------- Lighting ----------
  { id: "lgt-01", name: "Halo Arc Floor Lamp", category: "lighting", price: 249, originalPrice: 289, material: "Brushed steel", colors: ["#2B2420", "#F4B740"], rating: 4.6, reviews: 167, tag: "New", desc: "An arcing steel arm sweeps light over your favorite reading chair without a cord underfoot.", image: img("floorlamp", 19) },
  { id: "lgt-02", name: "Drift Pendant Light", category: "lighting", price: 159, material: "Rattan & brass", colors: ["#C9A66B"], rating: 4.7, reviews: 145, desc: "Hand-woven rattan casts a warm, dappled glow — a favorite over dining tables and kitchen islands.", image: img("pendantlight", 20) },
  { id: "lgt-03", name: "Ember Table Lamp (Pair)", category: "lighting", price: 129, material: "Ceramic", colors: ["#FF6B4A", "#3E92CC"], rating: 4.4, reviews: 98, desc: "A pair of ceramic lamps with a soft matte glaze, sized for nightstands or console tables.", image: img("tablelamp", 21) },
  { id: "lgt-04", name: "Alcove Chandelier", category: "lighting", price: 429, originalPrice: 499, material: "Brass & glass", colors: ["#F4B740", "#2B2420"], rating: 4.8, reviews: 53, tag: "Bestseller", desc: "A cluster of amber glass globes on a slim brass frame — the piece a dining room gets built around.", image: img("chandelier", 37) },

  // ---------- Decor ----------
  { id: "dec-01", name: "Meadow Wool Throw", category: "decor", price: 89, material: "Merino wool", colors: ["#E07A5F", "#588157", "#3D2B56"], rating: 4.8, reviews: 233, tag: "Bestseller", desc: "Woven in a soft herringbone, generously sized for the end of a sofa or the foot of a bed.", image: img("throwblanket", 22) },
  { id: "dec-02", name: "Terra Ceramic Vase Set", category: "decor", price: 69, material: "Stoneware", colors: ["#C9A66B", "#E8DDCB"], rating: 4.6, reviews: 112, desc: "Three hand-thrown vases in graduated sizes, each with a slightly different glaze pull.", image: img("ceramicvase", 23) },
  { id: "dec-03", name: "Grove Wall Mirror", category: "decor", price: 199, material: "Oak frame", colors: ["#C9A66B"], rating: 4.7, reviews: 88, desc: "A softly arched mirror in a solid oak frame — big enough to anchor an entryway.", image: img("wallmirror", 24) },
  { id: "dec-04", name: "Tuft Wool Rug 5x7", category: "decor", price: 349, originalPrice: 429, material: "Hand-tufted wool", colors: ["#D9C4A3", "#7C4A6B"], rating: 4.5, reviews: 76, tag: "New", desc: "Hand-tufted in a low pile that's soft underfoot and easy to spot-clean.", image: img("arearug", 25) },
  { id: "dec-05", name: "Linear Framed Art Set", category: "decor", price: 129, material: "Giclée print, oak frame", colors: ["#2B2420", "#E8DDCB"], rating: 4.4, reviews: 45, desc: "A set of three abstract prints in matching oak frames, ready to hang straight out of the box.", image: img("wallart", 38) },
  { id: "dec-06", name: "Amber Candle Trio", category: "decor", price: 49, material: "Soy wax & glass", colors: ["#F4B740", "#E07A5F"], rating: 4.7, reviews: 91, desc: "Three amber glass candles in graduated sizes with a warm sandalwood-and-clove scent.", image: img("candleholder", 39) },

  // ---------- Outdoor ----------
  { id: "out-01", name: "Solstice Outdoor Sofa", category: "outdoor", price: 1099, material: "All-weather wicker", colors: ["#588157", "#2B2420"], rating: 4.6, reviews: 71, desc: "Woven from all-weather resin wicker over a rust-proof aluminum frame — built to live outside.", image: img("outdoorsofa", 26) },
  { id: "out-02", name: "Patio Bistro Set", category: "outdoor", price: 429, material: "Powder-coated steel", colors: ["#FF6B4A", "#3E92CC"], rating: 4.4, reviews: 59, desc: "A two-chair bistro set sized for balconies, finished in a chip-resistant powder coat.", image: img("bistroset", 27) },
  { id: "out-03", name: "Dune Lounger", category: "outdoor", price: 349, material: "Teak", colors: ["#C9A66B"], rating: 4.7, reviews: 44, tag: "New", desc: "A reclining teak lounger with five positions, finished to weather gracefully year after year.", image: img("outdoorlounger", 28) },
  { id: "out-04", name: "Breeze Hammock", category: "outdoor", price: 149, material: "Cotton rope", colors: ["#E8DDCB", "#3E92CC"], rating: 4.6, reviews: 68, desc: "Hand-woven cotton rope on a hardwood spreader bar — pairs with any stand or two sturdy trees.", image: img("hammock", 40) },
  { id: "out-05", name: "Ember Fire Pit Table", category: "outdoor", price: 649, originalPrice: 749, material: "Concrete & steel", colors: ["#2B2420", "#6B3F2A"], rating: 4.8, reviews: 37, tag: "New", desc: "Doubles as a side table by day and a real wood-burning fire pit by night.", image: img("firepit", 41) },
];
