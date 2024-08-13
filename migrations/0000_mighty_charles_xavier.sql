CREATE TABLE IF NOT EXISTS "detail_transactions" (
	"detail_id" serial PRIMARY KEY NOT NULL,
	"transaction_id" varchar(50),
	"product" varchar(50),
	"quantity" integer DEFAULT 1,
	"total" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"employee_id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50),
	"username" varchar(50),
	"password" varchar(255),
	"name" varchar(50),
	"phone" varchar(20),
	"status" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" varchar(50) PRIMARY KEY NOT NULL,
	"product_name" varchar(50),
	"price" integer DEFAULT 0,
	"stock" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"token_id" serial PRIMARY KEY NOT NULL,
	"token" varchar(255),
	"employee" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"expired_at" timestamp with time zone DEFAULT now() + interval '1 day'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"transaction_id" varchar(50) PRIMARY KEY NOT NULL,
	"employee" integer,
	"date" timestamp with time zone DEFAULT now(),
	"total" integer DEFAULT 0
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "detail_transactions" ADD CONSTRAINT "detail_transactions_transaction_id_transactions_transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("transaction_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "detail_transactions" ADD CONSTRAINT "detail_transactions_product_products_product_id_fk" FOREIGN KEY ("product") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_employee_employee_employee_id_fk" FOREIGN KEY ("employee") REFERENCES "public"."employee"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_employee_employee_employee_id_fk" FOREIGN KEY ("employee") REFERENCES "public"."employee"("employee_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
