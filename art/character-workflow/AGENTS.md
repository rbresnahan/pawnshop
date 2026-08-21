# Character Workflow Instructions

- Treat the canonical reference image as the visual source of truth. Written style rules explain or reinforce it; they do not replace it.
- Do not assume pixel art unless `STYLE.md` says so.
- Use semantic image roles in durable workflow documentation:
  - `EDIT_TARGET` means the newly generated or working character.
  - `CANONICAL_REFERENCE` means the project canonical reference.
- After creating a character, compare `EDIT_TARGET` directly against `CANONICAL_REFERENCE` before final quality equalization.
- Before requesting or performing correction, explicitly identify meaningful visual differences that make `EDIT_TARGET` feel built from a different visual construction or style than `CANONICAL_REFERENCE`.
- If structural or proportion drift exists, correct it before quality equalization. This includes head-to-body ratio, torso compression, shoulder/body mass, arm length, leg length, knee placement, shoe scale, silhouette density, center of gravity, anatomy stylization, outline treatment, and pixel or line construction.
- Correct consistency drift rather than redesigning the character. Preserve its identity, outfit, pose, expression, accessories, facing direction, and concept unless explicitly instructed otherwise.
- Equalize rendering and detail quality to `CANONICAL_REFERENCE` only after structural consistency has been corrected.
- A successful character concept should be preserved rather than regenerated merely because its proportions or rendering differ from the reference.
- Never overwrite or modify the canonical reference.
- Do not modify approved game assets unless explicitly asked.
- Do not touch game runtime, code, or data during character-workflow tasks.
- Keep this workflow lightweight. Add no files, tooling, or process stages without a demonstrated need.
