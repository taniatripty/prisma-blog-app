import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const createcomment=async(payload:{
    content:string;
    authorId:string;
    postId:string;
    parentId?:string;
})=>{

    await prisma.post.findUniqueOrThrow({
        where:{
            id:payload.postId
        }
    })

    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        })
    }
    const result=await prisma.comment.create({
         data:payload
 

    })
    return result
}

const getcommentById=async(id:string)=>{
    const result=await prisma.comment.findUnique({
        where:{
            id
        },
        include:{
            posts:{
                select:{
                    id:true,
                    title:true,
                    views:true

                }
            }
        }
    })
    return result

}

const getcommentByAuthorId=async(authorId:string)=>{
    const result=await prisma.comment.findMany({
        where:{
            authorId
        },
        include:{
            posts:{
                select:{
                    id:true,
                    title:true
                   

                }
            }
        }
    })
    return result

}

const deletepostById=async(commentId:string,authorId:string)=>{
  const commentData=await prisma.comment.findUnique({
    where:{
        id:commentId,
        authorId
        
    },
    select:{
        id:true
    }
  })
  if(!commentData){
    throw new Error('delete comment failed')
  }
  const result=await prisma.comment.delete({
    where:{
        id:commentData.id
    }
  })
  return result
 
}

const modaratecomment=async(commentId:string,data:{status:CommentStatus})=>{
  const commentData=await prisma.comment.findUniqueOrThrow({
    where:{
        id:commentId,
       
        
    },
    select:{
        id:true,
        status:true
    }
   
  })
 if(commentData.status==data.status){
throw new Error(`already exists (${data.status}) status`)
 }
  const result=await prisma.comment.update({
    where:{
         id:commentId
    },
    data
  })
  return result
 
}

export const commentServices={
    createcomment,
    getcommentById,
    getcommentByAuthorId,
    deletepostById,
    modaratecomment
}