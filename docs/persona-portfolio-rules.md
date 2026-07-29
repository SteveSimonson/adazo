# Adazo persona portfolio rules (locked)

Standing order for **every** persona modeling / campaign generation.

## Goal

Build each house persona as a **model portfolio**: absolute face fidelity to the control (avatar), but **every campaign slot is a unique, world-class fashion photograph** that positions **ADAZO** as a fashion destination.

## Source of truth

| Slot | Purpose | Path pattern |
|------|---------|----------------|
| **Control** | Face + identity reference only | `/brand/vibes/{id}-avatar.jpg` |
| **House campaign** | Primary fashion ad | `/brand/vibes/portfolio/*` |
| **World Edit** | Travel fashion ad | `/brand/vibes/portfolio/*` |
| **Wild Edit** | On-location fashion with exotic animals | `/brand/vibes/portfolio/*-wild-*` |

Jewelry / hair / accessories may change. **Core face + body identity** must not.

Control images are **references**, never the campaign deliverable. Do not enlarge, lightly regrade, or re-crop the control and ship it as a campaign.

## Hard rules (do not violate)

### 1. Face fidelity (keep)

- Generate with `image_edit` using the **control avatar** as the only face reference.
- Preserve bone structure, skin tone, age band, hair identity, and distinctive features.
- Do not swap models or “approximate” the persona.

### 2. Pose uniqueness (required)

Across **control + every campaign** for the same persona:

- **No repeated pose family.** Forbidden pairs include:
  - two mid-stride “walking toward camera with bag” shots
  - two seated café/bench portraits without a clear opposite angle
  - two standing three-quarter “smiling at camera” tourist frames
- Prefer **orthogonal poses** when adding a new slot, e.g.:
  - standing static vs walking
  - seated vs standing
  - over-shoulder vs frontal
  - profile vs three-quarter
  - looking up vs looking into lens

### 3. Wardrobe uniqueness (required)

Across campaigns for the same persona:

- **Different silhouette** (gown vs coat vs pantsuit vs slip vs trench).
- **Different color family** when possible (e.g. house cream gown → travel charcoal coat).
- Do **not** ship two brown/camel blazer walks, two white linen stands, or two bronze satin gowns.

### 4. Scene uniqueness (required)

- New location every campaign (hotel stairs ≠ Seine quay ≠ closet control).
- Travel series must read as a **destination**, not a re-lit studio of the house ad.

### 5. Branding (required)

- Composite **ADAZO** type in code (Pillow / layout), not AI text.
- Series kickers:
  - House: `HOUSE CAMPAIGN`
  - Travel: `WORLD EDIT` + city pin
- Taglines: fashion destination language; no third-party brand logos.

### 6. Products optional

- Campaigns may be pure fashion (no product).
- Never let product still-life replace the model portfolio intent.

## Pre-ship checklist (mandatory)

Before merging any new persona campaign still:

1. Open **control**, **all existing campaigns**, and **the new still** side by side.
2. Confirm **pose family** is unique (write one-line pose label for each).
3. Confirm **wardrobe** differs in silhouette **and** color family.
4. Confirm **scene** is not a rehash of an existing set.
5. Confirm face still reads as the same model.
6. Confirm ADAZO branding is sharp and on-brand.

If any check fails, **regenerate** — do not ship.

## Pose / wardrobe matrix (current locked set)

| Persona | Control | House | World Edit | Wild Edit |
|---------|---------|-------|------------|-----------|
| **Vivienne** | Seated vanity, cream wrap | Standing stairs, ivory gown + cape | Walking Seine, charcoal coat + red gloves | Seated safari vehicle, ochre jumpsuit, elephants (Botswana) |
| **Camille** | Vanity close-up, pink robe | Studio 3/4, rose satin, hand in hair | Walking Tokyo night, fuchsia trench + black mini | Kneeling palace court, emerald silk, peacocks (Rajasthan) |
| **Noor** | Perfume mist close-up | Rooftop walk, black jumpsuit + violet organza | Standing Marrakech riad, embroidered kaftan | Desert profile, ruby coat, falcon on glove |
| **Margot** | Closet 3/4, brown blazer | Standing museum, black one-shoulder gown, look-back | Seated Duomo café, ivory trench | Standing with white horse, burgundy riding jacket (Andalucía) |
| **Isla** | Spa close-up, jade roller | Seated greenhouse, sage silk slip | Standing Santorini, white linen + hat | In-water lagoon look-back, coral maxi, flamingos (Yucatán) |
| **Aurelia** | Seated jewelry showroom | Standing opera stairs, bronze gown + gloves | Walking Venice calle, black velvet coat | Seated palace terrace, emerald velvet + gold, white peacock (Jaipur) |

When adding a **fourth** campaign, invent a new cell that collides with **none** of the columns above.

Jewelry, hair styling, and accessories **may change** freely. Only **core face + body identity** must stay locked to control.

## Prompt pattern (required language)

Always include explicit anti-collision lines, e.g.:

```
CRITICAL: Do NOT use a walking mid-stride pose.
CRITICAL: Do NOT use a brown or camel pantsuit.
CRITICAL: Wardrobe must not be cream/ivory if the house ad is already cream.
New pose: [specific opposite pose].
Wardrobe: [specific opposite silhouette and color].
```

## Anti-patterns (banned)

- Shipping control crop as campaign
- “Same walk, different city”
- Same suit color family across house + travel
- Same white dress standing pose across house + travel
- Same bronze gown standing pose across house + travel
- AI-garbled brand text instead of composited ADAZO type

## Ownership

Any agent or human adding portfolio stills must follow this doc. Prefer linking it from PR descriptions for campaign work.
