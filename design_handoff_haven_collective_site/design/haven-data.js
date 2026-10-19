export const artists = [
  { slug: 'amanda-rose', name: 'Amanda Rose', medium: 'textiles & painting', img: 'media/spoons.jpg', imgPos: 'center', portrait: '47% 36%',
    bio: ['Amanda Rose is a painter and textile artist. Her shibori-dyed linen work mirrors the discomfort and beauty of identity in transformation — cloth bound, compressed, and released, the final pattern never fully known until it opens.', 'The process demands a surrender of control she is still learning to offer, both at the dyeing table and in the unfolding of early motherhood. In the compression and release of resist dyeing she finds a language for this particular season: the pressure that brings clarity, the letting go that reveals what was always taking shape.'],
    work: [{ img: 'media/spoons.jpg', pos: 'center', title: 'Spoons', meta: 'unfired clay, 2026' }, { title: 'Shibori linen', meta: 'photo needed' }, { title: 'Painting', meta: 'photo needed' }] },
  { slug: 'sarah-aubin', name: 'Sarah Aubin', medium: 'photography', img: 'media/sarah-hand.jpg', imgPos: 'center', portrait: '47% 36%',
    bio: ['Sarah seeks to be a thorough observer, studying the relationships between contrasting ideas: depth and buoyancy, pressure and weightlessness, the serious and the ridiculous.', 'Curiosity and intention guide her work, grounded in reverence for the shifting tides of nature, of being human, of being in relation.'],
    work: [{ img: 'media/sarah-hand.jpg', pos: 'center', title: 'Untitled (hand)', meta: 'silver gelatin print, 2026' }, { img: 'media/sarah-2.jpg', pos: 'center 60%', title: 'Untitled (surface)', meta: 'archival print, 2026' }, { img: 'media/sarah-1.jpg', pos: 'center', title: 'Untitled (breath)', meta: 'archival print, 2026' }] },
  { slug: 'morgan-terry', name: 'Morgan Terry', medium: 'fiber arts', img: 'media/quilt-detail.jpg', imgPos: 'center 30%', portrait: '36% 38%',
    bio: ['Morgan is a multidisciplinary visual artist. Their work for this show reflects on early parenthood and the labor of presence in the soft liminal time of infancy.', 'Stitched portraits on satin quilts — an homage to the pillows their mother made for them, and now a gift made in turn for their own child.'],
    work: [{ img: 'media/quilt-detail.jpg', pos: 'center', title: 'Portrait (gold)', meta: 'stitched satin quilt, 2026' }, { img: 'media/install-quilt-wall.jpg', pos: '64% 26%', size: '420% auto', title: 'Portrait (red)', meta: 'stitched satin quilt, 2026' }, { img: 'media/install-quilt-wall.jpg', pos: '47% 26%', size: '420% auto', title: 'Portrait (sand)', meta: 'stitched satin quilt, 2026' }, { img: 'media/install-quilt-wall.jpg', pos: '46% 60%', size: '420% auto', title: 'Portrait (yellow)', meta: 'stitched satin quilt, 2026' }] },
  { slug: 'jaimie-baird', name: 'Jaimie Baird', medium: 'ceramics & video', img: '', portrait: '56% 35%',
    bio: ['Jaimie Baird crafts functional and sculptural ceramics in the bursts of space and inspiration allotted in early parenthood. Working primarily in stoneware and terracotta, her pieces bear the indelible marks of their making — a memory of touch and transformation held in the clay.', 'Her recent body of work draws from her experience of motherhood — the weight, the joy, the giving and receiving. The simultaneous strength and emptiness of a vessel.'],
    work: [{ title: 'Vessels', meta: 'photo needed' }, { title: 'Video', meta: 'link needed', video: true }, { title: 'Stoneware', meta: 'photo needed' }] },
  { slug: 'courtney-astrea-stroming', name: 'Courtney Astrea Stroming', medium: 'sculpture', img: 'media/install-plinth.jpg', imgPos: 'center 45%', portrait: '36% 38%',
    bio: ['Courtney Astrea Stroming explores her matrescence journey by investigating her evolving identity through both the emotional and physical dimensions of her body.', 'Against the backdrop of a shifting social and political climate, her work lingers in the space between transformation and expectation, tracing the complexities of modern motherhood and gender.'],
    work: [{ img: 'media/install-plinth.jpg', pos: 'center 48%', title: 'Protea Pelvis', meta: 'ceramic, dried protea, 2026' }, { title: 'Sculpture', meta: 'photo needed' }, { title: 'Sculpture', meta: 'photo needed' }] },
  { slug: 'ali-luis-yates', name: 'Ali Luis Yates', medium: 'medium tbd', img: '', portrait: '56% 35%',
    bio: ['Artist statement coming soon.'],
    work: [{ title: 'Work', meta: 'photo needed' }, { title: 'Work', meta: 'photo needed' }, { title: 'Work', meta: 'photo needed' }] }
];

export const events = [
  { slug: 'haven-collective-2026', title: 'Haven Collective', upcoming: true, dateLabel: 'November 7, 2026', dateShort: 'Nov 7, 2026', opens: 'Opens Saturday, November 7', venue: 'Black Cat Pilates', address: 'Port Townsend, WA', reception: 'Opening reception · Saturday, November 7 · 5–8pm',
    blurb: ['Six artists who met in the tender, disorienting early months of new parenthood return with new work on the domestic as a site of meaning, the body as a keeper of time, and the self that persists beneath and alongside the role of mother.'],
    poster: '', photos: [] },
  { slug: 'mothers-makers-2026', title: 'Mothers Makers', upcoming: false, dateLabel: 'August 22–23, 2026', dateShort: 'Aug 22–23, 2026', opens: 'August 22–23, 2026', venue: 'Baird Studio', address: 'Port Townsend, WA', reception: 'Opening reception · Friday, August 22 · 5–8pm',
    blurb: ['We met in the tender, disorienting early months of new parenthood — a time when identities shift and creative lives can go quiet. This show is our refusal to let them.', 'Our first show together: stitched satin portraits, shibori linen, underwater photographs, ceramics and sculpture across two days in the studio.'],
    hero: { img: 'media/install-quilt-wall.jpg', pos: '55% 40%' },
    photos: [
      { img: 'media/install-plinth.jpg', pos: 'center 45%', tall: true, cap: 'Protea Pelvis on the plinth; Morgan Terry’s quilts behind' },
      { img: 'media/install-sarah-wall.jpg', pos: '62% 50%', cap: 'Sarah Aubin’s wall' },
      { img: 'media/install-hanging.jpg', pos: '40% 50%', cap: 'Hanging the quilts' },
      { img: 'media/group-1.jpg', pos: 'center 40%', wide: true, cap: 'The collective under the tent' },
      { img: 'media/install-quilt-wall.jpg', pos: '45% 40%', cap: 'Stitched satin portraits' }
    ] }
];
