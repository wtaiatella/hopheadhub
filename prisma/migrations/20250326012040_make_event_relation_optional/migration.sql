-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_eventId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
