import { fetchNewsArticles } from "@/lib/strapi";

export async function GET() {
  try {
    const articles = await fetchNewsArticles();
    return Response.json(articles);
  } catch (error) {
    console.error("Error in news API route:", error);
    return Response.json([], { status: 500 });
  }
}
