import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside role="status" className="flex items-center justify-center gap-3 bg-sky-700 px-4 py-2 text-sm text-white">
      <span>Preview mode is on — you&apos;re viewing draft content.</span>
      <form action="/api/preview/disable" method="POST">
        <button type="submit" className="underline hover:no-underline">
          Exit preview
        </button>
      </form>
    </aside>
  );
}
