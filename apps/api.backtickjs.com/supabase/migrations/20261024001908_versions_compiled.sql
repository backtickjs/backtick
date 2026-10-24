-- Each version's release: its App.tsx compiled and bundled with its server
-- packages into one module, which the runtime loads as it is. Empty for
-- versions saved before releases.
alter table public.versions add column compiled text;
