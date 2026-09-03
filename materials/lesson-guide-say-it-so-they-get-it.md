# AIR Experience 01 — Say It So They Get It

**Case study:** ACAI Home Help · `github.com/borngifted/acai-main-site`
**Live:** https://borngifted.github.io/acai/
**Time:** 45–90 minutes depending on path
**Sponsored by Digi2U.org**

---

## 1. The Situation

Someone's mother is getting older and needs help at home. There's a state
program that pays for exactly that. She might qualify.

The information exists. It's on a government website, in program language, across
several pages, written by people who already know how it works. She reads it
three times and still can't tell whether it applies to her.

So she doesn't apply.

Not because she isn't eligible. Because nobody made it possible to find out.

**This happens constantly.** Food assistance, tuition help, small-business grants,
housing programs, clinic hours, school registration. The help is real and the
door is invisible.

---

## 2. The Mission

**Make one page that a worried person understands in one read.**

Take something official and hard to read. Turn it into a single page that
answers three questions fast:

- Is this for me?
- What do I get?
- What do I do next?

One page. One read. No jargon.

---

## 3. See It in Action

### ACAI Home Help

ACAI helps families in Genesee County and Flint, Michigan access the **Michigan
Home Help Program** and adult day care. Their audience: older adults, disabled
adults, and family caregivers. Often stressed. Often on a phone. Often not
confident with websites.

**The challenge.** Take a state benefits program and make it something a tired
person can act on.

**What was built.** A site where every page is self-contained HTML — images and
fonts embedded, no build step, no server. It opens in any browser. Eligibility
sits at the top of the home page, not buried under an About section. Seven
resource guides explain the program in plain language.

**The decision that matters most.** The README has a section called
**"July 10 critique — resolved."** Someone reviewed the site and found a problem
with the eligibility form.

The original form said "success" when you pressed submit. But it said that
whether or not the message actually sent.

Think about who that fails. A caregiver fills out a form about her mother's care.
It silently fails. She believes someone will call. Nobody calls. She assumes she
didn't qualify.

**The fix:** the form now submits through FormSubmit.co and shows success *only
after confirmed receipt.* When it fails, it shows an error and gives the phone
number instead.

No AI made that decision. Somebody thought about a specific person having a
specific bad day and decided a silent failure was unacceptable.

**The result.** A live site with a working lead path, a stated accessibility
commitment, and a privacy policy. Delivered under a signed retainer.

---

## 4. Clear the Air

Things that will get in the way:

**"I need to make it look professional first."**
Professional isn't the goal. *Understood* is the goal. A plain page someone
reads beats a beautiful page they bounce off.

**"I should include everything so it's complete."**
Completeness is what broke the original. Every extra sentence is a chance to
lose someone who was already unsure.

**"AI will write it better than me."**
AI will write it *smoother*. It doesn't know your reader is 71, worried about her
husband, and reading on a cracked phone screen at a kitchen table. You know that.
That knowledge is the whole job.

**"I need the right AI tool for this."**
You need one that rewrites text. Every one of them does. Stop shopping.

---

## 5. Human Before Tool

Answer these before you touch anything.

**Who is this for?**
Not "the community." One person. Age, situation, device, mood, how much time
they have. ACAI's person: a caregiver, stressed, on a phone, needs to know in
under a minute whether to keep reading.

**What should they know, feel, or do?**
Pick one. ACAI picked *do* — find out if you qualify and make contact.

**What needs human judgment?**
- What goes first *(hierarchy — this is the whole design)*
- What gets cut
- What happens when something breaks
- Whether the tone is right for someone having a hard day
- Whether the claims are actually true

**Is AI actually appropriate here?**
For rewriting dense language, yes — genuinely good at it.
For deciding what matters most to a frightened person, no.
For inventing eligibility criteria, **absolutely not.** Every fact must come from
the real source. An AI guess about who qualifies for state assistance is a lie
with consequences.

---

## 6. Make It

### 🟢 Explore

*For families, first-timers, younger learners. 20–30 minutes.*

1. Find something official and confusing — a school letter, a benefits notice,
   a clinic form, an insurance page.
2. Read it and underline **the one sentence that matters most** to the person
   receiving it.
3. Rewrite that sentence so a ten-year-old understands it. Say it out loud
   first — if you can't say it plainly, you don't have it yet.
4. Write two more sentences: what they get, and what to do next.
5. Put all three on one page, biggest first.

**You've made:** a three-sentence explainer, ordered by what matters.

**Try this:** ask an AI to "rewrite this for a worried person, at a
sixth-grade reading level, in three sentences." Then compare to yours. Keep the
better one. Often it's yours, because you know who's reading.

### 🔵 Create

*Most people. 45–60 minutes.*

1. Pick a real service, program, or offer — yours or one you care about.
2. Name your one person. Write them down: age, situation, device, state of mind.
3. Answer the three questions in one sentence each: *Is this for me? What do I
   get? What do I do next?*
4. Use AI to rewrite your draft in plain language. **Then check every fact
   against the real source.** AI smooths language and will smooth right over an
   error.
5. Build one page, in this order: who it's for → what you get → am I eligible →
   how to start. Contact details visible without scrolling on a phone.
6. Give someone a way to reach a human. A phone number counts.
7. Show it to one person who matches your description. Watch where they pause.

**You've made:** a one-page explainer with a working contact path.

**Try this:** open it on a phone at arm's length. If you squint, the type is too
small — remember who's reading.

