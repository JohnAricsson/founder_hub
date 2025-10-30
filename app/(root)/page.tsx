import Image from "next/image";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}:{
  searchParams: Promise <{query?: string}>}
)
{
  const query = (await searchParams).query;
 
  return (
    <>
    <section className="pink_container pattern">
      <h1 className="heading">Pitch Your Startup, <br />Connect With Founders and Entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">
        Where founders connect with peers to rate, refine, and launch ideas.
      </p>
      <SearchForm query={query}/>
    </section>

    </>
  );
}
