import type { Metadata } from "next";

import TeachingView from "@/components/teachings/View";
import type { SubjectNames } from "@/data/subjects";
import { getTeaching, getTeachingsMetadata } from "@/lib/teaching";

const subject: SubjectNames = "dbis";

export default async function Page({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      <TeachingView subject={subject} slug={params.slug}></TeachingView>
    </div>
  );
}

export async function generateStaticParams() {
  const teachings = await getTeachingsMetadata(subject);

  return teachings.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const { meta } = await getTeaching(params.slug, subject);

  const authors = Array.isArray(meta.author) ? meta.author : [meta.author];
  const images = Array.isArray(meta.images) ? meta.images : [meta.images];
  return {
    title: meta.fullTitle,
    description: meta.description,
    twitter: {
      title: meta.fullTitle,
      description: meta.description,
      images: images.map((image) => ({
        url: image.src,
      })),
      card: "summary",
    },
    authors: authors.map((x) => ({ name: x })),
  };
}
