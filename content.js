window.WORLDSTATE = {
  "name": "WorldState",
  "subtitle": "Scalable Implicit Memory for Interactive Video World Models",
  "paperUrl": "",
  "codeUrl": "",
  "bibtex": "",
  "authors": "",
  "affiliation": "",
  "featuredVideo": {
    "src": "",
    "poster": "",
    "title": "WorldState in motion"
  },
  "abstract": "Interactive video world models generate continuous video streams conditioned on user actions and camera movements. Long-horizon interaction requires these models to preserve previously generated environments and recover historically consistent content during spatial revisits. Explicit memories either require growing storage and retrieval or rely on potentially inaccurate geometric estimates. Recurrent linear memory avoids these costs but suffers from imbalanced frame-wise updates and fixed capacity: spatial normalization weakens erasure relative to writing, while a single state cannot scale with video length, forcing a growing amount of historical information to compete for limited memory capacity. To address these limitations, we propose WorldState, a scalable implicit memory model built upon a hybrid attention backbone. WorldState decouples memory erasing and writing for fine-grained memory editing and uniformly organizes history into a logarithmically growing set of temporally isolated states. Completed historical states remain subject to channel-wise decay but are excluded from subsequent erasure and writing, reducing repeated overwriting while preserving adaptive forgetting. Context-aware memory routing further retrieves relevant historical states according to the current generation context. Extensive experiments demonstrate that WorldState substantially improves long-term memory retention and spatial revisit consistency while preserving the computational efficiency of linear attention, enabling high-fidelity and spatially coherent video generation over extended interaction horizons.",
  "steps": [
    {
      "title": "Edit with precision.",
      "label": "Edit associations",
      "text": "Separate erase and write gates control what to remove and what to add. Channel-wise decay gives different memory channels their own retention timescales.",
      "note": "Independent erase · write · retention",
      "formula": "Sₜ = Sₜ₋₁ Mₜ + Uₜ"
    },
    {
      "title": "Give history its own space.",
      "label": "Preserve across time",
      "text": "Distribute latent frames uniformly across a logarithmically growing set of temporal states. The live state receives decay, erasure, and writes; completed states retain channel-wise decay while remaining protected from later erasure and writing.",
      "note": "Uniform spans · separate states",
      "formula": "N = ⌈log₂ T⌉"
    },
    {
      "title": "Recall what matters now.",
      "label": "Retrieve by context",
      "text": "The current query predicts positive, per-head weights over historical states. Readout combines routed history with the live state. Routing controls retrieval independently of recurrent memory editing.",
      "note": "Query-conditioned · per-head routing",
      "formula": "Oₜ = (Sˡⁱᵛᵉ + Σᵢ rᵢ Sⁱ) Qₜ"
    }
  ],
  "comparisonModels": [
    {
      "id": "gen3c",
      "name": "Gen3C"
    },
    {
      "id": "spatia",
      "name": "Spatia"
    },
    {
      "id": "ifw",
      "name": "Infinite-World"
    },
    {
      "id": "mxg3",
      "name": "Matrix-Game 3.0"
    },
    {
      "id": "sanawm",
      "name": "SANA-WM"
    },
    {
      "id": "worldstate",
      "name": "WorldState"
    }
  ],
  "comparisonRows": [
    {
      "id": "outdoor_09-a",
      "title": "Outdoor 09",
      "playbackRate": 1,
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-01-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-01-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-spatia.jpg"
        },
        "ifw": {},
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-01-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-01-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-01-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-worldstate.jpg"
        }
      }
    },
    {
      "id": "indoor_01-c",
      "title": "Indoor 01",
      "playbackRate": 2,
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-02-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_01-c-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-02-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_01-c-spatia.jpg"
        },
        "ifw": {},
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-02-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_01-c-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-02-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_01-c-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-02-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_01-c-worldstate.jpg"
        }
      }
    },
    {
      "id": "indoor_02-g",
      "title": "Indoor 02",
      "playbackRate": 2,
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-03-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_02-g-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-03-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_02-g-spatia.jpg"
        },
        "ifw": {},
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-03-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_02-g-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-03-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_02-g-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-03-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_02-g-worldstate.jpg"
        }
      }
    },
    {
      "id": "indoor_14-j",
      "title": "Indoor 14",
      "playbackRate": 1,
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-04-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_14-j-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-04-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_14-j-spatia.jpg"
        },
        "ifw": {},
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-04-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_14-j-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-04-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_14-j-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-04-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-top/indoor_14-j-worldstate.jpg"
        }
      }
    },
    {
      "id": "glacial-lake-j",
      "title": "Glacial Lake · 33s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-05-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922/glacial-lake-j-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-05-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922/glacial-lake-j-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-05-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922/glacial-lake-j-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-05-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922/glacial-lake-j-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-05-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922/glacial-lake-j-worldstate.jpg"
        }
      }
    },
    {
      "id": "canyon-stream-k",
      "title": "Canyon · 35s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-06-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922/canyon-stream-k-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-06-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922/canyon-stream-k-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-06-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922/canyon-stream-k-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-06-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922/canyon-stream-k-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-06-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922/canyon-stream-k-worldstate.jpg"
        }
      }
    },
    {
      "id": "seaside-c",
      "title": "Seaside · 29s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-07-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922/seaside-c-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-07-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922/seaside-c-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-07-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922/seaside-c-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-07-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922/seaside-c-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-07-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922/seaside-c-worldstate.jpg"
        }
      }
    },
    {
      "id": "waterfall-f",
      "title": "Waterfall · 35s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-08-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/waterfall-f-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-08-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/waterfall-f-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-08-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/waterfall-f-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-08-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/waterfall-f-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-08-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/waterfall-f-worldstate.jpg"
        }
      }
    },
    {
      "id": "autumn-stream-j",
      "title": "Autumn Stream · 33s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-09-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/autumn-stream-j-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-09-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/autumn-stream-j-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-09-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/autumn-stream-j-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-09-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/autumn-stream-j-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-09-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/autumn-stream-j-worldstate.jpg"
        }
      }
    },
    {
      "id": "seaside-f",
      "title": "Seaside · 35s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-10-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/seaside-f-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-10-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/seaside-f-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-10-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/seaside-f-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-10-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/seaside-f-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-10-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-batch2/seaside-f-worldstate.jpg"
        }
      }
    },
    {
      "id": "indoor_05-b",
      "title": "Indoor 05 · 30s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-11-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/indoor_05-b-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-11-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/indoor_05-b-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-11-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/indoor_05-b-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-11-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/indoor_05-b-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-11-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/indoor_05-b-worldstate.jpg"
        }
      }
    },
    {
      "id": "outdoor_16-b",
      "title": "Outdoor 16 · 30s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-12-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_16-b-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-12-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_16-b-spatia.jpg"
        },
        "ifw": {
          "src": "",
          "poster": ""
        },
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-12-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_16-b-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-12-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_16-b-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-12-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_16-b-worldstate.jpg"
        }
      }
    },
    {
      "id": "outdoor_12-g",
      "title": "Outdoor 12 · 30s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-13-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_12-g-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-13-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_12-g-spatia.jpg"
        },
        "ifw": {},
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-13-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_12-g-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-13-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_12-g-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-13-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_12-g-worldstate.jpg"
        }
      }
    },
    {
      "id": "outdoor_11-h",
      "title": "Outdoor 11 · 29s",
      "videos": {
        "gen3c": {
          "src": "assets/comparison-previews-lite/row-14-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_11-h-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/comparison-previews-lite/row-14-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_11-h-spatia.jpg"
        },
        "ifw": {},
        "mxg3": {
          "src": "assets/comparison-previews-lite/row-14-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_11-h-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/comparison-previews-lite/row-14-sanawm.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_11-h-sanawm.jpg"
        },
        "worldstate": {
          "src": "assets/comparison-previews-lite/row-14-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-re10k/outdoor_11-h-worldstate.jpg"
        }
      }
    }
  ],
  "shortVideos": [
    {
      "id": "short-01",
      "title": "Short video 01",
      "src": "",
      "poster": "",
      "prompt": ""
    },
    {
      "id": "short-02",
      "title": "Short video 02",
      "src": "",
      "poster": "",
      "prompt": ""
    },
    {
      "id": "short-03",
      "title": "Short video 03",
      "src": "",
      "poster": "",
      "prompt": ""
    },
    {
      "id": "short-04",
      "title": "Short video 04",
      "src": "",
      "poster": "",
      "prompt": ""
    }
  ],
  "longVideos": [
    {
      "id": "long-01",
      "title": "Long video 01",
      "src": "",
      "poster": "",
      "prompt": ""
    },
    {
      "id": "long-02",
      "title": "Long video 02",
      "src": "",
      "poster": "",
      "prompt": ""
    }
  ],
  "architecture": {
    "src": "assets/framework-with-scene-memory.png?v=3bd2a5eb3629",
    "width": 3600,
    "height": 1460,
    "title": "Overview of WorldState architecture.",
    "parts": [
      {
        "lead": "(a) Scalable memory organization and routing:",
        "text": "History is uniformly partitioned into logarithmically growing temporal states, with context-aware routing for memory retrieval."
      },
      {
        "lead": "(b) Decoupled memory editing:",
        "text": "Independent erase and write gates with channel-wise decay enable fine-grained recurrent memory updates."
      }
    ]
  },
  "videos": [
    {
      "id": "coast",
      "title": "Jungle Ruins",
      "category": "Exploration",
      "tag": "Jungle ruins · Game style · Hard trajectory",
      "poster": "assets/game_style_008_poster.jpg",
      "src": "assets/videos/game_style_008_generated.mp4",
      "description": "A first-person view through a rain-drenched jungle ruin.",
      "prompt": "A first-person view of a rain-drenched jungle ruin where moss-covered stone pillars and crumbling masonry frame a muddy path leading toward distant, mist-shrouded hills. The ground is slick with water, reflecting the overcast sky, while thick vines and leafy undergrowth cling to the weathered architecture. Raindrops streak vertically through the air, visible against the dark, wet surfaces of the stone and foliage. In the immediate foreground, the tops of worn leather boots rest on the damp earth, anchoring the perspective. The scene is defined by the textures of decaying stone, vibrant green moss, and the heavy, humid atmosphere of a forgotten, overgrown sanctuary."
    },
    {
      "id": "flooded-ruins",
      "title": "Flooded City",
      "category": "Exploration",
      "tag": "Flooded ruins city · WorldState + refiner",
      "poster": "assets/06_flooded_ruins_city_traj2_poster.jpg",
      "src": "assets/videos/06_flooded_ruins_city_traj2_generated.mp4",
      "description": "Flooded City.",
      "prompt": "A first-person view of a sunlit, waterlogged canal in a historic European city, with a weathered wooden rowboat moored in the foreground, its hull painted faded blue and lined with a red cushion and a lantern. The canal’s surface reflects the surrounding stone buildings and arched bridges, its water level high enough to submerge the lower levels of the structures. To the left, a stone quay with a wooden post and rope barrier leads to a multi-arched bridge, beneath which a large wooden waterwheel is visible. The middle ground reveals a series of aged, multi-story buildings with peeling stucco, shuttered windows, and hanging laundry, their ground floors partially submerged. On the right, makeshift market stalls with tarpaulin canopies line the canal edge. In the background, a tall clock tower rises above the rooftops under a pale blue sky with scattered clouds, casting soft light across the scene. The scene has a historical atmosphere, with the textures of wet stone, wood, and water creating a sense of damp, historical decay."
    },
    {
      "id": "village",
      "title": "Sunlit Bedroom",
      "category": "Revisit",
      "tag": "Sunlit bedroom · Hard trajectory",
      "poster": "assets/indoor_013_poster.jpg",
      "src": "assets/videos/indoor_013_generated.mp4",
      "description": "A first-person exploration of a sunlit bedroom.",
      "prompt": "A first-person view of a sunlit bedroom with a low bed covered in rumpled sage green and beige linens in the foreground. To the left, a wooden nightstand holds a brass alarm clock and a glass of water, sitting beneath a framed landscape print and a small woven wall hanging. A woven rug lies on the hardwood floor near the foot of the bed. Straight ahead, a large double-hung window with sheer white curtains allows bright natural light to flood the room, revealing green trees outside. To the right, a wooden dresser supports a ceramic lamp, a potted plant, and a stack of books. The walls are textured white plaster, and the overall atmosphere is warm, calm, and still."
    },
    {
      "id": "lighthouse",
      "title": "Sunlit Living Room",
      "category": "Revisit",
      "tag": "Sunlit living room",
      "poster": "assets/indoor_006_poster.jpg",
      "src": "assets/videos/indoor_006_generated.mp4",
      "description": "A first-person exploration of a sunlit living room.",
      "prompt": "A first-person view of a sunlit living room where an open hardcover book rests on the cushioned arm of a beige armchair in the immediate foreground. To the left, a wooden side table holds a steaming ceramic mug and a lamp with a textured shade, positioned near a large window that floods the space with warm natural light. The floor features polished wood planks partially covered by a soft area rug. In the background, a plush sofa draped with a knit throw sits opposite a built-in white bookshelf filled with various books and decorative items, creating a cozy, stationary domestic atmosphere defined by soft fabrics and warm tones."
    },
    {
      "id": "oasis",
      "title": "Sunset Skyline",
      "category": "Long horizon",
      "tag": "Urban skyline · Game style · Hard trajectory",
      "poster": "assets/game_style_004_poster.jpg",
      "src": "assets/videos/game_style_004_generated.mp4",
      "description": "A first-person view over an urban skyline at sunset.",
      "prompt": "A first-person view from a high vantage point overlooking a dense urban skyline at sunset, where rows of mid-rise and high-rise buildings stretch toward a glowing horizon. The foreground features the sharp edge of a rooftop, casting a dark triangular shadow over textured asphalt below. Skyscrapers rise in silhouette against an orange-to-purple gradient sky, their glass and concrete surfaces catching the last warm light. Streets carve linear paths through the grid, flanked by uniformly spaced structures with flat roofs and rectangular windows. No motion is visible; the scene is static, defined by geometric forms, layered depth, and the stillness of twilight settling over the cityscape."
    },
    {
      "id": "harbor",
      "title": "Futuristic City",
      "category": "Long horizon",
      "tag": "Game style · Hard trajectory",
      "poster": "assets/game_style_005_poster.jpg",
      "src": "assets/videos/game_style_005_generated.mp4",
      "description": "Game-style world exploration along a hard camera trajectory.",
      "prompt": "A first-person view from a cracked concrete rooftop overlooks a futuristic city skyline shrouded in low-lying mist under a gradient twilight sky. The foreground features a weathered, gray surface with visible fissures and a metal railing running horizontally across the frame. In the distance, illuminated skyscrapers pierce through the haze, displaying neon accents in purple and green, while one building glows warmly from internal lighting. A small aircraft hovers silently against the dusky horizon, adding subtle motion to the otherwise still urban panorama. The atmosphere is calm and atmospheric, with soft ambient light casting gentle shadows across the scene."
    }
  ],
  "refinerComparisons": [
    {
      "id": "outdoor-nature-001",
      "title": "Canyon",
      "scene": "Outdoor nature · 001",
      "src": "assets/videos/refiner-comparison.mp4",
      "poster": "assets/outdoor_nature_001_refiner_no_text_poster.jpg"
    }
  ]
};
