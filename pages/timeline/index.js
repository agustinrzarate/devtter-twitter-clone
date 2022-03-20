import  Head  from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const userName = 'Agustin R Zarate'
  return {
    props: {
      userName,
    },
  };
}
const Timeline = ({userName}) => {
    return (
      <div>
        <Head>
          <title>Timeline</title>
        </Head>
        <h1>This is the Timeline of {userName}</h1>
        <Link href='/'>
          <a>Go to home</a>
        </Link>
      </div>
    );
};


export default Timeline;
