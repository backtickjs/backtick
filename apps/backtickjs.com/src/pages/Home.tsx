import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { ANDROID, IPHONE } from "../pages.js";

// Backtick's home page: what it is and where to get it, beside the loop in
// two of the app's own screens (describe an app, Claude builds it, open it). Also the home page Google's sign-in screen names.
export const Home = cs`() => (
  <$Layout>
    <div class="my-auto grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
      <div>
        {/* What Backtick is, in one line; then where to get it. */}
        <h1 class="text-[clamp(30px,3vw,44px)] leading-[1.08] font-extrabold tracking-[-0.04em] text-balance">
          {"Build React\u00a0Native apps with AI."}
        </h1>
        {/* What it costs: nothing, since the building happens in Claude. */}
        <p class="mt-5 mb-[22px] text-[clamp(16px,1.4vw,19px)] leading-snug text-muted">
          <span class="font-semibold text-ink">Free</span> · No subscription, no
          credits
        </p>
        <div class="flex flex-wrap items-center gap-3">
          {/* Apple's own badge, unaltered as its guidelines ask: black on
              a light page, white on a dark one. */}
          <a
            href={$IPHONE}
            class="inline-flex transition hover:-translate-y-px"
          >
            <picture>
              <source
                srcset="/app-store-white.svg"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="/app-store-black.svg"
                alt="Download on the App Store"
                class="block h-[52px] w-auto"
              />
            </picture>
          </a>
          {$ANDROID === undefined ? (
            // The App Store badge's shape and layout, dashed for "not yet".
            // The Android robot is free to use with credit (on the terms
            // page); no Google Play badge until the app is on Google Play.
            <span class="inline-flex h-[52px] w-[156px] items-center gap-2.5 rounded-[10px] border border-dashed border-line px-3.5 leading-none text-muted/70 select-none">
              <svg
                viewBox="0 0 24 14"
                aria-hidden="true"
                class="h-auto w-[26px] shrink-0"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 13.5a10 10 0 0 1 20 0Z M8 7.8a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4Z M16 7.8a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4Z"
                />
                <path
                  d="M6.6 5.1 4.7 1.6 M17.4 5.1 19.3 1.6"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                />
              </svg>
              <span class="flex flex-col">
                <span class="text-[11px]">Coming soon to</span>
                <span class="mt-1 text-[19px] font-semibold tracking-[-0.01em]">
                  Android
                </span>
              </span>
            </span>
          ) : (
            <a href={$ANDROID} class="text-[15px] font-medium text-ink">
              Download for Android
            </a>
          )}
        </div>
      </div>

      {/* Claude's chat once it has built the app, and the app it opens:
          tap Open in Backtick and it runs. Each phone is labelled with who
          does that part. Phones as tall as the screen
          leaves room for, so the footer shows without scrolling. */}
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 md:flex">
        <figure class="m-0 flex flex-col items-center gap-3">
          <figcaption class="flex items-center gap-1.5 text-[clamp(11px,1.1vw,16px)] leading-tight font-semibold whitespace-nowrap sm:gap-2">
            <img
              src="/claude-icon.png"
              alt="Claude"
              class="size-[clamp(16px,2vw,28px)] shrink-0 rounded-[22.5%]"
            />
            Writes the code
          </figcaption>
          {/* A Claude chat, drawn here rather than captured, laid out as
              Claude's mobile app shows a Backtick update: the request, the
              tool call, its card, then Claude's reply. Sized like the game
              screenshot beside it, with text in container units so it
              scales with the phone. */}
          <div
            role="img"
            aria-label="A Claude chat: Claude updated Thornvale with Backtick, version 3 published, with an Open in Backtick button"
            class="@container relative flex aspect-[898/2000] w-full flex-col overflow-hidden rounded-[clamp(14px,2.2vw,30px)] border-[clamp(3px,0.4vw,5px)] border-[#1b1b1f] bg-[#1c1c1b] text-[#ecebe6] shadow-2xl select-none md:h-[min(580px,calc(100svh-230px))] md:w-auto"
          >
            <div class="flex items-center justify-between px-[9cqw] pt-[5cqw] text-[4cqw] font-semibold">
              <span>9:41</span>
              <span class="flex items-center gap-[1.5cqw]">
                <span class="h-[2.4cqw] w-[4.5cqw] rounded-[0.6cqw] bg-[#ecebe6]" />
              </span>
            </div>
            <div class="flex items-center gap-[4cqw] px-[4cqw] pt-[7cqw] pb-[4cqw] text-[#ecebe6]">
              <svg
                viewBox="0 0 20 20"
                class="size-[5.5cqw] shrink-0"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 10H4M9 5 4 10l5 5" />
              </svg>
              <span class="flex-1 text-center text-[4.4cqw] font-semibold">
                Warden Key quest
              </span>
              <svg
                viewBox="0 0 20 20"
                class="size-[5.5cqw] shrink-0"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 4H5a1.5 1.5 0 0 0-1.5 1.5v9.5A1.5 1.5 0 0 0 5 16.5h9.5A1.5 1.5 0 0 0 16 15v-4M14 3.5l2.5 2.5L10 12.5H7.5V10Z" />
              </svg>
              <svg
                viewBox="0 0 20 20"
                class="size-[5.5cqw] shrink-0"
                fill="currentColor"
              >
                <circle cx="10" cy="4.5" r="1.4" />
                <circle cx="10" cy="10" r="1.4" />
                <circle cx="10" cy="15.5" r="1.4" />
              </svg>
            </div>
            <div class="flex flex-1 flex-col gap-[4.5cqw] px-[5cqw] pt-[2cqw] text-[4.2cqw] leading-[1.4]">
              <p class="ml-[6cqw] rounded-[3cqw] border border-[#2f2f2d] bg-[#2a2a28] px-[3.5cqw] py-[3cqw]">
                Edit Backtick app Thornvale: add a quest to find a key
              </p>
              <p class="ml-[2cqw] flex items-center gap-[2.5cqw] text-[4cqw] text-[#9c9a94]">
                <svg
                  viewBox="178 0 29 37"
                  class="h-[3.4cqw] w-auto text-[#ecebe6]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M205 36H198.161L180 1H194.773L205 36Z" />
                </svg>
                Used Backtick ›
              </p>
              <div>
                <p class="mb-[2cqw] flex items-center gap-[2cqw] text-[4cqw]">
                  <span class="grid size-[6cqw] shrink-0 place-items-center rounded-[1.3cqw] border-[0.4cqw] border-[#ecebe6]">
                    <svg
                      viewBox="178 0 29 37"
                      class="h-[3cqw] w-auto"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M205 36H198.161L180 1H194.773L205 36Z" />
                    </svg>
                  </span>
                  <span class="font-semibold">Update an app</span>
                  <span class="text-[#9c9a94]">• Backtick</span>
                  <span class="ml-auto text-[#9c9a94]">›</span>
                </p>
                <div class="rounded-[2.5cqw] border border-[#3a3a37] bg-[#212422] px-[4cqw] py-[4cqw]">
                  <p class="text-[4.8cqw] leading-tight font-bold">Thornvale</p>
                  <p class="mt-[1cqw] text-[4cqw] text-[#a3a19b]">
                    Version 3 · published
                  </p>
                  <span class="mt-[3cqw] inline-block rounded-[1.8cqw] bg-[#1f7f55] px-[4cqw] py-[2.2cqw] text-[4cqw] font-bold text-white">
                    Open in Backtick
                  </span>
                </div>
              </div>
              <p class="font-serif text-[4.8cqw] leading-[1.45] text-[#ecebe6] antialiased">
                Thornvale now has a quest: find the Warden Key hidden to the
                east, then head north to the old keep.
              </p>
            </div>
            <div class="mx-[4cqw] mb-[7cqw] flex items-center gap-[2.5cqw] rounded-full border border-[#3a3a37] bg-[#262624] p-[1.8cqw] text-[4.2cqw] text-[#8f8d87]">
              <span class="grid size-[8cqw] place-items-center rounded-full bg-[#323230] text-[5cqw] leading-none text-[#ecebe6]">
                +
              </span>
              <span class="flex-1">Reply or hold to talk</span>
              <span class="grid size-[8cqw] place-items-center rounded-full bg-[#323230]">
                <svg
                  viewBox="0 0 20 20"
                  class="size-[4.2cqw]"
                  fill="none"
                  stroke="#ecebe6"
                  stroke-width="1.6"
                  stroke-linecap="round"
                >
                  <rect x="7" y="2.5" width="6" height="10" rx="3" />
                  <path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" />
                </svg>
              </span>
              <span class="grid size-[9cqw] place-items-center rounded-full bg-[#ecebe6]">
                <svg
                  viewBox="0 0 20 20"
                  class="size-[4.5cqw]"
                  fill="none"
                  stroke="#1c1c1b"
                  stroke-width="1.6"
                  stroke-linecap="round"
                >
                  <path d="M4 9v2M7 7v6M10 5v10M13 7v6M16 9v2" />
                </svg>
              </span>
            </div>
            <span class="absolute bottom-[2.5cqw] left-1/2 h-[0.8cqw] w-[27cqw] -translate-x-1/2 rounded-full bg-[#ecebe6]" />
          </div>
        </figure>
        {/* The loop between them: Claude's build opens in Backtick, and a
            change goes back to Claude. */}
        <div class="flex w-[clamp(96px,11vw,150px)] flex-col items-center gap-[clamp(16px,2.4vw,32px)]">
          <div class="flex w-full flex-col items-center gap-0.5">
            <span class="cursor-default text-[clamp(11px,1vw,14px)] font-medium whitespace-nowrap text-muted">
              Open in Backtick
            </span>
            <svg
              viewBox="0 0 150 34"
              aria-hidden="true"
              class="w-full text-[light-dark(#b8b8bf,#4a4a52)]"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <defs>
                <marker
                  id="arrow-open"
                  viewBox="0 0 14 14"
                  refX="10"
                  refY="7"
                  markerWidth="14"
                  markerHeight="14"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path
                    d="M3 2 10 7 3 12"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </marker>
              </defs>
              <path
                d="M6 30Q75-4 142 26"
                stroke-dasharray="2 10"
                marker-end="url(#arrow-open)"
              />
            </svg>
          </div>
          <div class="flex w-full flex-col items-center gap-0.5">
            <svg
              viewBox="0 0 150 34"
              aria-hidden="true"
              class="w-full text-[light-dark(#b8b8bf,#4a4a52)]"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <defs>
                <marker
                  id="arrow-ask"
                  viewBox="0 0 14 14"
                  refX="10"
                  refY="7"
                  markerWidth="14"
                  markerHeight="14"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path
                    d="M3 2 10 7 3 12"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </marker>
              </defs>
              <path
                d="M144 4Q75 38 8 8"
                stroke-dasharray="2 10"
                marker-end="url(#arrow-ask)"
              />
            </svg>
            <span class="cursor-default text-[clamp(11px,1vw,14px)] font-medium whitespace-nowrap text-muted">
              Ask for a change
            </span>
          </div>
        </div>
        <figure class="m-0 flex flex-col items-center gap-3">
          <figcaption class="flex items-center gap-1.5 text-[clamp(11px,1.1vw,16px)] leading-tight font-semibold whitespace-nowrap sm:gap-2">
            <img
              src="/backtick-icon.webp"
              alt="Backtick"
              class="size-[clamp(16px,2vw,28px)] shrink-0 rounded-[22.5%] ring-1 ring-line"
            />
            Runs your app
          </figcaption>
          <img
            src="/thornvale.webp"
            alt="Thornvale, the 3D adventure game Claude built, running in Backtick"
            class="block aspect-[898/2000] w-full rounded-[clamp(14px,2.2vw,30px)] border-[clamp(3px,0.4vw,5px)] border-[#1b1b1f] bg-[#0b0b0d] shadow-2xl md:h-[min(580px,calc(100svh-230px))] md:w-auto"
          />
        </figure>
      </div>
    </div>
  </$Layout>
)`;
