import { ReactElement } from "react"
import { Link } from "react-router-dom"

type Props = {
  id: number
  title: string
}

function PostCard({ id, title }: Props): ReactElement {
  const to = `/post/${String(id)}`

  return (
    <Link className="focus:outline-none post-card-glow" to={to}>
      <article className="bg-gradient-to-r from-one to-two p-1 rounded">
        <div className="p-3 bg-white dark:bg-black">
          <h5 className="text-lg text-black dark:text-white">{title}</h5>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
