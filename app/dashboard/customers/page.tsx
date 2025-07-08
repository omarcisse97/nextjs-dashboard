import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchCusomersPages } from '@/app/lib/data';
import Pagination from '@/app/ui/customers/pagination';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCusomersPages(query);
  console.log('Total Pages -> ', totalPages);
  return (
    <div className="w-full">
          
           <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
            <CustomersTable query={query} currentPage={currentPage} />
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
  );
}