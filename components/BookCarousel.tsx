"use client"

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselItem } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card"
import { Book } from "@/types/google-books-api"

export function BookCarousel({ books }: { books: Book[] }) {
    return (
        <div className="flex align-middle justify-center">
            <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-3xl"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {books.map((book) => (
                <CarouselItem key={book.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <Card> 
                        <CardContent className="flex aspect-[2/3] items-center justify-center p-0">
                          <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="img" className="h-full w-full object-cover"></img>
                        </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16"/>
            <CarouselNext className="mr-16"/>
          </Carousel>
          </div>
    )
}