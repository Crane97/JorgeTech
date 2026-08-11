# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are recruiters, software engineering managers, CTOs, and startup founders evaluating Jorge Ruiz de la Torre Bertolín for engineering roles. Typical visit length is 2-4 minutes. They need a fast, credible read on engineering quality, product thinking, and ability to ship real software.

## Product Purpose

A personal portfolio that presents Jorge's professional experience, selected projects, skills, education, and contact path. Success means a technical hiring decision-maker leaves trusting that Jorge builds high-quality software, and that the portfolio itself is evidence of that craft.

## Positioning

The site is itself a portfolio piece: the quality of the interface demonstrates the quality of the work. It is not a résumé dump or an animation showcase; it is a product-grade presentation of real engineering outcomes.

## Operating Context

Single-page React + Vite portfolio with EN/ES/FR localization and a dedicated `/projects` archive. Visitors scan hero positioning, a short selected-projects preview, experience, technology stack, about, résumé summary, and contact. Full project case studies live on `/projects`. Projects already have detailed write-ups and screenshots in-repo.

## Capabilities and Constraints

- Reuse all existing content, project descriptions, CV data, screenshots, photos, and i18n strings. Do not invent fake content or remove information.
- Redesign visual language, UX, and hierarchy; do not create a new project from scratch.
- Existing stack: React 19, TypeScript, Vite, Tailwind CSS v4, lucide-react.
- Contact flows through mailto (form prepares an email).
- No separate résumé PDF is present in the repository; résumé section must be built from existing experience/education content.

## Brand Commitments

- Name: Jorge Ruiz de la Torre Bertolín
- Location: Miami, Florida
- Contact: jorge@macdiego.com; Instagram @jorgerdelat; LinkedIn /in/jorgerdelat
- Existing assets: logos under `src/assets/logo/`, project screenshots, boxing photos, hero image
- Binding craft references named by the owner: Stripe, Vercel, Linear, Notion, Raycast, Apple
- Motion must feel tasteful and Apple-like; never gaming/particle spectacle
- Voice: professional, concrete, multilingual (EN/ES/FR)

## Evidence on Hand

- Experience, education, courses, profile, projects, about, and contact copy in `src/i18n.ts`
- Project deep-dives in `src/content/*.ts` (Zumex, World Cup pools, Coworking, Sumero)
- Screenshots/photos in `src/assets/{porra2026,porra2022,coworking,sumeros,scraping,boxing,logo}` and `src/assets/hero.png`
- No fabricated metrics, testimonials, or employer endorsements available

## Product Principles

1. Prove engineering quality through clarity, hierarchy, and case-study storytelling.
2. Prefer substance over spectacle; every interaction must earn its place.
3. Preserve truth: reuse real content and assets; never invent claims.
4. Optimize for a 2-4 minute hiring scan without hiding depth for those who dig in.
5. Treat the portfolio UI as a shipping sample of frontend craft.

## Accessibility & Inclusion

Aim for WCAG AA contrast, keyboard-accessible dialogs and carousels, visible focus states, and honor `prefers-reduced-motion`. Support EN/ES/FR without regressing localization.
