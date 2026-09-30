ALTER TABLE "user" DROP CONSTRAINT "user_name_key";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE text USING "name"::text;