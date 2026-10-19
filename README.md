# Layer Zero Labs website

Static GitHub Pages source. This Vault worktree is a review branch based on
`origin/main` at `574efee`, not the published website. Do not merge or deploy
without an approved preview.

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

## Release gates

- Review desktop and phone layouts with the owner.
- Send an owner-controlled live Formspree test and verify receipt in the
  intended inbox; test failure and retry behavior. Local mock success is not
  delivery evidence.
- Verify the Shopify product, cart, and checkout journey before calling the
  shop integration complete. Do not count shop clicks as sales.
- Review all claims and replace concept art with approved real work when
  available. SUBSTRATE screenshots and feature language are previews of
  software in development, not proof of release readiness.
- Registrar transfer away from Squarespace is a separate DNS/account task;
  do not bundle it into a visual deployment.