### 🟣 Build

*Going deeper. 90 minutes or more.*

Everything in Create, plus:

1. **Build it self-contained.** One HTML file, images and fonts embedded, no
   build step, no CDN. The ACAI site works opened straight off a hard drive.
   Sites that depend on someone else's server stop working when that server does.
2. **Make the form honest.** Submit through a service that confirms receipt.
   Show success *only* on confirmation. On failure, show an error and a phone
   number. **Then break it on purpose** — disconnect your network and submit.
   If it still says success, you've built the bug ACAI fixed.
3. **Add a real accessibility statement** — and make it true first. Check
   contrast, keyboard navigation, and that it works at 200% zoom.
4. **Write the privacy line.** If you collect a name and phone number, say what
   happens to them.

**You've made:** a deployable page with a lead path that doesn't lie.

**Try this:** run it through a screen reader for one minute. Most people have
never heard their own page read aloud. It changes what you write.

---

## 7. Make It Clear

The design principles that carry this one:

**Hierarchy** — the most important thing is biggest and first. On ACAI,
eligibility beats history. If everything is emphasised, nothing is.

**Proximity** — things that belong together sit together. Contact details go with
the ask, not in a footer three screens away.

**Whitespace** — space around a sentence tells the reader it matters. A dense
page reads as "this will be difficult," and they leave before the first line.

**Typography** — set body type at 17px or larger. Your reader may be 71. Line
length under 66 characters, or their eye loses the return.

**Contrast** — grey text on white is a design cliché that fails real eyes. Check
it. 4.5:1 minimum for body text.

**Colour** — colour can carry emphasis but must never be the *only* signal.
Colour-blind readers and printed pages both lose it.

**Composition** — decide what's visible before a scroll. On a phone that's about
one paragraph. Choose it deliberately.

**Accessibility** — not a feature. Your audience skews old and disabled *by
definition* on a page like this.

**Visual storytelling** — order is narrative. Who it's for → what you get → am I
eligible → how to start is a story that answers questions as they arise.

---

## 8. Challenge the Result

Before this goes anywhere, interrogate it.

**Accuracy** — is every fact from the real source? Eligibility, amounts,
deadlines, phone numbers? *Especially anything AI wrote.* Smooth and wrong is
worse than clumsy and right.

**Clarity** — hand it to someone unfamiliar. Can they say what it's for in one
sentence, without re-reading?

**Representation** — if there are people in your images, who do they look like?
Do they look like your actual community? AI image tools default to a narrow set
of faces unless directed otherwise. Look at what you got and ask whether your
reader sees themselves.

**Bias** — does the language assume a car, a computer, an email address, English
at home, a bank account?

**Privacy** — you're collecting a name and a phone number about someone's health
situation. Where does it go? Who sees it? Did you say so?

**Ownership** — whose photographs? Whose words? If AI generated it, are you
comfortable saying so?

**Accessibility** — keyboard only. 200% zoom. Screen reader. Slow connection.

**Audience fit** — does the tone match someone having a hard day? Marketing
enthusiasm reads as insincere to a person who is frightened.

**What did AI guess?** Look for confident specifics you never supplied — a
number, a deadline, a qualifier. Those are the dangerous ones.

**What did a human change?** Write it down. That list is your judgment, made
visible. It's the most valuable thing you produced today.

---

## 9. Put It in the World

Don't leave it in a folder.

- **Explore** — read your three sentences to the person you made them for.
- **Create** — publish it. GitHub Pages, Netlify, anywhere with a URL. Send the
  link to one real person and ask what confused them.
- **Build** — deploy it, test the form for real, and hand it to the organisation
  it serves.

**One rule:** a real person has to see it. Not a class, not a folder. A person
who might use it.

---

## 10. Keep Going

This process works on anything where somebody knows something and somebody else
needs to.

Same five moves, every time:

1. Name one real person
2. Decide the one thing they need to know, feel, or do
3. Use AI to smooth the language — never to invent the facts
4. Put the most important thing first
5. Check what AI guessed, and give it to a human

**Try it next on:** a club sign-up, a class syllabus, a menu, a product page, a
volunteer call, medication instructions for a relative, a fundraiser.

The tools will change. This doesn't.

---

## Facilitator notes

**Group size:** works solo, in pairs, or in a room. Pairs are best — the "show it
to one person" step happens naturally.

**Mixed ages:** put an Explore learner with a Create learner. The younger one
often spots the confusing sentence faster, because they have no context to
paper over it with.

**No devices?** Runs entirely on paper. Hierarchy, cutting, and reading aloud
don't need a screen. The AI step becomes "what would you ask it to do?"

**Common failure:** learners pick a subject they know too well and can't see the
jargon. Push them to test on someone outside it.

**Timing:** Explore 20–30 min · Create 45–60 · Build 90+.

**The moment that lands:** breaking the form on purpose and seeing it lie. It
turns "test your work" from advice into something they felt.

---

## Sources

- `github.com/borngifted/acai-main-site` — README, page manifest, *"July 10
  critique — resolved"*
- Live: https://borngifted.github.io/acai/
- Related: `acai-ai-demo` (AI Care Guide prototype, marked internal),
  `acai-site-preview`, `acai-build-review`, `acai-project-status`
- Client engagement confirmed in correspondence: signed proposal and retainer,
  April 2026; site delivered live with invoice, July 2026

*All project details from the repositories. Nothing invented.*
