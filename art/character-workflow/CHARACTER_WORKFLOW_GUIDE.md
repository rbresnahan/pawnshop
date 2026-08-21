# Character Consistency Workflow

This folder provides a lightweight, repeatable workflow for creating character art that stays visually consistent with an established project style.

The goal is **consistency, not bulk generation**.

The workflow assumes that some concept work has already been done and that you have at least one character image that successfully represents the visual world you want to reproduce.

That image becomes the **canonical reference**.

---

## Core Idea

Start with one successful character.

Then repeat this process:

1. **Define the style**
2. **Create a new character**
3. **Compare it against the canonical reference**
4. **Correct structural/style drift**
5. **Equalize quality and detail**
6. **Approve the result**

The canonical reference is the visual source of truth.

Written rules help explain what matters, but they do not replace the reference image.

---

## Why This Exists

AI image generation is often good at creating the **character concept** while drifting away from the established visual world.

A first pass may have:

* the right outfit
* the right personality
* the right pose
* the right overall character design

but still feel like it came from another game because it is:

* too realistic
* too detailed
* too tall or naturally proportioned
* rendered with different line or pixel construction
* shaded differently
* more or less polished than the rest of the cast

This workflow separates those problems instead of trying to solve everything in one prompt.

---

# Workflow

## 1. Define Style, Look, and Feel

Place the project's canonical reference image in:

```text
art/character-workflow/reference/
```

Recommended filename:

```text
canonical-reference.png
```

Then describe only the style rules that are useful to preserve or correct in:

```text
STYLE.md
```

Examples include:

* proportions
* silhouette
* anatomy construction
* line or outline treatment
* pixel construction
* shading
* facial complexity
* detail density
* color treatment
* pose conventions
* rendering quality
* export requirements

Do not try to describe every visible property of the reference image.

The image itself remains authoritative.

---

## 2. Create the Character

Create a short character brief under:

```text
characters/<character-name>/
```

For example:

```text
characters/cop-detective/
└── brief.md
```

The brief should focus primarily on the character:

* role
* age
* build
* clothing
* accessories
* personality
* pose or facing direction when important
* any project-specific visual requirements

Use the canonical reference and `STYLE.md` when generating the first pass.

### First-pass goal

Get the **character identity and design** right.

The first image does not have to be perfectly normalized to the project style yet.

If the design is good, preserve it.

Do not regenerate a successful character just because the proportions, rendering density, or style need refinement.

---

## 3. Compare Against the Canonical Reference

This step is mandatory.

Before correcting the new character, compare:

```text
EDIT_TARGET
vs.
CANONICAL_REFERENCE
```

Identify the meaningful differences first.

Depending on the project, compare things such as:

* head-to-body ratio
* torso length
* shoulder/body mass
* arm length
* leg length
* hand placement
* knee placement
* shoe scale
* center of gravity
* silhouette
* anatomy realism
* facial construction
* line or outline weight
* pixel scale
* shading density
* detail density
* rendering style

The purpose of this step is diagnosis, not redesign.

Ask:

> What makes this character look as though it belongs to a different visual system than the canonical reference?

---

## 4. Refine Consistency

Use the comparison findings to correct the existing character.

Preserve:

* character identity
* recognizable face
* hairstyle
* clothing
* accessories
* pose
* facing direction
* expression
* overall concept

Correct only the parts that prevent the character from fitting the same visual world.

This may include:

* changing proportions
* compressing or enlarging body masses
* simplifying anatomy
* changing line or pixel construction
* adjusting silhouette
* changing shading structure
* reducing or increasing realism

### Important

**Structural consistency and quality equalization are separate operations.**

A character can have the correct detail level and still have the wrong body construction.

Likewise, a character can have the correct proportions and still be over-rendered or under-rendered.

Fix structural/style drift first.

---

## 5. Equalize Quality

Once the character fits the same visual construction, match the reference's rendering and detail level.

This step is style-dependent.

For pixel art, it might mean:

* larger pixel clusters
* fewer colors
* simpler facial detail
* broader shading masses
* less texture
* reduced micro-detail

For hand-drawn art, it might mean:

* matching line density
* matching brush or pencil treatment
* matching cleanup level
* matching cross-hatching or texture

For realistic rendering, it might mean:

* matching anatomy fidelity
* matching material detail
* matching lighting complexity
* matching skin or fabric rendering

The goal is simple:

> The new character should feel as though it was produced by the same visual system as the canonical reference.

---

## 6. Approve

Once the character:

* preserves the intended design
* fits the reference's structural language
* matches its detail/quality level
* satisfies the project's export requirements

save the final approved image in the character folder.

A minimal character folder can look like:

```text
characters/cop-detective/
├── brief.md
├── 01-created.png
├── 02-refined.png
└── character.png
```

Intermediate files are optional.

Git already provides history, so avoid unnecessary bookkeeping.

---

# One Star Pawn Example

For **One Star Pawn**, the canonical reference establishes a visual language built around:

* oversized heads
* heavily compressed bodies
* short broad torsos
* short thick limbs
* low knees
* substantial shoes
* low center of gravity
* thick dark outlines
* large deliberate pixel clusters
* broad clustered shading
* simplified facial construction
* muted gritty color treatment
* true low-resolution game-art feel

The most common first-pass failure is not bad character design.

It is **style drift**.

Characters often become:

* too realistic
* too naturally proportioned
* too tall or slender
* too detailed in the face
* too polished in the eyes
* too finely shaded
* too full of hair, clothing, or skin micro-detail

The correct response is usually:

> Preserve the character. Normalize the character to the world.

---

# Using a Different Art Style

The workflow itself is style-agnostic.

To use it for another project:

1. Replace the canonical reference.
2. Update `STYLE.md`.
3. Keep the same create → compare → refine → equalize process.

Examples:

### NES-style project

The reference may define:

* tiny sprite dimensions
* strict palette limits
* hard pixel clustering
* extremely simplified anatomy
* very limited shading

### Hand-drawn project

The reference may define:

* line weight
* stroke looseness
* shape language
* anatomy simplification
* shading or cross-hatching
* cleanup level

### Realistic project

The reference may define:

* anatomy fidelity
* lighting
* material rendering
* facial detail
* color grading
* finish level

The framework does not assume pixel art.

The project reference and `STYLE.md` define the style.

---

# Operating Principles

Keep the workflow small.

* The canonical reference is the source of truth.
* Compare before correcting.
* Preserve successful character design.
* Correct structural drift before quality drift.
* Do not redesign when refinement is enough.
* Do not add tooling or process unless a real problem requires it.
* Keep character-workflow files isolated from game runtime and data.
* Do not overwrite the canonical reference.

---

# Short Version

```text
REFERENCE
   ↓
CREATE CHARACTER
   ↓
COMPARE
   ↓
REFINE STRUCTURE / STYLE
   ↓
EQUALIZE QUALITY
   ↓
APPROVE
   ↓
REPEAT
```

The workflow is intentionally simple:

> Define the world once, then make new characters belong to it.
> ::: 
