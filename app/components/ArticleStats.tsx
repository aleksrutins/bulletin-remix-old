import { Article } from "lib/directus";

type Props = {
    article: Pick<Article, 'published_at' | 'author' | 'issue' | 'categories'>,
    showIssue: boolean,
    currentCat: string,
    articleType: 'article' | 'post'
}

export default function ArticleStats({article, showIssue, currentCat, articleType}: Props) {
    return (
        <p className={
            articleType == 'article' ? 'text-gray-700 mt-1' : 'text-gray-600 italic'
        }>
            <a>{article.author}</a>
            •
            <time dateTime={article.published_at!}>{new Date(article.published_at!).toDateString()}</time>
            {showIssue && article.issue && <>
                •
                <a href={`/issues/${article.issue}`}>Issue #{article.issue as number}</a>
            </>}
            •
            {(article.categories as string[]).map(cat => <a href={`/c/{{slugify(cat)}}`} className={cat == currentCat ? 'underline' : 'no-underline'}>{cat}</a>)}
        </p>
    )
}