ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE varchar(21) USING "name"::varchar(21);--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_name_key" UNIQUE("name");