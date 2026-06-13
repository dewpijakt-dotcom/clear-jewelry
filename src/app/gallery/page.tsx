import GalleryClient from '@/components/GalleryClient';
import { getFullGallery } from '@/lib/sanityAdapter';

export const revalidate = 60;

/**
 * Gallery page — Sanity-driven. Falls back to manifest if Sanity is unreachable.
 */
export default async function GalleryPage() {
  const { pieces, categories } = await getFullGallery();

  return (
    <>
      {/* Header */}
      <section className="bg-ivory pt-40 lg:pt-48 pb-16">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <p className="eyebrow text-gold-deep">The Gallery</p>
          <h1 className="display text-[clamp(48px,8vw,128px)] leading-[0.98] mt-4 max-w-3xl">
            Every piece,
            <span className="display-italic text-gold"> a one-of-one.</span>
          </h1>
          <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-xl mt-10 leading-relaxed">
            Filter by category to see the coloured stones, marquise diamonds, and matched sets we are best known for.
            To enquire about any piece, book an appointment — most signature stones live in the safe and are shown by request.
          </p>
          <hr className="gold-rule wide mt-10" />
        </div>
      </section>

      <GalleryClient pieces={pieces} categories={categories} />
    </>
  );
}
