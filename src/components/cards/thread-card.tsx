import React from 'react'

type ThreadType = {
    id: string;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    createdAt: string
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    comments: {
        author: {
            image: string;
        }[]
    };
    isComment?: boolean;
    parentId: string | null;
    currentUserId?: string;
}


export default function ThreadCard({ id, content, author, createdAt, parentId, community, comments, currentUserId }: ThreadType) {
    return (
        <article className='text-white'>
            <h1>{content}</h1>
        </article>
    )
}
