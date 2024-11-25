"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button';
import {
    Form, FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.action';


export default function  PostThread({ userId }: { userId: string }) {

    const router = useRouter()
    const pathname = usePathname()

    // form
    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId
        }
    })

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            author: userId,
            text: values.thread,
            communityId: null,
            path: pathname
        })

        router.push('/')
    }




    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex mt-8 flex-col gap-10 relative justify-start">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-0 w-full'>
                            <FormLabel className='font-semibold ml-1 text-light-2 align-middle'>
                                Thread Content
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 shadow-inner focus:shadow-gray-50 transition-shadow focus:duration-700 '>
                                <Textarea
                                    rows={15}
                                    className='bg-gray-400 account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='p-5 sm:absolute sm:bottom-5 rounded-md sm:right-5 bg-white font-bold'>Post Thread</Button>
            </form>
        </Form>
    )
}
