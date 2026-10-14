import datasource from '../../config/datasource';
import { Book }   from "../../modules/books/book.entity";

async function seed() {
    await datasource.initialize();

    const bookRepo = datasource.getRepository(Book);

    const books = [
        {title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937},
        {title: '1984', author: 'George Orwell', publishedYear: 1949},
        {title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008},
    ];

    //Insert only the books that are not in the database yet, so the seed can run repeatedly
    for (const b of books) {
        if (!await bookRepo.existsBy({title: b.title})) {
            await bookRepo.save(bookRepo.create(b));
        }
    }

    console.log('Seed: books inserted');
    await datasource.destroy();
}

seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
