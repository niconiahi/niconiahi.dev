import { ReactElement } from "react"

function Presentation(): ReactElement {
  return (
    <section className="flex flex-col">
      <h3 className="text-xl text-dark dark:text-white">
        coding <span className="italic">fast</span> applications for the web
      </h3>
    </section>
  )
}

export default Presentation
