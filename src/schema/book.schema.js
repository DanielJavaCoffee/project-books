import {z} from 'zod'

const bookShema = z.object({
    title: z.string().min(3, 'Username is required'),
    author: z.string().min(3, 'Author is required')
})

const bookIdShema = z.object({
    id: z.number().int().positive('Book ID must be a positive integer')
});

export { bookShema, bookIdShema }