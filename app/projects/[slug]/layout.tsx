import Utterance from 'app/components/Utterance'

export default function ProjectLayout({children}:{children:React.ReactNode}) {
  return (
    <>
      <article className='py-6 prose dark:prose-invert mx-auto'>
        {children}
        <Utterance/>
      </article>
    </>
  )
}
