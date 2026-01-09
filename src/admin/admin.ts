
import { prisma } from "../lib/prisma";
import { UserRoles } from "../middleware/authmiddleware";


async function seedAdmin() {
    try {
        
        const adminData = {
            name: "afrin",
            email: "afrin@admin.com",
            role: UserRoles.ADMIN,
            password: "afrin1234",
            emailVerified:true
        }
      
        // check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if (existingUser) {
        console.error("User already exists!!");
        return
        }

        const signUpAdmin = await fetch(" http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "origin":"http://localhost:4000"
            },
              
            body: JSON.stringify(adminData)
        })
      if(signUpAdmin.ok){
        await prisma.user.update({
            where:{
                email:adminData.email
            },
            data:{
                emailVerified:true
            }
        })
        // console.log(' emailvarifiend status updated')
      }


    
        console.log(signUpAdmin)

    } catch (e) {
       console.error(e)
    }
}

seedAdmin()