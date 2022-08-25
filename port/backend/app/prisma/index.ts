import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
    const deletedLevel = await prisma.level.deleteMany();
    console.log("start");

    const level = [
        {id: 1, name: '初級'},
        {id: 2, name: '中級'},
        {id: 3, name: '上級'},
        {id: 4, name: 'プロフェッショナル'}
      ]
    
      level.map(async (lev) => {
          await prisma.level.create({
            data: lev
          })
      })
    
      const allLev = await prisma.level.findMany({})
      console.log(allLev,"ok")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })