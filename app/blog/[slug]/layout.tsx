import Utterance from 'app/components/Utterance'

export default function PostLayout({children}:{children:React.ReactElement}) {
  return (
    <article className='py-6 prose dark:prose-invert mx-auto'>
      {children}
      <Utterance/>
    </article>
  )
}
