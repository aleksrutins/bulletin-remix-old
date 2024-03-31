import { Article } from "lib/directus";

type Props = {
    article: Pick<Article, 'type' | 'id' | 'title' | 'summary'>,
    showIssue: boolean,
    currentCat: string
}


export default function ArticlePreview({ article }: { article: Article }) {
    return (
        article.type == 'article'
        ? <div className="flex flex-col no-underline "></div>
        : <div></div>
    )
}