import * as z from 'zod';

export const UserValidation = z.object({
    bio: z.string().min(5).max(1000),
    profile_photo: z.string().url(),
    name: z.string().min(3).max(70),
    username: z.string().min(3).max(30)
})