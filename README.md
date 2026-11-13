This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Release order with the creator app

- **This site ships first.** The creator app (hitrate.sh/creators/app) links to
  /refund, /privacy#creators and /terms#creators here. Deploy this site before the
  app, or both together, and check those three load before deploying the app or
  asking Dodo to review again. The app shipped first sends its Refunds link to a 404.
- **Founding mode is off.** Pro has been on sale since 13 Nov 2026, and
  `PRO_SALES_PAUSED` in `lib/planPhases.ts` is `false`. The app sells Pro whenever
  live Dodo keys are in; `PRO_SALES_PAUSED=1` in the app's env is an emergency stop
  (it then gives owners days 8–15 free). If that stop is ever used, flip this
  site's flag to `true` and redeploy it in the same step, so the FAQ, Terms and
  /pricing describe what the app does.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
