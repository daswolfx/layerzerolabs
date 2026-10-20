# Layer Zero Labs website

Static GitHub Pages source. The tactile redesign was published to
`layerzerolabs.net` from PR #14 on 2026-10-20 (merge `96b9cf7`). Check the
current branch and remote before making further changes.

## Local preview

Run `node preview-server.mjs` from this directory, then open
<http://127.0.0.1:43219/>. The server is loopback-only, adds `noindex`
headers, and discards synthetic form submissions. Test with invented data only.
The `desktop-preview.png` in this Vault worktree is a review screenshot, not
an asset loaded by the website.

The hero uses the selected electric star Ø and electric wordmark as separate,
unaltered PNGs, over the approved tactile workbench concept art. The artwork
is explicitly labeled as a visual concept; it is not evidence of a real
project, machine, or capability. The favicon and social image currently use
the full Ø master, pending a reviewed small-size export.

The first screen gives custom quotes and the ready-made Shopify shop matching
actions. The shop currently uses a direct branded-store link, not embedded
Shopify checkout or account-level integration. The quote form starts text-only
because attachment support on the Formspree account is unconfirmed.

The About section replaces the abstract cube and floating badges with a
workbench concept and a concise starting-point-to-physical-result sequence.
It uses another crop of the same concept artwork, explicitly labeled as such;
replace it with approved real workshop photography when available.

The project-request section now has an inset form panel, a compact intake
brief, subtle page texture, and a lightweight wire-cube depth field inspired
by the earlier site's parallax. The cubes respond to fine-pointer movement
only; touch and reduced-motion users get the static composition. This is a
visual preview, not evidence of Formspree delivery.

The SUBSTRATE banner uses the exact selected Ø and current electric
wordmark as separate, unaltered assets. A layered field-line composition and
restrained CSS motion replace the old cube-seal/circuit-board video. Reduced
motion gets a static composition. The old MP4 and poster are retained in the
worktree for provenance but are no longer loaded by the page. The companion
[brand kit](../Brand/Layer%20Zero%20+%20SUBSTRATE%20Brand%20Kit/README.md)
contains source assets, guidance, and a review specimen. The owner's site
approval is recorded in PR #14; that approval does not certify the separate
brand-kit exports or SUBSTRATE product release.

## Publication gate

- Show the owner a preview before the first publication of materially changed
  visuals or claims. An explicit approval of that preview carries across turns;
  do not ask again for the same release candidate. Reconfirm only when the
  published candidate materially diverges from what was approved.
- After approval, run proportionate checks and publish promptly in the same
  work session. Surface any genuine blocker immediately. Do not silently
  convert follow-up verification into a new approval gate or leave a prepared
  release unpublished for hours.
- Record remaining uncertainty separately. Formspree HTTP success is not inbox
  delivery proof; Shopify storefront links are not checkout or account-level
  integration; concept artwork is not a documented project. Follow these up
  without claiming they are complete.
- Registrar/DNS transfer, active Shopify theme or checkout changes, and a
  SUBSTRATE software release are separate changes requiring their own scope
  and approval. A website visual approval does not authorize them.

## 2026-10-20 release check

- Desktop preview inspected with the selected Ø and SUBSTRATE banner. Phone
  layout still needs owner review.
- Local synthetic form submission reached the thank-you page; simulated server
  failure displayed an error and restored the submit button.
- A synthetic POST to the configured Formspree endpoint returned HTTP 200 and
  `{"ok":true}`. Inbox receipt was not verified; the connected mail search was
  rate-limited. Do not treat the HTTP response as proof of notification delivery.
- The linked Shopify storefront loaded with public products and prices. This
  verifies the destination, not cart/checkout or account-level integration.
- The owner confirmed the preview had already been approved and requested
  publication. PR #14 was merged and the public domain served the updated
  SUBSTRATE markup and brand assets; inbox receipt and end-to-end Shopify
  checkout remain follow-ups, not completed claims.
