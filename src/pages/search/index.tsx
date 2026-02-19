import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";


export default function Page() {

    const [books, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async() => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(()=> {
        if(q) {
            fetchSearchResult();
        }
    },[q])

    return <div>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
}

Page.getLayout = (page : ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}