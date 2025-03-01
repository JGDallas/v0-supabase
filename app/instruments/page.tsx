import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InstrumentSelector } from "@/components/instrument-selector"

export default async function Instruments() {
  const supabase = await createClient()
  const { data: instruments, error } = await supabase.from("instruments").select()

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Musical Instruments</CardTitle>
          <CardDescription>Select an instrument to view its details</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive p-4 rounded-md">
              <p className="font-medium">Error fetching instruments</p>
              <p className="text-sm mt-1">{error.message || "Unknown error"}</p>
              <p className="text-sm mt-2">
                You may need to create the instruments table. Run this SQL in your Supabase SQL Editor:
              </p>
              <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                {`-- Create the table
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insert sample data into the table
insert into instruments (name)
values
  ('violin'),
  ('viola'),
  ('cello'),
  ('bass'),
  ('piano');

alter table instruments enable row level security;

-- Make the data publicly readable
create policy "public can read instruments"
on public.instruments
for select to anon
using (true);`}
              </pre>
            </div>
          )}

          {instruments && instruments.length > 0 ? (
            <InstrumentSelector instruments={instruments} />
          ) : (
            instruments && <p className="text-muted-foreground">No instruments found in the database.</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

