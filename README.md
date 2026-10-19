# Heartcore Studio

The marketing site for [Heartcore Studio](https://heartcore.studio), my boutique web design and headless development studio in Los Angeles. I designed and built it myself.

It's a single, motion-heavy landing page with a scroll-driven showcase of recent client work, services, testimonials, and a contact form that sends inquiries by email.

**Live site:** [heartcore.studio](https://heartcore.studio)

---

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19, React Compiler |
| Styling | Sass with CSS Modules, built on a shared token and mixin layer |
| Motion | [GSAP](https://gsap.com) + ScrollTrigger, [Framer Motion](https://motion.dev), [Lenis](https://lenis.darkroom.engineering) smooth scroll, [Lottie](https://airbnb.io/lottie) |
| Carousels | [Swiper](https://swiperjs.com) |
| Forms & email | [React Hook Form](https://react-hook-form.com) and [Resend](https://resend.com) via a Next.js route handler |
| Analytics & SEO | Google Analytics 4, Open Graph metadata, Organization JSON-LD, generated sitemap |

## Highlights

### Scroll-pinned project showcase
[`ProjectCarousel.jsx`](src/app/components/ProjectCarousel/ProjectCarousel.jsx) pins the section on desktop and stacks each project as a full-screen panel. As you scroll, the next panel slides up and the previous one scales down and fades out, all on one scrubbed GSAP timeline. On tablet and mobile, the component removes its ScrollTrigger, clears the GSAP inline styles, and falls back to a swipeable Swiper carousel with a custom drag cursor.

### Fluid design tokens
Type and spacing come from a token map in [`_variables.scss`](src/app/styles/abstracts/_variables.scss). Each token has a min and max size. The `fluid-type` mixin in [`_mixins.scss`](src/app/styles/abstracts/_mixins.scss) works out the slope and intercept between a 550px and 1728px viewport and outputs a single `clamp()`. Components call semantic roles through `size-role(...)` rather than raw sizes, and the build fails if a role doesn't exist.

### Content separated from components
Projects, testimonials, client logos, and site metadata all live in [`src/app/data/`](src/app/data/). Each project entry sets its own media (images and videos mixed), brand colors, roles, and design credits. Adding new work is a data change, with no component edits needed.

### Coordinated page loader
The loader runs a spin-then-wipe sequence with Framer Motion. When it finishes, it fires a `page-loader:done` event, and the hero's entrance animations wait for that event before they start.

### Serverless contact form
The form is validated client-side with React Hook Form. It posts to [`api/contact/route.js`](src/app/api/contact/route.js), which checks required fields and sends a plain-text email through Resend with `reply-to` set to the sender. All credentials are stored in environment variables.

## Project structure

```
src/app/
├── api/contact/route.js   # Contact form endpoint (Resend)
├── components/            # Page sections: Hero, ProjectCarousel, Testimonials…
│   └── UI/                # Shared primitives: Button, Modal, Pill, Video, DragCursor…
├── data/                  # Projects, testimonials, client logos, site metadata
├── styles/
│   ├── abstracts/         # Design tokens and mixins
│   └── base/              # Reset and global styles
├── layout.js              # Fonts, analytics, Lenis, header/footer
├── page.js                # Home page composition
└── sitemap.js
public/                    # Images, videos, SVG logos, Lottie JSON, OG image
```

## Usage

The code is public so you can see how the site is built. It is not open source, and it isn't set up for others to run. The client work, logos, screenshots, videos, testimonials, and Heartcore Studio branding belong to Heartcore Studio and its clients and are not licensed for reuse.

© Heartcore Studio. All rights reserved.
