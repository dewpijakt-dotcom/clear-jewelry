// DEPRECATED — replaced with the native browser cursor at user request.
// Kept as an unmounted stub so any stray import compiles cleanly. To
// re-enable, restore the gold dot + ring implementation from git history
// (see commit before "revert: remove custom cursor") and re-mount in
// src/app/layout.tsx.
export default function CustomCursor() {
  return null;
}
