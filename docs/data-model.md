# AiR Data Model

The platform separates identity, learner progress, community participation, media storage metadata, and trainer content so that each area can enforce appropriate visibility and permissions.

| Domain | Persistent records | Access rule |
|---|---|---|
| Identity | User profile, onboarding choices, current path, learning mode | Member owns edits; public profile exposes display-safe fields only |
| Curriculum | Learning paths, modules, lessons, checkpoints, and Explore/Create/Build exercises | Published catalog is public; lesson interaction and video access require sign-in |
| Progress | Enrollments, lesson status, checkpoint responses, exercise submissions, and artifacts | Private to the member unless an artifact is explicitly shared |
| Community | Posts, comments, reports | Reading and publishing require sign-in; authors can manage their contributions; admins moderate |
| Media | Storage key, type, size, visibility, uploader | Upload is admin-only; playback URLs are released according to visibility |
| Trainer knowledge | Guides, frameworks, exercises, delivery notes, sources | Separate trainer route; content administration is admin-only |

The platform deliberately does not store a public age, school, precise location, phone number, or direct-message graph. Child-safe participation uses a chosen display name and structured public role rather than exposing sensitive personal details.

## Curriculum hierarchy

In AiR, a **learning path is the canonical course entity**. Each learning path contains one or more modules; each module contains ordered lessons; each lesson contains interactive checkpoints and three independently authored exercises for Explore, Create, and Build modes. This vocabulary keeps the public experience action-oriented while providing the same persistence and hierarchy a conventional course table would represent.
