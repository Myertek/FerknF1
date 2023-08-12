// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Supabase {
			Database: import('./lib/types').Database;
			SchemaName: 'public';
		}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
