# Blog Publishing Template (Google + AI Search)

Use this template before publishing any article to Medium/DEV and before adding the post into `showcase-data.ts`.

## 1) Target Query
- Primary keyword:
- Secondary keywords:
- Search intent (informational / comparison / implementation / troubleshooting):
- Audience (architects / engineering leaders / platform teams):

## 2) Meta Block
- SEO title (55-65 chars):
- Meta description (140-160 chars):
- Canonical URL path slug (kebab-case):
- Publish date (`YYYY-MM-DD`):

## 3) Answer-First Intro
Start with a direct answer in 2-4 lines for the main query.

Example:
`MCP and A2A solve different layers of agent systems. MCP standardizes tool access, while A2A standardizes agent-to-agent coordination. Using both reduces integration lock-in and improves long-term system composability.`

## 4) Suggested Article Structure
1. Problem statement in real production context.
2. Why existing approaches fail or scale poorly.
3. Proposed architecture/pattern with clear boundaries.
4. Implementation path or decision framework.
5. Risks, tradeoffs, and operating constraints.
6. Practical checklist for adoption.
7. Closing summary with next-action recommendation.

## 5) AI-Citable Content Rules
- Include at least one architecture table, checklist, or decision matrix.
- Include explicit definitions for all protocol and domain terms.
- Use concrete examples with constraints and outcomes.
- Avoid vague claims without implementation detail.

## 6) FAQ Block (People Also Ask + AI)
Add 3-5 FAQ items at the end:
- Question 1:
- Answer 1:
- Question 2:
- Answer 2:
- Question 3:
- Answer 3:

## 7) Internal + External Linking
- Link to at least one related portfolio page.
- Link to at least one related blog post.
- Link to relevant authoritative references when appropriate.

## 8) Conversion CTA
End with one clear CTA:
- Invite architecture discussion
- Invite review of migration strategy
- Invite technical collaboration

## 9) Site Data Entry Checklist
When adding to `apps/business-showcase/src/app/data/showcase-data.ts`, verify:
- `slug` matches canonical path.
- `publishedDate` is present and valid (`YYYY-MM-DD`).
- `summary` is concise and keyword-aligned.
- `tags` include primary and secondary keyword terms.
- `sections` include heading hierarchy and readable paragraphs.
