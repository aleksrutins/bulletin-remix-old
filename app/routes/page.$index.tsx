import { aggregate, readItems } from "@directus/sdk";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import directus from "lib/directus";
import MainHeader from "~/components/MainHeader";

const perPage = 10;

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const articles = await directus.request(readItems("articles", {
    fields: ["id", "title", "author", "issue", "column", "categories", "published_at"],
    filter: {
      status: {
        _eq: "published"
      }
    },
    sort: "-published_at",
    offset: perPage * (parseInt(params.index!) - 1),
    limit: perPage
  }))

  const latestIssue = (await directus.request(readItems('issues', {
    fields: ['id', 'published_at'],
    filter: {
      status: {
        _eq: 'published'
      }
    },
    limit: 1
  })))[0];

  const totalArticles = await directus.request(aggregate('articles', { aggregate: { count: '*' } })) 
  return { articles, totalArticles: parseInt(totalArticles[0]!.count!), latestIssue, page: parseInt(params.index!) }
}

export default function Index() {
  const { articles, latestIssue, totalArticles, page } = useLoaderData<typeof loader>()
  return (
    <>
      <MainHeader/>
      <main className="w-[800px] max-[800px]:w-screen m-auto mt-2 p-4">
        { latestIssue && 
        <Link className="block p-3 bg-emerald-100 text-sm font-bold mb-5" to={`/issues/${latestIssue.id}`}>
          Latest issue: <time dateTime={latestIssue.published_at!}>{(new Date(latestIssue.published_at!)).toLocaleDateString()}</time>    
        </Link>}
        <ul>
          {articles.map(article => <li key={article.id}>{article.title}</li>)}
        </ul>
        
        <div className="flex items-center justify-center">
          {page != 1 && <Link to={`/page/${page - 1}`} className="block">Previous Page</Link>}
          { (perPage * page) < totalArticles && <Link to={`/page/${page + 1}`} className="block">Next Page</Link>}
        </div>
      </main>
    </>
  );
}
