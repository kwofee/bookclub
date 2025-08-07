import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";
// import { toast } from "sonner";
import { GoogleBooksApiResponse, Book } from "@/types/google-books-api";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay"
import { BookCarousel } from "@/components/BookCarousel";

interface GenreCarousel {
  genre: string;
  books: Book[];
};

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        console.log("No user");
        redirect("/login");
    }

    const { data: profileData, error } = await supabase.from("profiles").select("*").eq("user_id", user.id)
      // console.log("Profile data", profileData)
    if(!profileData || profileData?.length == 0 ){
      redirect("/first-time-user")
    }
    
    let books: Book[] = [];
    // let genres = ["Fiction", "Fantasy", "Non-Fiction"];
    let genres = ["Fiction", "Fantasy", "NonFiction"];
    let genreCarousels: GenreCarousel[] = [];

    try{
      const apiKey = process.env.NEXT_PUBLIC_CLOUD_API;
      // const apiURL = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=12&key=${apiKey}`;
      // const response = await fetch(apiURL, { next: { revalidate: 3600 } });

      const fetchPromises = genres.map(genre => {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre.toLowerCase()}&maxResults=12&key=${apiKey}`;
        return fetch(apiUrl, { next: { revalidate: 3600 } }).then(res => res.json());
      }
      )

      const results: GoogleBooksApiResponse[] = await Promise.all(fetchPromises);
      genreCarousels = results.map((res, index) => ({
        genre: genres[index],
        books: res.items?.filter(book => book.volumeInfo.imageLinks?.thumbnail) || [],
      }));

      // if(!response.ok){
      //   // toast.error(response.statusText); 
      //   console.log(`Failed to fetch books: ${response.statusText}`);
      // }
      // console.log("Success")
      // const responseData: GoogleBooksApiResponse = await response.json();
      // books = responseData.items || [];

    }catch(error){
      console.error("Failed Google books fetch , ", error);
    }
    return (
        <div className="flex flex-col">
          {
            genreCarousels.map(({genre, books}) => (
              <div key={genre}>
                <h2 className="text-3xl font-bold mb-6">{`Featured ${genre}`}</h2>
                <BookCarousel books={books} />
              </div>
            )) 
          }
        </div>
    );
}