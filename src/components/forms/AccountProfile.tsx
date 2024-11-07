"use client"
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import { z } from 'zod'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Form, FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';



interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing('media')

  const router = useRouter()
  const pathname = usePathname()


  // form
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",

    }
  })

  // image setup
  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file);
    }
  }
  console.log(user.id);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob)

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url
      }
    }

    //  update profile
    await updateUser({
      name: values.name,
      bio: values.bio,
      username: values.username,
      image: values.profile_photo,
      userId: user.id,
      path: pathname,
    })

    pathname === '/profile/edit' ? router.back() : router.push('/');

  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 justify-start">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image src={field.value} alt='profile_photo' height={96} width={96} priority className='rounded-full h-[130px] w-[130px]' />
                ) : (
                  <Image src={'/assets/profile.svg'} alt='profile-logo' height={24} width={24} className='object-contain' />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type="file"
                  accept='image/*'
                  placeholder='Upload Profile Photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-0 w-full'>
              <FormLabel className='text-base-medium text-light-2 align-middle '>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='bg-gray-400 account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-0 w-full'>
              <FormLabel className='text-base-medium text-light-2 align-middle '>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='bg-gray-400 account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-0 w-full'>
              <FormLabel className='text-base-medium text-light-2 align-middle '>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className='bg-gray-400 account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={`bg-white rounded-sm max-sm:p-2 p-6 text-black font-bold hover:bg-white/90 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}