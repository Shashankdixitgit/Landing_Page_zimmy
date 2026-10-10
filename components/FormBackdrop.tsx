/** Full-page looping background video for the sign-up forms, with the form on a white card. */
export default function FormBackdrop({ video, children }: { video: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        className="pointer-events-none fixed inset-0 h-full w-full object-cover motion-reduce:hidden"
        src={`/bg/${video}.mp4`}
        poster={`/bg/${video}.jpg`}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 hidden bg-cover bg-center motion-reduce:block"
        style={{ backgroundImage: `url(/bg/${video}.jpg)` }}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
